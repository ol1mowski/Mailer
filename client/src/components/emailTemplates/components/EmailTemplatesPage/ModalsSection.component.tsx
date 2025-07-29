import { Modal } from '@/components/ui'
import { EmailTemplateForm } from '../EmailTemplateForm'
import { DeleteConfirmation } from '../DeleteConfirmation.component'
import type { EmailTemplate } from '../../types/emailTemplate.types'
import type { CreateEmailTemplateRequest, UpdateEmailTemplateRequest } from '@/lib/api'

interface ModalsSectionProps {
  showForm: boolean
  editingTemplate: EmailTemplate | null
  showDeleteConfirm: boolean
  deletingTemplate: EmailTemplate | null
  isLoading: boolean
  onSubmitTemplate: (data: CreateEmailTemplateRequest | UpdateEmailTemplateRequest) => void
  onConfirmDelete: () => void
  onCloseForm: () => void
  onCloseDeleteConfirm: () => void
}

export const ModalsSection = ({
  showForm,
  editingTemplate,
  showDeleteConfirm,
  deletingTemplate,
  isLoading,
  onSubmitTemplate,
  onConfirmDelete,
  onCloseForm,
  onCloseDeleteConfirm
}: ModalsSectionProps) => {
  return (
    <>
      <Modal
        isOpen={showForm}
        onClose={onCloseForm}
        title={editingTemplate ? 'Edytuj szablon email' : 'Dodaj nowy szablon email'}
        size="xl"
      >
        <EmailTemplateForm
          template={editingTemplate}
          onSubmit={onSubmitTemplate}
          onCancel={onCloseForm}
          isLoading={isLoading}
        />
      </Modal>

      <Modal
        isOpen={showDeleteConfirm}
        onClose={onCloseDeleteConfirm}
        title="Potwierdź usunięcie"
        size="md"
        variant="danger"
      >
        <DeleteConfirmation
          template={deletingTemplate}
          onConfirm={onConfirmDelete}
          onCancel={onCloseDeleteConfirm}
          isLoading={isLoading}
        />
      </Modal>
    </>
  )
}