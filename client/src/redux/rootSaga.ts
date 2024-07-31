import { all } from 'redux-saga/effects'
import musicsSaga from '../features/music/musicSagas'

export default function* rootSaga() {
  yield all([musicsSaga()])
}
