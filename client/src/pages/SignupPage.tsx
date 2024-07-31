import { Link } from 'react-router-dom'
import SignupForm from '../components/SignupForm'
import { Flex } from '../components/styles/ui/Flex.styled'
import { SignupPageContainer, Wrapper } from '../components/styles/SignupPage.styled'

export default function SignupPage() {
  return (
    <SignupPageContainer>
      <Flex direction="column" gap={20}>
        <h1>Glad You Decide To Join Us!</h1>
        <SignupForm />
        <Wrapper>
          <Flex gap={10}>
            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
          </Flex>
        </Wrapper>
      </Flex>
    </SignupPageContainer>
  )
}
