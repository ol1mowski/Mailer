import type { MailingList, MailingListFilters, MailingListStats } from '../types/mailingList.types'

export const filterMailingLists = (lists: MailingList[], filters: MailingListFilters): MailingList[] => {
  return lists.filter(list => {
    const matchesSearch = list.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         list.description?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         list.tags.some(tag => tag.toLowerCase().includes(filters.searchTerm.toLowerCase()))
    
    const matchesTags = filters.selectedTags.length === 0 || 
                       filters.selectedTags.some(tag => list.tags.includes(tag))
    
    return matchesSearch && matchesTags
  })
}

export const calculateMailingListStats = (lists: MailingList[]): MailingListStats => {
  const totalContacts = lists.reduce((sum, list) => sum + list.contacts.length, 0)
  const averageContactsPerList = lists.length > 0 ? Math.round(totalContacts / lists.length) : 0

  return {
    total: lists.length,
    totalContacts,
    averageContactsPerList
  }
}

export const getAllTags = (lists: MailingList[]): string[] => {
  const allTags = lists.flatMap(list => list.tags)
  return [...new Set(allTags)].sort()
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pl-PL')
}

export const getSubscribedContactsCount = (list: MailingList): number => {
  return list.contacts.filter(contact => contact.subscribed).length
} 