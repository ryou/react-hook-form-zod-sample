import { NetworkResult } from '../types/Network'
import { delay } from '../libs/delay'
import { Success } from '../libs/Result'
import { useNetworkFormSubmit } from '../components/Form/hooks/useNetworkFormSubmit'
import { Form } from '../components/Form/Form'
import { NextPage } from 'next'
import {
  MultipleUseFieldArrayFormProvider,
  MultipleUseFieldArrayFormSchema,
} from '../components/Form/concrete/MultipleUseFieldArrayForm/MultipleUseFieldArrayFormProvider'
import { useMultipleUseFieldArrayFormContext } from '../components/Form/concrete/MultipleUseFieldArrayForm/useMultipleUseFieldArrayFormContext'
import { MultipleUseFieldArrayForm } from '../components/Form/concrete/MultipleUseFieldArrayForm/MultipleUseFieldArrayForm'

const dummyPost = async (
  data: MultipleUseFieldArrayFormSchema
): Promise<NetworkResult<string>> => {
  await delay()

  return new Success(JSON.stringify(data))
}

const Content = () => {
  const useFormReturn = useMultipleUseFieldArrayFormContext()

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
      <MultipleUseFieldArrayForm />
    </Form>
  )
}

const TopPage: NextPage = () => {
  return (
    <MultipleUseFieldArrayFormProvider defaultValues={{}}>
      <Content />
    </MultipleUseFieldArrayFormProvider>
  )
}

export default TopPage
