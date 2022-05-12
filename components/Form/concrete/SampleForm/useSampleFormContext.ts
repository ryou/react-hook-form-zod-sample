import { useFieldArray, useFormContext } from 'react-hook-form'
import { SampleFormSchema } from './SampleFormProvider'

export const useSampleFormContext = () => {
  const useFormReturn = useFormContext<SampleFormSchema>()
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
