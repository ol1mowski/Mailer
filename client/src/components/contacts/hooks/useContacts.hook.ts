import { useState, useEffect } from 'react';
import { contactApi } from '@/lib/api';
import type { Contact, ContactFilters } from '../types/contact.types';
import type { CreateContactRequest, UpdateContactRequest, ImportContactsRequest } from '@/lib/api';
import { filterContacts } from '../utils/contactUtils.utils';
import { toast } from 'react-hot-toast';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filters, setFilters] = useState<ContactFilters>({
    searchTerm: '',
    selectedTags: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null);

  const filteredContacts = filterContacts(contacts, filters);

  const fetchContacts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const contactsData = await contactApi.getAllContacts();
      setContacts(contactsData.map(contact => ({
        ...contact,
        status: contact.status as 'active' | 'inactive' | 'unsubscribed'
      })));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Nie udało się pobrać kontaktów';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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

  const openDeleteConfirm = (contact: Contact) => {
    setDeletingContact(contact);
    setShowDeleteConfirm(true);
  };

  const closeDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    setDeletingContact(null);
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

  const openAddForm = () => {
    setEditingContact(null);
    setShowForm(true);
    setShowImport(false);
  };

  const openEditForm = (contact: Contact) => {
    setEditingContact(contact);
    setShowForm(true);
    setShowImport(false);
  };

  const openImportForm = () => {
    setShowImport(true);
    setShowForm(false);
    setEditingContact(null);
  };

  const closeForms = () => {
    setShowForm(false);
    setShowImport(false);
    setShowDeleteConfirm(false);
    setEditingContact(null);
    setDeletingContact(null);
  };

  const updateFilters = (newFilters: Partial<ContactFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const toggleTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag) 
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag]
    }));
  };

  const clearError = () => setError(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  return {
    contacts,
    filteredContacts,
    filters,
    isLoading,
    error,
    showForm,
    showImport,
    showDeleteConfirm,
    editingContact,
    deletingContact,
    handleAddContact,
    handleUpdateContact,
    handleDeleteContact,
    handleImportContacts,
    openAddForm,
    openEditForm,
    openImportForm,
    openDeleteConfirm,
    closeDeleteConfirm,
    closeForms,
    updateFilters,
    toggleTag,
    clearError
  };
}; 