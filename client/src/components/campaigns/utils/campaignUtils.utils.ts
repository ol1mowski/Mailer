import type { Campaign } from '@/lib/api'
import type { CampaignStats, CampaignFilters } from '../types/campaign.types'
import { CAMPAIGN_STATUSES } from '../types/campaign.types'

export const calculateCampaignStats = (campaigns: Campaign[]): CampaignStats => {
  const stats: CampaignStats = {
    total: campaigns.length,
    draft: 0,
    scheduled: 0,
    active: 0,
    paused: 0,
    completed: 0,
    totalRecipients: 0,
    totalSent: 0,
    totalOpened: 0,
    totalClicked: 0
  }

  campaigns.forEach(campaign => {
    switch (campaign.status) {
      case CAMPAIGN_STATUSES.DRAFT:
        stats.draft++
        break
      case CAMPAIGN_STATUSES.SCHEDULED:
        stats.scheduled++
        break
      case CAMPAIGN_STATUSES.ACTIVE:
        stats.active++
        break
      case CAMPAIGN_STATUSES.PAUSED:
        stats.paused++
        break
      case CAMPAIGN_STATUSES.COMPLETED:
        stats.completed++
        break
    }

    stats.totalRecipients += campaign.totalRecipients || 0
    stats.totalSent += campaign.sentEmails || 0
    stats.totalOpened += campaign.openedEmails || 0
    stats.totalClicked += campaign.clickedEmails || 0
  })

  return stats
}

export const filterCampaigns = (
  campaigns: Campaign[],
  filters: CampaignFilters
): Campaign[] => {
  return campaigns.filter(campaign => {
    const matchesSearch = !filters.searchTerm || 
      campaign.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      campaign.subject.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      campaign.description?.toLowerCase().includes(filters.searchTerm.toLowerCase())

    const matchesStatus = !filters.selectedStatus || 
      campaign.status === filters.selectedStatus

    const matchesTemplate = !filters.selectedTemplate || 
      campaign.template?.name === filters.selectedTemplate

    return matchesSearch && matchesStatus && matchesTemplate
  })
}

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return '-'
  
  const date = new Date(dateString)
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatDateTime = (dateString: string | null): string => {
  if (!dateString) return '-'
  
  const date = new Date(dateString)
  return date.toLocaleString('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const getOpenRate = (opened: number, sent: number): number => {
  if (sent === 0) return 0
  return Math.round((opened / sent) * 100)
}

export const getClickRate = (clicked: number, sent: number): number => {
  if (sent === 0) return 0
  return Math.round((clicked / sent) * 100)
}

export const validateCampaignForm = (data: {
  name: string
  subject: string
  content: string
  status: string
}): Record<string, string> => {
  const errors: Record<string, string> = {}

  if (!data.name.trim()) {
    errors.name = 'Nazwa kampanii jest wymagana'
  }

  if (!data.subject.trim()) {
    errors.subject = 'Temat jest wymagany'
  }

  if (!data.content.trim()) {
    errors.content = 'Treść jest wymagana'
  }

  if (!data.status) {
    errors.status = 'Status jest wymagany'
  }

  return errors
} 