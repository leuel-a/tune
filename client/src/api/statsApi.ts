import { instance } from '.'

import type { AlbumsStats, ArtistStats, GenreStats, TotalStats } from '../types'

export const getTotalStats = async (): Promise<TotalStats> => {
  const response = await instance.get(`/api/stats/total`)
  return response.data
}

export const getArtistsStats = async (): Promise<ArtistStats[]> => {
  const response =  await instance.get(`/api/stats/artists`)
  return response.data
}

export const getAlbumsStats = async (): Promise<AlbumsStats[]> => {
  const response = await instance.get(`/api/stats/albums`)
  return response.data
}

export const getGenreStats = async (): Promise<GenreStats[]> => {
  const response = await instance.get(`/api/stats/genres`)
  return response.data
}
