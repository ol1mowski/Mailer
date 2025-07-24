import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '../auth.hook'

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useAuth())

    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBe(null)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)
  })

  it('should login successfully with correct credentials', async () => {
    const { result } = renderHook(() => useAuth())

    await act(async () => {
      const promise = result.current.login({
        email: 'admin@mailer.com',
        password: 'password123',
      })
      
      // Fast-forward time to simulate API delay
      vi.advanceTimersByTime(1000)
      await promise
    })

    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.user).toEqual({
      id: '1',
      email: 'admin@mailer.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: expect.any(String),
    })
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('auth_token', 'mock_jwt_token')
  })

  it('should fail login with incorrect credentials', async () => {
    const { result } = renderHook(() => useAuth())

    await act(async () => {
      const promise = result.current.login({
        email: 'wrong@email.com',
        password: 'wrongpassword',
      })
      
      vi.advanceTimersByTime(1000)
      await promise
    })

    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBe(null)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe('Nieprawidłowy email lub hasło')
  })

  it('should logout and clear state', () => {
    const { result } = renderHook(() => useAuth())

    act(() => {
      result.current.logout()
    })

    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBe(null)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('auth_token')
  })

  it('should clear error', () => {
    const { result } = renderHook(() => useAuth())

    // First set an error
    act(() => {
      result.current.clearError()
    })

    expect(result.current.error).toBe(null)
  })
}) 