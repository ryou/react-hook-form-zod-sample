import { Result } from '../libs/Result'

export type NetworkResult<T> = Result<T, NetworkError>

export type NetworkError = HttpStatus400Error | NetworkGeneralError

export type ServerSideValidationError = {
  details: { [key: string]: string[] }
}

export type HttpStatus400Error = {
  type: '400'
  data: ServerSideValidationError
}

export type NetworkGeneralError = {
  type: 'general'
}
