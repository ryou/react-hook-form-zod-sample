import { z } from 'zod'

export const ZodFormSchema = {
  getInputSchema: (
    options: {
      minLength?: number
      maxLength?: number
      required?: boolean
    } = {}
  ) => {
    return z.string().superRefine((val, ctx) => {
      if (options.required === true && val === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `必須項目です。`,
        })
      }

      if (options.minLength !== undefined && val.length < options.minLength) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${options.minLength}文字以上入力して下さい。`,
        })
      }

      if (options.maxLength !== undefined && val.length > options.maxLength) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${options.maxLength}文字以下で入力して下さい。`,
        })
      }
    })
  },
  getCheckBoxSchema: (
    options: {
      required?: boolean
    } = {}
  ) => {
    return z.boolean().superRefine((val, ctx) => {
      if (options.required === true && val === false) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `チェックが必須です。`,
        })
      }
    })
  },
}
