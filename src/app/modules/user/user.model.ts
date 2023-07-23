/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../../config'

import { IUser, UserModel } from './user.interface'

//schema for user
const userSchema = new Schema<IUser, UserModel>(
  {
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)
userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret['password']
    return ret
  },
})

userSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savePassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savePassword)
}
userSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds)
  )
  next()
})
//model for user

export const User = model<IUser, UserModel>('user', userSchema)
