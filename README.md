# react-hook-form-zod-sample

Reactでフロントエンドバリデーションを実装する際の、自分なりの実装案

## 使用ライブラリ

- React Hook Form
- Zod
  - inferによる型生成が好きなので

## 動作デモ

https://tranquil-blancmange-3e1bdf.netlify.app/

## 課題

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
