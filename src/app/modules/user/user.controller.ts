import { NextFunction, Request, Response } from 'express'
import sendResponse from '../../../Interfaces/sendresponse'
import { IUser } from './user.interface'
import { UserServices } from './user.services'

//create an user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...user } = req.body

    const newUser = await UserServices.createUser(user)
    sendResponse<IUser>(res, {
      statusCode: 200,
      success: true,
      message: 'Succesfully create an user',

      data: newUser,
    })
  } catch (err) {
    next(err)
  }
}


export const UserControllers = {
  createUser
}
