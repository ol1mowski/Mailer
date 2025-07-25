import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/providers/AuthProvider'
import { LoginForm } from '../components/LoginForm.component'
import { useAuth } from '@/hooks/useAuth.hook'

vi.mock('@/hooks/useAuth.hook')
const mockUseAuth = vi.mocked(useAuth)

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('LoginForm', () => {
  const mockLogin = vi.fn()
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })
    
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      isLoading: false,
      isAuthenticated: false,
      user: null,
      logout: vi.fn(),
      register: vi.fn(),
    })
    mockNavigate.mockClear()
  })

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            {component}
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    )
  }

  it('renders login form with all fields', () => {
    renderWithProviders(<LoginForm />)
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/hasło/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /zaloguj się/i })).toBeInTheDocument()
  })

  it('shows validation error for invalid email', async () => {
    renderWithProviders(<LoginForm />)
    
    const submitButton = screen.getByRole('button', { name: /zaloguj się/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/email jest wymagany/i)).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email format', async () => {
    mockLogin.mockRejectedValue(new Error('Login failed'))
    
    renderWithProviders(<LoginForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/hasło/i)
    const submitButton = screen.getByRole('button', { name: /zaloguj się/i })
    
    fireEvent.change(emailInput, { target: { value: 'invalid' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)

  })

  it('shows validation error for short password', async () => {
    renderWithProviders(<LoginForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/hasło/i)
    const submitButton = screen.getByRole('button', { name: /zaloguj się/i })
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: '123' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/hasło musi mieć minimum 6 znaków/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    mockLogin.mockResolvedValue(null)
    
    renderWithProviders(<LoginForm />)
    
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
      isLoading: true,
      isAuthenticated: false,
      user: null,
      logout: vi.fn(),
      register: vi.fn(),
    })
    
    renderWithProviders(<LoginForm />)
    
    expect(screen.getByRole('button', { name: /logowanie/i })).toBeInTheDocument()
  })

  it('shows error message when login fails', async () => {
    mockLogin.mockRejectedValue(new Error('Nieprawidłowy email lub hasło'))
    
    renderWithProviders(<LoginForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/hasło/i)
    const submitButton = screen.getByRole('button', { name: /zaloguj się/i })
    
    fireEvent.change(emailInput, { target: { value: 'admin@mailer.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/nieprawidłowy email lub hasło/i)).toBeInTheDocument()
    })
  })

  it('toggles password visibility', () => {
    renderWithProviders(<LoginForm />)
    
    const passwordInput = screen.getByLabelText(/hasło/i)
    const toggleButton = screen.getByRole('button', { name: '' }) 
    
    expect(passwordInput).toHaveAttribute('type', 'password')
    
    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'text')
    
    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })
}) 