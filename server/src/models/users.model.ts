import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import env from '../utils/env.utils'

export interface UserInput {
  email: string
  password: string
}

export interface UserDocument extends mongoose.Document, UserInput {
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
).pre('save', async function (next) {
  const user = this as UserDocument

  // check if the password is modified
  if (!user.isModified('password')) {
    return next()
  }

  // generate a salt for the application
  const salt = await bcrypt.genSalt(env.SALT_WORK_FACTOR)

  // hash the password
  const hash = await bcrypt.hash(user.password, salt)
  user.password = hash
})

// TODO: is it better to do it or bind it to the schema?
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as UserDocument
  return await bcrypt.compare(candidatePassword, user.password)
}

const UserModel = mongoose.model<UserDocument>('User', userSchema)
export default UserModel
