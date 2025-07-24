export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean
  error: string | null
}

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  createdAt: string
}

export interface LoginFormData {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}

export type AuthError = {
  type: 'validation' | 'network' | 'authentication'
  message: string
} 