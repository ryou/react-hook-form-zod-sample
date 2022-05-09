import React from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import classNames from 'classnames'
import { Alert } from '../Text/Alert'
import { Button } from '../Button/Button'

type FormProps = React.ComponentProps<'form'>

type Props<T> = Omit<FormProps, 'onSubmit' | 'id'> & {
  id: string
  topErrorMessage?: string
  useFormReturn: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
  submitText: string
}
export const FormForOuterNested = <T,>({
  id,
  topErrorMessage,
  useFormReturn,
  onSubmit,
  submitText,
  children,
  ...props
}: Props<T>) => {
  return (
    <>
      <form
        {...props}
        id={id}
        onSubmit={useFormReturn.handleSubmit(onSubmit)}
        noValidate
      />
      {topErrorMessage && (
        <div className={classNames(['mb-8'])}>
          <Alert>
            <span>{topErrorMessage}</span>
          </Alert>
        </div>
      )}
      {children}
      <div>
        <Button form={id} color={'primary'} type="submit" isFull>
          {submitText}
        </Button>
      </div>
    </>
  )
}
