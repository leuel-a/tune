import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import MusicModel, { MusicInput, MusicDocument } from '../models/music.model'

export const createMusic = async (input: MusicInput) => {
  return await MusicModel.create(input)
}

export const findMusic = async (
  query: FilterQuery<MusicDocument>,
  options: QueryOptions = { lean: true }
) => {
  try {
    const result = await MusicModel.findOne(query, {}, options)

    if (!result) {
      console.log(`No document found with the given query: ${JSON.stringify(query)}`)
    }
    return result
  } catch (error) {
    console.error(`Error finding document: ${error}`)
    throw error
  }
}

export const deleteMusic = async (
  query: FilterQuery<MusicDocument>
): Promise<{ deletedCount?: number }> => {
  return await MusicModel.deleteOne(query)
}

export const findAndUpdate = async (
  query: FilterQuery<MusicDocument>,
  update: UpdateQuery<MusicDocument>,
  options: QueryOptions
) => {
  return await MusicModel.findOneAndUpdate(query, update, options)
}

export const findManyMusic = async (
  query: FilterQuery<MusicDocument>,
  options: QueryOptions = { lean: true }
) => {
  return await MusicModel.find(query, {}, options)
}

export const countMusics = async (query: FilterQuery<MusicDocument>) => {
  return await MusicModel.countDocuments(query)
}
