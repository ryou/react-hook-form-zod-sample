import React from 'react'
import classNames from 'classnames'

type Props = React.ComponentProps<'input'> & {
  isError?: boolean
}
export const Input = React.forwardRef<HTMLInputElement, Props>(function Input(
  { isError, ...props }: Props,
  ref
) {
  return (
    <input
      type="text"
      {...props}
      ref={ref}
      className={classNames([
        'input input-bordered w-full',
        {
          'input-error': isError,
        },
      ])}
    />
  )
})
