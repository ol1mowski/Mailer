import { User } from 'lucide-react'
import { Input, Card } from '@/components/ui'
import type { UserSettings } from '../types/settings.types'
import { timezones, languages } from '../data/mockSettings.data'

interface UserSettingsCardProps {
  userSettings: UserSettings
  onUpdateSettings: (settings: UserSettings) => void
}

export const UserSettingsCard = ({ userSettings, onUpdateSettings }: UserSettingsCardProps) => {
  const handleChange = (field: keyof UserSettings, value: string) => {
    onUpdateSettings({
      ...userSettings,
      [field]: value
    })
  }

  return (
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
              onChange={(e) => handleChange('name', e.target.value)}
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
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Wprowadź email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Firma
            </label>
            <Input
              value={userSettings.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="Wprowadź nazwę firmy"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Strefa czasowa
            </label>
            <select
              value={userSettings.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
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
              onChange={(e) => handleChange('language', e.target.value)}
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
  )
} 