import { NextFunction, Request, Response } from 'express'
import sendResponse from '../../../Interfaces/sendresponse'
import { IReading } from './reading.interface'
import { ReadingServices } from './reading.services'

const addToReadinglist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, bookId } = req.body

    const resullt = await ReadingServices.addToReading(userId, bookId)
    res.status(200).json({
      success: true,
      message: 'successfully add to wishlist!',
      data: resullt,
    })
  } catch (err) {
    next(err)
  }
}
const removeBookFromList = async (req: Request, res: Response) => {
  const result = await ReadingServices.removeBookFromList(
    req.params.id,
  
  )

  sendResponse<IReading>(res, {
    statusCode: 200,
    success: true,
    message: 'successfully delete a cow!',
    data: result,
  })
}
const getReadinglist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const result = await ReadingServices.getReading(id)
    res.status(200).json({
      success: true,
      message: 'successfully get raedingist!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const ReadingControllers = {
  removeBookFromList,
  addToReadinglist,
  getReadinglist,
}
