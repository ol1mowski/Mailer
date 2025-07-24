export interface DashboardStats {
  sentEmails: number
  contacts: number
  openRate: number
  templates: number
}

export interface QuickAction {
  id: string
  title: string
  description: string
  icon: string
  href: string
}

export interface RecentActivity {
  id: string
  type: string
  description: string
  timestamp: string
  status: 'success' | 'info' | 'warning'
} 