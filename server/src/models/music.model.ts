import mongoose from 'mongoose'

export interface MusicInput {
  title: string
  artist: string
  album: string
  genre: string
}

export interface MusicDocument extends mongoose.Document, MusicInput {
  createdAt: Date
  updatedAt: Date
}

const musicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true
    },
    artist: {
      type: String,
      require: true
    },
    album: {
      type: String,
      require: true
    },
    genre: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
)

const MusicModel = mongoose.model<MusicDocument>('Music', musicSchema)
export default MusicModel
