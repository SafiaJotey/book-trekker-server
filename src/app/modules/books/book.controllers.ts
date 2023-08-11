import { NextFunction, Request, Response } from 'express'

import sendResponse from '../../../Interfaces/sendresponse'
import { IBook } from './book.interface'
import { BookServices } from './book.services'
type UploadedFiles = {
  [fieldname: string]: Express.Multer.File[]
}

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...book } = req.body
    const uploadedFiles = req.files as UploadedFiles
    const { image, bookPdf } = uploadedFiles || []

    const newBook = { ...book, image: image[0], bookPdf: bookPdf[0] }
    console.log(newBook)
    const result = await BookServices.createBook(newBook)
    res.status(200).json({
      success: true,
      message: 'successfully add a new book!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const reviewBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newBook = await BookServices.reviewBook(req.params.id, req.body)
    console.log(newBook)
    res.status(200).json({
      success: true,
      message: 'successfully add a new book!',
      data: newBook,
    })
  } catch (err) {
    next(err)
  }
}

const updateBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const result = await BookServices.updateBook(id, req.body)
    res.status(200).json({
      success: true,
      message: 'successfully update a book!',
      data: result,
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
const getRecentBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await BookServices.getRecentBooks()

    sendResponse<IBook[]>(res, {
      statusCode: 200,
      success: true,
      message: 'recent books fetched successfully !',

      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BookServices.deleteBook(req.params.id)

    sendResponse<IBook>(res, {
      statusCode: 200,
      success: true,
      message: 'book deleted successfully !',

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
  getRecentBooks,
  deleteBook,
  updateBooks,
  reviewBook,
}
