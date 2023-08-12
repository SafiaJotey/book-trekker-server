import { NextFunction, Request, Response } from 'express'
import sendResponse from '../../../Interfaces/sendresponse'
import { IUser } from './user.interface'
import { UserServices } from './user.services'

//create an user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {

    if (req.method === 'OPTIONS') {
      // Handle CORS pre-flight request
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      return res.sendStatus(200);
    }
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

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.method === 'OPTIONS') {
      // Handle CORS pre-flight request
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      return res.sendStatus(200);
    }
    const user = await UserServices.getUser(req.params.email)
    sendResponse<IUser>(res, {
      statusCode: 200,
      success: true,
      message: 'Succesfully get an user',
      data: user,
    })
  } catch (err) {
    next(err)
  }
}

export const UserControllers = {
  createUser,
  getUser,
}
