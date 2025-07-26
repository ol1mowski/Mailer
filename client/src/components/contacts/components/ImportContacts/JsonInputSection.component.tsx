import { AlertCircle } from 'lucide-react';

interface JsonInputSectionProps {
  jsonContent: string;
  onJsonChange: (content: string) => void;
  error: string | null;
  isLoading?: boolean;
}

export const JsonInputSection = ({ jsonContent, onJsonChange, error, isLoading = false }: JsonInputSectionProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Lub wklej JSON tutaj:
      </label>
      <textarea
        value={jsonContent}
        onChange={(e) => onJsonChange(e.target.value)}
        placeholder="Wklej tutaj JSON z kontaktami..."
        className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
        disabled={isLoading}
      />
      
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md mt-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}
    </div>
  );
}; 