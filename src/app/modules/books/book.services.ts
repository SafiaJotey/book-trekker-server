import ApiError from '../../../error/ApiError'
import { IBook, IWishlist } from './book.interface'
import { Book } from './book.model'

const createBook = async (book: IBook): Promise<IBook | null> => {
  const newBook = await Book.create(book)
  if (!newBook) {
    throw new ApiError(440, 'Failed to create new user')
  }
  return newBook
}
const addTowishlist = async (wishlist: IWishlist ): Promise<IWishlist | null> => {
  const wishlist = await Book.create(wishlist)
  if (!newBook) {
    throw new ApiError(440, 'Failed to create new user')
  }
  return newBook
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
  const result = await Book.find({}).sort({ createdAt: -1 }).limit(10)

  return result
}

export const BookServices = {
  createBook,
  getBooks,
  getSingleBook,
  getRecentBooks,
  addTowishlist 
}
