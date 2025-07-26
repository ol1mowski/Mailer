import { Edit, Trash2 } from 'lucide-react';
import { Badge, Button } from '@/components/ui';
import type { Contact } from '../types/contact.types';

interface ContactCardProps {
  contact: Contact;
  onDelete: (contact: Contact) => void;
  onEdit: (contact: Contact) => void;
  isLoading: boolean;
}

export const ContactCard = ({ contact, onDelete, onEdit, isLoading }: ContactCardProps) => {
  const getInitials = (firstName: string) => {
    return firstName.charAt(0).toUpperCase();
  };

  const getFullName = (firstName: string) => {
    return firstName;
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold">
            {getInitials(contact.firstName)}
          </span>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{getFullName(contact.firstName)}</h3>
          <p className="text-sm text-gray-600">{contact.email}</p>
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
          {contact.status === 'active' ? 'Aktywny' : contact.status === 'inactive' ? 'Nieaktywny' : 'Wypisany'}
        </Badge>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(contact)}
            disabled={isLoading}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(contact)}
            disabled={isLoading}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}; 