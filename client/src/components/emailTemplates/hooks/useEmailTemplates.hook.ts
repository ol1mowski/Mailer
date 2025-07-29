import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import type { EmailTemplate, EmailTemplateFilters } from '../types/emailTemplate.types'
import { filterEmailTemplates } from '../utils/emailTemplateUtils.utils'
import { emailTemplateApi, type CreateEmailTemplateRequest, type UpdateEmailTemplateRequest } from '@/lib/api'

export const useEmailTemplates = () => {
  const queryClient = useQueryClient()
  const [filters, setFilters] = useState<EmailTemplateFilters>({
    searchTerm: '',
    selectedCategory: ''
  })
  const [showForm, setShowForm] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deletingTemplate, setDeletingTemplate] = useState<EmailTemplate | null>(null)

  const {
    data: templates = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['emailTemplates'],
    queryFn: emailTemplateApi.getAllTemplates,
  })

  const createTemplateMutation = useMutation({
    mutationFn: emailTemplateApi.createTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailTemplates'] })
      setShowForm(false)
      toast.success('Szablon został utworzony pomyślnie!')
    },
    onError: (error) => {
      toast.error('Nie udało się utworzyć szablonu')
      console.error('Błąd tworzenia szablonu:', error)
    }
  })

  const updateTemplateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateEmailTemplateRequest }) =>
      emailTemplateApi.updateTemplate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailTemplates'] })
      setShowForm(false)
      setEditingTemplate(null)
      toast.success('Szablon został zaktualizowany pomyślnie!')
    },
    onError: (error) => {
      toast.error('Nie udało się zaktualizować szablonu')
      console.error('Błąd aktualizacji szablonu:', error)
    }
  })

  const deleteTemplateMutation = useMutation({
    mutationFn: emailTemplateApi.deleteTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailTemplates'] })
      setShowDeleteConfirm(false)
      setDeletingTemplate(null)
      toast.success('Szablon został usunięty pomyślnie!')
    },
    onError: (error) => {
      toast.error('Nie udało się usunąć szablonu')
      console.error('Błąd usuwania szablonu:', error)
    }
  })

  const duplicateTemplateMutation = useMutation({
    mutationFn: emailTemplateApi.duplicateTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailTemplates'] })
      toast.success('Szablon został zduplikowany pomyślnie!')
    },
    onError: (error) => {
      toast.error('Nie udało się zduplikować szablonu')
      console.error('Błąd duplikowania szablonu:', error)
    }
  })

  const toggleStatusMutation = useMutation({
    mutationFn: emailTemplateApi.toggleTemplateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailTemplates'] })
      toast.success('Status szablonu został zmieniony pomyślnie!')
    },
    onError: (error) => {
      toast.error('Nie udało się zmienić statusu szablonu')
      console.error('Błąd zmiany statusu szablonu:', error)
    }
  })

  const filteredTemplates = filterEmailTemplates(templates, filters)

  const handleAddTemplate = () => {
    setEditingTemplate(null)
    setShowForm(true)
  }

  const handleEditTemplate = (id: number) => {
    const template = templates.find(t => t.id === id)
    if (template) {
      setEditingTemplate(template)
      setShowForm(true)
    }
  }

  const handleDuplicateTemplate = (id: number) => {
    duplicateTemplateMutation.mutate(id)
  }

  const handleDeleteTemplate = (id: number) => {
    const template = templates.find(t => t.id === id)
    if (template) {
      setDeletingTemplate(template)
      setShowDeleteConfirm(true)
    }
  }

  const handleToggleActive = (id: number) => {
    toggleStatusMutation.mutate(id)
  }

  const handleSubmitTemplate = (data: CreateEmailTemplateRequest | UpdateEmailTemplateRequest) => {
    if (editingTemplate) {
      updateTemplateMutation.mutate({ id: editingTemplate.id, data: data as UpdateEmailTemplateRequest })
    } else {
      createTemplateMutation.mutate(data as CreateEmailTemplateRequest)
    }
  }

  const handleConfirmDelete = () => {
    if (deletingTemplate) {
      deleteTemplateMutation.mutate(deletingTemplate.id)
    }
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingTemplate(null)
  }

  const closeDeleteConfirm = () => {
    setShowDeleteConfirm(false)
    setDeletingTemplate(null)
  }

  const updateFilters = (newFilters: Partial<EmailTemplateFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const isAnyLoading = isLoading || 
    createTemplateMutation.isPending || 
    updateTemplateMutation.isPending || 
    deleteTemplateMutation.isPending || 
    duplicateTemplateMutation.isPending || 
    toggleStatusMutation.isPending

  return {
    templates,
    filteredTemplates,
    filters,
    isLoading: isAnyLoading,
    error: error?.message || null,
    showForm,
    editingTemplate,
    showDeleteConfirm,
    deletingTemplate,
    handleAddTemplate,
    handleEditTemplate,
    handleDuplicateTemplate,
    handleDeleteTemplate,
    handleToggleActive,
    handleSubmitTemplate,
    handleConfirmDelete,
    closeForm,
    closeDeleteConfirm,
    updateFilters
  }
} 