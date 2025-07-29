import { Card } from '@/components/ui'
import { Button } from '@/components/ui'
import type { SettingsFormData } from '../types/settings.types'

interface SecuritySettingsCardProps {
  securitySettings: SettingsFormData['security']
  onToggleNotification: (type: string) => void
  isLoading?: boolean
}

export const SecuritySettingsCard = ({ securitySettings, onToggleNotification, isLoading }: SecuritySettingsCardProps) => {
  const securityOptions = [
    {
      key: 'loginNotifications',
      label: 'Powiadomienia o logowaniu',
      description: 'Otrzymuj powiadomienia o nowych logowaniach do konta',
      value: securitySettings.loginNotifications
    },
    {
      key: 'passwordChangeReminder',
      label: 'Przypomnienia o zmianie hasła',
      description: 'Otrzymuj przypomnienia o regularnej zmianie hasła',
      value: securitySettings.passwordChangeReminder
    }
  ]

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Ustawienia bezpieczeństwa</h3>
        <p className="text-sm text-gray-600">
          Zarządzaj ustawieniami bezpieczeństwa swojego konta
        </p>
      </div>

      <div className="space-y-4">
        {securityOptions.map((option) => (
          <div key={option.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{option.label}</h4>
              <p className="text-sm text-gray-600 mt-1">{option.description}</p>
            </div>
            
            <Button
              variant={option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => onToggleNotification(option.key)}
              disabled={isLoading}
              className="ml-4"
            >
              {option.value ? 'Włączone' : 'Wyłączone'}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
} 