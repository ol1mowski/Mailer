import { useState } from 'react'
import type { SettingsData, UserSettings, NotificationSettings, SecuritySettings, EmailSettings } from '../types/settings.types'
import { mockSettingsData } from '../data/mockSettings.data'
import { hasChanges } from '../utils/settingsUtils.utils'

export const useSettings = () => {
  const [settings, setSettings] = useState<SettingsData>(mockSettingsData)
  const [originalSettings] = useState<SettingsData>(mockSettingsData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const updateUserSettings = (userSettings: UserSettings) => {
    setSettings(prev => ({
      ...prev,
      user: userSettings
    }))
  }

  const updateNotificationSettings = (notificationSettings: NotificationSettings) => {
    setSettings(prev => ({
      ...prev,
      notifications: notificationSettings
    }))
  }

  const updateSecuritySettings = (securitySettings: SecuritySettings) => {
    setSettings(prev => ({
      ...prev,
      security: securitySettings
    }))
  }

  const updateEmailSettings = (emailSettings: EmailSettings) => {
    setSettings(prev => ({
      ...prev,
      email: emailSettings
    }))
  }

  const toggleNotification = (key: keyof NotificationSettings) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }))
  }

  const toggleTwoFactor = () => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        twoFactorAuth: !prev.security.twoFactorAuth
      }
    }))
  }

  const saveSettings = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Settings saved:', settings)
    } catch {
      setError('Nie udało się zapisać ustawień')
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => setError(null)

  const hasUnsavedChanges = hasChanges(originalSettings, settings)

  return {
    settings,
    isLoading,
    error,
    showPassword,
    setShowPassword,
    updateUserSettings,
    updateNotificationSettings,
    updateSecuritySettings,
    updateEmailSettings,
    toggleNotification,
    toggleTwoFactor,
    saveSettings,
    clearError,
    hasUnsavedChanges
  }
} 