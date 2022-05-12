import { Button } from '../../../Button/Button'
import classNames from 'classnames'
import { FormGroup } from '../../FormGroup'
import { InputWithValidation } from '../../../Input/InputWithValidation'
import { useCalcSumFormContext } from './useCalcSumFormContext'
import { Input } from '../../../Input/Input'
import { useMemo } from 'react'
import { useWatch } from 'react-hook-form'

//-------------------- Item Information --------------------

type ItemInformationProps = {
  index: number
  onClickDelete: () => void
}
const ItemInformation = ({ index, onClickDelete }: ItemInformationProps) => {
  const { useFormReturn } = useCalcSumFormContext()

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
        <FormGroup title="重量(g)">
          {/* TODO: valueAsNumber対応のInputWithValidation作って使う */}
          <Input
            type="number"
            {...useFormReturn.register(`items.${index}.amount`, {
              valueAsNumber: true,
            })}
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
  const { itemFields, appendItem, removeItem } = useCalcSumFormContext()

  const onClickAdd = () => {
    appendItem({
      name: '',
      amount: 0,
    })
  }

  const onClickDelete = (index: number) => {
    removeItem(index)
  }

  return (
    <div className={classNames(['my-8'])}>
      {itemFields.map((field, index) => (
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

const calcItemsAmountSum = (items: { amount: number }[]) => {
  return items.reduce((prev, current) => prev + current.amount, 0)
}

const WatchPattern = () => {
  const {
    useFormReturn: { watch },
  } = useCalcSumFormContext()

  const items = watch('items', [])

  const sum = useMemo(() => {
    return calcItemsAmountSum(items)
  }, [items])

  return <div>{sum}g</div>
}

const UseWatchPattern = () => {
  const {
    useFormReturn: { control },
  } = useCalcSumFormContext()

  const items = useWatch({
    name: 'items',
    control,
    defaultValue: [],
  })

  const sum = useMemo(() => {
    return calcItemsAmountSum(items)
  }, [items])

  return <div>{sum}g</div>
}

//-------------------- Main --------------------

type Props = {}
export const CalcSumForm = ({}: Props) => {
  const { useFormReturn } = useCalcSumFormContext()

  return (
    <>
      <div className={classNames(['mb-8'])}>
        <FormGroup title="氏名">
          <InputWithValidation name="username" useFormReturn={useFormReturn} />
        </FormGroup>
      </div>
      <div>
        <ItemInformationList />
        <div className="mb-8">
          <p className="text-xl font-bold mb-2">
            総重量(watch + useMemoパターン)
          </p>
          <WatchPattern />
        </div>
        <div>
          <p className="text-xl font-bold mb-2">
            総重量(useWatch + useMemoパターン)
          </p>
          <UseWatchPattern />
        </div>
      </div>
    </>
  )
}
