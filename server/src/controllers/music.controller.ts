import {
  CreateMusicType,
  DeleteMusicType,
  ReadManyMusicType,
  ReadMusicType,
  UpdateMusicType
} from '../schemas/music.schema'
import {
  createMusic,
  findMusic,
  deleteMusic,
  findManyMusic,
  findAndUpdate
} from '../services/music.services'
import { Request, Response } from 'express'
import { FilterQuery, QueryOptions } from 'mongoose'
import { MusicDocument } from 'models/music.model'
import { isNaN } from 'lodash'
import { UserDocument } from 'models/users.model'

export const createMusicHandler = async (
  req: Request<{}, {}, CreateMusicType['body']>,
  res: Response
) => {
  try {
    const user = req.user as UserDocument
    const music = await createMusic({ ...req.body, userId: user._id as string })

    res.location(`/api/musics/${music._id}`)
    return res.status(201).json(music)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export const updateMusicHandler = async (
  req: Request<UpdateMusicType['params'], {}, UpdateMusicType['body']>,
  res: Response
) => {
  const musicId = req.params.id
  const user = req.user as UserDocument

  const music = await findMusic({ _id: musicId })
  if (!music) {
    return res.status(404).send('Music not found.')
  }

  if (music.userId && music.userId.toString() !== user._id.toString()) {
    return res.status(401).send('Unauthorized')
  }

  try {
    const updated = await findAndUpdate(
      { _id: music._id },
      { ...music, ...req.body },
      { new: true }
    )
    return res.status(200).json(updated)
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

export const getMusicHandler = async (req: Request<ReadMusicType['params']>, res: Response) => {
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
  const user = req.user as UserDocument
  const music = await findMusic({ _id: id })

  if (!music) {
    return res.status(404).send('Music not found.')
  }

  const musicOwner = music?.userId
  if (musicOwner && musicOwner.toString() !== user._id.toString()) {
    return res.status(400).json({ message: 'Cannot delete music' })
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
  const { title, artist, album, genre, page, limit } = req.query

  const query: FilterQuery<MusicDocument> = {
    ...(title && { title: { $regex: new RegExp(title, 'i') } }),
    ...(artist && { artist: { $regex: new RegExp(artist, 'i') } }),
    ...(album && { album: { $regex: new RegExp(album, 'i') } }),
    ...(genre && { genre: { $regex: new RegExp(genre, 'i') } })
  }

  const parsedPage = page ? (isNaN(parseInt(page)) ? 1 : parseInt(page)) : 1
  const parsedLimit = limit ? (isNaN(parseInt(limit)) ? 10 : parseInt(limit)) : 10

  const options: QueryOptions = {
    skip: (parsedPage - 1) * parsedLimit,
    lean: true,
    limit: parsedLimit
  }

  const musics = await findManyMusic(query, options)
  // TODO: add the total amount of music in the response of the paginated data
  return res.status(200).json({ limit: parsedLimit, page: parsedPage, data: musics })
}
