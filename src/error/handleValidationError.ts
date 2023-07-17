import mongoose from 'mongoose'
import { IGenericErrorMessage } from '../Interfaces/errorMessageInterface'
import { IgenericErrorResponse } from './../Interfaces/responseInterface'

const handleValidationError = (
  error: mongoose.Error.ValidationError
): IgenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (element: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: element?.path,
        message: element?.message,
      }
    }
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}
export default handleValidationError
