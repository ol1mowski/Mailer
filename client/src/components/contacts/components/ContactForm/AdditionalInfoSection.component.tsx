import { Plus, Tag } from 'lucide-react';
import { Input, Button, Badge } from '@/components/ui';
import type { CreateContactRequest } from '@/lib/api';

interface AdditionalInfoSectionProps {
  formData: CreateContactRequest;
  availableTags: string[];
  newTag: string;
  isLoading: boolean;
  onFormDataChange: (data: Partial<CreateContactRequest>) => void;
  onNewTagChange: (tag: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const AdditionalInfoSection = ({ 
  formData, 
  availableTags, 
  newTag, 
  isLoading, 
  onFormDataChange, 
  onNewTagChange, 
  onAddTag, 
  onRemoveTag, 
  onKeyPress 
}: AdditionalInfoSectionProps) => {
  return (
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
            onChange={(e) => onFormDataChange({ status: e.target.value })}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
          >
            <option value="active">🟢 Aktywny</option>
            <option value="inactive">🔴 Nieaktywny</option>
            <option value="unsubscribed">⚫ Wypisany</option>
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
                        onFormDataChange({
                          tags: [...(formData.tags || []), tag]
                        });
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
              onChange={(e) => onNewTagChange(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="Dodaj tag (np. VIP, Klient)..."
              disabled={isLoading}
              className="border-purple-300 focus:border-purple-500 focus:ring-purple-500"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onAddTag}
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
                    onClick={() => onRemoveTag(tag)}
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
  );
}; 