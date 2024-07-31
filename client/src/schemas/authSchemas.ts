import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required.'
    })
    .min(1, { message: 'Email can not be empty.' })
    .email({
      message: "That doesn't look like an email."
    }),
  password: z
    .string({ required_error: 'Password is required.' })
    .min(1, { message: 'Password can not be empty.' })
})

export const registerSchema = z
  .object({
    email: z
      .string({
        required_error: 'Email is required.'
      })
      .min(1, { message: 'Email can not be empty.' })
      .email({
        message: "That doesn't look like an email."
      }),
    password: z
      .string({
        required_error: 'Password is required.'
      })
      .min(6, { message: 'Password must be at least 6 characters.' }),
    confirmPassword: z.string({ required_error: 'Please confirm your password.' })
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Password do not match.',
    path: ['confirmPassword']
  })

export type LoginType = z.infer<typeof loginSchema>
export type RegisterType = z.infer<typeof registerSchema>
