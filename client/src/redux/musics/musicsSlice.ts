import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Music, PaginatedResponse } from '../../types'

export interface MusicsState {
  data: PaginatedResponse<Music> | null
  loading: boolean
  error: string | null
}

const initialState: MusicsState = {
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
    }
  }
})

export const { fetchMusicsFailure, fetchMusicsRequest, fetchMusicsSuccess } = musicsSlice.actions
export default musicsSlice.reducer
