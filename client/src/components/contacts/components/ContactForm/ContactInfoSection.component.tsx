import { Input } from '@/components/ui';
import type { CreateContactRequest } from '@/lib/api';

interface ContactInfoSectionProps {
  formData: CreateContactRequest;
  errors: Record<string, string>;
  isLoading: boolean;
  onFormDataChange: (data: Partial<CreateContactRequest>) => void;
}

export const ContactInfoSection = ({ formData, errors, isLoading, onFormDataChange }: ContactInfoSectionProps) => {
  return (
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
            onChange={(e) => onFormDataChange({ email: e.target.value })}
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
  );
}; 