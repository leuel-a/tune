import _ from 'lodash'
import env from '../utils/env.utils'
import { findUser } from '../services/users.services'
import { signJwt, verifyJwt } from '../utils/jwt.utils'
import { NextFunction, Request, Response } from 'express'
import { UserDocument } from 'models/users.model'

const accessTokenTtl = env.ACCESS_TOKEN_TTL

export const refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = _.get(req, 'headers.authorization', '').replace(/^Bearer\s/, '')
  const refreshToken = _.get(req, 'cookies.xrefresh')

  if (!accessToken) {
    return next()
  }

  const { decoded, expired } = verifyJwt(accessToken)

  if (decoded) {
    return next()
  }

  if (expired && !refreshToken) {
    return next()
  }

  const { decoded: refreshDecoded } = verifyJwt(refreshToken)
  if (!refreshToken) {
    return next()
  }

  const user: UserDocument | null = await findUser({ _id: refreshDecoded.userId })
  if (!user) {
    return next()
  }

  const newAccessToken = await signJwt({ userId: user._id }, { expiresIn: accessTokenTtl })
  req.headers.authorization = `Bearer ${newAccessToken}`
  res.setHeader('x-access', newAccessToken)
  return next()
}
