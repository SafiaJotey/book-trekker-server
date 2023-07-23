// creating interface for books

import { Model } from 'mongoose'
import { IId } from '../../../Interfaces/referenceId'
import { IUser } from '../user/user.interface'
import { IBook } from '../books/book.interface'

export type IReading = {
  book?: IId | IBook
  user?: IId | IUser
  completed?: boolean
}

export type ReadingModel = Model<IReading, Record<string, unknown>>
