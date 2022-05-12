# react-hook-form-zod-sample

Reactでフロントエンドバリデーションを実装する際の、自分なりの実装案

## 使用ライブラリ

- React Hook Form
- Zod
  - inferによる型生成が好きなので

## 動作デモ

https://tranquil-blancmange-3e1bdf.netlify.app/

## 覚書

### useFieldArrayは同じnameに対して複数箇所で呼び出してはいけない

> Each useFieldArray is unique and has its own state update, which means you should not have multiple useFieldArray with the same name.

> useFieldArrayはそれぞれ一意であり、状態の更新が可能である。つまり、同じ名前のuseFieldArrayを複数持つことはないはずである。

[useFieldArray](https://react-hook-form.com/api/usefieldarray)

useFieldArrayが返すfieldsは、同じuseFieldArrayが返した操作系メソッドで更新された時のみ更新されるっぽい。

[例](https://tranquil-blancmange-3e1bdf.netlify.app/multiple_use_field_array)

この例では、useFieldArrayを親と子コンポーネント両方で呼び出し、親から渡されたremoveと子自身のremoveそれぞれで操作した際の動作が確認できる。 子自身のremoveを使用する削除ボタンでは想定外の動作をする。

これは親コンポーネントのfieldsでループを回してるのだが、子コンポーネントでremoveした場合親コンポーネントのfieldsが更新されないためこうなってしまっている。

なので、useFieldArrayは一箇所でのみ呼び出し、Props経由で渡すようにしないといけない。（useFormContextを使ってるのに、結局Propsドリリングしないといけないものが出るというのは嫌な感じはある）

### formの入れ子をする方法に関して

HTMLの仕様上、formタグの入れ子が許されていないので、formの入れ子が必要な際に工夫が必要となる。

選択肢としては

1. バリデーションとEnterによる送信を諦めてformタグを使用しない
2. formの入れ子が発生しないようにHTMLを構築する
3. [form属性](https://developer.mozilla.org/ja/docs/Web/HTML/Element/input#attr-form) を使用する

1または2の解決策が取れるのであれば、それで解決する。

1に関してはReactHookFormでなく、制御コンポーネントでの実装を前提としたバリデーションの仕組みを整えているのであれば、Enterによる送信を諦めるだけでいける。（個人的にはフロントエンドバリデーションはそこまで頑張る物ではないと思っているので、さっさとフロントエンドバリデーションを諦めるのが良いと思うが）

2に関しては、フォーム内にモーダルダイアログがあり、そのモーダルダイアログ内にもformがあるケースなどでは [Portal](https://ja.reactjs.org/docs/portals.html) で解決する等があると思う。

汎用的な解決策としては3となる。form関係のタグには `form` 属性が用意されており、それを指定すると入れ子関係にないformタグと関連付けることが出来る。 `pages/nested_form.tsx` に実装メモとしてコードを残しておく。

### 値の変化によって何かしたい場合ややこしいっていう話

[例](https://tranquil-blancmange-3e1bdf.netlify.app/calc_sum)

上の例のように、「入力の総計を計算する」みたいな入力に変化があった際に何かしたい場合、結構罠があるように思えた。

最初は `watch` をつかってやろうとしたんだけど、例のようにwatchだと再レンダリングはされるが、watchの返却値の中身は変更されているが同じものとuseMemoに判断されているのか更新されない。おそらく内部的にuseRefとか使いまくって最適化した結果発生している気がする。（ReactHookFormのコードを追いかける気力はない）

で、似たようなAPIで `useWatch` があったのでそっちを使った所想定通りの動作をした。公式的にはwatchとuseWatchの違いは再レンダリングがuseFormしたコンポーネントから発生するかとuseWatchしたコンポーネントから発生するかの違いくらいしか無いように見えるが、他にも違うんだろう。

watchがuseFormをしたコンポーネントから再レンダリングされるということは、パフォーマンス的には圧倒的にuseWatchが有利。watchを使うべき状況が無いような気がするんだけどどういう状況で使うんだろう？

[参考：getValuesとwatchとuseWatachの使い分け](https://scrapbox.io/mrsekut-p/getValues%E3%81%A8watch%E3%81%A8useWatach%E3%81%AE%E4%BD%BF%E3%81%84%E5%88%86%E3%81%91)

ReactHookForm、最適化の為にめちゃくちゃ複雑な事をしている結果かちょくちょく予想外の挙動をすることが多く、あまりいい印象がない。

### Next.jsの場合、input:fileをバリデーションしようとすると、FileList型がサーバーサイドでランタイムエラーが発生するので出来ない。

input:fileをバリデーションしようとすると、以下のようなコードを書くことになると思う。

```typescript
const schema = z.object({
  profilePicture: z.instanceof(FileList),
})

export type Schema = z.infer<typeof schema>
```

しかし、ここのコードはNext.jsだとサーバーサイドでも実行されるため `z.instanceof(FileList)` のところで「FileListなんて存在しないのですが？」とランタイムエラーが出てしまう。

これの対策としては、

- FileList(File)をそのまま使うのでなく、BASE64に変換してinput:textに保存しておき、それをバリデーションする
  - バックエンド側がFileであることを要求する場合は、送信時にBASE64からFileに変換して送信する。
    - すごい無駄だし、BASE64からFileの変換が割と不具合生みそうなので正直やりたくない。
- `z.instanceof(FileList)` でなく、 `z.object({})` とかにして無理やり通してしまう。
  - 後々 `data.profilePicture as FileList` 的なことをする必要はある。

また、以下のパターンの場合そもそもinput:fileをReact Hook Formでバリデーションする必要がない。
 
- 画像アップロードが専用のAPIの場合のケース。よく見るので、それならReact Hook Formをわざわざ使わなくてもいい。そこだけ専用の仕組みで書いても問題ないので気にすることはない。
  - 例えば、Zennのプロフィール編集画面も画像とそれ以外でAPIが分かれている。
  - なんでファイルアップロードが専用のAPIのケースがよくあるのかは知っておきたい。HTTPリクエストボディのサイズ制限の関係？
