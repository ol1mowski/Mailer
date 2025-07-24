import { useState } from 'react'
import { User, Bell, Shield, Mail, Globe, Save, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button.component'
import { Input } from '@/components/ui/input.component'
import { Card } from '@/components/ui/card.component'
import { Badge } from '@/components/ui/badge.component'

interface UserSettings {
  name: string
  email: string
  company: string
  timezone: string
  language: string
}

interface NotificationSettings {
  emailNotifications: boolean
  campaignAlerts: boolean
  weeklyReports: boolean
  errorAlerts: boolean
}

interface SecuritySettings {
  twoFactorAuth: boolean
  sessionTimeout: number
  passwordExpiry: number
}

const mockUserSettings: UserSettings = {
  name: 'Admin User',
  email: 'admin@mailer.com',
  company: 'Mailer Company',
  timezone: 'Europe/Warsaw',
  language: 'pl',
}

const mockNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  campaignAlerts: true,
  weeklyReports: false,
  errorAlerts: true,
}

const mockSecuritySettings: SecuritySettings = {
  twoFactorAuth: false,
  sessionTimeout: 30,
  passwordExpiry: 90,
}

export const SettingsPage = () => {
  const [userSettings, setUserSettings] = useState<UserSettings>(mockUserSettings)
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(mockNotificationSettings)
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(mockSecuritySettings)
  const [showPassword, setShowPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const timezones = [
    { value: 'Europe/Warsaw', label: 'Warszawa (UTC+1)' },
    { value: 'Europe/London', label: 'Londyn (UTC+0)' },
    { value: 'America/New_York', label: 'Nowy Jork (UTC-5)' },
    { value: 'Asia/Tokyo', label: 'Tokio (UTC+9)' },
  ]

  const languages = [
    { value: 'pl', label: 'Polski' },
    { value: 'en', label: 'English' },
    { value: 'de', label: 'Deutsch' },
    { value: 'fr', label: 'Français' },
  ]

  const handleSaveSettings = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    // TODO: Show success message
  }

  const handleToggleNotification = (key: keyof NotificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleToggleTwoFactor = () => {
    setSecuritySettings(prev => ({
      ...prev,
      twoFactorAuth: !prev.twoFactorAuth,
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ustawienia</h1>
          <p className="text-gray-600">Zarządzaj ustawieniami swojego konta</p>
        </div>
        <Button onClick={handleSaveSettings} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Zapisywanie...' : 'Zapisz zmiany'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <User className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Profil</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imię i nazwisko
                </label>
                <Input
                  value={userSettings.name}
                  onChange={(e) => setUserSettings(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Wprowadź imię i nazwisko"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  value={userSettings.email}
                  onChange={(e) => setUserSettings(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Wprowadź email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Firma
                </label>
                <Input
                  value={userSettings.company}
                  onChange={(e) => setUserSettings(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Wprowadź nazwę firmy"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Strefa czasowa
                </label>
                <select
                  value={userSettings.timezone}
                  onChange={(e) => setUserSettings(prev => ({ ...prev, timezone: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  {timezones.map(timezone => (
                    <option key={timezone.value} value={timezone.value}>
                      {timezone.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Język
                </label>
                <select
                  value={userSettings.language}
                  onChange={(e) => setUserSettings(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  {languages.map(language => (
                    <option key={language.value} value={language.value}>
                      {language.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <Bell className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Powiadomienia</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Powiadomienia email</h3>
                  <p className="text-xs text-gray-500">Otrzymuj powiadomienia na email</p>
                </div>
                <Button
                  variant={notificationSettings.emailNotifications ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleToggleNotification('emailNotifications')}
                >
                  {notificationSettings.emailNotifications ? 'Włączone' : 'Wyłączone'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Alerty kampanii</h3>
                  <p className="text-xs text-gray-500">Powiadomienia o statusie kampanii</p>
                </div>
                <Button
                  variant={notificationSettings.campaignAlerts ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleToggleNotification('campaignAlerts')}
                >
                  {notificationSettings.campaignAlerts ? 'Włączone' : 'Wyłączone'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Raporty tygodniowe</h3>
                  <p className="text-xs text-gray-500">Automatyczne raporty co tydzień</p>
                </div>
                <Button
                  variant={notificationSettings.weeklyReports ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleToggleNotification('weeklyReports')}
                >
                  {notificationSettings.weeklyReports ? 'Włączone' : 'Wyłączone'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Alerty błędów</h3>
                  <p className="text-xs text-gray-500">Powiadomienia o błędach systemu</p>
                </div>
                <Button
                  variant={notificationSettings.errorAlerts ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleToggleNotification('errorAlerts')}
                >
                  {notificationSettings.errorAlerts ? 'Włączone' : 'Wyłączone'}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <Shield className="h-6 w-6 text-red-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Bezpieczeństwo</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Uwierzytelnianie dwuskładnikowe</h3>
                  <p className="text-xs text-gray-500">Dodatkowa warstwa bezpieczeństwa</p>
                </div>
                <Button
                  variant={securitySettings.twoFactorAuth ? 'default' : 'outline'}
                  size="sm"
                  onClick={handleToggleTwoFactor}
                >
                  {securitySettings.twoFactorAuth ? 'Włączone' : 'Wyłączone'}
                </Button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timeout sesji (minuty)
                </label>
                <Input
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings(prev => ({ 
                    ...prev, 
                    sessionTimeout: parseInt(e.target.value) || 30 
                  }))}
                  min="5"
                  max="480"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Wygasanie hasła (dni)
                </label>
                <Input
                  type="number"
                  value={securitySettings.passwordExpiry}
                  onChange={(e) => setSecuritySettings(prev => ({ 
                    ...prev, 
                    passwordExpiry: parseInt(e.target.value) || 90 
                  }))}
                  min="30"
                  max="365"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nowe hasło
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Wprowadź nowe hasło"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Email Settings */}
        <Card>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <Mail className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Ustawienia Email</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Domyślny nadawca
                </label>
                <Input
                  value="noreply@mailer.com"
                  placeholder="Wprowadź adres email nadawcy"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nazwa nadawcy
                </label>
                <Input
                  value="Mailer System"
                  placeholder="Wprowadź nazwę nadawcy"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Limit wysyłki (na godzinę)
                </label>
                <Input
                  type="number"
                  value="1000"
                  min="100"
                  max="10000"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Automatyczne śledzenie</h3>
                  <p className="text-xs text-gray-500">Śledź otwarcia i kliknięcia</p>
                </div>
                <Badge variant="default" className="text-xs">Włączone</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Spam check</h3>
                  <p className="text-xs text-gray-500">Sprawdzaj spam score</p>
                </div>
                <Badge variant="default" className="text-xs">Włączone</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Account Status */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Status konta</h2>
              <p className="text-sm text-gray-600">Plan: Professional • Aktywne do: 31.12.2024</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="default">Aktywne</Badge>
              <Button variant="outline" size="sm">
                Zmień plan
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 