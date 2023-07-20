import { NextFunction, Request, Response } from 'express'

import sendResponse from '../../../Interfaces/sendresponse'
import { IBook } from './book.interface'
import { BookServices } from './book.services'

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...book } = req.body
    console.log(book)

    const newBook = await BookServices.createBook(book)
    res.status(200).json({
      success: true,
      message: 'successfully add a new book!',
      data: newBook,
    })
  } catch (err) {
    next(err)
  }
}
const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const result = await BookServices.getSingleBook(id)
    res.status(200).json({
      success: true,
      message: 'successfully get a book!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BookServices.getBooks()

    sendResponse<IBook[]>(res, {
      statusCode: 200,
      success: true,
      message: 'Books fetched successfully !',
    
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const getRecentBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BookServices.getRecentBooks()

    sendResponse<IBook[]>(res, {
      statusCode: 200,
      success: true,
      message: '!0 recent books fetched successfully !',
    
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
export const BookControllers = {
  createBook,
  getBooks,
  getSingleBook,
  getRecentBooks
}
