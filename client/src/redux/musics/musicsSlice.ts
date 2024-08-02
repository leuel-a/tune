import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Music, PaginatedResponse } from '../../types'

export interface MusicsState {
  musics: Music[] | null
  loading: boolean
  error: string | null
}

const initialState: MusicsState = {
  musics: null,
  loading: false,
  error: null
}

const musicsSlice = createSlice({
  name: 'musics',
  initialState,
  reducers: {
    fetchMusicsRequest(state) {
      state.loading = true
    },
    fetchMusicsSuccess(state, action: PayloadAction<PaginatedResponse<Music>>) {
      state.loading = false
      state.musics = action.payload.data
    },
    fetchMusicsFailure(state, action) {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const { fetchMusicsFailure, fetchMusicsRequest, fetchMusicsSuccess } = musicsSlice.actions
export default musicsSlice.reducer
