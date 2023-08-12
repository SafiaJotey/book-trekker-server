import ApiError from '../../../error/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // if (user?.email === 'OPTIONS') {
  //   // Handle CORS pre-flight request
  //   return null; // Return an empty response
  // }
  const newUser = await User.create(user)
  if (!newUser) {
    throw new ApiError(440, 'Failed to create new user')
  }
  return newUser
}
const getUser = async (email: string): Promise<IUser | null> => {
  // if (email === 'OPTIONS') {
  //   // Handle CORS pre-flight request
  //   return null; // Return an empty response
  // }
  const user = await User.findOne({ email: email })

  return user
}

export const UserServices = {
  createUser,
  getUser,
}
