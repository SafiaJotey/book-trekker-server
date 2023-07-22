import express from 'express'
import { BookControllers } from './book.controllers'

const router = express.Router()
router.post('/add-book', BookControllers.createBook)

router.get('/recent', BookControllers.getRecentBooks)
router.get('/', BookControllers.getBooks)
router.patch('/:id', BookControllers.updateBook)
router.delete('/:id', BookControllers.deleteBook)
router.get('/:id', BookControllers.getSingleBook)

export const BookRoutes = router
