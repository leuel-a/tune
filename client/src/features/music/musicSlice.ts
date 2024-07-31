import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Music, PaginatedResponse } from '../../types'

export interface MusicsState {
  musics: Music[]
  currentMusic: Music | null
  loading: boolean
  error: string | null
}

const initialState: MusicsState = {
  musics: [],
  currentMusic: null,
  loading: false,
  error: null
}

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    fetchMusicsRequest: state => {
      state.loading = true
    },
    fetchMusicsSuccess: (state, action: PayloadAction<PaginatedResponse<Music>>) => {
      state.loading = false
      state.musics = action.payload.data
    },
    fetchMusicsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const { fetchMusicsFailure, fetchMusicsRequest, fetchMusicsSuccess } = musicSlice.actions
export default musicSlice.reducer
