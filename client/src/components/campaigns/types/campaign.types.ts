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
  searchTerm: string;
  selectedStatus: string;
  selectedTemplate: string;
}

export interface CampaignStats {
  total: number;
  draft: number;
  scheduled: number;
  active: number;
  paused: number;
  completed: number;
  totalRecipients: number;
  totalSent: number;
  totalOpened: number;
  totalClicked: number;
}

export interface CampaignFormData {
  name: string;
  subject: string;
  content: string;
  description: string;
  status: string;
  scheduledAt: string;
  templateId: number | null;
  recipientIds: number[];
}

export interface CampaignFormErrors {
  name?: string;
  subject?: string;
  content?: string;
  description?: string;
  status?: string;
  scheduledAt?: string;
  templateId?: string;
  recipientIds?: string;
}

export const CAMPAIGN_STATUSES = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

export const CAMPAIGN_STATUS_LABELS = {
  [CAMPAIGN_STATUSES.DRAFT]: 'Szkic',
  [CAMPAIGN_STATUSES.SCHEDULED]: 'Zaplanowana',
  [CAMPAIGN_STATUSES.ACTIVE]: 'Aktywna',
  [CAMPAIGN_STATUSES.PAUSED]: 'Wstrzymana',
  [CAMPAIGN_STATUSES.COMPLETED]: 'Zakończona',
  [CAMPAIGN_STATUSES.CANCELLED]: 'Anulowana'
} as const;

export const CAMPAIGN_STATUS_COLORS = {
  [CAMPAIGN_STATUSES.DRAFT]: 'bg-gray-100 text-gray-800',
  [CAMPAIGN_STATUSES.SCHEDULED]: 'bg-blue-100 text-blue-800',
  [CAMPAIGN_STATUSES.ACTIVE]: 'bg-green-100 text-green-800',
  [CAMPAIGN_STATUSES.PAUSED]: 'bg-yellow-100 text-yellow-800',
  [CAMPAIGN_STATUSES.COMPLETED]: 'bg-purple-100 text-purple-800',
  [CAMPAIGN_STATUSES.CANCELLED]: 'bg-red-100 text-red-800'
} as const; 