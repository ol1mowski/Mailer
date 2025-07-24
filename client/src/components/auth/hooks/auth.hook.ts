import { useState, useCallback } from 'react'
import { type AuthState, type User, type LoginCredentials, type AuthError } from '../types/auth.types'
import { AUTH_ERROR_MESSAGES } from '../constants/auth.constants'

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>(initialState)

  const login = useCallback(async (credentials: LoginCredentials): Promise<AuthError | null> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (credentials.email === 'admin@mailer.com' && credentials.password === 'password123') {
        const mockUser: User = {
          id: '1',
          email: credentials.email,
          name: 'Admin User',
          role: 'admin',
          createdAt: new Date().toISOString(),
        }

        setState({
          isAuthenticated: true,
          user: mockUser,
          isLoading: false,
          error: null,
        })

        localStorage.setItem('auth_token', 'mock_jwt_token')
        return null
      } else {
        const error: AuthError = {
          type: 'authentication',
          message: AUTH_ERROR_MESSAGES.LOGIN_FAILED,
        }
        
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }))
        
        return error
      }
    } catch {
      const networkError: AuthError = {
        type: 'network',
        message: AUTH_ERROR_MESSAGES.NETWORK_ERROR,
      }
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: networkError.message,
      }))
      
      return networkError
    }
  }, [])

  const logout = useCallback(() => {
    setState(initialState)
    localStorage.removeItem('auth_token')
  }, [])

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  return {
    ...state,
    login,
    logout,
    clearError,
  }
} 