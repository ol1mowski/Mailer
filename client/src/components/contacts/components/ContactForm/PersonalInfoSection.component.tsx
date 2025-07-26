import { Input } from '@/components/ui';
import type { CreateContactRequest } from '@/lib/api';

interface PersonalInfoSectionProps {
  formData: CreateContactRequest;
  errors: Record<string, string>;
  isLoading: boolean;
  onFormDataChange: (data: Partial<CreateContactRequest>) => void;
}

export const PersonalInfoSection = ({ formData, errors, isLoading, onFormDataChange }: PersonalInfoSectionProps) => {
  return (
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
            onChange={(e) => onFormDataChange({ firstName: e.target.value })}
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
  );
}; 