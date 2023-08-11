import express from 'express'

import { uplodHelper } from '../../../shared/uploadHelper'
import { BookControllers } from './book.controllers'

const router = express.Router()
router.post(
  '/add-book',
  uplodHelper.uploadFile.fields([
    { name: 'image', maxCount: 1 },
    { name: 'bookPdf', maxCount: 1 },
  ]),
  BookControllers.createBook
)

router.get('/recent', BookControllers.getRecentBooks)
router.get('/', BookControllers.getBooks)
router.post('/:id', BookControllers.reviewBook)
router.patch('/edit/:id', BookControllers.updateBooks)
router.delete('/:id', BookControllers.deleteBook)
router.get('/:id', BookControllers.getSingleBook)

export const BookRoutes = router
