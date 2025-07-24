import { Loading, ErrorMessage } from '@/components/ui'
import { useContacts } from './hooks/useContacts.hook'
import { calculateContactStats } from './utils/contactUtils.utils'
import { ContactHeader } from './components/ContactHeader.component'
import { ContactFiltersComponent } from './components/ContactFilters.component'
import { ContactStatsComponent } from './components/ContactStats.component'
import { ContactList } from './components/ContactList.component'

export const ContactsPage = () => {
  const {
    contacts,
    filteredContacts,
    filters,
    isLoading,
    error,
    handleAddContact,
    handleDeleteContact,
    updateFilters,
    toggleTag,
    clearError
  } = useContacts()

  const stats = calculateContactStats(contacts)
  const hasFilters = Boolean(filters.searchTerm) || filters.selectedTags.length > 0

  if (isLoading && contacts.length === 0) {
    return <Loading fullScreen text="Ładowanie kontaktów..." />
  }

  return (
    <div className="space-y-6">
      {error && (
        <ErrorMessage 
          message={error} 
          onClose={clearError}
        />
      )}

      <ContactHeader 
        onAddContact={handleAddContact}
        isLoading={isLoading}
      />

      <ContactFiltersComponent
        filters={filters}
        onUpdateFilters={updateFilters}
        onToggleTag={toggleTag}
        isLoading={isLoading}
      />

      <ContactStatsComponent stats={stats} />

      <ContactList
        contacts={filteredContacts}
        onDelete={handleDeleteContact}
        onAddContact={handleAddContact}
        isLoading={isLoading}
        hasFilters={hasFilters}
      />
    </div>
  )
} 