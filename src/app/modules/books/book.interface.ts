// creating interface for books

import { Model } from 'mongoose'

export type IBook = {
  title: string
  author: string
  genre: string
  publication_date: string
  image: string
  reviews?: {
    reviewer: string
    rating: number
    comment: string
  }[]
}

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publication_date?: string;

};
export type BookModel = Model<IBook, Record<string, unknown>>
