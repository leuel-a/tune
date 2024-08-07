import { useEffect } from 'react'
import { useAppDispatch } from './hooks'
import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { GlobalStyles } from './components/styles/ui/Global'
import { getAuthenticatedUser } from './redux/auth/authSlice'

export default function App() {
  const dispatch = useAppDispatch()

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
