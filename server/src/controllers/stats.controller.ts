import { RequestHandler } from 'express'
import {
  getSongsForGenres,
  getStatsForAlbums,
  getStatsForArtists,
  getTotalStats
} from '../services/stats.services'

export const getTotalStatsHandler: RequestHandler = async (req, res) => {
  const stats = await getTotalStats()
  return res.status(200).json(stats)
}

export const getSongsForGenreHandler: RequestHandler = async (req, res) => {
  const stats = await getSongsForGenres()
  return res.status(200).json(stats)
}

export const getStatsForArtistsHandler: RequestHandler = async (req, res) => {
  const stats = await getStatsForArtists()
  return res.status(200).json(stats)
}

export const getStatsForAlbumsHandler: RequestHandler = async (req, res) => {
  const stats = await getStatsForAlbums()
  return res.status(200).json(stats)
}
