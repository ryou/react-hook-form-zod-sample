import { useFieldArray, useFormContext } from 'react-hook-form'
import { CalcSumFormSchema } from './CalcSumFormProvider'

export const useCalcSumFormContext = () => {
  const useFormReturn = useFormContext<CalcSumFormSchema>()
  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    name: 'items',
    control: useFormReturn.control,
  })

  return {
    useFormReturn,
    itemFields,
    appendItem,
    removeItem,
  }
}
