import { Path, UseFormReturn } from 'react-hook-form'

export const getRHFErrorMessages = <T>(
  useFormReturn: UseFormReturn<T>,
  path: Path<T>
) => {
  /** https://react-hook-form.com/api/useform/getfieldstate
   *  getFieldStateの第二引数の存在理由が公式読んでもよくわからず、ソースコードを読もうとしたら
   *  あまりにもややこしすぎたので理解を諦めた。
   *  多分ReactHookFormはレンダリングを抑えるために色々ガリガリ最適化してるので、APIも独特な感じになってる感じがする。
   *  第二引数を与えない場合、最新の状態を取得しないケースが多々あったが、第二引数を指定したら問題なく動作したのでこちらの方法で。
   *
   *  https://github.com/react-hook-form/react-hook-form/blob/21b520204b9225445b44976f37db8bc8b4baea9c/src/useForm.ts#L109-L112
   *  https://github.com/react-hook-form/react-hook-form/blob/21b520204b9225445b44976f37db8bc8b4baea9c/src/logic/getProxyFormState.ts
   *  ちょっと読んで特徴的だなと思ったのは、useFormでformStateを返す際に、Object.definePropertyを使用してgetter経由でアクセスするように処理している点。
   *  深堀りは諦めたため予想となるが、getterでプロパティへのアクセスを検知するようにして、本当に必要になった時だけ再レンダリングされるようにしてるのではと思った。
   */
  const error = useFormReturn.getFieldState(path, useFormReturn.formState).error
  const errorMessage = error?.message

  return errorMessage !== undefined ? [errorMessage] : []
}
