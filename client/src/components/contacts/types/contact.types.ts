export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  tags: string[]
  status: 'active' | 'inactive'
  createdAt: string
}

export interface ContactFilters {
  searchTerm: string
  selectedTags: string[]
}

export interface ContactStats {
  total: number
  active: number
  vip: number
} 