import passport from 'passport'
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
export default passport.use(
  new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, authenticateUser)
)
