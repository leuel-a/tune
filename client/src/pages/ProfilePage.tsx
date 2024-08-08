import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Header from '../components/Header'
import { useNavigate, Outlet } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks'
import ProfileSideBar from '../components/profile/SideBar'
import { getAuthenticatedUser } from '../redux/auth/authSlice'
import { Container } from '../components/styles/ui/Container.styled'
import { OutletContainer } from '../components/styles/ProfileSideBar.styled'
import { ProfilePageContainer } from '../components/styles/ProfilePage.styled'

export default function ProfilePage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { authenticated } = useAppSelector(state => state.auth)

  useEffect(() => {
    dispatch(getAuthenticatedUser())
    if (!authenticated) {
      toast.error('You must be logged in to view this page', {
        theme: 'dark'
      })
      navigate('/login')
    }
  }, [authenticated, navigate, dispatch])

  return (
    <>
      <Header />
      <Container>
        <ProfilePageContainer>
          <ProfileSideBar />
          <OutletContainer>
            <Outlet />
          </OutletContainer>
        </ProfilePageContainer>
      </Container>
    </>
  )
}
