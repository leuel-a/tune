export type Music = {
  _id: string
  title: string
  artist: string
  album: string
  genre: string
}

export interface PaginatedResponse<T> {
  page: number
  limit: number
  total: number
  data: T[]
}

export type User = {
  _id: string
  email: string
  createdAt: string
  updatedAt: string
}

export type PaginateRequest = {
  page?: number
  limit?: number
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
}

// stat types
export type TotalStats = {
  totalSongs: number
  totalArtists: number
  totalGenres: number
  totalAlbums: number
}

export type ArtistStats = {
  _id: string
  count: number
  songs: Music[]
}

export type AlbumsStats = {
  _id: string
  count: number
  songs: Music[]
}

export type GenreStats = {
  _id: string
  count: number
}
