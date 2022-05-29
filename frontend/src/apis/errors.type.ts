export interface IError {
  isError: boolean
  code: number
  status: string
  message: string
}

export function isError(response: any): response is IError {
  return response.isError
}
