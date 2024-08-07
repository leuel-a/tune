import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Music, PaginatedResponse } from '../../types'

export interface MusicsState {
  data: PaginatedResponse<Music> | null
  music: Music | null
  loading: boolean
  error: string | null
}

const initialState: MusicsState = {
  music: null,
  data: null,
  loading: false,
  error: null
}

const musicsSlice = createSlice({
  name: 'musics',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchMusicsRequest(state, _action: PayloadAction<string>) {
      state.loading = true
    },
    fetchMusicsSuccess(state, action: PayloadAction<PaginatedResponse<Music>>) {
      state.loading = false
      state.data = action.payload
    },
    fetchMusicsFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchOneMusicRequest(state, _action: PayloadAction<string>) {
      state.loading = true
    },
    fetchOneMusicSuccess(state, action: PayloadAction<Music>) {
      state.loading = false
      state.music = action.payload
    },
    fetchOneMusicFailure(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.loading = false
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateMusicRequest(state, _action: PayloadAction<Music>) {
      state.loading = true
    },
    updateMusicSuccess(state) {
      state.loading = false
    },
    updateMusicFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteMusicRequest(state, _action) {
      state.loading = true
    },
    deleteMusicSuccess(state) {
      state.loading = false
    },
    deleteMusicFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const {
  fetchMusicsFailure,
  fetchMusicsRequest,
  fetchMusicsSuccess,
  fetchOneMusicFailure,
  fetchOneMusicRequest,
  fetchOneMusicSuccess,
  updateMusicFailure,
  updateMusicRequest,
  updateMusicSuccess,
  deleteMusicSuccess,
  deleteMusicRequest,
  deleteMusicFailure
} = musicsSlice.actions
export default musicsSlice.reducer
