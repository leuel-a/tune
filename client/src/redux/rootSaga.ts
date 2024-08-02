import { all } from 'redux-saga/effects'
import authSaga from './auth/authSaga'
import musicsSaga from './musics/musicsSaga'

export default function* rootSaga() {
  yield all([authSaga(), musicsSaga()])
}
