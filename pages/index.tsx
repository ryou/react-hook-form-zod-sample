import {
  SampleFormProvider,
  SampleFormSchema,
} from '../components/Form/concrete/SampleForm/SampleFormProvider'
import { NetworkResult } from '../types/Network'
import { delay } from '../libs/delay'
import { Failure, Success } from '../libs/Result'
import { useNetworkFormSubmit } from '../components/Form/hooks/useNetworkFormSubmit'
import { Form } from '../components/Form/Form'
import { SampleForm } from '../components/Form/concrete/SampleForm/SampleForm'
import { NextPage } from 'next'
import { useSampleFormContext } from '../components/Form/concrete/SampleForm/useSampleFormContext'

const dummyPost = async (
  data: SampleFormSchema
): Promise<NetworkResult<{}>> => {
  await delay()

  if (data.fullName.sei !== '山田' || data.fullName.mei !== '太郎') {
    return new Failure({
      // TODO: なぜかここでリテラルでなくstringと認識されてしまうので、asを使う必要がある
      type: '400' as '400',
      data: {
        details: {
          fullName: ['山田 太郎である必要があります'],
        },
      },
    })
  }

  return new Success({})
}

const Content = () => {
  const { useFormReturn } = useSampleFormContext()

  // フォームをSubmitした際に、通信する以外のケースも考えられる（ステップ形式のフォーム等で入力内容をStoreに保持する等）ので、通信する際のみの処理を
  // useFormSubmitで切り出して、通信する時のみ呼び出すようにする。
  const { topErrorMessage, onSubmit } = useNetworkFormSubmit({
    execFunc: dummyPost,
    onSuccess: (data) => {
      alert(`成功：${JSON.stringify(data)}`)
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
      <SampleForm />
    </Form>
  )
}

const TopPage: NextPage = () => {
  return (
    <SampleFormProvider
      defaultValues={{
        items: [
          {
            name: 'hoge',
            url: 'foo',
          },
        ],
      }}
    >
      <Content />
    </SampleFormProvider>
  )
}

export default TopPage
