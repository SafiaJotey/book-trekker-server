/* eslint-disable @typescript-eslint/consistent-type-definitions */
// creating interface for books

import { Model } from 'mongoose'
import { IId } from '../../../Interfaces/referenceId'
import { IUser } from '../user/user.interface'

export interface IBook {
  title: string
  author: string
  genre: string
  publication_date: string
  image: IFile
  bookPdf: IFile
  reviews?: {
    reviewer: string
    rating: number
    comment: string
  }[]
  user: IId | IUser
}
export type IReview = {
  reviewer: string
  rating: number
  comment: string
}

export type IBookFilters = {
  searchTerm?: string
  genre?: string
  publication_date?: string
}
export type IFile = {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}
export type BookModel = Model<IBook, Record<string, unknown>>
