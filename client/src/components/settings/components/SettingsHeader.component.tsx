import { Save } from 'lucide-react'
import { Button } from '@/components/ui'

interface SettingsHeaderProps {
  onSave: () => void
  isLoading: boolean
  hasUnsavedChanges: boolean
}

export const SettingsHeader = ({ onSave, isLoading, hasUnsavedChanges }: SettingsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ustawienia</h1>
        <p className="text-gray-600">Zarządzaj ustawieniami swojego konta</p>
      </div>
      <Button 
        onClick={onSave} 
        disabled={isLoading || !hasUnsavedChanges}
      >
        <Save className="h-4 w-4 mr-2" />
        {isLoading ? 'Zapisywanie...' : 'Zapisz zmiany'}
      </Button>
    </div>
  )
} 