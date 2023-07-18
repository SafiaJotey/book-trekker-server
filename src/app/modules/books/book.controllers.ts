

import { NextFunction, Request, Response } from 'express'
import pick from '../../../shared/pick'
import { paginationFields } from '../../constant/pagination'

import { BookServices } from './book.services'
import { IBook } from './book.interface'
import sendResponse from '../../../Interfaces/sendresponse'
import { bookFilterableFields } from './book.constant'

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
const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, bookFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)
    const result = await BookServices.getBooks(filters, paginationOptions)
   
  sendResponse<IBook[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Students fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
  } catch (err) {
    next(err)
  }
}
export const BookControllers = {
  createBook,
  getBooks,
}
