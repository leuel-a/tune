import Button from './Button'
import { CgProfile } from 'react-icons/cg'
import { useAppSelector } from '../hooks'
import { Link, useNavigate } from 'react-router-dom'
import { Flex } from './styles/ui/Flex.styled'
import { Container } from './styles/ui/Container.styled'
import { Logo, LogoText, StyledHeader } from './styles/Header.styled'
import { Profile } from './styles/Profile.styled'

export default function Header() {
  const navigate = useNavigate()
  const { authenticated } = useAppSelector(state => state.auth)

  return (
    <StyledHeader>
      <Container>
        <Flex justify="space-between">
          <Flex justify="space-between">
            <Flex justify="flex-start" gap={10}>
              <Logo src="./images/logo-2.svg" alt="" />
              <LogoText>Tune</LogoText>
            </Flex>
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
