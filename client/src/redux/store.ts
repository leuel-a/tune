import rootSaga from './rootSaga'
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import musicReducer from '../features/music/musicSlice'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    auth: authReducer,
    music: musicReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
