import { SortOrder } from 'mongoose'
import { IPaginationOptions } from '../../../Interfaces/paginationoption'
import ApiError from '../../../error/ApiError'
import { paginationHelpers } from '../../../shared/helpers'
import { bookSearchableFields } from './book.constant'
import { IBook, IBookFilters } from './book.interface'
import { Book } from './book.model'

import { IGenericResponse } from '../../../Interfaces/common'

const createBook = async (book: IBook): Promise<IBook | null> => {
  const newBook = await Book.create(book)
  if (!newBook) {
    throw new ApiError(440, 'Failed to create new user')
  }
  return newBook
}
const getBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  console.log(andConditions)
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Book.find(whereConditions)

    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Book.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}


export const BookServices = {
  createBook,
  getBooks,
  // getSingleBook
}
