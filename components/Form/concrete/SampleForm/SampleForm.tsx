import { Button } from '../../../Button/Button'
import classNames from 'classnames'
import { FormGroup } from '../../FormGroup'
import { InputWithValidation } from '../../../Input/InputWithValidation'
import { CheckBoxWithValidation } from '../../../CheckBox/CheckBoxWithValidation'
import { getRHFErrorMessages } from '../../../../libs/ReactHookFormUtils'
import { useSampleFormContext } from './useSampleFormContext'
import { useCallback } from 'react'

//-------------------- Item Information --------------------

type ItemInformationProps = {
  index: number
}
const ItemInformation = ({ index }: ItemInformationProps) => {
  const { useFormReturn, removeItem } = useSampleFormContext()

  const onClickDelete = useCallback(() => removeItem(index), [index])

  return (
    <div className={classNames(['py-4', 'px-4', 'bg-base-200', 'rounded'])}>
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

const ItemInformationList = () => {
  const { itemFields, appendItem } = useSampleFormContext()

  const onClickAdd = () => {
    appendItem({
      name: '',
      url: '',
    })
  }

  return (
    <div className={classNames(['my-8'])}>
      {itemFields.map((field, index) => (
        <div key={field.id} className={classNames(['mb-8'])}>
          <ItemInformation index={index} />
        </div>
      ))}
      <div className={classNames(['mt-8', 'text-center'])}>
        <Button onClick={onClickAdd}>商品追加</Button>
      </div>
    </div>
  )
}

//-------------------- Main --------------------

type Props = {}
export const SampleForm = ({}: Props) => {
  const { useFormReturn } = useSampleFormContext()
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
        <ItemInformationList />
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
