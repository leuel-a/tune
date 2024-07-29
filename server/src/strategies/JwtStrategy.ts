import passport from 'passport'
import env from '../utils/env.utils'
import { JwtPayload } from 'jsonwebtoken'
import { verifyJwt } from '../utils/jwt.utils'
import { findUser } from '../services/users.services'
import { Strategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt'

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.JWT_SECRET
}

const authenticateUser = async (payload: JwtPayload, done: VerifiedCallback) => {
  const userId = payload.userId

  try {
    const user = await findUser({ _id: userId }, { lean: true })

    if (!user) return done(null, false)

    return done(null, user)
  } catch (error) {
    return done(error, false)
  }
}

export default passport.use(new Strategy(options, authenticateUser))
