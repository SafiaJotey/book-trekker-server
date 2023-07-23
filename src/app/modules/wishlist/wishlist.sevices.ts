import mongoose from 'mongoose'
import { IId } from '../../../Interfaces/referenceId'
import ApiError from '../../../error/ApiError'

import { Book } from '../books/book.model'
import { User } from '../user/user.model'
import { IWishlist } from './wishlist.interface'
import { Wishlist } from './wishlist.model'

const addTowishlist = async (
  userID: IId,
  bookID: IId
): Promise<IWishlist | null> => {
  let newWishlistAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const userData = await User.findOne({ _id: userID })
    const bookData = await Book.findOne({ _id: bookID })
    if (!userData || !bookData) {
      throw new ApiError(400, 'Invalid Request!')
    }

    const wishlistData = {
      user: userData?._id,
      book: bookData?._id,
    }

    const newishlist = await Wishlist.create([wishlistData], { session })
    newWishlistAllData = newishlist[0]

    if (!newishlist) {
      throw new ApiError(400, 'Invalid request!')
    }
    //commit and endig transaction
    await session.commitTransaction()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    // thrworing  error
    throw error
  }

  if (newWishlistAllData) {
    newWishlistAllData = await Wishlist.findOne({
      _id: newWishlistAllData._id,
    }).populate([
      {
        path: 'user',
      },
      {
        path: 'book',
      },
    ])
  }

  return newWishlistAllData
}
const getWishlist = async (userId: string): Promise<IWishlist[] | null> => {
  const wishlist = await Wishlist.find({ user: userId }).populate([
    {
      path: 'user',
    },
    {
      path: 'book',
    },
  ])

  return wishlist
}
const removeBookFromList = async (id: string): Promise<IWishlist | null> => {
  const result = await Wishlist.findByIdAndDelete({ _id: id }).populate('user')

  return result
}

export const WishlistServices = {
  addTowishlist,
  getWishlist,
  removeBookFromList,
}
