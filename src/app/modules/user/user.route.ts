// import cors from 'cors'
import express from 'express'
import { UserControllers } from './user.controller'
const router = express.Router()
// router.use(cors())
router.post('/create-user', UserControllers.createUser)
router.get('/:email', UserControllers.getUser)

export const UserRoutes = router
