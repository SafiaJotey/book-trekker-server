// creating interface for books

import { Model } from 'mongoose'
import { IId } from '../../../../Interfaces/referenceId'
import { IUser } from '../../user/user.interface'

export type IWishlist = {
  book?: IId | IUser
  user?: IId | IUser
}

export type WishlistModel = Model<IWishlist, Record<string, unknown>>
