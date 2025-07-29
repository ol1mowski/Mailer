import { useState } from 'react'
import type { EmailTemplate, EmailTemplateFilters } from '../types/emailTemplate.types'

export const useEmailTemplateUI = () => {
  const [filters, setFilters] = useState<EmailTemplateFilters>({
    searchTerm: '',
    selectedCategory: ''
  })
  const [showForm, setShowForm] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deletingTemplate, setDeletingTemplate] = useState<EmailTemplate | null>(null)

  const handleAddTemplate = () => {
    setEditingTemplate(null)
    setShowForm(true)
  }

  const handleEditTemplate = (id: number, templates: EmailTemplate[]) => {
    const template = templates.find(t => t.id === id)
    if (template) {
      setEditingTemplate(template)
      setShowForm(true)
    }
  }

  const handleDeleteTemplate = (id: number, templates: EmailTemplate[]) => {
    const template = templates.find(t => t.id === id)
    if (template) {
      setDeletingTemplate(template)
      setShowDeleteConfirm(true)
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

  return {
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
  }
}