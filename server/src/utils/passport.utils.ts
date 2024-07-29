import type { PassportStatic } from 'passport'
import { UserDocument } from 'models/users.model'
import { findUser } from '../services/users.services'

export const initializePassport = (passport: PassportStatic) => {
  passport.serializeUser((user: UserDocument, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    try {
      const user = findUser({ id })

      if (!user) {
        throw new Error('user not found')
      }
      done(null, user)
    } catch (error) {
      done(error, null)
    }
  })
}
