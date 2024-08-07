import { instance } from '.'
import { LoginType } from '../schemas/authSchemas'

export const loginUser = async (input: LoginType) => {
  const response = await instance.post('/api/auth/login', input)
  return response.data
}

export const getMe = async ({
  accessToken,
  refreshToken
}: {
  accessToken: string | undefined
  refreshToken: string | undefined
}) => {
  const response = await instance.post(
    '/api/auth/profile',
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'x-refresh': refreshToken,
        'Content-Type': 'application/json'
      }
    }
  )
  return response.data
}
