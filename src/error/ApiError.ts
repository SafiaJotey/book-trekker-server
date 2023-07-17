class ApiError extends Error {
  statusCode: number
  constructor(statusCode: number, messege: string | undefined, stack = '') {
    super(messege)
    this.statusCode = statusCode
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export default ApiError
