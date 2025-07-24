import { Search, Plus, Filter, FileText, Edit, Copy } from 'lucide-react'
import { Button, Input, Card, Loading, ErrorMessage } from '@/components/ui'
import { EMAIL_TEMPLATE_CATEGORIES } from '@/constants/app.constants'
import { useEmailTemplates } from './hooks/useEmailTemplates.hook'
import { calculateEmailTemplateStats } from './utils/emailTemplateUtils.utils'
import { EmailTemplateHeader } from './components/EmailTemplateHeader.component'
import { EmailTemplateCard } from './components/EmailTemplateCard.component'

export const EmailTemplatesPage = () => {
  const {
    templates,
    filteredTemplates,
    filters,
    isLoading,
    error,
    handleAddTemplate,
    handleEditTemplate,
    handleDuplicateTemplate,
    handleDeleteTemplate,
    handleToggleActive,
    updateFilters,
    clearError
  } = useEmailTemplates()

  const stats = calculateEmailTemplateStats(templates)

  if (isLoading && templates.length === 0) {
    return <Loading fullScreen text="Ładowanie szablonów..." />
  }

  return (
    <div className="space-y-6">
      {error && (
        <ErrorMessage 
          message={error} 
          onClose={clearError}
        />
      )}

      <EmailTemplateHeader 
        onAddTemplate={handleAddTemplate}
        isLoading={isLoading}
      />

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
            <span className="text-sm text-gray-600">Kategoria:</span>
            <select
              value={filters.selectedCategory}
              onChange={(e) => updateFilters({ selectedCategory: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              disabled={isLoading}
            >
              <option value="">Wszystkie</option>
              {EMAIL_TEMPLATE_CATEGORIES.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Wszystkie szablony</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <Edit className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Aktywne</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <Copy className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Kategorie</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.categories}</p>
            </div>
          </div>
        </Card>
      </div>
                
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Szablony ({filteredTemplates.length})
            </h2>
            {isLoading && <Loading size="sm" variant="dots" />}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map(template => (
              <EmailTemplateCard
                key={template.id}
                template={template}
                onEdit={handleEditTemplate}
                onDuplicate={handleDuplicateTemplate}
                onDelete={handleDeleteTemplate}
                onToggleActive={handleToggleActive}
                isLoading={isLoading}
              />
            ))}
          </div>
          
          {filteredTemplates.length === 0 && (
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
                <Button onClick={handleAddTemplate} disabled={isLoading}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nowy szablon
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
} 