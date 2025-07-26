import { ContactHeader } from './components/ContactHeader.component';
import { ContactFiltersComponent } from './components/ContactFilters.component';
import { ContactStatsComponent } from './components/ContactStats.component';
import { ContactList } from './components/ContactList.component';
import { ContactFormComponent } from './components/ContactForm';
import { ImportContactsComponent } from './components/ImportContacts';
import { DeleteConfirmationComponent } from './components/DeleteConfirmation.component';
import { useContacts } from './hooks/useContacts';
import { ErrorMessage, Loading, Modal } from '@/components/ui';
import { calculateContactStats } from './utils/contactUtils.utils';

export const ContactsPage = () => {
  const {
    contacts,
    filteredContacts,
    filters,
    isLoading,
    error,
    showForm,
    showImport,
    showDeleteConfirm,
    editingContact,
    deletingContact,
    handleAddContact,
    handleUpdateContact,
    handleDeleteContact,
    handleImportContacts,
    openAddForm,
    openEditForm,
    openImportForm,
    openDeleteConfirm,
    closeDeleteConfirm,
    closeForms,
    updateFilters,
    toggleTag,
    clearError
  } = useContacts();

  const stats = calculateContactStats(contacts);
  const hasFilters = Boolean(filters.searchTerm) || filters.selectedTags.length > 0;

  if (isLoading && contacts.length === 0) {
    return <Loading fullScreen text="Ładowanie kontaktów..." />;
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
        onAddContact={openAddForm}
        onImportContacts={openImportForm}
        isLoading={isLoading}
      />

      <ContactFiltersComponent
        filters={filters}
        onUpdateFilters={updateFilters}
        onToggleTag={toggleTag}
        isLoading={isLoading}
      />

      <ContactStatsComponent stats={stats} isLoading={isLoading} />

      <Modal
        isOpen={showForm}
        onClose={closeForms}
        title={editingContact ? 'Edytuj kontakt' : 'Dodaj nowy kontakt'}
        size="lg"
      >
        <ContactFormComponent
          contact={editingContact || undefined}
          onSubmit={editingContact ? handleUpdateContact : handleAddContact}
          onCancel={closeForms}
          isLoading={isLoading}
        />
      </Modal>

      <Modal
        isOpen={showImport}
        onClose={closeForms}
        title="Import kontaktów z JSON"
        size="xl"
      >
        <ImportContactsComponent
          onImport={handleImportContacts}
          isLoading={isLoading}
        />
      </Modal>

      <Modal
        isOpen={showDeleteConfirm}
        onClose={closeDeleteConfirm}
        title="Potwierdź usunięcie"
        size="md"
        variant="danger"
      >
        <DeleteConfirmationComponent
          contact={deletingContact}
          onConfirm={() => deletingContact && handleDeleteContact(deletingContact.id)}
          onCancel={closeDeleteConfirm}
          isLoading={isLoading}
        />
      </Modal>

      <ContactList
        contacts={filteredContacts}
        onDelete={openDeleteConfirm}
        onEdit={openEditForm}
        onAddContact={openAddForm}
        isLoading={isLoading}
        hasFilters={hasFilters}
      />
    </div>
  );
}; 