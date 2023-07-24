import express from 'express'
import { BookControllers } from './book.controllers'

const router = express.Router()
router.post('/add-book', BookControllers.createBook)

router.get('/recent', BookControllers.getRecentBooks)
router.get('/', BookControllers.getBooks)
router.post('/:id', BookControllers.reviewBook)
router.patch('/edit/:id', BookControllers.updateBooks)
router.delete('/:id', BookControllers.deleteBook)
router.get('/:id', BookControllers.getSingleBook)

export const BookRoutes = router
