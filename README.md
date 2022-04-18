# react-hook-form-zod-sample

Reactでフロントエンドバリデーションを実装する際の、自分なりの実装案

## 使用ライブラリ

- React Hook Form
- Zod
  - inferによる型生成が好きなので

## 動作デモ

https://tranquil-blancmange-3e1bdf.netlify.app/

## 新規フォームを作成する際の手順

「要約」 `components/Form/concrete/SampleForm` と `pages/index.tsx` を真似て実装。

- フォームの名前を決める（例：ExampleForm、以降ExampleFormを例として記述）
- `components/Form/concrete` に `ExampleForm` ディレクトリを作成
- 作成したディレクトリに、 `ExampleForm.tsx` と `useExampleForm.ts` を作成
- `useExampleForm.ts` にて、フォームのスキーマを作成し、スキーマの型 `ExampleFormSchema` と `useExampleForm` をexport
- `ExampleForm.tsx` にて、フォームの実装をする
- ページ側の実装は `pages/index.tsx` を参考に

## 課題

### useFormContextを使うと、間違ったnameをInputWithValidationとかに指定してもコンパイルが通ってしまう

元々useFormContextを使用していたが、フォームのスキーマに存在しないnameをInputWithValidationとかに指定してもコンパイルが通ってしまっていた。

例えば以下のようなコードのコンパイルが通ってしまう。

```typescript jsx
const schema = z.object({
  userName: z.string(),
})

const someForm = () => {
  return (
    // nが小文字になっているがエラーにならない
    <InputWithValidation name="username" />
  )
}
```

なので、useFormContextを使用せず、useFormの返り値をバケツリレーする実装にしている。

何か良い解決案があればContextの使用を再考する。

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
