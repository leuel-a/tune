import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types'
import { LoginType } from '../../schemas/authSchemas'

export interface AuthState {
  authenticated: boolean
  userId: string | null
  loading: boolean
  loginError: string | null
  error: string | null
}

const initialState: AuthState = {
  authenticated: false,
  loading: false,
  userId: null,
  error: null,
  loginError: null
}

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginUserRequest(state, _action: PayloadAction<LoginType>) {
      state.loading = true
    },
    loginUserSuccess(state) {
      state.loading = false
      state.authenticated = true
    },
    loginUserFailure(state, action) {
      state.loading = false
      state.authenticated = false
      state.loginError = action.payload
    },
    getAuthenticatedUser(state) {
      state.loading = true
    },
    getAuthenticatedUserSuccess(state, action: PayloadAction<User>) {
      state.loading = false
      state.userId = action.payload._id
      state.authenticated = true
    },
    getAuthenticatedUserFailure(state, action) {
      state.loading = false
      state.error = action.payload
      state.authenticated = false
    }
  }
})

export const {
  loginUserSuccess,
  loginUserRequest,
  loginUserFailure,
  getAuthenticatedUser,
  getAuthenticatedUserFailure,
  getAuthenticatedUserSuccess
} = authSlice.actions
export default authSlice.reducer
