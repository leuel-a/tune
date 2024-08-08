import { TotalStats } from '../types/stats'
import MusicModel, { MusicDocument } from '../models/music.model'

type TotalStatsResponse = {
  totalSongs: [{ count: number }]
  totalAlbums: [{ count: number }]
  totalGenres: [{ count: number }]
  totalArtists: [{ count: number }]
}

export const getTotalStats = async () => {
  const result = await MusicModel.aggregate<TotalStatsResponse>([
    {
      $facet: {
        totalSongs: [{ $count: 'count' }],
        totalAlbums: [{ $group: { _id: '$album' } }, { $count: 'count' }],
        totalGenres: [{ $group: { _id: '$genre' } }, { $count: 'count' }],
        totalArtists: [{ $group: { _id: '$artist' } }, { $count: 'count' }]
      }
    }
  ])

  const stats = {
    totalSongs: result[0].totalSongs[0].count,
    totalArtists: result[0].totalAlbums[0].count,
    totalGenres: result[0].totalGenres[0].count,
    totalAlbums: result[0].totalAlbums[0].count
  }
  return stats
}

export const getSongsForGenres = async () => {
  return await MusicModel.aggregate([{ $group: { _id: '$genre', count: { $sum: 1 } } }])
}

export const getStatsForArtists = async () => {
  return await MusicModel.aggregate([
    {
      $group: {
        _id: '$artist',
        count: { $sum: 1 },
        songs: { $push: '$$ROOT' },
        albums: { $addToSet: '$album' },
        genres: { $addToSet: '$genre' }
      }
    },
    {
      $project: {
        _id: 1,
        artist: '$_id',
        songs: 1,
        count: 1,
        albumCount: { $size: '$albums' },
        genreCount: { $size: '$genres' }
      }
    }
  ])
}

export const getStatsForAlbums = async () => {
  return await MusicModel.aggregate([
    {
      $group: {
        _id: { album: '$album', artist: '$artist' },
        count: { $sum: 1 },
        songs: { $push: '$$ROOT' }
      }
    },
    {
      $project: {
        _id: 0,
        album: '$_id.album',
        artist: '$_id.artist',
        count: 1,
        songs: 1
      }
    }
  ])
}
