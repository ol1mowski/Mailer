import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginForm } from '../LoginForm'
import { useAuth } from '@/hooks/useAuth'

// Mock useAuth hook
vi.mock('@/hooks/useAuth')
const mockUseAuth = vi.mocked(useAuth)

describe('LoginForm', () => {
  const mockLogin = vi.fn()
  const mockClearError = vi.fn()

  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      clearError: mockClearError,
      isLoading: false,
      error: null,
      isAuthenticated: false,
      user: null,
      logout: vi.fn(),
    })
  })

  it('renders login form with all fields', () => {
    render(<LoginForm />)
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/hasło/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /zaloguj się/i })).toBeInTheDocument()
  })

  it('shows validation error for invalid email', async () => {
    render(<LoginForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    fireEvent.blur(emailInput)
    
    await waitFor(() => {
      expect(screen.getByText(/email jest wymagany/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email format', async () => {
    render(<LoginForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.blur(emailInput)
    
    await waitFor(() => {
      expect(screen.getByText(/nieprawidłowy format email/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for short password', async () => {
    render(<LoginForm />)
    
    const passwordInput = screen.getByLabelText(/hasło/i)
    fireEvent.change(passwordInput, { target: { value: '123' } })
    fireEvent.blur(passwordInput)
    
    await waitFor(() => {
      expect(screen.getByText(/hasło musi mieć co najmniej 8 znaków/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    mockLogin.mockResolvedValue(null)
    
    render(<LoginForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/hasło/i)
    const submitButton = screen.getByRole('button', { name: /zaloguj się/i })
    
    fireEvent.change(emailInput, { target: { value: 'admin@mailer.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'admin@mailer.com',
        password: 'password123',
      })
    })
  })

  it('shows loading state during submission', () => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      clearError: mockClearError,
      isLoading: true,
      error: null,
      isAuthenticated: false,
      user: null,
      logout: vi.fn(),
    })
    
    render(<LoginForm />)
    
    expect(screen.getByRole('button', { name: /logowanie/i })).toBeInTheDocument()
  })

  it('shows error message when login fails', () => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      clearError: mockClearError,
      isLoading: false,
      error: 'Nieprawidłowy email lub hasło',
      isAuthenticated: false,
      user: null,
      logout: vi.fn(),
    })
    
    render(<LoginForm />)
    
    expect(screen.getByText(/nieprawidłowy email lub hasło/i)).toBeInTheDocument()
  })

  it('toggles password visibility', () => {
    render(<LoginForm />)
    
    const passwordInput = screen.getByLabelText(/hasło/i)
    const toggleButton = screen.getByRole('button', { name: '' }) // Eye icon button
    
    expect(passwordInput).toHaveAttribute('type', 'password')
    
    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'text')
    
    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })
}) 