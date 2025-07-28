export const APP_CONSTANTS = {
  APP_NAME: 'Mailer Dashboard',
  APP_VERSION: '1.0.0',
  DEFAULT_PAGE_SIZE: 10,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
} as const

export const ROUTES = {
  DASHBOARD: '/dashboard',
  CONTACTS: '/contacts',  
  EMAIL_TEMPLATES: '/email-templates',
  CAMPAIGNS: '/campaigns',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
} as const

export const EMAIL_TEMPLATE_CATEGORIES = [
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'promotional', label: 'Promocyjny' },
  { value: 'transactional', label: 'Transakcyjny' },
  { value: 'custom', label: 'Własny' },
] as const

export const CAMPAIGN_STATUSES = [
  { value: 'draft', label: 'Szkic', color: 'gray' },
  { value: 'scheduled', label: 'Zaplanowany', color: 'blue' },
  { value: 'sending', label: 'Wysyłanie', color: 'yellow' },
  { value: 'sent', label: 'Wysłany', color: 'green' },
  { value: 'failed', label: 'Błąd', color: 'red' },
] as const

export const CONTACT_TAGS = [
  'VIP',
  'Nowy klient',
  'Aktywny',
  'Nieaktywny',
  'Test',
  'Newsletter',
] as const 