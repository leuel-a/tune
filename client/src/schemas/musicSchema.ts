import { z } from 'zod'

const payload = {
  title: z.string({ required_error: 'Music title is required' }).min(1, 'Title can not be empty'),
  artist: z.string({ required_error: 'Artist name is required' }).min(1, 'Artist can not be empty'),
  album: z.string({ required_error: 'Album name is required' }).min(1, 'Album can not be empty'),
  genre: z.string({ required_error: 'Genre is required' }).min(1, 'Genre can not be empty')
}

export const createMusicSchema = z.object({
  ...payload
})

export const updateMusicSchema = z.object({
  ...payload
})

export type CreateMusic = z.infer<typeof createMusicSchema>
export type UpdateMusic = z.infer<typeof updateMusicSchema>
