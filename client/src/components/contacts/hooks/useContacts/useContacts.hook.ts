import { useEffect, useCallback } from 'react';
import { contactApi } from '@/lib/api';
import type { Contact, ContactFilters } from '../../types/contact.types';
import { filterContacts } from '../../utils/contactUtils.utils';
import { useContactActions } from './useContactActions.hook';
import { useContactState } from './useContactState.hook';

export const useContacts = () => {
  const {
    contacts,
    filters,
    isLoading,
    error,
    showForm,
    showImport,
    showDeleteConfirm,
    editingContact,
    deletingContact,
    setContacts,
    setFilters,
    setIsLoading,
    setError,
    setShowForm,
    setShowImport,
    setShowDeleteConfirm,
    setEditingContact,
    setDeletingContact
  } = useContactState();

  const {
    handleAddContact,
    handleUpdateContact,
    handleDeleteContact,
    handleImportContacts
  } = useContactActions({
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
  });

  const filteredContacts = filterContacts(contacts, filters);

  const fetchContacts = useCallback(async () => {
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
  }, [setContacts, setIsLoading, setError]);

  const openDeleteConfirm = (contact: Contact) => {
    setDeletingContact(contact);
    setShowDeleteConfirm(true);
  };

  const closeDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    setDeletingContact(null);
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
  }, [fetchContacts]);

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