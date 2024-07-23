import type { PassportStatic } from 'passport'
import { UserDocument } from 'models/users.model'
import { findUser } from '../services/users.services'
import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local'

const authenticateUser: VerifyFunction = async (email, password, done) => {
  const user = await findUser({ email }, {})

  if (!user) {
    return done(null, false, { message: 'Incorrect email or password.' })
  }

  try {
    const valid = await user.comparePassword(password)
    if (!valid) {
      return done(null, false, { message: 'Incorrect email or password.' })
    }

    return done(null, user)
  } catch (e) {
    return done(e, false)
  }
}

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

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      authenticateUser
    )
  )
}
