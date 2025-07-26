import { AlertTriangle, Trash2, User } from 'lucide-react';
import { Button } from '@/components/ui';
import type { Contact } from '../types/contact.types';
import { getFullName } from '../utils/contactUtils.utils';

interface DeleteConfirmationProps {
  contact: Contact | null;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const DeleteConfirmationComponent = ({ 
  contact, 
  onConfirm, 
  onCancel, 
  isLoading = false 
}: DeleteConfirmationProps) => {
  if (!contact) return null;

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <Trash2 className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Potwierdź usunięcie
        </h3>
        <p className="text-gray-600">
          Ta akcja nie może być cofnięta
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-gray-900">
              {getFullName(contact.firstName)}
            </p>
            <p className="text-sm text-gray-600">{contact.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 text-sm">
          <strong>Uwaga:</strong> Kontakt zostanie trwale usunięty z bazy danych. 
          Wszystkie powiązane dane zostaną utracone.
        </p>
      </div>

      <div className="flex gap-3 justify-center">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="min-w-[120px]"
        >
          Anuluj
        </Button>
        <Button
          variant="destructive"
          onClick={onConfirm}
          disabled={isLoading}
          className="min-w-[120px] bg-red-600 hover:bg-red-700"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Usuwanie...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Usuń kontakt
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}; 