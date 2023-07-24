// creating interface for books

import { Model } from 'mongoose'
import { IId } from '../../../Interfaces/referenceId'
import { IBook } from '../books/book.interface'
import { IUser } from '../user/user.interface'

export type IComplete = {
  book?: IId | IBook
  user?: IId | IUser
  completed?: boolean
}

export type  CompletedModel = Model<IComplete, Record<string, unknown>>
