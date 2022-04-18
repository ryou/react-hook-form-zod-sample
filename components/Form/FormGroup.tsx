import classNames from 'classnames'
import { ErrorMessage } from '../Text/ErrorMessage'
import React from 'react'

type Props = {
  title: string
  description?: string
  children?: JSX.Element
  errorMessages?: string[]
}
export const FormGroup = ({
  title,
  description,
  children,
  errorMessages = [],
}: Props) => {
  return (
    <div>
      <div className="mb-2">
        <div className={classNames(['text-lg', 'font-bold'])}>{title}</div>
        {description !== undefined && (
          <div className={classNames(['text-xs', 'text-gray-600', 'mt-1'])}>
            {description}
          </div>
        )}
      </div>
      <div>{children}</div>
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
