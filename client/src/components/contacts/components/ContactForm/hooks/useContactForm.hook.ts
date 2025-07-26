import { useState, useEffect } from 'react';
import type { Contact } from '../../../types/contact.types';
import { contactApi } from '@/lib/api';
import type { CreateContactRequest } from '@/lib/api';

export const useContactForm = (contact?: Contact) => {
  const [formData, setFormData] = useState<CreateContactRequest>({
    email: '',
    firstName: '',
    tags: [],
    status: 'active'
  });
  
  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    if (contact) {
      setFormData({
        email: contact.email,
        firstName: contact.firstName,
        tags: contact.tags || [],
        status: contact.status
      });
    }
  }, [contact]);

  useEffect(() => {
    const fetchAvailableTags = async () => {
      try {
        const tags = await contactApi.getAvailableTags();
        setAvailableTags(tags);
      } catch (error) {
        console.error('Nie udało się pobrać dostępnych tagów:', error);
      }
    };
    
    fetchAvailableTags();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Imię jest wymagane';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: (prev.tags || []).filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return {
    formData,
    setFormData,
    errors,
    availableTags,
    newTag,
    setNewTag,
    validateForm,
    handleAddTag,
    handleRemoveTag,
    handleKeyPress
  };
}; 