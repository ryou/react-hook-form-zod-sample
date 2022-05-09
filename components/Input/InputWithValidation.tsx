import React, { HTMLInputTypeAttribute } from 'react'
import { Input } from './Input'
import { Path, UseFormReturn } from 'react-hook-form'
import classNames from 'classnames'
import { ErrorMessage } from '../Text/ErrorMessage'
import { getRHFErrorMessages } from '../../libs/ReactHookFormUtils'

type Props<T> = {
  useFormReturn: UseFormReturn<T>
  type?: HTMLInputTypeAttribute
  name: Path<T>
  placeholder?: string
  disabled?: boolean
  form?: string
}
export const InputWithValidation = <T,>({
  useFormReturn,
  type = 'text',
  name,
  placeholder,
  disabled,
  form,
}: Props<T>) => {
  const errorMessages = getRHFErrorMessages(useFormReturn, name)

  return (
    <div>
      <Input
        {...useFormReturn.register(name)}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        form={form}
        isError={errorMessages.length > 0}
      />
      {errorMessages.length > 0 && (
        <div className={classNames(['mt-2'])}>
          {errorMessages.map((error, index) => (
            <ErrorMessage key={index} text={error} />
          ))}
        </div>
      )}
    </div>
  )
}
