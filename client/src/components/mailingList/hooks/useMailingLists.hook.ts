import { useState } from 'react'
import type { MailingList, MailingListFilters, MailingListFormData } from '../types/mailingList.types'
import { mockMailingLists } from '../data/mockMailingLists.data'
import { filterMailingLists } from '../utils/mailingListUtils.utils'

export const useMailingLists = () => {
  const [mailingLists, setMailingLists] = useState<MailingList[]>(mockMailingLists)
  const [filters, setFilters] = useState<MailingListFilters>({
    searchTerm: '',
    selectedTags: []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const filteredLists = filterMailingLists(mailingLists, filters)

  const addMailingList = async (data: MailingListFormData) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newList: MailingList = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        tags: data.tags,
        contacts: [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      }
      
      setMailingLists(prev => [...prev, newList])
    } catch {
      setError('Nie udało się utworzyć listy mailingowej')
    } finally {
      setIsLoading(false)
    }
  }

  const updateMailingList = async (id: string, data: MailingListFormData) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setMailingLists(prev => prev.map(list => 
        list.id === id 
          ? { 
              ...list, 
              name: data.name,
              description: data.description,
              tags: data.tags,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : list
      ))
    } catch {
      setError('Nie udało się zaktualizować listy mailingowej')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteMailingList = async (id: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      setMailingLists(prev => prev.filter(list => list.id !== id))
    } catch {
      setError('Nie udało się usunąć listy mailingowej')
    } finally {
      setIsLoading(false)
    }
  }

  const updateFilters = (newFilters: Partial<MailingListFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const clearError = () => setError(null)

  return {
    mailingLists,
    filteredLists,
    filters,
    isLoading,
    error,
    addMailingList,
    updateMailingList,
    deleteMailingList,
    updateFilters,
    clearError
  }
} 