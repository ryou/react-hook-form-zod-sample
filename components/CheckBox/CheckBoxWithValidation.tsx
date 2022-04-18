import React from 'react'
import { Path, UseFormReturn } from 'react-hook-form'
import classNames from 'classnames'
import { ErrorMessage } from '../Text/ErrorMessage'
import { CheckBox } from './CheckBox'
import { getRHFErrorMessages } from '../../libs/ReactHookFormUtils'

type Props<T> = {
  useFormReturn: UseFormReturn<T>
  name: Path<T>
  text?: string
  disabled?: boolean
}
export const CheckBoxWithValidation = <T,>({
  useFormReturn,
  name,
  text,
  disabled,
}: Props<T>) => {
  const errorMessages = getRHFErrorMessages(useFormReturn, name)

  return (
    <div>
      <CheckBox
        {...useFormReturn.register(name)}
        text={text}
        disabled={disabled}
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
