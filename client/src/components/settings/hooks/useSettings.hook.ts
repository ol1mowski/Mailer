import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { settingsApi } from '@/lib/api'
import type { UserSettings, UpdateUserSettingsRequest } from '@/lib/api'
import type { SettingsFormData } from '../types/settings.types'

export const useSettings = () => {
  const queryClient = useQueryClient()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string>('')

  const {
    data: settings,
    isLoading,
    error: fetchError
  } = useQuery({
    queryKey: ['userSettings'],
    queryFn: settingsApi.getUserSettings,
    staleTime: 5 * 60 * 1000, // 5 minut
  })

  const updateSettingsMutation = useMutation({
    mutationFn: settingsApi.updateUserSettings,
    onSuccess: (updatedSettings: UserSettings) => {
      queryClient.setQueryData(['userSettings'], updatedSettings)
      toast.success('Ustawienia zostały zaktualizowane')
      setError('')
    },
    onError: (error: Error) => {
      setError(`Błąd aktualizacji ustawień: ${error.message}`)
      toast.error('Błąd aktualizacji ustawień')
    }
  })

  const mapSettingsToFormData = (settings: UserSettings): SettingsFormData => ({
    user: {
      firstName: settings.firstName || '',
      lastName: settings.lastName || '',
      timezone: settings.timezone || 'Europe/Warsaw',
    },
    email: {
      resendApiKey: settings.resendApiKey || '',
      fromEmail: settings.fromEmail || '',
      fromName: settings.fromName || '',
      replyToEmail: settings.replyToEmail || '',
      customDomain: settings.customDomain || '',
    },
    account: {
      status: settings.accountStatus || 'ACTIVE',
      plan: settings.subscriptionPlan || 'FREE',
      expires: settings.subscriptionExpires || '',
    },
  })

  const mapFormDataToApiRequest = (formData: SettingsFormData): UpdateUserSettingsRequest => ({
    firstName: formData.user.firstName,
    lastName: formData.user.lastName,
    timezone: formData.user.timezone,
    resendApiKey: formData.email.resendApiKey,
    fromEmail: formData.email.fromEmail,
    fromName: formData.email.fromName,
    replyToEmail: formData.email.replyToEmail,
    customDomain: formData.email.customDomain,
  })

  const updateUserSettings = (formData: SettingsFormData) => {
    const apiRequest = mapFormDataToApiRequest(formData)
    updateSettingsMutation.mutate(apiRequest)
  }

  const updateEmailSettings = (emailData: SettingsFormData['email']) => {
    if (!settings) return
    
    const formData = mapSettingsToFormData(settings)
    formData.email = emailData
    updateUserSettings(formData)
  }

  const saveSettings = (formData: SettingsFormData) => {
    updateUserSettings(formData)
  }

  const clearError = () => setError('')

  const hasUnsavedChanges = false 
  
  const mappedSettings = settings ? mapSettingsToFormData(settings) : null

  return {
    settings: mappedSettings,
    rawSettings: settings,
    isLoading: isLoading || updateSettingsMutation.isPending,
    error: error || fetchError?.message || '',
    showPassword,
    setShowPassword,
    updateUserSettings,
    updateEmailSettings,
    saveSettings,
    clearError,
    hasUnsavedChanges
  }
} 