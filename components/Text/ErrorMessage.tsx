import classNames from 'classnames'

type Props = {
  text?: string
}
export const ErrorMessage = ({ text }: Props) => {
  return (
    <>
      {text !== undefined && (
        <div className={classNames(['text-error'])}>{text}</div>
      )}
    </>
  )
}
