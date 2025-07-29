import { useState } from 'react'
import { Card } from '@/components/ui'
import { Input, Label } from '@/components/ui'
import { SMTP_ENCRYPTION_OPTIONS } from '../types/settings.types'
import type { SettingsFormData } from '../types/settings.types'

interface EmailSettingsCardProps {
  emailSettings: SettingsFormData['email']
  onUpdateSettings: (formData: SettingsFormData) => void
  isLoading?: boolean
}

export const EmailSettingsCard = ({ emailSettings, onUpdateSettings, isLoading }: EmailSettingsCardProps) => {
  const [formData, setFormData] = useState(emailSettings)

  const handleInputChange = (field: keyof typeof emailSettings, value: string | number) => {
    const updatedData = { ...formData, [field]: value }
    setFormData(updatedData)
    
    // Aktualizuj ustawienia w rodzicu
    onUpdateSettings({
      user: { firstName: '', lastName: '', timezone: '' },
      notifications: { emailNotifications: false, smsNotifications: false, campaignNotifications: false, weeklyReports: false, monthlyReports: false },
      security: { loginNotifications: false, passwordChangeReminder: false },
      email: updatedData,
      account: { status: '', plan: '', expires: '', storageUsed: 0, storageLimit: 0 }
    })
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Ustawienia SMTP</h3>
        <p className="text-sm text-gray-600">
          Skonfiguruj serwer SMTP do wysyłania emaili
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="smtpHost">Serwer SMTP</Label>
            <Input
              id="smtpHost"
              type="text"
              value={formData.smtpHost}
              onChange={(e) => handleInputChange('smtpHost', e.target.value)}
              disabled={isLoading}
              placeholder="smtp.gmail.com"
            />
          </div>

          <div>
            <Label htmlFor="smtpPort">Port SMTP</Label>
            <Input
              id="smtpPort"
              type="number"
              value={formData.smtpPort}
              onChange={(e) => handleInputChange('smtpPort', parseInt(e.target.value) || 587)}
              disabled={isLoading}
              placeholder="587"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="smtpUsername">Nazwa użytkownika</Label>
            <Input
              id="smtpUsername"
              type="text"
              value={formData.smtpUsername}
              onChange={(e) => handleInputChange('smtpUsername', e.target.value)}
              disabled={isLoading}
              placeholder="twoj@email.com"
            />
          </div>

          <div>
            <Label htmlFor="smtpPassword">Hasło</Label>
            <Input
              id="smtpPassword"
              type="password"
              value={formData.smtpPassword}
              onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
              disabled={isLoading}
              placeholder="Wprowadź hasło"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="smtpEncryption">Szyfrowanie</Label>
          <select
            id="smtpEncryption"
            value={formData.smtpEncryption}
            onChange={(e) => handleInputChange('smtpEncryption', e.target.value)}
            disabled={isLoading}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {SMTP_ENCRYPTION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-md font-medium text-gray-900 mb-4">Ustawienia nadawcy</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fromEmail">Email nadawcy</Label>
              <Input
                id="fromEmail"
                type="email"
                value={formData.fromEmail}
                onChange={(e) => handleInputChange('fromEmail', e.target.value)}
                disabled={isLoading}
                placeholder="noreply@twoja-firma.com"
              />
            </div>

            <div>
              <Label htmlFor="fromName">Nazwa nadawcy</Label>
              <Input
                id="fromName"
                type="text"
                value={formData.fromName}
                onChange={(e) => handleInputChange('fromName', e.target.value)}
                disabled={isLoading}
                placeholder="Twoja Firma"
              />
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="replyToEmail">Email odpowiedzi</Label>
            <Input
              id="replyToEmail"
              type="email"
              value={formData.replyToEmail}
              onChange={(e) => handleInputChange('replyToEmail', e.target.value)}
              disabled={isLoading}
              placeholder="support@twoja-firma.com"
            />
          </div>
        </div>
      </div>
    </Card>
  )
} 