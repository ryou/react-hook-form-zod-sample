import {
  DefaultValues,
  Resolver,
  useForm,
  UseFormReturn,
} from 'react-hook-form'

export function useDefaultForm<T>(
  defaultValues: DefaultValues<T>,
  resolver: Resolver<T>
): UseFormReturn<T> {
  return useForm<T>({
    mode: 'onBlur',
    defaultValues,
    resolver,
  })
}
