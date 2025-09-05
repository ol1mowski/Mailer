import { Loading, ErrorMessage } from '@/components/ui'
import { useSettings } from './hooks/useSettings.hook'
import { UserSettingsCard } from './components/UserSettingsCard.component'
import { EmailSettingsCard } from './components/EmailSettingsCard.component'
import { AccountStatusCard } from './components/AccountStatusCard.component'
import { SettingsHeader } from './components/SettingsHeader.component'

export const SettingsPage = () => {
  const {
    settings,
    isLoading,
    error,
    updateUserSettings,
    updateEmailSettings,
    saveSettings,
    clearError
  } = useSettings()

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage message={error} onClose={clearError} />
  }

  if (!settings) {
    return <ErrorMessage message="Nie udało się załadować ustawień" />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SettingsHeader onSave={saveSettings} isLoading={isLoading} hasUnsavedChanges={false} />

        <div className="mt-8 space-y-8">
          <UserSettingsCard
            userSettings={settings.user}
            onUpdateSettings={updateUserSettings}
            isLoading={isLoading}
          />

          <EmailSettingsCard
            emailSettings={settings.email}
            onUpdateSettings={(formData) => updateEmailSettings(formData.email)}
            isLoading={isLoading}
          />

          <AccountStatusCard
            accountStatus={settings.account}
          />
        </div>
      </div>
    </div>
  )
} 