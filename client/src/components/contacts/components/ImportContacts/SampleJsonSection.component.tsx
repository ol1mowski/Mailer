import { FileText } from 'lucide-react';

export const SampleJsonSection = () => {
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
        "tags": ["Newsletter"],
        "status": "active"
      }
    ], null, 2);
  };

  return (
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
  );
}; 