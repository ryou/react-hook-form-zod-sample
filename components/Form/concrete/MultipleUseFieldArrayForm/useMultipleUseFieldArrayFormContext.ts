import { useFormContext } from 'react-hook-form'
import { MultipleUseFieldArrayFormSchema } from './MultipleUseFieldArrayFormProvider'

export const useMultipleUseFieldArrayFormContext = () => {
  return useFormContext<MultipleUseFieldArrayFormSchema>()
}
