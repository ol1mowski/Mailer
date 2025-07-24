import { Search } from 'lucide-react'
import { Input, Card } from '@/components/ui'
import type { MailingListFilters } from '../types/mailingList.types'

interface MailingListFiltersProps {
  filters: MailingListFilters
  onUpdateFilters: (filters: Partial<MailingListFilters>) => void
}

export const MailingListFiltersComponent = ({ filters, onUpdateFilters }: MailingListFiltersProps) => {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Szukaj list mailingowych..."
              value={filters.searchTerm}
              onChange={(e) => onUpdateFilters({ searchTerm: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </Card>
  )
} 