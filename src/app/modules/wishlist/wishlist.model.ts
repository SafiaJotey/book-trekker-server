/* eslint-disable @typescript-eslint/no-this-alias */

import { Schema, model } from 'mongoose'
import { Book } from '../books/book.model'
import { User } from '../user/user.model'
import { IWishlist, WishlistModel } from './wishlist.interface'

//schema for user
const wishlistSchema = new Schema<IWishlist>(
  {
    user: { type: Schema.Types.ObjectId, ref: User, required: true },
    book: { type: Schema.Types.ObjectId, ref: Book, required: true },
  },
  {
    timestamps: true,
  }
)

//model for user

export const Wishlist = model<IWishlist, WishlistModel>(
  'wishlist',
  wishlistSchema
)
