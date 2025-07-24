import { useState } from 'react'
import type { EmailTemplate, EmailTemplateFilters } from '../types/emailTemplate.types'
import { mockEmailTemplates } from '../data/mockEmailTemplates.data'
import { filterEmailTemplates } from '../utils/emailTemplateUtils.utils'

export const useEmailTemplates = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>(mockEmailTemplates)
  const [filters, setFilters] = useState<EmailTemplateFilters>({
    searchTerm: '',
    selectedCategory: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const filteredTemplates = filterEmailTemplates(templates, filters)

  const handleAddTemplate = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Add template')
    } catch (err) {
      setError('Nie udało się utworzyć szablonu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditTemplate = async (id: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      console.log('Edit template', id)
    } catch (err) {
      setError('Nie udało się edytować szablonu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDuplicateTemplate = async (id: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      console.log('Duplicate template', id)
    } catch (err) {
      setError('Nie udało się skopiować szablonu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteTemplate = async (id: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      setTemplates(prev => prev.filter(template => template.id !== id))
    } catch (err) {
      setError('Nie udało się usunąć szablonu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleActive = async (id: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      setTemplates(prev => prev.map(template => 
        template.id === id 
          ? { ...template, isActive: !template.isActive }
          : template
      ))
    } catch (err) {
      setError('Nie udało się zmienić statusu szablonu')
    } finally {
      setIsLoading(false)
    }
  }

  const updateFilters = (newFilters: Partial<EmailTemplateFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const clearError = () => setError(null)

  return {
    templates,
    filteredTemplates,
    filters,
    isLoading,
    error,
    handleAddTemplate,
    handleEditTemplate,
    handleDuplicateTemplate,
    handleDeleteTemplate,
    handleToggleActive,
    updateFilters,
    clearError
  }
} 