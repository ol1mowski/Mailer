import { useState, useCallback } from 'react'
import { type MailingList, type Contact } from '@/types'
import { generateId } from '@/utils'

const MOCK_MAILING_LISTS: MailingList[] = [
  {
    id: '1',
    name: 'Newsletter główny',
    description: 'Główny newsletter z aktualnościami',
    contacts: [],
    tags: ['newsletter', 'główny'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Klienci VIP',
    description: 'Lista dla klientów VIP',
    contacts: [],
    tags: ['vip', 'klienci'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: '3',
    name: 'Nowi klienci',
    description: 'Lista dla nowych klientów',
    contacts: [],
    tags: ['nowi', 'klienci'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
]

export const useMailingLists = () => {
  const [mailingLists, setMailingLists] = useState<MailingList[]>(MOCK_MAILING_LISTS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addMailingList = useCallback((mailingList: Omit<MailingList, 'id' | 'contacts' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true)
    setError(null)
    
    try {
      const newMailingList: MailingList = {
        ...mailingList,
        id: generateId(),
        contacts: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      
      setMailingLists(prev => [...prev, newMailingList])
    } catch (err) {
      setError('Błąd podczas dodawania listy mailingowej')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateMailingList = useCallback((id: string, updates: Partial<MailingList>) => {
    setLoading(true)
    setError(null)
    
    try {
      setMailingLists(prev => 
        prev.map(list => 
          list.id === id 
            ? { ...list, ...updates, updatedAt: new Date() }
            : list
        )
      )
    } catch (err) {
      setError('Błąd podczas aktualizacji listy mailingowej')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteMailingList = useCallback((id: string) => {
    setLoading(true)
    setError(null)
    
    try {
      setMailingLists(prev => prev.filter(list => list.id !== id))
    } catch (err) {
      setError('Błąd podczas usuwania listy mailingowej')
    } finally {
      setLoading(false)
    }
  }, [])

  const addContactToList = useCallback((listId: string, contact: Contact) => {
    setLoading(true)
    setError(null)
    
    try {
      setMailingLists(prev => 
        prev.map(list => 
          list.id === listId 
            ? { 
                ...list, 
                contacts: [...list.contacts, contact],
                updatedAt: new Date() 
              }
            : list
        )
      )
    } catch (err) {
      setError('Błąd podczas dodawania kontaktu do listy')
    } finally {
      setLoading(false)
    }
  }, [])

  const removeContactFromList = useCallback((listId: string, contactId: string) => {
    setLoading(true)
    setError(null)
    
    try {
      setMailingLists(prev => 
        prev.map(list => 
          list.id === listId 
            ? { 
                ...list, 
                contacts: list.contacts.filter(contact => contact.id !== contactId),
                updatedAt: new Date() 
              }
            : list
        )
      )
    } catch (err) {
      setError('Błąd podczas usuwania kontaktu z listy')
    } finally {
      setLoading(false)
    }
  }, [])

  const getMailingListById = useCallback((id: string) => {
    return mailingLists.find(list => list.id === id)
  }, [mailingLists])

  const searchMailingLists = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return mailingLists.filter(list => 
      list.name.toLowerCase().includes(lowercaseQuery) ||
      list.description?.toLowerCase().includes(lowercaseQuery) ||
      list.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }, [mailingLists])

  const getMailingListsByTag = useCallback((tag: string) => {
    return mailingLists.filter(list => list.tags.includes(tag))
  }, [mailingLists])

  return {
    mailingLists,
    loading,
    error,
    addMailingList,
    updateMailingList,
    deleteMailingList,
    addContactToList,
    removeContactFromList,
    getMailingListById,
    searchMailingLists,
    getMailingListsByTag,
  }
} 