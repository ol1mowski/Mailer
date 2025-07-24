import { Bell } from 'lucide-react'
import { Button, Card } from '@/components/ui'
import type { NotificationSettings } from '../types/settings.types'

interface NotificationSettingsCardProps {
  notificationSettings: NotificationSettings
  onToggleNotification: (key: keyof NotificationSettings) => void
}

export const NotificationSettingsCard = ({ 
  notificationSettings, 
  onToggleNotification 
}: NotificationSettingsCardProps) => {
  return (
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
              onClick={() => onToggleNotification('emailNotifications')}
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
              onClick={() => onToggleNotification('campaignAlerts')}
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
              onClick={() => onToggleNotification('weeklyReports')}
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
              onClick={() => onToggleNotification('errorAlerts')}
            >
              {notificationSettings.errorAlerts ? 'Włączone' : 'Wyłączone'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
} 