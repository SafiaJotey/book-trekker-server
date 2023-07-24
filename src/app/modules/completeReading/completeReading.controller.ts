import { NextFunction, Request, Response } from 'express'
import sendResponse from '../../../Interfaces/sendresponse'
import { IComplete } from './completeReading.interface'
import { CompletedServices } from './completeReading.services'

const addToCompletedlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, bookId } = req.body
    console.log(req.body)
    const resullt = await CompletedServices.addToaddToCompletedlist(
      userId,
      bookId
    )
    res.status(200).json({
      success: true,
      message: 'successfully add to Completedlist!',
      data: resullt,
    })
  } catch (err) {
    next(err)
  }
}
const removeBookFromList = async (req: Request, res: Response) => {
  const result = await CompletedServices.removeBookFromList(req.params.id)

  sendResponse<IComplete>(res, {
    statusCode: 200,
    success: true,
    message: 'successfully delete a CompletedBook!',
    data: result,
  })
}

const getCompletedList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const result = await CompletedServices.getcompleted(id)
    res.status(200).json({
      success: true,
      message: 'successfully get CompletedList!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const CompletedControllers = {
  removeBookFromList,
  addToCompletedlist,
  getCompletedList,
}
