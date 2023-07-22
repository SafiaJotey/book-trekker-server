import mongoose from 'mongoose'
import { IId } from '../../../Interfaces/referenceId'
import ApiError from '../../../error/ApiError'
import { Book } from '../books/book.model'
import { User } from '../user/user.model'
import { IReading } from './reading.interface'
import { Reading } from './reading.model'

const addToReading = async (
  userID: IId,
  bookID: IId
): Promise<IReading | null> => {
  let newReadingAllData = null
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
    const readingData = {
      user: userData?._id,
      book: bookData?._id,
    }
    // creating new order
    const newReading = await Reading.create([readingData], { session })
    newReadingAllData = newReading[0]
    // throwing error if order not created
    if (!newReading) {
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

  if (newReadingAllData) {
    //finding the order data and populating all ref fields to send response
    newReadingAllData = await Reading.findOne({
      _id: newReadingAllData._id,
    }).populate([
      {
        path: 'user',
      },
      {
        path: 'book',
      },
    ])
  }

  return newReadingAllData
}
const removeBookFromList = async (
    id: string,
  
  ): Promise<IReading| null> => {
  
      const result = await Reading.findByIdAndDelete({ _id: id }).populate('user')
    
    return result
  }
  
const getReading = async (userId: string): Promise<IReading[] | null> => {
  const reading = await Reading.find({ user: userId }).populate([
    {
      path: 'user',
    },
    {
      path: 'book',
    },
  ])

  return reading
}
export const ReadingServices = {
  addToReading,
  getReading,
  removeBookFromList
}
