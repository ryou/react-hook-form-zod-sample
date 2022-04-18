import {
  NetworkResult,
  ServerSideValidationError,
} from '../../../types/Network'
import { Path, UseFormReturn } from 'react-hook-form'
import { useState } from 'react'

const displayServerValidationErrors = <FORM_TYPE>(
  error: ServerSideValidationError,
  useFormReturn: UseFormReturn<FORM_TYPE>
) => {
  Object.entries(error.details).forEach(([path, messages]) => {
    messages.forEach((message) => {
      // TODO: asやめたい
      //  実際は、zodとかでチェックして、pathが想定外の値であればSentryで報告するとかになりそう
      useFormReturn.setError(path as Path<FORM_TYPE>, { message })
    })
  })
}

export const useNetworkFormSubmit = <FORM_TYPE, SUCCESS_DATA>({
  execFunc,
  onSuccess,
  useFormReturn,
  scrollToTopOnError = true,
}: {
  execFunc: (data: FORM_TYPE) => Promise<NetworkResult<SUCCESS_DATA>>
  onSuccess: (data: SUCCESS_DATA) => void
  useFormReturn: UseFormReturn<FORM_TYPE>
  scrollToTopOnError?: boolean
}) => {
  const [topErrorMessage, setTopErrorMessage] = useState('')

  const onSubmit = async (data: FORM_TYPE) => {
    setTopErrorMessage('')

    const result = await execFunc(data)

    if (result.isFailure()) {
      const error = result.value

      if (error.type === '400') {
        displayServerValidationErrors(error.data, useFormReturn)

        setTopErrorMessage('入力内容に誤りがあります。')
      } else {
        // general
      }

      if (scrollToTopOnError) {
        window.scrollTo({ top: 0 })
      }
    } else {
      onSuccess(result.value)
    }
  }

  return {
    topErrorMessage,
    onSubmit,
  }
}
