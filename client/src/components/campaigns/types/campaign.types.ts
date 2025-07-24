export interface Campaign {
  id: string
  name: string
  subject: string
  status: string
  recipients: number
  sent: number
  opened: number
  clicked: number
  scheduledAt?: string
  sentAt?: string
  createdAt: string
}

export interface CampaignFilters {
  searchTerm: string
  selectedStatus: string
}

export interface CampaignStats {
  total: number
  active: number
  recipients: number
  averageOpenRate: number
} 