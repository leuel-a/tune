import { z } from 'zod'

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required.' })
      .email({ message: 'Invalid email.' }),
    password: z.string({ required_error: 'Password is required.' })
  })
})

export const registerSchema = z.object({
  body: z
    .object({
      email: z
        .string({ required_error: 'Email is required.' })
        .email({ message: 'Invalid email.' }),
      password: z
        .string({ required_error: 'Password is required.' })
        .min(6, { message: 'Password must be at least 6 characters long.' }),
      confirmPassword: z.string({
        required_error: 'Confirm password is required.'
      })
    })
    .refine(
      ({ password, confirmPassword }) => {
        return password === confirmPassword
      },
      { message: 'Passwords do not match.', path: ['confirmPassword'] }
    )
})

const params = {
  params: z.object({
    id: z.string({ required_error: 'User id is required.' })
  })
}

export const getUserSchema = z.object({
  ...params
})

export const deleteUserSchema = z.object({
  ...params
})

export type LoginType = z.infer<typeof loginSchema>
export type ReadUserType = z.infer<typeof getUserSchema>
export type RegisterType = z.infer<typeof registerSchema>
export type DeleteUserType = z.infer<typeof deleteUserSchema>
