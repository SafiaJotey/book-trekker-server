// creating interface for books

import { Model } from 'mongoose'
import { IId } from '../../../Interfaces/referenceId'
import { IBook } from '../books/book.interface'
import { IUser } from '../user/user.interface'

export type IWishlist = {
  book?: IId | IBook
  user?: IId | IUser
}

export type WishlistModel = Model<IWishlist, Record<string, unknown>>
