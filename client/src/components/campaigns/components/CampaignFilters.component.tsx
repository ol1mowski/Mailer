import { Search, Filter } from 'lucide-react'
import { Input, Card } from '@/components/ui'
import type { CampaignFilters } from '../types/campaign.types'
import { CAMPAIGN_STATUSES } from '@/constants/app.constants'

interface CampaignFiltersProps {
  filters: CampaignFilters
  onUpdateFilters: (filters: Partial<CampaignFilters>) => void
}

export const CampaignFiltersComponent = ({ filters, onUpdateFilters }: CampaignFiltersProps) => {
  return (
    <Card className="p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Wyszukaj kampanie..."
              value={filters.searchTerm}
              onChange={(e) => onUpdateFilters({ searchTerm: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">Status:</span>
          <select
            value={filters.selectedStatus}
            onChange={(e) => onUpdateFilters({ selectedStatus: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            <option value="">Wszystkie</option>
            {CAMPAIGN_STATUSES.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  )
} 