import { Plus } from 'lucide-react'
import { Button, Loading } from '@/components/ui'

interface EmailTemplateHeaderProps {
  onAddTemplate: () => void
  isLoading: boolean
}

export const EmailTemplateHeader = ({ onAddTemplate, isLoading }: EmailTemplateHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Szablony email</h1>
        <p className="text-gray-600">Zarządzaj szablonami wiadomości email</p>
      </div>
      <Button onClick={onAddTemplate} disabled={isLoading}>
        {isLoading ? (
          <Loading size="sm" variant="dots" />
        ) : (
          <>
            <Plus className="h-4 w-4 mr-2" />
            Nowy szablon
          </>
        )}
      </Button>
    </div>
  )
} 