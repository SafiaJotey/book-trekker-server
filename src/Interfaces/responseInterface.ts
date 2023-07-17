import { IGenericErrorMessage } from './errorMessageInterface'

export type IgenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}
