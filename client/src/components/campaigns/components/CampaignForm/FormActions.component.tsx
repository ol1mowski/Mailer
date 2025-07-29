import { Button } from '@/components/ui'
import type { Campaign } from '@/lib/api'

interface FormActionsProps {
  onCancel: () => void
  isLoading: boolean
  campaign?: Campaign | null
}

export const FormActions = ({ onCancel, isLoading, campaign }: FormActionsProps) => {
  return (
    <div className="flex items-center justify-end gap-3 animate-in slide-in-from-bottom-4 duration-500 delay-900">
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
        className="bg-blue-600 hover:bg-blue-700"
      >
        {isLoading ? (
          <>
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            {campaign ? 'Aktualizuję...' : 'Tworzę...'}
          </>
        ) : (
          <>
            {campaign ? 'Zaktualizuj kampanię' : 'Utwórz kampanię'}
          </>
        )}
      </Button>
    </div>
  )
}