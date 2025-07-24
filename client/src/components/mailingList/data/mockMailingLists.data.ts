import type { MailingList } from '../types/mailingList.types'

export const mockMailingLists: MailingList[] = [
  {
    id: '1',
    name: 'Newsletter główny',
    description: 'Główny newsletter z aktualnościami firmy',
    tags: ['newsletter', 'główny', 'aktualności'],
    contacts: [
      { id: '1', email: 'jan@example.com', name: 'Jan Kowalski', subscribed: true },
      { id: '2', email: 'anna@example.com', name: 'Anna Nowak', subscribed: true },
      { id: '3', email: 'piotr@example.com', name: 'Piotr Wiśniewski', subscribed: false }
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    name: 'Promocje i oferty',
    description: 'Lista dla klientów zainteresowanych promocjami',
    tags: ['promocje', 'oferty', 'klienci'],
    contacts: [
      { id: '4', email: 'maria@example.com', name: 'Maria Kowalczyk', subscribed: true },
      { id: '5', email: 'tomasz@example.com', name: 'Tomasz Lewandowski', subscribed: true }
    ],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: '3',
    name: 'VIP Klienci',
    description: 'Lista dla klientów VIP z ekskluzywnymi ofertami',
    tags: ['vip', 'ekskluzywne', 'premium'],
    contacts: [
      { id: '6', email: 'elzbieta@example.com', name: 'Elżbieta Zielińska', subscribed: true },
      { id: '7', email: 'andrzej@example.com', name: 'Andrzej Dąbrowski', subscribed: true },
      { id: '8', email: 'katarzyna@example.com', name: 'Katarzyna Kozłowska', subscribed: true },
      { id: '9', email: 'michal@example.com', name: 'Michał Jankowski', subscribed: false }
    ],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-22'
  },
  {
    id: '4',
    name: 'Nowi użytkownicy',
    description: 'Powitalna lista dla nowych użytkowników',
    tags: ['nowi', 'powitalna', 'onboarding'],
    contacts: [
      { id: '10', email: 'pawel@example.com', name: 'Paweł Mazur', subscribed: true },
      { id: '11', email: 'magdalena@example.com', name: 'Magdalena Kaczmarek', subscribed: true }
    ],
    createdAt: '2024-01-25',
    updatedAt: '2024-01-25'
  }
] 