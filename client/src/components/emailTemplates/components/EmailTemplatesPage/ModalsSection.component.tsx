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
      {showForm && (
        <EmailTemplateForm
          template={editingTemplate}
          onSubmit={onSubmitTemplate}
          onCancel={onCloseForm}
          isLoading={isLoading}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmation
          template={deletingTemplate}
          onConfirm={onConfirmDelete}
          onCancel={onCloseDeleteConfirm}
          isLoading={isLoading}
        />
      )}
    </>
  )
}