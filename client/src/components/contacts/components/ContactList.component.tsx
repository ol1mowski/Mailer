import { User, Plus } from 'lucide-react'
import { Card, Button, Loading } from '@/components/ui'
import type { Contact } from '../types/contact.types'
import { ContactCard } from './ContactCard.component'

interface ContactListProps {
  contacts: Contact[];
  onDelete: (contact: Contact) => void;
  onEdit: (contact: Contact) => void;
  onAddContact: () => void;
  isLoading: boolean;
  hasFilters: boolean;
}

export const ContactList = ({ 
  contacts, 
  onDelete, 
  onEdit,
  onAddContact, 
  isLoading, 
  hasFilters 
}: ContactListProps) => {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Lista kontaktów ({contacts.length})
          </h2>
          {isLoading && <Loading size="sm" variant="dots" />}
        </div>
        
        <div className="space-y-4">
          {contacts.map(contact => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDelete={onDelete}
              onEdit={onEdit}
              isLoading={isLoading}
            />
          ))}
          
          {contacts.length === 0 && (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Brak kontaktów</h3>
              <p className="text-gray-600 mb-4">
                {hasFilters 
                  ? 'Nie znaleziono kontaktów pasujących do filtrów'
                  : 'Dodaj swój pierwszy kontakt, aby rozpocząć'
                }
              </p>
              {!hasFilters && (
                <Button onClick={onAddContact} disabled={isLoading}>
                  <Plus className="h-4 w-4 mr-2" />
                  Dodaj kontakt
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}; 