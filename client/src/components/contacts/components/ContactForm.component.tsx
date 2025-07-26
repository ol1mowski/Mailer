import { useState, useEffect } from 'react';
import { Plus, Tag } from 'lucide-react';
import { Button, Input, Badge } from '@/components/ui';
import type { Contact } from '../types/contact.types';
import { contactApi } from '@/lib/api';

interface CreateContactRequest {
  email: string;
  firstName: string;
  tags?: string[];
  status?: string;
}

interface UpdateContactRequest {
  email: string;
  firstName: string;
  tags?: string[];
  status?: string;
}

interface ContactFormProps {
  contact?: Contact;
  onSubmit: (data: CreateContactRequest | UpdateContactRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ContactFormComponent = ({ contact, onSubmit, onCancel, isLoading = false }: ContactFormProps) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const submitData = {
        ...formData,
        tags: (formData.tags || []).length > 0 ? formData.tags : undefined
      };
      
      onSubmit(submitData);
    }
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

    return (
    <form onSubmit={handleSubmit} className="space-y-6 z-50">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-sm font-bold">1</span>
          </div>
          Informacje osobowe
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-blue-900 mb-2">Imię *</label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              className={`${errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-blue-300 focus:border-blue-500'} focus:ring-blue-500`}
              disabled={isLoading}
              placeholder="Wprowadź imię"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.firstName}
            </p>}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200">
        <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center gap-2">
          <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-indigo-600 text-sm font-bold">2</span>
          </div>
          Informacje kontaktowe
        </h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-indigo-900 mb-2">Email *</label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className={`${errors.email ? 'border-red-500 focus:border-red-500' : 'border-indigo-300 focus:border-indigo-500'} focus:ring-indigo-500`}
              disabled={isLoading}
              placeholder="kontakt@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.email}
            </p>}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-600 text-sm font-bold">3</span>
          </div>
          Dodatkowe informacje
        </h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-purple-900 mb-2">Status</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="active">🟢 Aktywny</option>
              <option value="inactive">🟡 Nieaktywny</option>
              <option value="unsubscribed">🔴 Wypisany</option>
            </select>
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-purple-900 mb-2">Tagi</label>
            
            {/* Gotowe tagi */}
            {availableTags.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-purple-700 mb-2">Dostępne tagi:</p>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        if (!formData.tags?.includes(tag)) {
                          setFormData(prev => ({
                            ...prev,
                            tags: [...(prev.tags || []), tag]
                          }));
                        }
                      }}
                      disabled={isLoading || formData.tags?.includes(tag)}
                      className={`px-3 py-1 text-sm rounded-full border transition-all ${
                        formData.tags?.includes(tag)
                          ? 'bg-purple-200 text-purple-800 border-purple-300 cursor-not-allowed'
                          : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex gap-2 mb-3">
              <Input
                id="tags"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Dodaj tag (np. VIP, Klient)..."
                disabled={isLoading}
                className="border-purple-300 focus:border-purple-500 focus:ring-purple-500"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddTag}
                disabled={isLoading || !newTag.trim()}
                className="border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {(formData.tags || []).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {(formData.tags || []).map(tag => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1 bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200 transition-colors"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-red-500 transition-colors"
                      disabled={isLoading}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

        <div className="flex justify-end gap-3 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="min-w-[120px] border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Anuluj
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="min-w-[120px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Zapisywanie...
              </div>
            ) : (
              contact ? 'Zapisz zmiany' : 'Dodaj kontakt'
            )}
          </Button>
        </div>
      </form>
  );
}; 