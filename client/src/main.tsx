import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import store from './redux/store.ts'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage.tsx'
import SignupPage from './pages/SignupPage.tsx'
import HomePage from './pages/HomePage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import ProfileCreateMusic from './components/profile/CreateMusic.tsx'
import ProfileMusics from './components/profile/Musics.tsx'
import ProfilePersonalStats from './components/profile/PersonalStats.tsx'
import StatsPage from './pages/StatsPage.tsx'
import EditMusicForm from './components/profile/EditMusicForm.tsx'

export const theme = {
  colors: {
    primary: '#0D1F2D',
    secondary: '#546A7B'
  },
  button: {
    primary: '#E4C3AD',
    secondary: '#FAE1DF'
  },
  mobile: {
    xs: '576px',
    sm: '768px',
    md: '992px',
    lg: '1200px'
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/stats', element: <StatsPage /> },
      {
        path: '/profile',
        element: <ProfilePage />,
        children: [
          {
            path: '',
            element: <ProfileMusics />
          },
          { path: 'create', element: <ProfileCreateMusic /> },
          { path: 'stats', element: <ProfilePersonalStats /> },
          { path: 'musics/:id', element: <EditMusicForm /> }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
)
