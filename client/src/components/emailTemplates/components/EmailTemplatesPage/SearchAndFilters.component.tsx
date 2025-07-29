import { Search, Filter } from 'lucide-react'
import { Input, Card } from '@/components/ui'
import type { EmailTemplateFilters } from '../../types/emailTemplate.types'

interface SearchAndFiltersProps {
  filters: EmailTemplateFilters
  updateFilters: (newFilters: Partial<EmailTemplateFilters>) => void
  isLoading: boolean
}

export const SearchAndFilters = ({
  filters,
  updateFilters,
  isLoading
}: SearchAndFiltersProps) => {
  return (
    <Card className="p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Wyszukaj szablony..."
              value={filters.searchTerm}
              onChange={(e) => updateFilters({ searchTerm: e.target.value })}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">Status:</span>
          <select
            value={filters.selectedCategory}
            onChange={(e) => updateFilters({ selectedCategory: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            disabled={isLoading}
          >
            <option value="">Wszystkie</option>
            <option value="active">Aktywne</option>
            <option value="inactive">Nieaktywne</option>
            <option value="draft">Szkice</option>
          </select>
        </div>
      </div>
    </Card>
  )
}