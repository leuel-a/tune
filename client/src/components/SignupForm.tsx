import Button from './Button'
import { theme } from '../main'
import OAuthButton from './OAuthButton'
import { FaGoogle } from 'react-icons/fa'
import { Flex } from './styles/ui/Flex.styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { registerSchema, RegisterType } from '../schemas/authSchemas'
import { FormControl, FormItem, FormMessage, StyledForm, StyledInput } from './styles/Form.styled'

export default function SignupForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit: SubmitHandler<RegisterType> = async data => {
    try {
      const response: AxiosResponse = await axios.post('http://localhost:5000/api/users', data)
      console.log(response)
    } catch (error) {
      const err = error as AxiosError
      const data = err.response?.data
      setError('root', { message: data as string })
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} width="600px">
      <Flex gap={20} direction="column">
        <OAuthButton>
          <FaGoogle />
          <p>Sign Up with Google</p>
        </OAuthButton>
        <FormItem>
          <FormControl>
            <StyledInput {...register('email')} placeholder="Enter your email" />
          </FormControl>
          {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
        </FormItem>
        <FormItem>
          <FormControl>
            <StyledInput
              {...register('password')}
              type="password"
              placeholder="Enter your password"
            />
          </FormControl>
          {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
        </FormItem>
        <FormItem>
          <FormControl>
            <StyledInput
              {...register('confirmPassword')}
              type="password"
              placeholder="Confirm your password"
            />
          </FormControl>
          {errors.confirmPassword && <FormMessage>{errors.confirmPassword.message}</FormMessage>}
        </FormItem>
        <Button color={theme.button.secondary} bgColor={theme.colors.secondary}>
          Sign Up
        </Button>
        {errors.root && <FormMessage>{errors.root.message}</FormMessage>}
      </Flex>
    </StyledForm>
  )
}
