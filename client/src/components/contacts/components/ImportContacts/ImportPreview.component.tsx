import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui';
import type { CreateContactRequest } from '../../../../lib/api';

interface ImportPreviewProps {
  preview: CreateContactRequest[];
  onImport: () => void;
  isLoading?: boolean;
}

export const ImportPreview = ({ preview, onImport, isLoading = false }: ImportPreviewProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
        <CheckCircle className="h-5 w-5 text-green-500" />
        <span className="text-green-700 text-sm">
          Znaleziono {preview.length} kontaktów do zaimportowania
        </span>
      </div>

      <div className="max-h-40 overflow-y-auto">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Podgląd:</h4>
        <div className="space-y-1">
          {preview.slice(0, 5).map((contact, index) => (
            <div key={index} className="text-sm text-gray-600">
              {contact.firstName} ({contact.email})
            </div>
          ))}
          {preview.length > 5 && (
            <div className="text-sm text-gray-500">
              ... i {preview.length - 5} więcej
            </div>
          )}
        </div>
      </div>

      <Button
        onClick={onImport}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Importowanie...' : `Zaimportuj ${preview.length} kontaktów`}
      </Button>
    </div>
  );
}; 