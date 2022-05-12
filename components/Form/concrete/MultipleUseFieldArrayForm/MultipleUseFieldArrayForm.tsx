import { Button } from '../../../Button/Button'
import classNames from 'classnames'
import { FormGroup } from '../../FormGroup'
import { InputWithValidation } from '../../../Input/InputWithValidation'
import { useCallback } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useMultipleUseFieldArrayFormContext } from './useMultipleUseFieldArrayFormContext'

//-------------------- Item Information --------------------

type ItemInformationProps = {
  index: number
  onClickDelete: () => void
}
const ItemInformation = ({ index, onClickDelete }: ItemInformationProps) => {
  const useFormReturn = useMultipleUseFieldArrayFormContext()
  const { remove } = useFieldArray({
    name: 'items',
    control: useFormReturn.control,
  })

  const onClickDeleteLocal = useCallback(() => remove(index), [index, remove])

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
      <div className={classNames(['mt-8', 'text-right'])}>
        <Button color={'ghost'} onClick={onClickDelete}>
          削除（親コンポーネントのremoveを呼び出す）
        </Button>
        <Button color={'ghost'} onClick={onClickDeleteLocal}>
          削除（子コンポーネントのremoveを呼び出す）
        </Button>
      </div>
    </div>
  )
}

//-------------------- Main --------------------

type Props = {}
export const MultipleUseFieldArrayForm = ({}: Props) => {
  const { control } = useMultipleUseFieldArrayFormContext()
  const { fields, append, remove } = useFieldArray({
    name: 'items',
    control,
  })

  const onClickAdd = () => {
    append({
      name: '',
    })
  }

  const onClickDelete = (index: number) => remove(index)

  return (
    <div className={classNames(['my-8'])}>
      {fields.map((field, index) => (
        <div key={field.id} className={classNames(['mb-8'])}>
          <ItemInformation
            index={index}
            onClickDelete={() => onClickDelete(index)}
          />
        </div>
      ))}
      <div className={classNames(['mt-8', 'text-center'])}>
        <Button onClick={onClickAdd}>商品追加</Button>
      </div>
    </div>
  )
}
