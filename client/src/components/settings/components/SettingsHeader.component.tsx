import { Settings, Save } from 'lucide-react'
import { Button, Loading } from '@/components/ui'
import type { SettingsFormData } from '../types/settings.types'

interface SettingsHeaderProps {
  onSave: (formData: SettingsFormData) => void
  isLoading: boolean
  hasUnsavedChanges: boolean
}

export const SettingsHeader = ({ onSave, isLoading, hasUnsavedChanges }: SettingsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center">
        <Settings className="h-6 w-6 text-blue-600 mr-3" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ustawienia</h1>
          <p className="text-gray-600">Zarządzaj ustawieniami swojego konta</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {hasUnsavedChanges && (
          <span className="text-sm text-yellow-600 bg-yellow-50 px-3 py-1 rounded-md">
            Masz niezapisane zmiany
          </span>
        )}
        
        <Button 
          onClick={() => onSave({
            user: { firstName: '', lastName: '', timezone: '' },
            email: { smtpHost: '', smtpPort: 587, smtpUsername: '', smtpPassword: '', smtpEncryption: 'TLS', fromEmail: '', fromName: '', replyToEmail: '' },
            account: { status: '', plan: '', expires: '' }
          })}
          disabled={isLoading || !hasUnsavedChanges}
          className="flex items-center"
        >
          {isLoading ? (
            <Loading size="sm" variant="dots" />
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Zapisz zmiany
            </>
          )}
        </Button>
      </div>
    </div>
  )
} 