import { z } from 'zod'

const payload = {
  body: z.object({
    title: z.string({ required_error: 'Music title is required.' }),
    artist: z.string({ required_error: 'Music artist is required.' }),
    album: z.string({ required_error: 'Music album is required.' }),
    genre: z.string({ required_error: 'Music genre is required.' })
  })
}

const params = {
  params: z.object({
    id: z.string()
  })
}

const query = {
  query: z.object({
    search: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
    genres: z.string().optional()
  })
}

export const createMusicSchema = z.object({
  ...payload
})

export const getMusicSchema = z.object({
  ...params
})

export const deleteMusicSchema = z.object({
  ...params
})

export const updateMusicSchema = z.object({
  ...params,
  ...payload
})

export const getManyMusicSchema = z.object({
  ...query
})

export type ReadMusicType = z.infer<typeof getMusicSchema>
export type DeleteMusicType = z.infer<typeof deleteMusicSchema>
export type UpdateMusicType = z.infer<typeof updateMusicSchema>
export type CreateMusicType = z.infer<typeof createMusicSchema>
export type ReadManyMusicType = z.infer<typeof getManyMusicSchema>
