import env from './env.utils'
import { sign, verify, SignOptions, VerifyOptions } from 'jsonwebtoken'

const secret = env.JWT_SECRET

export async function signJwt(payload: any, options?: SignOptions | undefined) {
  return sign(payload, secret, {
    ...(options && options),
    algorithm: 'HS256'
  })
}

export function verifyJwt(
  token: string,
  options?: VerifyOptions | undefined
): { valid: boolean; expired: boolean; decoded: any } {
  try {
    const decoded = verify(token, secret, {
      ...(options && options)
    })

    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null
    }
  }
}
