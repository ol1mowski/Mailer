import type { Campaign, CampaignFilters, CampaignStats } from '../types/campaign.types'
import { CAMPAIGN_STATUSES } from '@/constants/app.constants'

export const filterCampaigns = (campaigns: Campaign[], filters: CampaignFilters): Campaign[] => {
  return campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         campaign.subject.toLowerCase().includes(filters.searchTerm.toLowerCase())
    const matchesStatus = !filters.selectedStatus || campaign.status === filters.selectedStatus
    return matchesSearch && matchesStatus
  })
}

export const calculateCampaignStats = (campaigns: Campaign[]): CampaignStats => {
  const activeCampaigns = campaigns.filter(c => ['sending', 'scheduled'].includes(c.status))
  const sentCampaigns = campaigns.filter(c => c.status === 'sent')
  
  const averageOpenRate = sentCampaigns.length > 0 
    ? Math.round(
        sentCampaigns.reduce((sum, c) => sum + getOpenRate(c.opened, c.sent), 0) / sentCampaigns.length
      )
    : 0

  return {
    total: campaigns.length,
    active: activeCampaigns.length,
    recipients: campaigns.reduce((sum, c) => sum + c.recipients, 0),
    averageOpenRate
  }
}

export const getStatusColor = (status: string) => {
  const statusConfig = CAMPAIGN_STATUSES.find(s => s.value === status)
  return statusConfig?.color || 'gray'
}

export const getStatusLabel = (status: string) => {
  const statusConfig = CAMPAIGN_STATUSES.find(s => s.value === status)
  return statusConfig?.label || status
}

export const getOpenRate = (opened: number, sent: number) => {
  return sent > 0 ? Math.round((opened / sent) * 100) : 0
}

export const getClickRate = (clicked: number, sent: number) => {
  return sent > 0 ? Math.round((clicked / sent) * 100) : 0
} 