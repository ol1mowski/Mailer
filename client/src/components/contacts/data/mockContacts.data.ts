import type { Contact } from '../types/contact.types'

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Jan Kowalski',
    email: 'jan.kowalski@example.com',
    phone: '+48 123 456 789',
    tags: ['VIP', 'Aktywny'],
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Anna Nowak',
    email: 'anna.nowak@example.com',
    tags: ['Newsletter'],
    status: 'active',
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    name: 'Piotr Wiśniewski',
    email: 'piotr.wisniewski@example.com',
    phone: '+48 987 654 321',
    tags: ['Nowy klient'],
    status: 'inactive',
    createdAt: '2024-02-01',
  },
  {
    id: '4',
    name: 'Maria Wójcik',
    email: 'maria.wojcik@example.com',
    tags: ['VIP', 'Aktywny'],
    status: 'active',
    createdAt: '2024-01-10',
  },
  {
    id: '5',
    name: 'Tomasz Lewandowski',
    email: 'tomasz.lewandowski@example.com',
    phone: '+48 555 123 456',
    tags: ['Test'],
    status: 'inactive',
    createdAt: '2024-02-05',
  },
] 