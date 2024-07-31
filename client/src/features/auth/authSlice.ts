import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  authenticated: boolean
  accessToken: string | null
  refreshToken: string | null
}

const initialState: AuthState = {
  authenticated: false,
  accessToken: null,
  refreshToken: null
}

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setAuthenticated(state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) {
      state.authenticated = true
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    setUnauthenticated(state) {
      state.authenticated = false
      state.accessToken = null
      state.refreshToken = null
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload
    }
  }
})

export const { setAccessToken, setUnauthenticated, setAuthenticated } = authSlice.actions
export default authSlice.reducer
