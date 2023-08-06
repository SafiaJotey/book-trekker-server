import ApiError from '../../../error/ApiError'
import { IBook, IReview } from './book.interface'
import { Book } from './book.model'

const createBook = async (book: IBook): Promise<IBook | null> => {
  const newBook = await Book.create(book)
  if (!newBook) {
    throw new ApiError(440, 'Failed to create new user')
  }
  return newBook
}
const reviewBook = async (
  id: string,
  payload: IReview
): Promise<IBook | null> => {
  const newBook = await Book.findById({ _id: id })
  if (!newBook) {
    throw new ApiError(440, 'Failed to find book')
  }
  if (!newBook.reviews) {
    newBook.reviews = []
  }
  newBook.reviews.push(payload)
  const result = await Book.findOneAndUpdate(
    { _id: id },
    { reviews: newBook?.reviews },
    {
      new: true,
    }
  ).populate('user')

  return result
}

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById({ _id: id })

  return result
}

const getBooks = async (): Promise<IBook[] | null> => {
  const result = await Book.find({})

  return result
}
const getRecentBooks = async (): Promise<IBook[] | null> => {
  const result = await Book.find({}).sort({ createdAt: -1 }).limit(8)

  return result
}

const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  let result
  const findBook = await Book.findOne({ _id: id }).populate('user')

  if (findBook && findBook?.user?._id == payload?.user) {
    result = await Book.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    }).populate('user')
  } else {
    throw new ApiError(403, 'Forbidden')
  }

  return result
}
const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete({ _id: id })

  return result
}

export const BookServices = {
  createBook,
  getBooks,
  getSingleBook,
  getRecentBooks,
  updateBook,
  deleteBook,
  reviewBook,
}
