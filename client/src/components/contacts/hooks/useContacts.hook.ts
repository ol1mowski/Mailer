import { useState, useEffect } from 'react';
import { contactApi } from '@/lib/api';
import type { Contact, ContactFilters } from '../types/contact.types';
import { filterContacts } from '../utils/contactUtils.utils';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filters, setFilters] = useState<ContactFilters>({
    searchTerm: '',
    selectedTags: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleAddContact = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Add contact');
      // W przyszłości można tu dodać prawdziwe API call
    } catch {
      setError('Nie udało się dodać kontaktu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteContact = async (id: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setContacts(prev => prev.filter(contact => contact.id !== id));
    } catch {
      setError('Nie udało się usunąć kontaktu');
    } finally {
      setIsLoading(false);
    }
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
    handleAddContact,
    handleDeleteContact,
    updateFilters,
    toggleTag,
    clearError
  };
}; 