import { DefaultValues } from 'react-hook-form'
import { z } from 'zod'
import { ZodFormSchema } from '../../../../libs/ZodFormSchema'
import { useDefaultForm } from '../../hooks/useDefaultForm'
import { zodResolver } from '@hookform/resolvers/zod'

const innerNestedFormSchema = z.object({
  username: ZodFormSchema.getInputSchema({ required: true }),
})

export type InnerNestedFormSchema = z.infer<typeof innerNestedFormSchema>

export const useInnerNestedForm = (
  defaultValues: DefaultValues<InnerNestedFormSchema>
) => {
  return useDefaultForm<InnerNestedFormSchema>(
    defaultValues,
    zodResolver(innerNestedFormSchema)
  )
}

const outerNestedFormSchema = z.object({
  username: ZodFormSchema.getInputSchema({ required: true }),
})

export type OuterNestedFormSchema = z.infer<typeof outerNestedFormSchema>

export const useOuterNestedForm = (
  defaultValues: DefaultValues<OuterNestedFormSchema>
) => {
  return useDefaultForm<OuterNestedFormSchema>(
    defaultValues,
    zodResolver(outerNestedFormSchema)
  )
}
