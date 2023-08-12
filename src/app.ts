import cors from 'cors'
import express, { Application, urlencoded } from 'express'
import globalErrorHandler from './app/midlewires/globalErrorHanler'
import { BookRoutes } from './app/modules/books/book.route'
import { CompletedRoutes } from './app/modules/completeReading/completeReading.route'
import { ReadingRoutes } from './app/modules/reading/reading.route'
import { UserRoutes } from './app/modules/user/user.route'
import { WishlistRoutes } from './app/modules/wishlist/wishlist.route'

const app: Application = express()
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
  })
)
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use('/', express.static('upload'))
app.use('/upload', express.static(__dirname + '/upload'))
// Application routes
app.use('/api/v1/books', BookRoutes)
app.use('/api/v1/users', UserRoutes)
app.use('/api/v1/wishlist', WishlistRoutes)
app.use('/api/v1/reading', ReadingRoutes)
app.use('/api/v1/completed', CompletedRoutes)

app.use(globalErrorHandler)

export default app
