export type Music = {
  _id: string
  title: string
  artist: string
  album: string
  genre: string
}

export interface PaginatedResponse<T> {
  page: number
  data: T[]
}
