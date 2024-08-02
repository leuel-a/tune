import Button from './Button'
import { theme } from '../main'
// import { toast } from 'react-toastify'
import OAuthButton from './OAuthButton'
import { FaGoogle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Flex } from './styles/ui/Flex.styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../hooks'
import { LoginType, loginSchema } from '../schemas/authSchemas'
import { StyledLoadingSpinner } from './styles/LoadingSpinner.styled'
import { FormControl, FormItem, FormMessage, StyledForm, StyledInput } from './styles/Form.styled'
import { loginUserRequest } from '../redux/auth/authSlice'
import { useEffect } from 'react'

export default function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { authenticated, loading, loginError } = useAppSelector(state => state.auth)

  const {
    setError,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit: SubmitHandler<LoginType> = async data => {
    const { email, password } = data
    dispatch(loginUserRequest({ email, password }))
  }

  console.log(loading)

  useEffect(() => {
    if (authenticated) {
      return navigate('/')
    }
  }, [navigate, authenticated])

  useEffect(() => {
    if (loginError !== null) {
      setError('root', { message: loginError })
    }
  }, [loginError, setError])

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} width="600px">
      <Flex gap={20} direction="column">
        <OAuthButton>
          <FaGoogle />
          <p>Sign In with Google</p>
        </OAuthButton>
        <Flex gap={10} direction="column">
          <FormItem>
            <FormControl>
              <StyledInput
                {...register('email')}
                type="email"
                placeholder="Enter your email"
                autoComplete="off"
              />
            </FormControl>
            {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
          </FormItem>
          <FormItem>
            <FormControl>
              <StyledInput
                {...register('password')}
                type="password"
                placeholder="Enter your password"
                autoComplete="off"
              />
            </FormControl>
            {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
          </FormItem>
          {errors.root && <FormMessage>{errors.root.message}</FormMessage>}
          <Button
            disabled={loading}
            color={theme.button.secondary}
            bgColor={theme.colors.secondary}
          >
            {loading ? <StyledLoadingSpinner $size={18} /> : `Login`}
          </Button>
        </Flex>
      </Flex>
    </StyledForm>
  )
}
