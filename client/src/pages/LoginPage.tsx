import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { Flex } from '../components/styles/ui/Flex.styled'
import { LoginPageContainer, Wrapper } from '../components/styles/LoginPage.styled'

export default function LoginPage() {
  return (
    <LoginPageContainer>
      <Flex direction="column" justify="center" gap={20}>
        <div>
          <h1>Welcome Back</h1>
          <LoginForm />
        </div>
        <Wrapper>
          <Flex gap={10}>
            <p>Don't have an account?</p>
            <Link to="/signup">Sign up</Link>
          </Flex>
        </Wrapper>
      </Flex>
    </LoginPageContainer>
  )
}
