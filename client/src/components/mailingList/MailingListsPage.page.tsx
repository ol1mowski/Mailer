import { useState } from 'react'
import { useMailingLists } from './hooks/useMailingLists.hook'
import { calculateMailingListStats } from './utils/mailingListUtils.utils'
import { MailingListHeader } from './components/MailingListHeader.component'
import { MailingListStatsComponent } from './components/MailingListStats.component'
import { MailingListFiltersComponent } from './components/MailingListFilters.component'
import { MailingListForm } from './components/MailingListForm.component'
import { MailingListListComponent } from './components/MailingListList.component'
import { ErrorMessage } from '@/components/ui'
import type { MailingListFormData } from './types/mailingList.types'

export const MailingListsPage = () => {
  const {
    mailingLists,
    filteredLists,
    filters,
    isLoading,
    error,
    addMailingList,
    updateMailingList,
    deleteMailingList,
    updateFilters,
    clearError
  } = useMailingLists()

  const [showForm, setShowForm] = useState(false)
  const [editingList, setEditingList] = useState<string | null>(null)

  const stats = calculateMailingListStats(mailingLists)
  const hasFilters = Boolean(filters.searchTerm) || filters.selectedTags.length > 0

  const handleAddMailingList = (data: MailingListFormData) => {
    addMailingList(data)
    setShowForm(false)
  }

  const handleUpdateMailingList = (data: MailingListFormData) => {
    if (editingList) {
      updateMailingList(editingList, data)
      setEditingList(null)
      setShowForm(false)
    }
  }

  const handleEdit = (id: string) => {
    const list = mailingLists.find(l => l.id === id)
    if (list) {
      setEditingList(id)
      setShowForm(true)
    }
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć tę listę mailingową?')) {
      deleteMailingList(id)
    }
  }

  const handleSendEmail = (id: string) => {
    // TODO: Implement email sending functionality
    console.log('Send email to list:', id)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingList(null)
  }

  const editingListData = editingList 
    ? mailingLists.find(l => l.id === editingList)
    : null

  return (
    <div className="space-y-6">
      {error && (
        <ErrorMessage 
          message={error} 
          onClose={clearError}
        />
      )}

      <MailingListHeader 
        onAddList={() => setShowForm(true)}
        isLoading={isLoading}
      />

      <MailingListStatsComponent stats={stats} />

      <MailingListFiltersComponent
        filters={filters}
        onUpdateFilters={updateFilters}
      />

      {showForm && (
        <MailingListForm
          initialData={editingListData || undefined}
          onSubmit={editingList ? handleUpdateMailingList : handleAddMailingList}
          onCancel={handleCancel}
          loading={isLoading}
        />
      )}

      {!showForm && (
        <MailingListListComponent
          mailingLists={filteredLists}
          onAddList={() => setShowForm(true)}
          onEditList={handleEdit}
          onDeleteList={handleDelete}
          onSendEmail={handleSendEmail}
          isLoading={isLoading}
          hasFilters={hasFilters}
        />
      )}
    </div>
  )
} 