import { DefaultValues } from 'react-hook-form'
import { z } from 'zod'
import { ZodFormSchema } from '../../../../libs/ZodFormSchema'
import { useDefaultForm } from '../../hooks/useDefaultForm'
import { zodResolver } from '@hookform/resolvers/zod'

const sampleFormSchema = z.object({
  fullName: z.object({
    sei: ZodFormSchema.getInputSchema({ required: true }),
    mei: ZodFormSchema.getInputSchema({ required: true }),
  }),
  password: ZodFormSchema.getInputSchema({
    required: true,
    minLength: 8,
    maxLength: 20,
  }),
  check: ZodFormSchema.getCheckBoxSchema({ required: true }),
  items: z.array(
    z.object({
      name: ZodFormSchema.getInputSchema({ required: true }),
      url: ZodFormSchema.getInputSchema(),
    })
  ),
})

export type SampleFormSchema = z.infer<typeof sampleFormSchema>

export const useSampleForm = (
  defaultValues: DefaultValues<SampleFormSchema>
) => {
  return useDefaultForm<SampleFormSchema>(
    defaultValues,
    zodResolver(sampleFormSchema)
  )
}
