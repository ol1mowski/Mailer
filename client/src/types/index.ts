export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  avatar?: string
}

export interface Contact {
  id: string
  email: string
  firstName: string
  lastName: string
  company?: string
  phone?: string
  tags: string[]
  isSubscribed: boolean
  createdAt: Date
  updatedAt: Date
}

export interface MailingList {
  id: string
  name: string
  description?: string
  contacts: Contact[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  content: string
  isActive: boolean
  category: 'newsletter' | 'promotional' | 'transactional' | 'custom'
  createdAt: Date
  updatedAt: Date
}

export interface Campaign {
  id: string
  name: string
  subject: string
  content: string
  templateId?: string
  mailingListId: string
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed'
  scheduledAt?: Date
  sentAt?: Date
  stats: {
    totalRecipients: number
    sent: number
    delivered: number
    opened: number
    clicked: number
    bounced: number
  }
  createdAt: Date
  updatedAt: Date
}

export interface Analytics {
  totalEmails: number
  totalContacts: number
  totalTemplates: number
  totalCampaigns: number
  openRate: number
  clickRate: number
  bounceRate: number
  recentActivity: Activity[]
}

export interface Activity {
  id: string
  type: 'email_sent' | 'contact_added' | 'template_created' | 'campaign_started'
  description: string
  timestamp: Date
  userId: string
  userName: string
} 