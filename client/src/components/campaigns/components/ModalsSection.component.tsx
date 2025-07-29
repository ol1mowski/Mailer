import { CampaignForm } from './CampaignForm/CampaignForm.component'
import { DeleteConfirmation } from './DeleteConfirmation.component'
import { Modal } from '@/components/ui'
import type { Campaign } from '@/lib/api'
import type { CreateCampaignRequest, UpdateCampaignRequest } from '@/lib/api'

interface ModalsSectionProps {
  showForm: boolean
  editingCampaign: Campaign | null
  showDeleteConfirm: boolean
  deletingCampaign: Campaign | null
  isLoading: boolean
  onSubmitCampaign: (data: CreateCampaignRequest | UpdateCampaignRequest) => void
  onConfirmDelete: () => void
  onCloseForm: () => void
  onCloseDeleteConfirm: () => void
}

export const ModalsSection = ({
  showForm,
  editingCampaign,
  showDeleteConfirm,
  deletingCampaign,
  isLoading,
  onSubmitCampaign,
  onConfirmDelete,
  onCloseForm,
  onCloseDeleteConfirm
}: ModalsSectionProps) => {
  return (
    <>
      <Modal
        isOpen={showForm}
        onClose={onCloseForm}
        title={editingCampaign ? 'Edytuj kampanię' : 'Nowa kampania'}
        size="xl"
      >
        <CampaignForm
          campaign={editingCampaign}
          onSubmit={onSubmitCampaign}
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
          campaign={deletingCampaign}
          onConfirm={onConfirmDelete}
          onCancel={onCloseDeleteConfirm}
          isLoading={isLoading}
        />
      </Modal>
    </>
  )
}