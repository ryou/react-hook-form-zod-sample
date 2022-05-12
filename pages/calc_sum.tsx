import { NetworkResult } from '../types/Network'
import { delay } from '../libs/delay'
import { Success } from '../libs/Result'
import { useNetworkFormSubmit } from '../components/Form/hooks/useNetworkFormSubmit'
import { Form } from '../components/Form/Form'
import { NextPage } from 'next'
import {
  CalcSumFormProvider,
  CalcSumFormSchema,
} from '../components/Form/concrete/CalcSumForm/CalcSumFormProvider'
import { useCalcSumFormContext } from '../components/Form/concrete/CalcSumForm/useCalcSumFormContext'
import { CalcSumForm } from '../components/Form/concrete/CalcSumForm/CalcSumForm'

const dummyPost = async (
  data: CalcSumFormSchema
): Promise<NetworkResult<string>> => {
  await delay()

  return new Success(JSON.stringify(data))
}

const Content = () => {
  const { useFormReturn } = useCalcSumFormContext()

  // フォームをSubmitした際に、通信する以外のケースも考えられる（ステップ形式のフォーム等で入力内容をStoreに保持する等）ので、通信する際のみの処理を
  // useFormSubmitで切り出して、通信する時のみ呼び出すようにする。
  const { topErrorMessage, onSubmit } = useNetworkFormSubmit({
    execFunc: dummyPost,
    onSuccess: (data) => {
      alert(`成功：${data}`)
    },
    useFormReturn,
  })

  return (
    <Form
      topErrorMessage={topErrorMessage}
      useFormReturn={useFormReturn}
      onSubmit={onSubmit}
      submitText="送信"
    >
      <CalcSumForm />
    </Form>
  )
}

const CalcSumPage: NextPage = () => {
  return (
    <CalcSumFormProvider defaultValues={{}}>
      <Content />
    </CalcSumFormProvider>
  )
}

export default CalcSumPage
