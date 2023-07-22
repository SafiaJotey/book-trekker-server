// creating interface for books

import { Model } from 'mongoose'
import { IId } from '../../../Interfaces/referenceId'
import { IUser } from '../user/user.interface'

export type IReading = {
  book?: IId | IUser
  user?: IId | IUser
}

export type ReadingModel = Model<IReading, Record<string, unknown>>
