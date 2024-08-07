import { AxiosError, AxiosResponse, isAxiosError } from 'axios'
import { deleteMusic, getMusicById, getMusics, updateMusic } from '../../api/musicApi'
import { Music, PaginatedResponse } from '../../types'
import { takeLatest, call, all, put, takeEvery } from 'redux-saga/effects'
import {
  deleteMusicFailure,
  deleteMusicRequest,
  deleteMusicSuccess,
  fetchMusicsFailure,
  fetchMusicsRequest,
  fetchMusicsSuccess,
  fetchOneMusicFailure,
  fetchOneMusicRequest,
  fetchOneMusicSuccess,
  updateMusicFailure,
  updateMusicRequest,
  updateMusicSuccess
} from './musicsSlice'
import { PayloadAction } from '@reduxjs/toolkit'

function* fetchMusicsSaga(action: PayloadAction<string>) {
  try {
    const searchParams = action.payload
    const response: PaginatedResponse<Music> = yield call(getMusics, searchParams)
    yield put(fetchMusicsSuccess(response))
  } catch (error) {
    const e = error as AxiosError
    const errorMessage = (e.response?.data as string) || 'An unknown error has occured'
    yield put(fetchMusicsFailure(errorMessage))
  }
}

function* fetchOneMusicSaga(action: PayloadAction<string>) {
  try {
    const response: AxiosResponse<Music> = yield call(getMusicById, action.payload)
    yield put(fetchOneMusicSuccess(response.data))
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data
      yield put(fetchOneMusicFailure(errorMessage))
    } else {
      yield put(fetchOneMusicFailure('Something went wrong.'))
    }
  }
}

function* updateMusicSaga(action: PayloadAction<Music>) {
  try {
    const { _id, ...data } = action.payload
    yield call(updateMusic, _id, data)
    yield put(updateMusicSuccess())
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data
      yield put(updateMusicFailure(errorMessage))
    } else {
      yield put(updateMusicFailure('Something went wrong. Please try again.'))
    }
  }
}

function* deleteMusicSaga(action: PayloadAction<string>) {
  try {
    yield call(deleteMusic, action.payload)
    yield put(deleteMusicSuccess())
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data
      yield put(deleteMusicFailure(errorMessage))
    } else {
      yield put(deleteMusicFailure('Something went wrong try again.'))
    }
  }
}

export default function* musicsSaga() {
  yield all([
    takeLatest(fetchMusicsRequest.type, fetchMusicsSaga),
    takeEvery(fetchOneMusicRequest.type, fetchOneMusicSaga),
    takeEvery(updateMusicRequest.type, updateMusicSaga),
    takeEvery(deleteMusicRequest.type, deleteMusicSaga)
  ])
}
