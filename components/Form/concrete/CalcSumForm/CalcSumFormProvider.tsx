import { DefaultValues, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { ZodFormSchema } from '../../../../libs/ZodFormSchema'
import { useDefaultForm } from '../../hooks/useDefaultForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'

const calcSumFormSchema = z.object({
  username: ZodFormSchema.getInputSchema({ required: true }),
  items: z.array(
    z.object({
      name: ZodFormSchema.getInputSchema({ required: true }),
      amount: z.number(),
    })
  ),
})

export type CalcSumFormSchema = z.infer<typeof calcSumFormSchema>

type Props = {
  defaultValues: DefaultValues<CalcSumFormSchema>
  children: ReactNode
}
export const CalcSumFormProvider = ({ defaultValues, children }: Props) => {
  const methods = useDefaultForm<CalcSumFormSchema>(
    defaultValues,
    zodResolver(calcSumFormSchema)
  )

  return <FormProvider {...methods}>{children}</FormProvider>
}
