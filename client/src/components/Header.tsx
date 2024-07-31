import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { Flex } from './styles/ui/Flex.styled'
import { Container } from './styles/ui/Container.styled'
import { Logo, LogoText, StyledHeader } from './styles/Header.styled'

export default function Header() {
  const navigate = useNavigate()
  return (
    <StyledHeader>
      <Container>
        <Flex justify="space-between">
          <Flex justify="flex-start" gap={10}>
            <Logo src="./images/logo-2.svg" alt="" />
            <LogoText>Tune</LogoText>
          </Flex>
          <div>
            <Button
              onClick={() => {
                navigate('/login')
              }}
            >
              Login
            </Button>
          </div>
        </Flex>
      </Container>
    </StyledHeader>
  )
}
