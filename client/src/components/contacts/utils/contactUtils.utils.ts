import type { Contact, ContactFilters, ContactStats } from '../types/contact.types';

export const filterContacts = (contacts: Contact[], filters: ContactFilters): Contact[] => {
  return contacts.filter(contact => {
    const fullName = contact.firstName.toLowerCase();
    const matchesSearch = fullName.includes(filters.searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesTags = filters.selectedTags.length === 0 || 
                       filters.selectedTags.some(tag => contact.tags.includes(tag));
    return matchesSearch && matchesTags;
  });
};

export const calculateContactStats = (contacts: Contact[]): ContactStats => {
  return {
    total: contacts.length,
    active: contacts.filter(c => c.status === 'active').length,
    inactive: contacts.filter(c => c.status === 'inactive').length,
    vip: contacts.filter(c => c.tags.includes('VIP')).length
  };
};

export const getInitials = (firstName: string): string => {
  return firstName ? firstName.charAt(0).toUpperCase() : '';
};

export const getFullName = (firstName: string): string => {
  return firstName || '';
}; 