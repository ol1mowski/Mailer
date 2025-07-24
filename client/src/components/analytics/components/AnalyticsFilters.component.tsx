import { Filter } from 'lucide-react'
import { Button, Card } from '@/components/ui'
import type { AnalyticsFilters } from '../types/analytics.types'
import { getPeriodDays } from '../utils/analyticsUtils.utils'

interface AnalyticsFiltersProps {
  filters: AnalyticsFilters
  periods: Array<{ value: string; label: string }>
  onUpdateFilters: (filters: Partial<AnalyticsFilters>) => void
}

export const AnalyticsFiltersComponent = ({ 
  filters, 
  periods, 
  onUpdateFilters 
}: AnalyticsFiltersProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Okres:</span>
          <div className="flex space-x-1">
            {periods.map(period => (
              <Button
                key={period.value}
                variant={filters.selectedPeriod === period.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => onUpdateFilters({ selectedPeriod: period.value })}
              >
                {period.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            Ostatnie {getPeriodDays(filters.selectedPeriod)} dni
          </span>
        </div>
      </div>
    </Card>
  )
} 