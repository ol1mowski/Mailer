import { useState } from 'react';
import type { Contact, ContactFilters } from '../../types/contact.types';

export const useContactState = () => {
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

  return {
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
  };
}; 