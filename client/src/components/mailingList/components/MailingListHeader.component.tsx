import { Plus } from 'lucide-react'
import { Button } from '@/components/ui'

interface MailingListHeaderProps {
  onAddList: () => void
  isLoading: boolean
}

export const MailingListHeader = ({ onAddList, isLoading }: MailingListHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Listy mailingowe</h1>
        <p className="text-gray-600 mt-1">
          Zarządzaj listami kontaktów do wysyłania maili
        </p>
      </div>
      <Button onClick={onAddList} disabled={isLoading}>
        <Plus className="h-4 w-4 mr-2" />
        Nowa lista
      </Button>
    </div>
  )
} 