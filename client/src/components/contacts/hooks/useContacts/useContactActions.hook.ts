import { contactApi } from '@/lib/api';
import type { Contact } from '../../types/contact.types';
import type { CreateContactRequest, UpdateContactRequest, ImportContactsRequest } from '@/lib/api';
import { toast } from 'react-hot-toast';

interface UseContactActionsProps {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingContact: React.Dispatch<React.SetStateAction<Contact | null>>;
  setShowDeleteConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletingContact: React.Dispatch<React.SetStateAction<Contact | null>>;
  setShowImport: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  editingContact: Contact | null;
}

export const useContactActions = ({
  contacts,
  setContacts,
  setShowForm,
  setEditingContact,
  setShowDeleteConfirm,
  setDeletingContact,
  setShowImport,
  setIsLoading,
  setError,
  editingContact
}: UseContactActionsProps) => {
  const handleAddContact = async (data: CreateContactRequest) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newContact = await contactApi.createContact(data);
      setContacts(prev => [{
        ...newContact,
        status: newContact.status as 'active' | 'inactive' | 'unsubscribed'
      }, ...prev]);
      setShowForm(false);
      toast.success(`Kontakt ${data.firstName} został pomyślnie dodany!`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Nie udało się dodać kontaktu';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateContact = async (data: UpdateContactRequest) => {
    if (!editingContact) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedContact = await contactApi.updateContact(editingContact.id, data);
      setContacts(prev => prev.map(contact => 
        contact.id === editingContact.id 
          ? { ...updatedContact, status: updatedContact.status as 'active' | 'inactive' | 'unsubscribed' }
          : contact
      ));
      setEditingContact(null);
      setShowForm(false);
      toast.success(`Kontakt ${data.firstName} został pomyślnie zaktualizowany!`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Nie udało się zaktualizować kontaktu';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteContact = async (id: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await contactApi.deleteContact(id);
      const deletedContact = contacts.find(contact => contact.id === id);
      setContacts(prev => prev.filter(contact => contact.id !== id));
      setShowDeleteConfirm(false);
      setDeletingContact(null);
      
      if (deletedContact) {
        toast.success(`Kontakt ${deletedContact.firstName} został pomyślnie usunięty!`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Nie udało się usunąć kontaktu';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportContacts = async (contactsToImport: CreateContactRequest[]) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const importData: ImportContactsRequest = { contacts: contactsToImport };
      const importedContacts = await contactApi.importContacts(importData);
      
      setContacts(prev => [
        ...importedContacts.map(contact => ({
          ...contact,
          status: contact.status as 'active' | 'inactive' | 'unsubscribed'
        })),
        ...prev
      ]);
      
      setShowImport(false);
      toast.success(`Pomyślnie zaimportowano ${importedContacts.length} kontaktów!`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Nie udało się zaimportować kontaktów';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleAddContact,
    handleUpdateContact,
    handleDeleteContact,
    handleImportContacts
  };
}; 