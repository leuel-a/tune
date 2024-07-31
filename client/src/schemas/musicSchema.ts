import { z } from 'zod'

export const createMusicSchema = z.object({
  title: z.string({ required_error: 'Music title is required' }).min(1, 'Title can not be empty'),
  artist: z.string({ required_error: 'Artist name is required' }).min(1, 'Artist can not be empty'),
  album: z.string({ required_error: 'Album name is required' }).min(1, 'Album can not be empty'),
  genre: z.string({ required_error: 'Genre is required' }).min(1, 'Genre can not be empty')
})

export type CreateMusic = z.infer<typeof createMusicSchema>
