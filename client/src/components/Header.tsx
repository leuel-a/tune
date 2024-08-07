import Button from './Button'
import { useAppSelector } from '../hooks'
import { CgProfile } from 'react-icons/cg'
import { Flex } from './styles/ui/Flex.styled'
import { NavLink } from './styles/NavLink.styled'
import { Profile } from './styles/Profile.styled'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Cursor } from './styles/utils/Cursor.styled'
import { Container } from './styles/ui/Container.styled'
import { Logo, LogoText, StyledHeader } from './styles/Header.styled'

export default function Header() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { authenticated } = useAppSelector(state => state.auth)

  return (
    <StyledHeader>
      <Container>
        <Flex align="center" justify="space-between">
          <Flex gap={20} justify="flex-start">
            <Cursor $cursor="pointer">
              <Flex onClick={() => navigate('/')} justify="flex-start" gap={10}>
                <Logo src="./images/logo-2.svg" alt="" />
                <LogoText>Tune</LogoText>
              </Flex>
            </Cursor>
            <NavLink isActive={pathname === '/stats'} to="/stats">
              Stats
            </NavLink>
          </Flex>
          {authenticated ? (
            <Profile>
              <Flex justify="flex-end" gap={12}>
                <p>leuel.asfaw@gmail.com</p>
                <Link to="/profile">
                  <CgProfile color="#0D1F2D" size={32} />
                </Link>
              </Flex>
            </Profile>
          ) : (
            <div>
              <Button
                onClick={() => {
                  navigate('/login')
                }}
              >
                Login
              </Button>
            </div>
          )}
        </Flex>
      </Container>
    </StyledHeader>
  )
}
