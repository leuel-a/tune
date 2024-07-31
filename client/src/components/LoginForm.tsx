import Button from './Button'
import { theme } from '../main'
import { toast } from 'react-toastify'
import OAuthButton from './OAuthButton'
import { FaGoogle } from 'react-icons/fa'
import { Navigate } from 'react-router-dom'
import { Flex } from './styles/ui/Flex.styled'
import { loginUser } from '../features/auth/authApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setAuthenticated } from '../features/auth/authSlice'
import { LoginType, loginSchema } from '../schemas/authSchemas'
import { StyledLoadingSpinner } from './styles/LoadingSpinner.styled'
import { FormControl, FormItem, FormMessage, StyledForm, StyledInput } from './styles/Form.styled'

export default function LoginForm() {
  const dispatch = useAppDispatch()
  const { authenticated } = useAppSelector(state => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit: SubmitHandler<LoginType> = async data => {
    try {
      const response = await loginUser({ email: data.email, password: data.password })
      toast.success('Login Successful', {
        closeOnClick: true,
        theme: 'dark',
        autoClose: 2000
      })
      dispatch(setAuthenticated(response))
    } catch (error) {
      console.error(`Error logging in: ${error}`)
    }
  }

  if (authenticated) {
    return <Navigate to="/" />
  }

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
          <Button
            disabled={isSubmitting}
            color={theme.button.secondary}
            bgColor={theme.colors.secondary}
          >
            {isSubmitting ? <StyledLoadingSpinner $size={18} /> : `Login`}
          </Button>
        </Flex>
      </Flex>
    </StyledForm>
  )
}
