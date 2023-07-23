import { Schema, model } from 'mongoose'
import { BookModel, IBook } from './book.interface'
import { User } from '../user/user.model'
// Create a new Model type that knows about IUserMethods...

//  Creating a Schema for users
const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publication_date: { type: String, required: true },
    image: { type: String, required: true },
    reviews: [
      {
        reviewer: { type: String },
        rating: { type: Number },
        comment: { type: String },
      },
    ],
   user: { type: Schema.Types.ObjectId, ref: User},
  },
  {
    timestamps: true,
  }
)

// Creating a Model.
export const Book = model<IBook, BookModel>('Book', bookSchema)
