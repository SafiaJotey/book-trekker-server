import express from 'express'
import { CompletedControllers } from './completeReading.controller'


const router = express.Router()
router.post('/add-to-completedlist',CompletedControllers.addToCompletedlist)
router.delete('/:id',CompletedControllers.removeBookFromList)

router.get('/:id', CompletedControllers.getCompletedList)

export const CompletedRoutes = router