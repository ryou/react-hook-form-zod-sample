import React from 'react'
import classNames from 'classnames'

type ButtonColor = 'primary' | 'secondary' | 'accent' | 'ghost'

const getButtonColorClassName = (color?: ButtonColor) => {
  switch (color) {
    case 'primary':
      return 'btn-primary'
    case 'secondary':
      return 'btn-secondary'
    case 'accent':
      return 'btn-accent'
    case 'ghost':
      return 'btn-ghost'
  }

  return undefined
}

type Props = React.ComponentProps<'button'> & {
  isFull?: boolean
  color?: ButtonColor
}
export const Button = ({ isFull, color, ...props }: Props) => {
  return (
    <button
      className={classNames([
        'btn',
        getButtonColorClassName(color),
        {
          'btn-block': isFull,
        },
      ])}
      type="button"
      {...props}
    >
      {props.children}
    </button>
  )
}
