import { NextFunction, Request, Response } from 'express'

import sendResponse from '../../../Interfaces/sendresponse'
import { IWishlist } from './wishlist.interface'
import { WishlistServices } from './wishlist.sevices'

const addTowishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, bookId } = req.body

    const resullt = await WishlistServices.addTowishlist(userId, bookId)
    res.status(200).json({
      success: true,
      message: 'successfully add to wishlist!',
      data: resullt,
    })
  } catch (err) {
    next(err)
  }
}
const removeBookFromList = async (req: Request, res: Response) => {
  const result = await WishlistServices.removeBookFromList(req.params.id)

  sendResponse<IWishlist>(res, {
    statusCode: 200,
    success: true,
    message: 'successfully delete a cow!',
    data: result,
  })
}
const getWishlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const result = await WishlistServices.getWishlist(id)
    res.status(200).json({
      success: true,
      message: 'successfully get wishlist!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const WishlistControllers = {
  addTowishlist,
  getWishlist,
  removeBookFromList,
}
