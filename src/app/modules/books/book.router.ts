import express from 'express'
import { BookControllers } from './book.controllers'

const router = express.Router()
router.post('/add-book', BookControllers.createBook)
// router.get('/:id', BookControllers.getSingleBook)
router.patch('/getbooks', BookControllers.getBooks)
router.get('/getbooks', BookControllers.getBooks)
router.get('/getbooks', BookControllers.getBooks)
export const BookRoutes = router
