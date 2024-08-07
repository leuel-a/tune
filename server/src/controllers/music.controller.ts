import { isNaN } from 'lodash'
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
  findAndUpdate,
  countMusics
} from '../services/music.services'
import { Request, Response } from 'express'
import { UserDocument } from '../models/users.model'
import { MusicDocument } from '../models/music.model'
import { FilterQuery, isValidObjectId, QueryOptions, Types } from 'mongoose'

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

  if (music.userId && String(music.userId) !== String(user._id)) {
    return res.sendStatus(403)
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
  try {
    const id = new Types.ObjectId(req.params.id)
    const isValid = isValidObjectId(id)

    if (!isValid) {
      return res.status(400).send('Not a valid id')
    }

    const music = await findMusic({ _id: id }, {})
    if (!music) {
      return res.status(404).send('Music not found.')
    }
    return res.status(200).send(music)
  } catch (error) {
    return res.status(400).send(error.message)
  }
}

export const deleteMusicHandler = async (
  req: Request<DeleteMusicType['params']>,
  res: Response
) => {
  const { id } = req.params
  if (isValidObjectId(id)) {
    return res.status(400).send('Id not a valid object id')
  }
  
  const user = req.user as UserDocument
  const music = await findMusic({ _id: id })

  if (!music) {
    return res.sendStatus(404)
  }

  const musicOwner = music?.userId
  if (musicOwner && String(musicOwner) !== String(user._id)) {
    return res.sendStatus(403)
  }

  const result = await deleteMusic({ _id: id })
  if (result.deletedCount && result.deletedCount > 0) {
    return res.sendStatus(204)
  }

  return res.status(500).send('Failed to delete music.')
}

export const getMusicsHandler = async (
  req: Request<{}, {}, {}, ReadManyMusicType['query']>,
  res: Response
) => {
  const { search, page, limit, genres } = req.query

  const genresList = genres?.split(',')
  const parsedPage = page ? (isNaN(parseInt(page)) ? 1 : parseInt(page)) : 1
  const parsedLimit = limit ? (isNaN(parseInt(limit)) ? 10 : parseInt(limit)) : 10

  const query: FilterQuery<MusicDocument> = {
    ...(search && {
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { artist: { $regex: search, $options: 'i' } },
        { album: { $regex: search, $options: 'i' } }
      ]
    }),
    ...(genres && { genre: { $in: genresList } })
  }
  const options: QueryOptions = {
    skip: (parsedPage - 1) * parsedLimit,
    lean: true,
    limit: parsedLimit
  }

  try {
    const [musics, total] = await Promise.all([findManyMusic(query, options), countMusics(query)])
    return res.status(200).json({ limit: parsedLimit, page: parsedPage, total, data: musics })
  } catch (error) {
    return res.status(500).json({ message: String(error) })
  }
}

export const getUsersMusics = async (
  req: Request<{}, {}, {}, ReadManyMusicType['query']>,
  res: Response
) => {
  const user = req.user as UserDocument
  const { page, limit } = req.query

  const parsedPage = page ? (isNaN(parseInt(page)) ? 1 : parseInt(page)) : 1
  const parsedLimit = limit ? (isNaN(parseInt(limit)) ? 10 : parseInt(limit)) : 10
  try {
    const query: FilterQuery<MusicDocument> = { userId: user._id }
    const [musics, total] = await Promise.all([
      findManyMusic(query, {
        lean: true,
        limit: parsedLimit,
        skip: (parsedPage - 1) * parsedLimit
      }),
      countMusics(query)
    ])

    return res.status(200).json({ limit: parsedLimit, page: parsedPage, total, data: musics })
  } catch (error) {
    return res.status(500).json({ message: String(error) })
  }
}
