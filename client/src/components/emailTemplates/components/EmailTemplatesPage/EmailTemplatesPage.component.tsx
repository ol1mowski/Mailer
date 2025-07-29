import { Loading, ErrorMessage } from '@/components/ui'
import { EmailTemplateHeader } from '../EmailTemplateHeader.component'
import { SearchAndFilters } from './SearchAndFilters.component'
import { StatsSection } from './StatsSection.component'
import { TemplatesList } from './TemplatesList.component'
import { ModalsSection } from './ModalsSection.component'
import { useEmailTemplates } from '../../hooks/useEmailTemplates.hook'
import { calculateEmailTemplateStats } from '../../utils/emailTemplateUtils.utils'

export const EmailTemplatesPage = () => {
  const {
    templates,
    filteredTemplates,
    filters,
    isLoading,
    error,
    showForm,
    editingTemplate,
    showDeleteConfirm,
    deletingTemplate,
    handleAddTemplate,
    handleEditTemplate,
    handleDuplicateTemplate,
    handleDeleteTemplate,
    handleToggleActive,
    handleSubmitTemplate,
    handleConfirmDelete,
    closeForm,
    closeDeleteConfirm,
    updateFilters
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
        />
      )}

      <EmailTemplateHeader 
        onAddTemplate={handleAddTemplate}
        isLoading={isLoading}
      />

      <SearchAndFilters
        filters={filters}
        updateFilters={updateFilters}
        isLoading={isLoading}
      />

      <StatsSection stats={stats} />

      <TemplatesList
        templates={filteredTemplates}
        filters={filters}
        isLoading={isLoading}
        onAddTemplate={handleAddTemplate}
        onEditTemplate={handleEditTemplate}
        onDuplicateTemplate={handleDuplicateTemplate}
        onDeleteTemplate={handleDeleteTemplate}
        onToggleActive={handleToggleActive}
      />

      <ModalsSection
        showForm={showForm}
        editingTemplate={editingTemplate}
        showDeleteConfirm={showDeleteConfirm}
        deletingTemplate={deletingTemplate}
        isLoading={isLoading}
        onSubmitTemplate={handleSubmitTemplate}
        onConfirmDelete={handleConfirmDelete}
        onCloseForm={closeForm}
        onCloseDeleteConfirm={closeDeleteConfirm}
      />
    </div>
  )
}