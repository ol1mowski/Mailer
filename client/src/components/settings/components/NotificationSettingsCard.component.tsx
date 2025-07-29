import { Card } from '@/components/ui'
import { Label } from '@/components/ui'
import type { SettingsFormData } from '../types/settings.types'

interface NotificationSettingsCardProps {
  notificationSettings: SettingsFormData['notifications']
  onToggleNotification: (type: string) => void
  isLoading?: boolean
}

export const NotificationSettingsCard = ({ 
  notificationSettings, 
  onToggleNotification, 
  isLoading 
}: NotificationSettingsCardProps) => {
  const notificationTypes = [
    {
      key: 'email',
      label: 'Powiadomienia email',
      description: 'Otrzymuj powiadomienia na adres email'
    },
    {
      key: 'sms',
      label: 'Powiadomienia SMS',
      description: 'Otrzymuj powiadomienia SMS'
    },
    {
      key: 'campaign',
      label: 'Powiadomienia o kampaniach',
      description: 'Powiadomienia o statusie kampanii email'
    },
    {
      key: 'weekly',
      label: 'Cotygodniowe raporty',
      description: 'Automatyczne raporty co tydzień'
    },
    {
      key: 'monthly',
      label: 'Miesięczne raporty',
      description: 'Automatyczne raporty co miesiąc'
    }
  ]

  const getNotificationValue = (type: string): boolean => {
    switch (type) {
      case 'email':
        return notificationSettings.emailNotifications
      case 'sms':
        return notificationSettings.smsNotifications
      case 'campaign':
        return notificationSettings.campaignNotifications
      case 'weekly':
        return notificationSettings.weeklyReports
      case 'monthly':
        return notificationSettings.monthlyReports
      default:
        return false
    }
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Powiadomienia</h3>
        <p className="text-sm text-gray-600">
          Wybierz, które powiadomienia chcesz otrzymywać
        </p>
      </div>

      <div className="space-y-4">
        {notificationTypes.map((notification) => (
          <div key={notification.key} className="flex items-center justify-between">
            <div className="flex-1">
              <Label className="text-sm font-medium text-gray-900">
                {notification.label}
              </Label>
              <p className="text-sm text-gray-500 mt-1">
                {notification.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onToggleNotification(notification.key)}
              disabled={isLoading}
              className={`
                relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${getNotificationValue(notification.key) 
                  ? 'bg-blue-600' 
                  : 'bg-gray-200'
                }
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <span
                className={`
                  pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                  ${getNotificationValue(notification.key) 
                    ? 'translate-x-5' 
                    : 'translate-x-0'
                  }
                `}
              />
            </button>
          </div>
        ))}
      </div>
    </Card>
  )
} 