import Cookies from 'js-cookie'
import { call, takeEvery, put, all } from 'redux-saga/effects'
import {
  getAuthenticatedUser,
  getAuthenticatedUserFailure,
  getAuthenticatedUserSuccess
} from './authSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import { getMe, loginUser } from '../../api/authApi'
import { loginUserSuccess, loginUserFailure, loginUserRequest } from './authSlice'
import { LoginResponse, User } from '../../types'
import { LoginType } from '../../schemas/authSchemas'
import { AxiosError, isAxiosError } from 'axios'

function* getAuthenticatedUserSaga() {
  try {
    const refreshToken = Cookies.get('refreshToken')
    const accessToken = Cookies.get('accessToken')

    // make the call to the api with the credentials
    const user: User = yield call(getMe, { accessToken, refreshToken })

    yield put(getAuthenticatedUserSuccess(user))
  } catch (error) {
    const e = error as AxiosError

    // get the error message from the acios error
    const errorMessage = (e.response?.data as string) || 'An unknown error has occured'

    yield put(getAuthenticatedUserFailure(errorMessage))
  }
}

function* loginUserSaga(action: PayloadAction<LoginType>) {
  try {
    // TODO: update this because the error object that is thrown that AxiosError
    const response: LoginResponse = yield call(loginUser, action.payload)

    // set the cookies from the client side
    Cookies.set('accessToken', response.accessToken)
    Cookies.set('refreshToken', response.refreshToken)

    yield put(loginUserSuccess())
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data
      yield put(loginUserFailure(errorMessage))
    } else {
      yield put(loginUserFailure("Something went wrong please try again."))
    }
  }
}

export default function* authSaga() {
  yield all([
    takeEvery(loginUserRequest.type, loginUserSaga),
    takeEvery(getAuthenticatedUser.type, getAuthenticatedUserSaga)
  ])
}
