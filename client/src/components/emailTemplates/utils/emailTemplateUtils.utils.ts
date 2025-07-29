import type { EmailTemplate, EmailTemplateFilters, EmailTemplateStats } from '../types/emailTemplate.types'

export const filterEmailTemplates = (
  templates: EmailTemplate[],
  filters: EmailTemplateFilters
): EmailTemplate[] => {
  return templates.filter(template => {
    const matchesSearch = !filters.searchTerm ||
      template.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      template.subject.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(filters.searchTerm.toLowerCase())

    const matchesCategory = !filters.selectedCategory ||
      template.status === filters.selectedCategory

    return matchesSearch && matchesCategory
  })
}

export const calculateEmailTemplateStats = (templates: EmailTemplate[]): EmailTemplateStats => {
  const uniqueCategories = new Set(templates.map(t => t.status))

  return {
    total: templates.length,
    active: templates.filter(t => t.status === 'active').length,
    categories: uniqueCategories.size
  }
}

export const getStatusLabel = (status: string): string => {
  const statusMap: Record<string, string> = {
    active: 'Aktywny',
    inactive: 'Nieaktywny',
    draft: 'Szkic'
  }
  return statusMap[status] || status
}

export const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    active: 'default',
    inactive: 'secondary',
    draft: 'outline'
  }
  return colorMap[status] || 'outline'
} 