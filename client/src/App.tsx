import { Outlet } from 'react-router-dom'
import { GlobalStyles } from './components/styles/ui/Global'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Outlet />
      <ToastContainer />
    </>
  )
}
