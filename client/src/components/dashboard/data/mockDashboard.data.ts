import type { DashboardStats, QuickAction, RecentActivity } from '../types/dashboard.types'

export const mockDashboardStats: DashboardStats = {
  sentEmails: 1234,
  contacts: 567,
  openRate: 89,
  templates: 12,
}

export const mockQuickActions: QuickAction[] = [
  {
    id: '1',
    title: 'Wyślij nowy mail',
    description: 'Utwórz i wyślij nową wiadomość email',
    icon: 'Mail',
    href: '/campaigns'
  },
  {
    id: '2',
    title: 'Zarządzaj kontaktami',
    description: 'Dodaj, edytuj lub usuń kontakty',
    icon: 'Users',
    href: '/contacts'
  },
  {
    id: '3',
    title: 'Sprawdź statystyki',
    description: 'Przeglądaj szczegółowe analizy',
    icon: 'BarChart3',
    href: '/analytics'
  },
  {
    id: '4',
    title: 'Szablony email',
    description: 'Zarządzaj szablonami wiadomości',
    icon: 'FileText',
    href: '/email-templates'
  }
]

export const mockRecentActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'email',
    description: 'Mail wysłany 2 min temu',
    timestamp: '2 min temu',
    status: 'success'
  },
  {
    id: '2',
    type: 'contact',
    description: 'Nowy kontakt dodany',
    timestamp: '15 min temu',
    status: 'info'
  },
  {
    id: '3',
    type: 'template',
    description: 'Szablon zaktualizowany',
    timestamp: '1 godz. temu',
    status: 'warning'
  },
  {
    id: '4',
    type: 'campaign',
    description: 'Kampania zakończona',
    timestamp: '2 godz. temu',
    status: 'success'
  }
] 