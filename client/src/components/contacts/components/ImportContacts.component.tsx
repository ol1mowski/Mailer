import { useState } from 'react';
import { FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui';
import type { CreateContactRequest } from '../../../lib/api';

interface ImportContactsProps {
  onImport: (contacts: CreateContactRequest[]) => void;
  isLoading?: boolean;
}

export const ImportContactsComponent = ({ onImport, isLoading = false }: ImportContactsProps) => {
  const [jsonContent, setJsonContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<CreateContactRequest[] | null>(null);

  const validateJson = (content: string): CreateContactRequest[] | null => {
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
      
      return validatedContacts;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Błąd walidacji JSON: ${err.message}`);
      }
      throw new Error('Nieprawidłowy format JSON');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      setError('Plik musi być w formacie JSON');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setJsonContent(content);
      handleJsonChange(content);
    };
    reader.readAsText(file);
  };

  const handleJsonChange = (content: string) => {
    setError(null);
    setPreview(null);
    
    if (!content.trim()) return;
    
    try {
      const contacts = validateJson(content);
      setPreview(contacts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nieznany błąd');
    }
  };

  const handleImport = () => {
    if (!preview) return;
    
    try {
      onImport(preview);
      setJsonContent('');
      setPreview(null);
      setError(null);
    } catch (err) {
      setError('Błąd podczas importu');
    }
  };

  const getSampleJson = () => {
    return JSON.stringify([
      {
        "email": "jan.kowalski@example.com",
        "firstName": "Jan",
        "tags": ["VIP", "Klient"],
        "status": "active"
      },
      {
        "email": "anna.nowak@example.com",
        "firstName": "Anna",
        "lastName": "Nowak",
        "tags": ["Newsletter"],
        "status": "active"
      }
    ], null, 2);
  };

  return (
    <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Wybierz plik JSON lub wklej zawartość
          </label>
          <input
            type="file"
            accept=".json,application/json"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lub wklej JSON tutaj:
          </label>
          <textarea
            value={jsonContent}
            onChange={(e) => {
              setJsonContent(e.target.value);
              handleJsonChange(e.target.value);
            }}
            placeholder="Wklej tutaj JSON z kontaktami..."
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        {preview && (
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
              onClick={handleImport}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Importowanie...' : `Zaimportuj ${preview.length} kontaktów`}
            </Button>
          </div>
        )}

        <div className="border-t pt-4">
          <details className="group">
            <summary className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-800">
              <FileText className="h-4 w-4" />
              Przykład formatu JSON
            </summary>
            <div className="mt-2 p-3 bg-gray-50 rounded-md">
              <pre className="text-xs text-gray-700 overflow-x-auto">
                {getSampleJson()}
              </pre>
            </div>
          </details>
        </div>
      </div>
  );
}; 