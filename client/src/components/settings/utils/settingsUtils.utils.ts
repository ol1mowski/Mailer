import type { SettingsData } from '../types/settings.types'

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  return password.length >= 8
}

export const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    active: 'text-green-600',
    inactive: 'text-gray-600',
    suspended: 'text-red-600'
  }
  return colorMap[status] || 'text-gray-600'
}

export const getStatusBadgeVariant = (status: string): string => {
  const variantMap: Record<string, string> = {
    active: 'default',
    inactive: 'secondary',
    suspended: 'destructive'
  }
  return variantMap[status] || 'secondary'
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pl-PL')
}

export const hasChanges = (original: SettingsData, current: SettingsData): boolean => {
  return JSON.stringify(original) !== JSON.stringify(current)
} 