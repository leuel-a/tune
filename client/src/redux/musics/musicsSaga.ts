import { AxiosError } from 'axios'
import { getMusics } from '../../api/musicApi'
import { Music, PaginatedResponse } from '../../types'
import { takeLatest, call, all, put } from 'redux-saga/effects'
import { fetchMusicsFailure, fetchMusicsRequest, fetchMusicsSuccess } from './musicsSlice'
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

export default function* musicsSaga() {
  yield all([takeLatest(fetchMusicsRequest.type, fetchMusicsSaga)])
}
