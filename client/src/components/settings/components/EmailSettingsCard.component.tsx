import { Mail } from 'lucide-react'
import { Input, Card, Badge } from '@/components/ui'
import type { EmailSettings } from '../types/settings.types'

interface EmailSettingsCardProps {
  emailSettings: EmailSettings
  onUpdateSettings: (settings: EmailSettings) => void
}

export const EmailSettingsCard = ({ emailSettings, onUpdateSettings }: EmailSettingsCardProps) => {
  const handleChange = (field: keyof EmailSettings, value: string | number | boolean) => {
    onUpdateSettings({
      ...emailSettings,
      [field]: value
    })
  }

  return (
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
              value={emailSettings.defaultSender}
              onChange={(e) => handleChange('defaultSender', e.target.value)}
              placeholder="Wprowadź adres email nadawcy"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nazwa nadawcy
            </label>
            <Input
              value={emailSettings.senderName}
              onChange={(e) => handleChange('senderName', e.target.value)}
              placeholder="Wprowadź nazwę nadawcy"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Limit wysyłki (na godzinę)
            </label>
            <Input
              type="number"
              value={emailSettings.sendLimit}
              onChange={(e) => handleChange('sendLimit', parseInt(e.target.value) || 1000)}
              min="100"
              max="10000"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Automatyczne śledzenie</h3>
              <p className="text-xs text-gray-500">Śledź otwarcia i kliknięcia</p>
            </div>
            <Badge variant="default" className="text-xs">
              {emailSettings.autoTracking ? 'Włączone' : 'Wyłączone'}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Spam check</h3>
              <p className="text-xs text-gray-500">Sprawdzaj spam score</p>
            </div>
            <Badge variant="default" className="text-xs">
              {emailSettings.spamCheck ? 'Włączone' : 'Wyłączone'}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  )
} 