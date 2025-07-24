import { useState, useCallback } from 'react'
import { type Contact } from '@/types'
import { generateId } from '@/utils'

const MOCK_CONTACTS: Contact[] = [
  {
    id: '1',
    email: 'jan.kowalski@example.com',
    firstName: 'Jan',
    lastName: 'Kowalski',
    company: 'TechCorp',
    phone: '+48 123 456 789',
    tags: ['VIP', 'Aktywny'],
    isSubscribed: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    email: 'anna.nowak@example.com',
    firstName: 'Anna',
    lastName: 'Nowak',
    company: 'MarketingPro',
    phone: '+48 987 654 321',
    tags: ['Nowy klient'],
    isSubscribed: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    email: 'piotr.wisniewski@example.com',
    firstName: 'Piotr',
    lastName: 'Wiśniewski',
    company: 'StartupXYZ',
    tags: ['Newsletter'],
    isSubscribed: false,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
  },
]

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>(MOCK_CONTACTS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addContact = useCallback((contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true)
    setError(null)
    
    try {
      const newContact: Contact = {
        ...contact,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      
      setContacts(prev => [...prev, newContact])
    } catch (err) {
      setError('Błąd podczas dodawania kontaktu')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateContact = useCallback((id: string, updates: Partial<Contact>) => {
    setLoading(true)
    setError(null)
    
    try {
      setContacts(prev => 
        prev.map(contact => 
          contact.id === id 
            ? { ...contact, ...updates, updatedAt: new Date() }
            : contact
        )
      )
    } catch (err) {
      setError('Błąd podczas aktualizacji kontaktu')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteContact = useCallback((id: string) => {
    setLoading(true)
    setError(null)
    
    try {
      setContacts(prev => prev.filter(contact => contact.id !== id))
    } catch (err) {
      setError('Błąd podczas usuwania kontaktu')
    } finally {
      setLoading(false)
    }
  }, [])

  const getContactById = useCallback((id: string) => {
    return contacts.find(contact => contact.id === id)
  }, [contacts])

  const searchContacts = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return contacts.filter(contact => 
      contact.firstName.toLowerCase().includes(lowercaseQuery) ||
      contact.lastName.toLowerCase().includes(lowercaseQuery) ||
      contact.email.toLowerCase().includes(lowercaseQuery) ||
      contact.company?.toLowerCase().includes(lowercaseQuery)
    )
  }, [contacts])

  const getContactsByTag = useCallback((tag: string) => {
    return contacts.filter(contact => contact.tags.includes(tag))
  }, [contacts])

  const getSubscribedContacts = useCallback(() => {
    return contacts.filter(contact => contact.isSubscribed)
  }, [contacts])

  return {
    contacts,
    loading,
    error,
    addContact,
    updateContact,
    deleteContact,
    getContactById,
    searchContacts,
    getContactsByTag,
    getSubscribedContacts,
  }
} 