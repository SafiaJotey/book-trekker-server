import ApiError from '../../../error/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'

const createUser = async (book: IUser): Promise<IUser | null> => {
  const newUser = await User.create(book)
  if (!newUser) {
    throw new ApiError(440, 'Failed to create new user')
  }
  return newUser
}
const getUser = async (email: string): Promise<IUser | null> => {
  const user = await User.findOne({ email: email })

  return user
}

export const UserServices = {
  createUser,
  getUser,
}
