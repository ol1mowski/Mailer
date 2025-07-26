import { useState } from 'react';
import type { CreateContactRequest } from '../../../../../lib/api';

export const useImportValidation = () => {
  const [error, setError] = useState<string | null>(null);

  const validateJson = (content: string): CreateContactRequest[] => {
    try {
      const parsed = JSON.parse(content);
      
      if (!Array.isArray(parsed)) {
        throw new Error('JSON musi być tablicą kontaktów');
      }
      
      if (parsed.length === 0) {
        throw new Error('Tablica kontaktów nie może być pusta');
      }
      
      if (parsed.length > 1000) {
        throw new Error('Maksymalnie 1000 kontaktów na raz');
      }
      
      const validatedContacts: CreateContactRequest[] = [];
      
      for (let i = 0; i < parsed.length; i++) {
        const contact = parsed[i];
        
        if (!contact.email || typeof contact.email !== 'string') {
          throw new Error(`Kontakt ${i + 1}: Email jest wymagany i musi być stringiem`);
        }
        
        if (!contact.firstName || typeof contact.firstName !== 'string') {
          throw new Error(`Kontakt ${i + 1}: Imię jest wymagane i musi być stringiem`);
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contact.email)) {
          throw new Error(`Kontakt ${i + 1}: Nieprawidłowy format email`);
        }
        
        validatedContacts.push({
          email: contact.email,
          firstName: contact.firstName,
          tags: Array.isArray(contact.tags) ? contact.tags : undefined,
          status: contact.status || 'active'
        });
      }
      
      setError(null);
      return validatedContacts;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Nieprawidłowy format JSON';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    error,
    validateJson,
    clearError
  };
}; 