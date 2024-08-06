import mongoose, { ObjectId } from 'mongoose'

export interface MusicInput {
  title: string
  artist: string
  album: string
  genre: string
  userId?: string // maybe make this mongoose.type.ObjectId
}

export interface MusicDocument extends mongoose.Document, MusicInput {
  _id: ObjectId
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
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: false
    }
  },
  { timestamps: true }
)

const MusicModel = mongoose.model<MusicDocument>('Music', musicSchema)
export default MusicModel
