import { Shield, Eye, EyeOff } from 'lucide-react'
import { Input, Button, Card } from '@/components/ui'
import type { SecuritySettings } from '../types/settings.types'

interface SecuritySettingsCardProps {
  securitySettings: SecuritySettings
  onUpdateSettings: (settings: SecuritySettings) => void
  onToggleTwoFactor: () => void
  showPassword: boolean
  onTogglePasswordVisibility: () => void
}

export const SecuritySettingsCard = ({ 
  securitySettings, 
  onUpdateSettings, 
  onToggleTwoFactor,
  showPassword,
  onTogglePasswordVisibility
}: SecuritySettingsCardProps) => {
  const handleChange = (field: keyof SecuritySettings, value: number) => {
    onUpdateSettings({
      ...securitySettings,
      [field]: value
    })
  }

  return (
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
              onClick={onToggleTwoFactor}
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
              onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value) || 30)}
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
              onChange={(e) => handleChange('passwordExpiry', parseInt(e.target.value) || 90)}
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
                onClick={onTogglePasswordVisibility}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
} 