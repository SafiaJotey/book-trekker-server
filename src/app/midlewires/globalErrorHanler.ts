import { ErrorRequestHandler } from 'express'
import { IGenericErrorMessage } from '../../Interfaces/errorMessageInterface'
import config from '../../config'
import ApiError from '../../error/ApiError'
import handleValidationError from '../../error/handleValidationError'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500
  let message = 'something went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    ;(message = error?.message),
      (errorMessages = error?.message
        ? [
            {
              path: '',
              message: error?.message,
            },
          ]
        : [])
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error.stack : undefined,
  })
  next()
}

export default globalErrorHandler
