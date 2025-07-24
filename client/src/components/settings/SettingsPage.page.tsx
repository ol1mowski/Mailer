import { useSettings } from './hooks/useSettings.hook'
import { SettingsHeader } from './components/SettingsHeader.component'
import { UserSettingsCard } from './components/UserSettingsCard.component'
import { NotificationSettingsCard } from './components/NotificationSettingsCard.component'
import { SecuritySettingsCard } from './components/SecuritySettingsCard.component'
import { EmailSettingsCard } from './components/EmailSettingsCard.component'
import { AccountStatusCard } from './components/AccountStatusCard.component'
import { ErrorMessage } from '@/components/ui'

export const SettingsPage = () => {
  const {
    settings,
    isLoading,
    error,
    showPassword,
    setShowPassword,
    updateUserSettings,
    updateSecuritySettings,
    updateEmailSettings,
    toggleNotification,
    toggleTwoFactor,
    saveSettings,
    clearError,
    hasUnsavedChanges
  } = useSettings()

  return (
    <div className="space-y-6">
      {error && (
        <ErrorMessage 
          message={error} 
          onClose={clearError}
        />
      )}

      <SettingsHeader 
        onSave={saveSettings}
        isLoading={isLoading}
        hasUnsavedChanges={hasUnsavedChanges}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserSettingsCard 
          userSettings={settings.user}
          onUpdateSettings={updateUserSettings}
        />

        <NotificationSettingsCard 
          notificationSettings={settings.notifications}
          onToggleNotification={toggleNotification}
        />

        <SecuritySettingsCard 
          securitySettings={settings.security}
          onUpdateSettings={updateSecuritySettings}
          onToggleTwoFactor={toggleTwoFactor}
          showPassword={showPassword}
          onTogglePasswordVisibility={() => setShowPassword(!showPassword)}
        />

        <EmailSettingsCard 
          emailSettings={settings.email}
          onUpdateSettings={updateEmailSettings}
        />
      </div>

      <AccountStatusCard accountStatus={settings.account} />
    </div>
  )
} 