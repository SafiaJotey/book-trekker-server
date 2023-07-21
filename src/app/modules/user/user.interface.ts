import { Model } from 'mongoose'

export type IUser = {
  firstName: string
  lastName: string
  email: string
  password: string

  //     reviewer: string
  //     rating: number
  //     comment: string
  //   }[]
}
export type UserModel = Model<IUser, Record<string, unknown>>
