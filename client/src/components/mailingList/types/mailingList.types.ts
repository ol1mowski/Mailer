export interface MailingList {
  id: string
  name: string
  description?: string
  tags: string[]
  contacts: Contact[]
  createdAt: string
  updatedAt: string
}

export interface Contact {
  id: string
  email: string
  name: string
  subscribed: boolean
}

export interface MailingListFilters {
  searchTerm: string
  selectedTags: string[]
}

export interface MailingListStats {
  total: number
  totalContacts: number
  averageContactsPerList: number
}

export interface MailingListFormData {
  name: string
  description?: string
  tags: string[]
} 