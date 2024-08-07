import { instance } from '.'
import Cookies from 'js-cookie'
import { Music, PaginatedResponse } from '../types'
import { AxiosResponse } from 'axios'

// get the access token and refresh token from the cookies store
const accessToken = Cookies.get('accessToken')
const refreshToken = Cookies.get('refreshToken')

export const getMusics = async (searchParams?: string) => {
  const response = await instance.get<PaginatedResponse<Music>>(`/api/musics?${searchParams}`)
  return response.data
}

export const addMusic = async (music: Partial<Music>) => {
  const response = await instance.post<Music>('/api/musics', music, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'x-refresh': refreshToken
    }
  })

  return response.data
}

export const getMusicById = async (id: string): Promise<AxiosResponse<Music>> => {
  const response = await instance.get(`/api/musics/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-refresh': refreshToken
    }
  })

  return response
}

export const updateMusic = async (id: string, payload: Partial<Music>) => {
  const response = await instance.put(`/api/musics/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-refresh': refreshToken
    }
  })
  return response
}

export const deleteMusic = async (id: string) => {
  const response = await instance.delete(`/api/musics/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-refresh': refreshToken
    }
  })
  return response
}
