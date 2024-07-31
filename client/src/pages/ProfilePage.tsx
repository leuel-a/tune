import { useEffect } from 'react'
import { useAppSelector } from '../hooks'
import { toast } from 'react-toastify'
import { useNavigate, Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { ProfilePageContainer } from '../components/styles/ProfilePage.styled'
import ProfileSideBar from '../components/profile/SideBar'
import { Container } from '../components/styles/ui/Container.styled'
import { Flex } from '../components/styles/ui/Flex.styled'
import { OutletContainer } from '../components/styles/ProfileSideBar.styled'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { authenticated } = useAppSelector(state => state.auth)

  // TODO: Do I need this?
  useEffect(() => {
    if (!authenticated) {
      toast.error('You must be logged in to view this page', {
        theme: 'dark'
      })
      navigate('/login')
    }
  }, [authenticated, navigate])

  return (
    <>
      <Header />
      <ProfilePageContainer>
        <Container>
          <Flex>
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
