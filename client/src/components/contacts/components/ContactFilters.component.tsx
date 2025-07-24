import { Search, Filter } from 'lucide-react'
import { Input, Card } from '@/components/ui'
import { CONTACT_TAGS } from '@/constants/app.constants'
import { cn } from '@/utils'
import type { ContactFilters } from '../types/contact.types'

interface ContactFiltersProps {
  filters: ContactFilters
  onUpdateFilters: (filters: Partial<ContactFilters>) => void
  onToggleTag: (tag: string) => void
  isLoading: boolean
}

export const ContactFiltersComponent = ({ 
  filters, 
  onUpdateFilters, 
  onToggleTag, 
  isLoading 
}: ContactFiltersProps) => {
  return (
    <Card className="p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Wyszukaj kontakty..."
              value={filters.searchTerm}
              onChange={(e) => onUpdateFilters({ searchTerm: e.target.value })}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">Filtry:</span>
          <div className="flex flex-wrap gap-2">
            {CONTACT_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => onToggleTag(tag)}
                className={cn(
                  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors cursor-pointer",
                  filters.selectedTags.includes(tag) 
                    ? "border-transparent bg-primary text-primary-foreground hover:bg-primary/80" 
                    : "text-foreground hover:bg-gray-100"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
} 