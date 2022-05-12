import { DefaultValues, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { ZodFormSchema } from '../../../../libs/ZodFormSchema'
import { useDefaultForm } from '../../hooks/useDefaultForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'

const multipleUseFieldArrayFormSchema = z.object({
  items: z.array(
    z.object({
      name: ZodFormSchema.getInputSchema({ required: true }),
    })
  ),
})

export type MultipleUseFieldArrayFormSchema = z.infer<
  typeof multipleUseFieldArrayFormSchema
>

type Props = {
  defaultValues: DefaultValues<MultipleUseFieldArrayFormSchema>
  children: ReactNode
}
export const MultipleUseFieldArrayFormProvider = ({
  defaultValues,
  children,
}: Props) => {
  const methods = useDefaultForm<MultipleUseFieldArrayFormSchema>(
    defaultValues,
    zodResolver(multipleUseFieldArrayFormSchema)
  )

  return <FormProvider {...methods}>{children}</FormProvider>
}
