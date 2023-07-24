import { Completed } from './completeReading.model';
import mongoose from 'mongoose'
import { IId } from '../../../Interfaces/referenceId'
import ApiError from '../../../error/ApiError'
import { Book } from '../books/book.model'
import { User } from '../user/user.model'
import { IComplete } from './completeReading.interface'

const  addToaddToCompletedlist = async (
  userID: IId,
  bookID: IId
): Promise<IComplete | null> => {
  let newCompletedAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // fetching buyer cow and seller data for the specific transaction
    const userData = await User.findOne({ _id: userID })
    const bookData = await Book.findOne({ _id: bookID })
    if (!userData || !bookData) {
      throw new ApiError(400, 'Invalid Request!')
    }

    // creating  order data for the new order
    const completeData = {
      user: userData?._id,
      book: bookData?._id,
    }
    // creating new order
    const newCompleted = await  Completed.create([completeData], { session })

    // throwing error if order not created
    if (!newCompleted ) {
      throw new ApiError(400, 'Invalid request!')
    }
    newCompletedAllData = newCompleted[0]
    //commit and endig transaction
    await session.commitTransaction()
  } catch (error) {
    // aborting & ending transaction for any transaction error
    await session.abortTransaction()
    await session.endSession()
    // thrworing  error
    throw error
  }

  if (newCompletedAllData) {
    //finding the order data and populating all ref fields to send response
    newCompletedAllData = await Completed.findOne({
      _id: newCompletedAllData._id,
    }).populate([
      {
        path: 'user',
      },
      {
        path: 'book',
      },
    ])
  }
console.log(newCompletedAllData)
  return newCompletedAllData
}
const removeBookFromList = async (id: string): Promise<IComplete | null> => {
  const result = await Completed.findByIdAndDelete({ _id: id }).populate('user')

  return result
}

const   getcompleted = async (userId: string): Promise<IComplete[] | null> => {
  const reading = await Completed.find({ user: userId }).populate([
    {
      path: 'user',
    },
    {
      path: 'book',
    },
  ])

  return reading
}
export const CompletedServices = {
  addToaddToCompletedlist,

  removeBookFromList,
  getcompleted
}
