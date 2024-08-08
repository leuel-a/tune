import { instance } from '.'
import Cookies from 'js-cookie'

const accessToken = Cookies.get('accessToken')
const refreshToken = Cookies.get('refreshToken')

export const getUsersMusics = async (searchParams: string) => {
  console.log(`Access token: ${accessToken}`)
  console.log(`Refresh token: ${refreshToken}`)
  const response = await instance.get(`/api/musics/users/me?${searchParams}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-refresh': refreshToken
    }
  })

  return response
}
