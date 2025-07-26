import type { QuickAction } from '../types/dashboard.types';

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
]; 