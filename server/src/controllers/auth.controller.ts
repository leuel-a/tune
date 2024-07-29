import env from '../utils/env.utils'
import { Request, Response } from 'express'
import { signJwt } from '../utils/jwt.utils'
import { LoginType } from '../schemas/users.schema'
import { findUser } from '../services/users.services'
import { UserDocument } from 'models/users.model'

const accessTokenTtl = env.ACCESS_TOKEN_TTL
const refreshTokenTtl = env.REFRESH_TOKEN_TTL

export const loginHandler = async (req: Request<{}, {}, LoginType['body']>, res: Response) => {
  const { email, password } = req.body

  const user = await findUser({ email }, { lean: false })
  if (!user) return res.status(400).send('Invalid email or password.')

  const isValid = await user.comparePassword(password)
  if (!isValid) return res.status(400).send('Invalid email or password.')

  const accessToken = await signJwt({ userId: String(user._id) }, { expiresIn: accessTokenTtl })
  const refreshToken = await signJwt({ userId: String(user._id) }, { expiresIn: refreshTokenTtl })

  return res.status(200).json({ accessToken, refreshToken })
}

// Perform client side revokation instead of server side for the time being
// export const logoutHandler = async (req: Request, res: Response) => {
  // req.logOut(err => {
    // if (err) {
      // return res.status(500).json('Something went wrong while logging out.')
    // }
// 
    // req.session.destroy(err => {
      // if (err) {
        // return res.status(500).json('Failed to destroy session.')
      // }
    // })
// 
    // res.clearCookie('connect.sid')
    // res.status(200).send('Logged out successfully.')
  // })
// }
