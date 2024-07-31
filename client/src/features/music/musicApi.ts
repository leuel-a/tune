import { Music } from '../../types'
import axios, { AxiosResponse } from 'axios'
import { PaginatedResponse } from '../../types'

// TODO: Put this into a config file
const url = 'http://localhost:5000/api'

export const fetchMusicsApi = async () => {
  try {
    const response: AxiosResponse<PaginatedResponse<Music>> = await axios.get(`${url}/musics`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(`Error fetching musics: ${error.response?.status} ${error.message}`)
    } else {
      console.log(`Unexpected error: ${error}`)
    }
    throw error
  }
}
