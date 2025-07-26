import { Phone, MoreHorizontal } from 'lucide-react'
import { Badge, Button } from '@/components/ui'
import type { Contact } from '../types/contact.types'
import { getInitials, getFullName } from '../utils/contactUtils.utils';

interface ContactCardProps {
  contact: Contact;
  onDelete: (id: number) => void;
  isLoading: boolean;
}

export const ContactCard = ({ contact, onDelete, isLoading }: ContactCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold">
            {getInitials(contact.firstName, contact.lastName)}
          </span>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{getFullName(contact.firstName, contact.lastName)}</h3>
          <p className="text-sm text-gray-600">{contact.email}</p>
          {contact.phone && (
            <p className="text-sm text-gray-500 flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              {contact.phone}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex flex-wrap gap-1">
          {contact.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Badge
          variant={contact.status === 'active' ? 'default' : 'secondary'}
          className="text-xs"
        >
          {contact.status === 'active' ? 'Aktywny' : 'Nieaktywny'}
        </Badge>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(contact.id)}
          disabled={isLoading}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 