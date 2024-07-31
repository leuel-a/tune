import { Music, PaginatedResponse } from '../../types'
import { fetchMusicsApi } from './musicApi'
import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchMusicsSuccess, fetchMusicsRequest, fetchMusicsFailure } from './musicSlice'

function* fetchMusicsSaga() {
  try {
    const musics: PaginatedResponse<Music> = yield call(fetchMusicsApi)
    yield put(fetchMusicsSuccess(musics))
  } catch (error) {
    yield put(fetchMusicsFailure)
  }
}

export default function* musicsSaga() {
  yield takeEvery(fetchMusicsRequest.type, fetchMusicsSaga)
}
