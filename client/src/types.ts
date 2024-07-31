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

export type User = {
  _id: string
  email: string
  createdAt: string
  updatedAt: string
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
}
