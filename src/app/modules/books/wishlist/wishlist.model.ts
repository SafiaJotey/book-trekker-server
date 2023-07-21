/* eslint-disable @typescript-eslint/no-this-alias */

import { Schema, model } from 'mongoose'
import { IWishlist, WishlistModel } from './wishlist.interface'
import { User } from '../../user/user.model'
import { Book } from '../book.model'

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
