export interface AnalyticsData {
  totalEmails: number
  totalRecipients: number
  totalOpens: number
  totalClicks: number
  averageOpenRate: number
  averageClickRate: number
  bounceRate: number
  unsubscribeRate: number
}

export interface CampaignPerformance {
  name: string
  sent: number
  opened: number
  clicked: number
  openRate: number
  clickRate: number
}

export interface MonthlyData {
  month: string
  emails: number
  opens: number
  clicks: number
}

export interface AnalyticsFilters {
  selectedPeriod: string
  selectedMetric: string
}

export interface BestHours {
  timeRange: string
  percentage: number
}

export interface TrendData {
  metric: string
  change: number
  isPositive: boolean
} 