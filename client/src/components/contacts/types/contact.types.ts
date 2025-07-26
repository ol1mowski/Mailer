export interface Contact {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
  tags: string[];
  status: 'active' | 'inactive' | 'unsubscribed';
  createdAt: string;
}

export interface ContactFilters {
  searchTerm: string;
  selectedTags: string[];
}

export interface ContactStats {
  total: number;
  active: number;
  vip: number;
  inactive: number;
  withPhone: number;
  withCompany: number;
} 