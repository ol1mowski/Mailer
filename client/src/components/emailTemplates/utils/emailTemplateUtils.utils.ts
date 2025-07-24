import { EmailTemplate, EmailTemplateFilters, EmailTemplateStats } from '../types/emailTemplate.types'
import { EMAIL_TEMPLATE_CATEGORIES } from '@/constants/app.constants'

export const filterEmailTemplates = (templates: EmailTemplate[], filters: EmailTemplateFilters): EmailTemplate[] => {
  return templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         template.subject.toLowerCase().includes(filters.searchTerm.toLowerCase())
    const matchesCategory = !filters.selectedCategory || template.category === filters.selectedCategory
    return matchesSearch && matchesCategory
  })
}

export const calculateEmailTemplateStats = (templates: EmailTemplate[]): EmailTemplateStats => {
  return {
    total: templates.length,
    active: templates.filter(t => t.isActive).length,
    categories: new Set(templates.map(t => t.category)).size
  }
}

export const getCategoryLabel = (category: string): string => {
  return EMAIL_TEMPLATE_CATEGORIES.find(cat => cat.value === category)?.label || category
} 