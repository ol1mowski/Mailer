interface FileUploadSectionProps {
  onFileUpload: (content: string) => void;
  isLoading?: boolean;
}

export const FileUploadSection = ({ onFileUpload, isLoading = false }: FileUploadSectionProps) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onFileUpload(content);
    };
    reader.readAsText(file);
  };

  return (
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
  );
}; 