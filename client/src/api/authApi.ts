import axios from 'axios'
import { LoginType } from '../schemas/authSchemas'

// TODO: update this to use the env variables
const url = 'http://localhost:5000/api'

export const loginUser = async (input: LoginType) => {
  const response = await axios.post(`${url}/auth/login`, input)
  return response.data
}

export const getMe = async ({
  accessToken,
  refreshToken
}: {
  accessToken: string | undefined
  refreshToken: string | undefined
}) => {
  const response = await axios.post(
    `${url}/auth/profile`,
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
