import { Outlet } from 'react-router-dom'
import { GlobalStyles } from './components/styles/ui/Global'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from './hooks'
import { getAuthenticatedUser } from './features/auth/authSlice'

export default function App() {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.auth)

  useEffect(() => {
    console.log(loading)
  }, [loading])

  useEffect(() => {
    dispatch(getAuthenticatedUser())
  }, [dispatch])

  return (
    <>
      <GlobalStyles />
      <Outlet />
      <ToastContainer />
    </>
  )
}
