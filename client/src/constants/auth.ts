export const AUTH_CONSTANTS = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_EMAIL_LENGTH: 5,
  MAX_EMAIL_LENGTH: 254,
} as const

export const AUTH_ERROR_MESSAGES = {
  EMAIL_REQUIRED: 'Email jest wymagany',
  EMAIL_INVALID: 'Nieprawidłowy format email',
  PASSWORD_REQUIRED: 'Hasło jest wymagane',
  PASSWORD_TOO_SHORT: `Hasło musi mieć co najmniej ${AUTH_CONSTANTS.MIN_PASSWORD_LENGTH} znaków`,
  PASSWORD_TOO_LONG: `Hasło nie może być dłuższe niż ${AUTH_CONSTANTS.MAX_PASSWORD_LENGTH} znaków`,
  LOGIN_FAILED: 'Nieprawidłowy email lub hasło',
  NETWORK_ERROR: 'Błąd połączenia. Sprawdź połączenie z internetem.',
} as const 