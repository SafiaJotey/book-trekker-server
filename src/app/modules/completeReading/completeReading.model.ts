import { Schema, model } from 'mongoose'
import { Book } from '../books/book.model'
import { User } from '../user/user.model'
import { CompletedModel, IComplete } from './completeReading.interface'


//schema for user
const completedSchema = new Schema<IComplete>(
  {
    user: { type: Schema.Types.ObjectId, ref: User, required: true },
    book: { type: Schema.Types.ObjectId, ref: Book, required: true },

  },
  {
    timestamps: true,
  }
)

//model for user

export const Completed= model<IComplete,CompletedModel>('complete',  completedSchema)
