import { Users, Edit, Trash2, Mail, Calendar } from 'lucide-react'
import { Button, Card, Badge } from '@/components/ui'
import type { MailingList } from '../types/mailingList.types'
import { formatDate, getSubscribedContactsCount } from '../utils/mailingListUtils.utils'

interface MailingListCardProps {
  mailingList: MailingList
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onSendEmail: (id: string) => void
  isLoading: boolean
}

export const MailingListCard = ({ 
  mailingList, 
  onEdit, 
  onDelete, 
  onSendEmail,
  isLoading 
}: MailingListCardProps) => {
  const subscribedCount = getSubscribedContactsCount(mailingList)

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {mailingList.name}
          </h3>
          {mailingList.description && (
            <p className="text-sm text-gray-600 mb-2">
              {mailingList.description}
            </p>
          )}
          <div className="flex flex-wrap gap-1 mb-3">
            {mailingList.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(mailingList.id)}
            disabled={isLoading}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(mailingList.id)}
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          <span>{subscribedCount} / {mailingList.contacts.length} subskrybentów</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Utworzono: {formatDate(mailingList.createdAt)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSendEmail(mailingList.id)}
          disabled={isLoading || mailingList.contacts.length === 0}
        >
          <Mail className="h-4 w-4 mr-2" />
          Wyślij mail
        </Button>
        
        <div className="text-xs text-gray-400">
          Ostatnia aktualizacja: {formatDate(mailingList.updatedAt)}
        </div>
      </div>
    </Card>
  )
} 