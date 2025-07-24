export interface EmailTemplate {
  id: string
  name: string
  subject: string
  category: string
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface EmailTemplateFilters {
  searchTerm: string
  selectedCategory: string
}

export interface EmailTemplateStats {
  total: number
  active: number
  categories: number
} 