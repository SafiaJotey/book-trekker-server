import cors from 'cors'
import express, { Application, urlencoded } from 'express'
import globalErrorHandler from './app/midlewires/globalErrorHanler'
import { BookRoutes } from './app/modules/books/book.route'
import { WishlistRoutes } from './app/modules/books/wishlist/wishlist.route'
import { UserRoutes } from './app/modules/user/user.route'

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/books', BookRoutes)
app.use('/api/v1/users', UserRoutes)
app.use('/api/v1/wishlist', WishlistRoutes)

//testing route
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new ApiError(400, 'orebaabaa erroorr!')
//   // throw new Error('Testing Error')
//   // // next('errroorrr')
//   // Promise.reject(new Error('Unhandled Rejection'))
// })
//global error handler
app.use(globalErrorHandler)

export default app
