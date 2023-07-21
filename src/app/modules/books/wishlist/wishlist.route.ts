import express from 'express'
import { WishlistControllers } from './wishlist.controller'

const router = express.Router()
router.post('/add-to-wishlist', WishlistControllers.addTowishlist)

// router.get('/recent', BookControllers.getRecentBooks)
// router.get('/', BookControllers.getBooks)
// router.post('/', BookControllers.addTowishlist)
// router.get('/:id', BookControllers.getSingleBook)

export const WishlistRoutes = router
