import {
  InnerNestedFormSchema,
  OuterNestedFormSchema,
  useInnerNestedForm,
  useOuterNestedForm,
} from './useNestedForm'
import { InputWithValidation } from '../../../Input/InputWithValidation'
import { FormGroup } from '../../FormGroup'
import { FormForOuterNested } from '../../FormForOuterNested'
import { Form } from '../../Form'
import { SubmitHandler } from 'react-hook-form'

const InnerNestedForm = () => {
  const useFormReturn = useInnerNestedForm({
    username: '',
  })

  const onSubmit: SubmitHandler<InnerNestedFormSchema> = (data) => {
    alert(`submit from inner nested form ${JSON.stringify(data)}`)
  }

  return (
    <div className="bg-base-200 p-4 my-4">
      <Form useFormReturn={useFormReturn} onSubmit={onSubmit} submitText="送信">
        <div>
          <FormGroup title="名前">
            <InputWithValidation
              name="username"
              useFormReturn={useFormReturn}
            />
          </FormGroup>
        </div>
      </Form>
    </div>
  )
}

//-------------------- Main --------------------

type Props = {}
export const NestedForm = ({}: Props) => {
  const useFormReturn = useOuterNestedForm({
    username: '',
  })

  const formId = 'form_id'

  const onSubmit: SubmitHandler<OuterNestedFormSchema> = (data) => {
    alert(`submit from outer nested form ${JSON.stringify(data)}`)
  }

  return (
    <FormForOuterNested
      id={formId}
      useFormReturn={useFormReturn}
      onSubmit={onSubmit}
      submitText="送信"
    >
      <div>
        <FormGroup title="名前">
          <InputWithValidation
            form={formId}
            name="username"
            useFormReturn={useFormReturn}
          />
        </FormGroup>
        <InnerNestedForm />
      </div>
    </FormForOuterNested>
  )
}
