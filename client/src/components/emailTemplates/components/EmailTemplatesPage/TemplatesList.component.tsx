import { Plus, FileText } from 'lucide-react'
import { Button, Card, Loading } from '@/components/ui'
import { EmailTemplateCard } from '../EmailTemplateCard.component'
import type { EmailTemplate, EmailTemplateFilters } from '../../types/emailTemplate.types'

interface TemplatesListProps {
  templates: EmailTemplate[]
  filters: EmailTemplateFilters
  isLoading: boolean
  onAddTemplate: () => void
  onEditTemplate: (id: number) => void
  onDuplicateTemplate: (id: number) => void
  onDeleteTemplate: (id: number) => void
  onToggleActive: (id: number) => void
}

export const TemplatesList = ({
  templates,
  filters,
  isLoading,
  onAddTemplate,
  onEditTemplate,
  onDuplicateTemplate,
  onDeleteTemplate,
  onToggleActive
}: TemplatesListProps) => {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Szablony ({templates.length})
          </h2>
          {isLoading && <Loading size="sm" variant="dots" />}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map(template => (
            <EmailTemplateCard
              key={template.id}
              template={template}
              onEdit={onEditTemplate}
              onDuplicate={onDuplicateTemplate}
              onDelete={onDeleteTemplate}
              onToggleActive={onToggleActive}
              isLoading={isLoading}
            />
          ))}
        </div>
        
        {templates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Brak szablonów</h3>
            <p className="text-gray-600 mb-4">
              {filters.searchTerm || filters.selectedCategory 
                ? 'Nie znaleziono szablonów pasujących do filtrów'
                : 'Utwórz swój pierwszy szablon, aby rozpocząć'
              }
            </p>
            {!filters.searchTerm && !filters.selectedCategory && (
              <Button onClick={onAddTemplate} disabled={isLoading}>
                <Plus className="h-4 w-4 mr-2" />
                Nowy szablon
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}