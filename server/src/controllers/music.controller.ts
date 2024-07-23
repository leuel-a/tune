import { kMaxLength } from 'buffer'
import {
  CreateMusicType,
  DeleteMusicType,
  ReadManyMusicType,
  ReadMusicType
} from '../schemas/music.schema'
import {
  createMusic,
  findAndUpdate,
  findMusic,
  deleteMusic,
  findManyMusic
} from '../services/music.services'
import { Request, Response } from 'express'
import { MusicDocument } from 'models/music.model'
import { FilterQuery } from 'mongoose'

export const createMusicHandler = async (
  req: Request<{}, {}, CreateMusicType['body']>,
  res: Response
) => {
  try {
    const { title, artist, genre, album } = req.body
    const music = await createMusic({ title, artist, genre, album })

    res.location(`/api/musics/${music._id}`)
    return res.status(201).json(music)
  } catch (error) {
    return res.status(400).send(error)
  }
}

export const getMusicHandler = async (
  req: Request<ReadMusicType['params']>,
  res: Response
) => {
  const music = await findMusic({ _id: req.params.id }, { lean: true })

  if (!music) {
    return res.status(404).send('Music not found.')
  }

  return res.status(200).send(music)
}

export const deleteMusicHandler = async (
  req: Request<DeleteMusicType['params']>,
  res: Response
) => {
  const { id } = req.params
  const music = await findMusic({ _id: id })

  if (!music) {
    return res.status(404).send('Music not found.')
  }

  const result = await deleteMusic({ _id: id })

  if (result.deletedCount > 0) {
    return res.status(204).send()
  }

  return res.status(500).send('Failed to delete music.')
}

export const getMusicsHandler = async (
  req: Request<{}, {}, {}, ReadManyMusicType['query']>,
  res: Response
) => {
  const { title, artist, album, genre } = req.query
  const musics = await findManyMusic({}, { lean: true })

  // filter query for my endpoint
  // const musics = await findManyMusic(
  //   {
  //     title: new RegExp(title, 'i'),
  //     album: new RegExp(album, 'i'),
  //     genre: new RegExp(genre, 'i'),
  //     artist: new RegExp(artist, 'i')
  //   },
  //   { lean: true }
  // )
  return res.status(200).send(musics)
}
