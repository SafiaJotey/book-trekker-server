import mongoose from 'mongoose'
import { IId } from '../../../../Interfaces/referenceId'
import ApiError from '../../../../error/ApiError'
import { User } from '../../user/user.model'
import { Book } from '../book.model'
import { IWishlist } from './wishlist.interface'
import { Wishlist } from './wishlist.model'

const addTowishlist = async (
  userID: IId,
  bookID: IId
): Promise<IWishlist | null> => {
  let newWishlistAllData = null
  const session = await mongoose.startSession()
  try {
    // fetching buyer cow and seller data for the specific transaction
    const userData = await User.findOne({ _id: userID })
    const bookData = await Book.findOne({ _id: bookID })
    if (!userData || !bookData) {
      throw new ApiError(400, 'Invalid Request!')
    }
    session.startTransaction()

    // creating  order data for the new order
    const wishlistData = {
      user: userData?._id,
      book: bookData?._id,
    }
    // creating new order
    const newishlist = await Wishlist.create([wishlistData], { session })
    newWishlistAllData = newishlist[0]
    // throwing error if order not created
    if (!newishlist) {
      throw new ApiError(400, 'Invalid request!')
    }
    //commit and endig transaction
    await session.commitTransaction()
  } catch (error) {
    // aborting & ending transaction for any transaction error
    await session.abortTransaction()
    await session.endSession()
    // thrworing  error
    throw error
  }

  if (newWishlistAllData) {
    //finding the order data and populating all ref fields to send response
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

export const WishlistServices = {
  addTowishlist,
}
