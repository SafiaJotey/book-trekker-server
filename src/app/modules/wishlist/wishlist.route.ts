import express from 'express'
import { WishlistControllers } from './wishlist.controller'

const router = express.Router()
router.post('/add-to-wishlist', WishlistControllers.addTowishlist)
router.delete('/:id', WishlistControllers.removeBookFromList)
// router.get('/recent', BookControllers.getRecentBooks)
// router.get('/', BookControllers.getBooks)
// router.post('/', BookControllers.addTowishlist)
router.get('/:id', WishlistControllers.getWishlist)

export const WishlistRoutes = router
