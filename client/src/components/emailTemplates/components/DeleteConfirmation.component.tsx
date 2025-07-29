import { AlertTriangle, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui'
import type { EmailTemplate } from '../types/emailTemplate.types'

interface DeleteConfirmationProps {
  template: EmailTemplate | null
  onConfirm: () => void
  onCancel: () => void
  isLoading: boolean
}

export const DeleteConfirmation = ({ 
  template, 
  onConfirm, 
  onCancel, 
  isLoading 
}: DeleteConfirmationProps) => {
  if (!template) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Potwierdź usunięcie</h3>
              <p className="text-sm text-gray-600">Ta akcja nie może być cofnięta</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              disabled={isLoading}
              className="ml-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-2">
              Czy na pewno chcesz usunąć szablon:
            </p>
            <div className="bg-gray-50 rounded-md p-3">
              <p className="font-medium text-gray-900">{template.name}</p>
              <p className="text-sm text-gray-600">{template.subject}</p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Anuluj
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Usuwam...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Usuń szablon
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}