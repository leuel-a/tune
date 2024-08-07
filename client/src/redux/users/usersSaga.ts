import { AxiosResponse, AxiosError } from 'axios'
import { getUsersMusics } from '../../api/usersApi'
import { takeEvery, put, call, all } from 'redux-saga/effects'
import { getUsersMusicFailure, getUsersMusicRequest, getUsersMusicSuccess } from './usersSlice'
import { PayloadAction } from '@reduxjs/toolkit'

function* getUsersMusicsSaga(action: PayloadAction<string>) {
  try {
    const response: AxiosResponse = yield call(getUsersMusics, action.payload)
    yield put(getUsersMusicSuccess(response.data))
  } catch (error) {
    const e = error as AxiosError
    yield put(getUsersMusicFailure(e.response?.data))
  }
}

export default function* usersSaga() {
  yield all([takeEvery(getUsersMusicRequest.type, getUsersMusicsSaga)])
}
