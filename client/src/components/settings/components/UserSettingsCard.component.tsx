import { useState } from 'react'
import { Card } from '@/components/ui'
import { Input, Label } from '@/components/ui'
import { TIMEZONES } from '../types/settings.types'
import type { SettingsFormData } from '../types/settings.types'

interface UserSettingsCardProps {
  userSettings: SettingsFormData['user']
  onUpdateSettings: (formData: SettingsFormData) => void
  isLoading?: boolean
}

export const UserSettingsCard = ({ userSettings, onUpdateSettings, isLoading }: UserSettingsCardProps) => {
  const [formData, setFormData] = useState(userSettings)

  const handleInputChange = (field: keyof typeof userSettings, value: string) => {
    const updatedData = { ...formData, [field]: value }
    setFormData(updatedData)
    
    // Aktualizuj ustawienia w rodzicu
    onUpdateSettings({
      user: updatedData,
      notifications: { emailNotifications: false, smsNotifications: false, campaignNotifications: false, weeklyReports: false, monthlyReports: false },
      security: { loginNotifications: false, passwordChangeReminder: false },
      email: { smtpHost: '', smtpPort: 587, smtpUsername: '', smtpPassword: '', smtpEncryption: 'TLS', fromEmail: '', fromName: '', replyToEmail: '' },
      account: { status: '', plan: '', expires: '', storageUsed: 0, storageLimit: 0 }
    })
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Informacje osobiste</h3>
        <p className="text-sm text-gray-600">
          Zaktualizuj swoje dane osobowe i preferencje
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">Imię *</Label>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              disabled={isLoading}
              placeholder="Wprowadź imię"
            />
          </div>

          <div>
            <Label htmlFor="lastName">Nazwisko</Label>
            <Input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              disabled={isLoading}
              placeholder="Wprowadź nazwisko"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="timezone">Strefa czasowa</Label>
          <select
            id="timezone"
            value={formData.timezone}
            onChange={(e) => handleInputChange('timezone', e.target.value)}
            disabled={isLoading}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {TIMEZONES.map((timezone) => (
              <option key={timezone.value} value={timezone.value}>
                {timezone.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  )
} 