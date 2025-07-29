import { useQuery } from '@tanstack/react-query'
import { emailTemplateApi } from '@/lib/api'
import { filterEmailTemplates } from '../utils/emailTemplateUtils.utils'
import { useEmailTemplateMutations } from './useEmailTemplateMutations.hook'
import { useEmailTemplateUI } from './useEmailTemplateUI.hook'
import type { CreateEmailTemplateRequest, UpdateEmailTemplateRequest } from '@/lib/api'

export const useEmailTemplates = () => {
  const {
    data: templates = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['emailTemplates'],
    queryFn: emailTemplateApi.getAllTemplates,
  })

  const {
    createTemplateMutation,
    updateTemplateMutation,
    deleteTemplateMutation,
    duplicateTemplateMutation,
    toggleStatusMutation
  } = useEmailTemplateMutations()

  const {
    filters,
    showForm,
    editingTemplate,
    showDeleteConfirm,
    deletingTemplate,
    handleAddTemplate,
    handleEditTemplate,
    handleDeleteTemplate,
    closeForm,
    closeDeleteConfirm,
    updateFilters
  } = useEmailTemplateUI()

  const filteredTemplates = filterEmailTemplates(templates, filters)

  const handleEditTemplateWithId = (id: number) => {
    handleEditTemplate(id, templates)
  }

  const handleDeleteTemplateWithId = (id: number) => {
    handleDeleteTemplate(id, templates)
  }

  const handleDuplicateTemplate = (id: number) => {
    duplicateTemplateMutation.mutate(id)
  }

  const handleToggleActive = (id: number) => {
    toggleStatusMutation.mutate(id)
  }

  const handleSubmitTemplate = (data: CreateEmailTemplateRequest | UpdateEmailTemplateRequest) => {
    if (editingTemplate) {
      updateTemplateMutation.mutate({ id: editingTemplate.id, data: data as UpdateEmailTemplateRequest })
      closeForm()
    } else {
      createTemplateMutation.mutate(data as CreateEmailTemplateRequest)
      closeForm()
    }
  }

  const handleConfirmDelete = () => {
    if (deletingTemplate) {
      deleteTemplateMutation.mutate(deletingTemplate.id)
      closeDeleteConfirm()
    }
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
    handleEditTemplate: handleEditTemplateWithId,
    handleDuplicateTemplate,
    handleDeleteTemplate: handleDeleteTemplateWithId,
    handleToggleActive,
    handleSubmitTemplate,
    handleConfirmDelete,
    closeForm,
    closeDeleteConfirm,
    updateFilters
  }
} 