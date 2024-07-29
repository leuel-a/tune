import _ from 'lodash'
import env from '../utils/env.utils'
import { findUser } from '../services/users.services'
import { signJwt, verifyJwt } from '../utils/jwt.utils'
import { NextFunction, Request, Response } from 'express'

const accessTokenTtl = env.ACCESS_TOKEN_TTL

export const refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = _.get(req, 'headers.authorization', '').replace(/^Bearer\s/, '')
  const refreshToken = _.get(req, 'headers.x-refresh') as string

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

  const { decoded: refreshDecoded, expired: refreshExpired } = verifyJwt(refreshToken)

  if (!refreshDecoded || refreshExpired) {
    return next()
  }

  const user = await findUser({ _id: refreshDecoded.userId }, { lean: true })
  if (!user) {
    return next()
  }

  const newAccessToken = await signJwt({ userId: String(user._id) }, { expiresIn: accessTokenTtl })

  // successfully refresh the access token
  req.headers.authorization = `Bearer ${newAccessToken}`
  res.setHeader('x-access-token', newAccessToken)
  return next()
}
