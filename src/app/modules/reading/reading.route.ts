import express from 'express'
import { ReadingControllers } from './reading.controller'

const router = express.Router()
router.post('/add-to-readinglist', ReadingControllers.addToReadinglist)
router.delete('/:id', ReadingControllers.removeBookFromList)

// router.get('/recent', BookControllers.getRecentBooks)
// router.get('/', BookControllers.getBooks)
// router.post('/', BookControllers.addTowishlist)
router.get('/:id', ReadingControllers.getReadinglist)

export const ReadingRoutes = router
