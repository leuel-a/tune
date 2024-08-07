import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { toast } from 'react-toastify'
import { useNavigate, Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { ProfilePageContainer } from '../components/styles/ProfilePage.styled'
import ProfileSideBar from '../components/profile/SideBar'
import { Container } from '../components/styles/ui/Container.styled'
import { Flex } from '../components/styles/ui/Flex.styled'
import { OutletContainer } from '../components/styles/ProfileSideBar.styled'
import { getAuthenticatedUser } from '../redux/auth/authSlice'

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
      <ProfilePageContainer>
        <Container>
          <Flex align="flex-start">
            <ProfileSideBar />
            <OutletContainer>
              <Outlet />
            </OutletContainer>
          </Flex>
        </Container>
      </ProfilePageContainer>
    </>
  )
}
