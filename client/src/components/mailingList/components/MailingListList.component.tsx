import { Mail, Plus } from 'lucide-react'
import { Button, Card } from '@/components/ui'
import type { MailingList } from '../types/mailingList.types'
import { MailingListCard } from './MailingListCard.component'

interface MailingListListProps {
  mailingLists: MailingList[]
  onAddList: () => void
  onEditList: (id: string) => void
  onDeleteList: (id: string) => void
  onSendEmail: (id: string) => void
  isLoading: boolean
  hasFilters: boolean
}

export const MailingListListComponent = ({ 
  mailingLists,
  onAddList,
  onEditList,
  onDeleteList,
  onSendEmail,
  isLoading,
  hasFilters
}: MailingListListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mailingLists.map(mailingList => (
        <MailingListCard
          key={mailingList.id}
          mailingList={mailingList}
          onEdit={onEditList}
          onDelete={onDeleteList}
          onSendEmail={onSendEmail}
          isLoading={isLoading}
        />
      ))}
      
      {mailingLists.length === 0 && (
        <Card>
          <div className="p-12 text-center">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {hasFilters ? 'Nie znaleziono list' : 'Brak list mailingowych'}
            </h3>
            <p className="text-gray-600 mb-4">
              {hasFilters 
                ? 'Spróbuj zmienić kryteria wyszukiwania'
                : 'Utwórz pierwszą listę mailingową, aby rozpocząć'
              }
            </p>
            {!hasFilters && (
              <Button onClick={onAddList}>
                <Plus className="h-4 w-4 mr-2" />
                Utwórz listę
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  )
} 