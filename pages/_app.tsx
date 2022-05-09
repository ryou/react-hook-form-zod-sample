import '../styles/globals.css'
import type { AppProps } from 'next/app'
import classNames from 'classnames'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      className={classNames([
        'max-w-xl',
        'mx-auto',
        'bg-base-100',
        'py-8',
        'px-4',
      ])}
    >
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
