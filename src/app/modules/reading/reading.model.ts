import { Schema, model } from 'mongoose'
import { Book } from '../books/book.model'
import { User } from '../user/user.model'
import { IReading, ReadingModel } from './reading.interface'

//schema for user
const readingSchema = new Schema<IReading>(
  {
    user: { type: Schema.Types.ObjectId, ref: User, required: true },
    book: { type: Schema.Types.ObjectId, ref: Book, required: true },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

//model for user

export const Reading = model<IReading, ReadingModel>('reading', readingSchema)
