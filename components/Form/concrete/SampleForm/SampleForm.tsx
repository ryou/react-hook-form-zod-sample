import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { Button } from '../../../Button/Button'
import classNames from 'classnames'
import { SampleFormSchema } from './useSampleForm'
import { FormGroup } from '../../FormGroup'
import { InputWithValidation } from '../../../Input/InputWithValidation'
import { CheckBoxWithValidation } from '../../../CheckBox/CheckBoxWithValidation'
import { getRHFErrorMessages } from '../../../../libs/ReactHookFormUtils'

//-------------------- Item Information --------------------

type ItemInformationProps = {
  useFormReturn: UseFormReturn<SampleFormSchema>
  index: number
  onClickDelete?: () => void
}
const ItemInformation = ({
  useFormReturn,
  index,
  onClickDelete,
}: ItemInformationProps) => {
  return (
    <div className={classNames(['py-4', 'px-4', 'bg-gray-50', 'rounded'])}>
      <div className={classNames(['mb-8'])}>
        <FormGroup title="商品名">
          <InputWithValidation
            name={`items.${index}.name`}
            useFormReturn={useFormReturn}
          />
        </FormGroup>
      </div>
      <div>
        <FormGroup title="商品名">
          <InputWithValidation
            name={`items.${index}.url`}
            useFormReturn={useFormReturn}
          />
        </FormGroup>
      </div>
      <div className={classNames(['mt-8', 'text-right'])}>
        <Button color={'ghost'} onClick={onClickDelete}>
          削除
        </Button>
      </div>
    </div>
  )
}

//-------------------- Item Information List --------------------

type ItemInformationListProps = {
  useFormReturn: UseFormReturn<SampleFormSchema>
}
const ItemInformationList = ({ useFormReturn }: ItemInformationListProps) => {
  const { control } = useFormReturn
  const { fields, append, remove } = useFieldArray({
    name: 'items',
    control,
  })

  const onClickAdd = () => {
    append({
      name: '',
      url: '',
    })
  }

  const onClickRemove = (index: number) => {
    remove(index)
  }

  return (
    <div className={classNames(['my-8'])}>
      {fields.map((field, index) => (
        <div key={field.id} className={classNames(['mb-8'])}>
          <ItemInformation
            index={index}
            onClickDelete={() => onClickRemove(index)}
            useFormReturn={useFormReturn}
          />
        </div>
      ))}
      <div className={classNames(['mt-8', 'text-center'])}>
        <Button onClick={onClickAdd}>商品追加</Button>
      </div>
    </div>
  )
}

//-------------------- Main --------------------

type Props = {
  useFormReturn: UseFormReturn<SampleFormSchema>
}
export const SampleForm = ({ useFormReturn }: Props) => {
  const fullNameErrorMessages = getRHFErrorMessages(useFormReturn, 'fullName')

  return (
    <>
      <div className={classNames(['mb-8'])}>
        <FormGroup title="氏名" errorMessages={fullNameErrorMessages}>
          <div className={classNames(['flex gap-4'])}>
            <div className={classNames(['flex-grow'])}>
              <InputWithValidation
                name="fullName.sei"
                useFormReturn={useFormReturn}
              />
            </div>
            <div className={classNames(['flex-grow'])}>
              <InputWithValidation
                name="fullName.mei"
                useFormReturn={useFormReturn}
              />
            </div>
          </div>
        </FormGroup>
      </div>
      <div>
        <FormGroup title="パスワード" description="8文字以上20文字以下">
          <InputWithValidation
            type="password"
            name="password"
            useFormReturn={useFormReturn}
          />
        </FormGroup>
      </div>
      <div>
        <ItemInformationList useFormReturn={useFormReturn} />
      </div>
      <div className={classNames(['mb-8'])}>
        <CheckBoxWithValidation
          name="check"
          text="利用規約に同意する"
          useFormReturn={useFormReturn}
        />
      </div>
    </>
  )
}
