import React from 'react'
import { FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form'
import classNames from 'classnames'
import { Alert } from '../Text/Alert'
import { Button } from '../Button/Button'

type FormProps = React.ComponentProps<'form'>

type Props<T> = Omit<FormProps, 'onSubmit'> & {
  topErrorMessage?: string
  useFormReturn: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
  submitText: string
}
export const Form = <T,>({
  topErrorMessage,
  useFormReturn,
  onSubmit,
  submitText,
  ...props
}: Props<T>) => {
  return (
    <form {...props} onSubmit={useFormReturn.handleSubmit(onSubmit)} noValidate>
      {topErrorMessage && (
        <div className={classNames(['mb-8'])}>
          <Alert>
            <span>{topErrorMessage}</span>
          </Alert>
        </div>
      )}
      {props.children}
      <div>
        <Button color={'primary'} type="submit" isFull>
          {submitText}
        </Button>
      </div>
    </form>
  )
}
