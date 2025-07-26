import { useState } from 'react';
import type { CreateContactRequest } from '../../../../lib/api';
import { FileUploadSection } from './FileUploadSection.component';
import { JsonInputSection } from './JsonInputSection.component';
import { ImportPreview } from './ImportPreview.component';
import { SampleJsonSection } from './SampleJsonSection.component';
import { useImportValidation } from './hooks/useImportValidation.hook';

interface ImportContactsProps {
  onImport: (contacts: CreateContactRequest[]) => void;
  isLoading?: boolean;
}

export const ImportContactsComponent = ({ onImport, isLoading = false }: ImportContactsProps) => {
  const [jsonContent, setJsonContent] = useState('');
  const [preview, setPreview] = useState<CreateContactRequest[] | null>(null);
  
  const { error, validateJson, clearError } = useImportValidation();

  const handleJsonChange = (content: string) => {
    setJsonContent(content);
    clearError();
    setPreview(null);
    
    if (!content.trim()) return;
    
    try {
      const contacts = validateJson(content);
      setPreview(contacts);
    } catch {
      // Error is handled by the hook
    }
  };

  const handleImport = () => {
    if (!preview) return;
    
    try {
      onImport(preview);
      setJsonContent('');
      setPreview(null);
      clearError();
    } catch {
      // Error handling is done in the parent component
    }
  };

  return (
    <div className="space-y-4">
      <FileUploadSection 
        onFileUpload={handleJsonChange}
        isLoading={isLoading}
      />

      <JsonInputSection 
        jsonContent={jsonContent}
        onJsonChange={handleJsonChange}
        error={error}
        isLoading={isLoading}
      />

      {preview && (
        <ImportPreview 
          preview={preview}
          onImport={handleImport}
          isLoading={isLoading}
        />
      )}

      <SampleJsonSection />
    </div>
  );
}; 