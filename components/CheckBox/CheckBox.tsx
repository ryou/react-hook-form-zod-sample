import React from 'react'
import classNames from 'classnames'

type Props = React.ComponentProps<'input'> & {
  text?: string
}

export const CheckBox = React.forwardRef<HTMLInputElement, Props>(
  function CheckBox({ text, ...props }: Props, ref) {
    return (
      <div className="inline-block">
        <label className="label cursor-pointer">
          <input
            className={classNames(['checkbox', 'mr-2'])}
            type="checkbox"
            {...props}
            ref={ref}
          />
          {text !== undefined && <span className="label-text">{text}</span>}
        </label>
      </div>
    )
  }
)
