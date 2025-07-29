import { Save, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui'
import type { EmailTemplate } from '../../types/emailTemplate.types'

interface FormActionsProps {
  onCancel: () => void
  isLoading: boolean
  template?: EmailTemplate | null
}

export const FormActions = ({
  onCancel,
  isLoading,
  template
}: FormActionsProps) => {
  return (
    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isLoading}
      >
        Anuluj
      </Button>
      <Button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            {template ? 'Aktualizuję...' : 'Tworzę...'}
          </>
        ) : (
          <>
            <Save className="h-4 w-4 mr-2" />
            {template ? 'Aktualizuj' : 'Utwórz'}
          </>
        )}
      </Button>
    </div>
  )
}