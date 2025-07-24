import { useState } from 'react'
import type { Contact, ContactFilters } from '../types/contact.types'
import { mockContacts } from '../data/mockContacts.data'
import { filterContacts } from '../utils/contactUtils.utils'

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts)
  const [filters, setFilters] = useState<ContactFilters>({
    searchTerm: '',
    selectedTags: []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const filteredContacts = filterContacts(contacts, filters)

  const handleAddContact = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Add contact')
    } catch {
      setError('Nie udało się dodać kontaktu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteContact = async (id: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      setContacts(prev => prev.filter(contact => contact.id !== id))
    } catch {
      setError('Nie udało się usunąć kontaktu')
    } finally {
      setIsLoading(false)
    }
  }

  const updateFilters = (newFilters: Partial<ContactFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const toggleTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag) 
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag]
    }))
  }

  const clearError = () => setError(null)

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
  }
} 