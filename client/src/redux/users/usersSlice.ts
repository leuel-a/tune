import { Music, PaginatedResponse } from '../../types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  data: PaginatedResponse<Music> | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getUsersMusicRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true
    },
    getUsersMusicSuccess: (state, action: PayloadAction<PaginatedResponse<Music>>) => {
      state.data = action.payload
      state.loading = false
    },
    getUsersMusicFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const { getUsersMusicFailure, getUsersMusicRequest, getUsersMusicSuccess } =
  userSlice.actions
export default userSlice.reducer
