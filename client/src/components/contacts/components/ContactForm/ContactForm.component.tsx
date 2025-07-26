import { Button } from '@/components/ui';
import type { Contact } from '../../types/contact.types';
import { PersonalInfoSection } from './PersonalInfoSection.component';
import { ContactInfoSection } from './ContactInfoSection.component';
import { AdditionalInfoSection } from './AdditionalInfoSection.component';
import { useContactForm } from './hooks/useContactForm.hook';
import type { CreateContactRequest, UpdateContactRequest } from '@/lib/api';

interface ContactFormProps {
  contact?: Contact;
  onSubmit: (data: CreateContactRequest | UpdateContactRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ContactFormComponent = ({ contact, onSubmit, onCancel, isLoading = false }: ContactFormProps) => {
  const {
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
  } = useContactForm(contact);

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

  const updateFormData = (updates: Partial<CreateContactRequest>) => {
    setFormData((prev: CreateContactRequest) => ({ ...prev, ...updates }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 z-50">
      <PersonalInfoSection 
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        onFormDataChange={updateFormData}
      />

      <ContactInfoSection 
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        onFormDataChange={updateFormData}
      />

      <AdditionalInfoSection 
        formData={formData}
        availableTags={availableTags}
        newTag={newTag}
        isLoading={isLoading}
        onFormDataChange={updateFormData}
        onNewTagChange={setNewTag}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        onKeyPress={handleKeyPress}
      />

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