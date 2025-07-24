import { z } from 'zod'
import { AUTH_CONSTANTS, AUTH_ERROR_MESSAGES } from '../constants/auth.constants'

export const loginSchema = z.object({
  email: z
    .string()
    .min(AUTH_CONSTANTS.MIN_EMAIL_LENGTH, AUTH_ERROR_MESSAGES.EMAIL_REQUIRED)
    .max(AUTH_CONSTANTS.MAX_EMAIL_LENGTH)
    .email(AUTH_ERROR_MESSAGES.EMAIL_INVALID),
  password: z
    .string()
    .min(AUTH_CONSTANTS.MIN_PASSWORD_LENGTH, AUTH_ERROR_MESSAGES.PASSWORD_TOO_SHORT)
    .max(AUTH_CONSTANTS.MAX_PASSWORD_LENGTH, AUTH_ERROR_MESSAGES.PASSWORD_TOO_LONG),
})

export type LoginFormData = z.infer<typeof loginSchema> 