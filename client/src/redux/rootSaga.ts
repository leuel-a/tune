import { all } from 'redux-saga/effects'
import authSaga from '../features/auth/authSaga'
import musicsSaga from '../features/music/musicSaga'

export default function* rootSaga() {
  yield all([musicsSaga(), authSaga()])
}
