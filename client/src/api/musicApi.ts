import axios from 'axios'
import Cookies from 'js-cookie'
import { Music, PaginatedResponse } from '../types'

const BASE_URL = 'http://localhost:5000'

/**
 * Gets musics from the API
 * @returns the paginated response from the backend api
 */
export const getMusics = async () => {
  const response = await axios.get<PaginatedResponse<Music>>(`${BASE_URL}/api/musics`)
  return response.data
}

/**
 * Creates a music from a given music object
 * @param music the music to be added to the database
 * @returns the created music
 */
export const addMusic = async (music: Music) => {
  const accessToken = Cookies.get('accessToken')
  const refreshToken = Cookies.get('refreshToken')

  const response = await axios.post<Music>(`${BASE_URL}/api/musics`, music, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'x-refresh': refreshToken
    }
  })

  return response.data
}