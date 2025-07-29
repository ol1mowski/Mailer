import { useState } from 'react'
import { useCampaigns } from './hooks/useCampaigns.hook'
import { calculateCampaignStats } from './utils/campaignUtils.utils'
import { CampaignHeader } from './components/CampaignHeader.component'
import { CampaignFiltersComponent } from './components/CampaignFilters.component'
import { CampaignStatsComponent } from './components/CampaignStats.component'
import { CampaignListComponent } from './components/CampaignList.component'
import { ModalsSection } from './components/ModalsSection.component'
import { Loading, ErrorMessage } from '@/components/ui'
import type { Campaign, CreateCampaignRequest, UpdateCampaignRequest } from '@/lib/api'

export const CampaignsPage = () => {
  const [showForm, setShowForm] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deletingCampaign, setDeletingCampaign] = useState<Campaign | null>(null)

  const {
    campaigns,
    filteredCampaigns,
    filters,
    isLoading,
    error,
    handleAddCampaign,
    handleEditCampaign,
    handleDeleteCampaign,
    handleStartCampaign,
    handlePauseCampaign,
    updateFilters,
    clearError
  } = useCampaigns()

  const stats = calculateCampaignStats(campaigns)
  const hasFilters = Boolean(filters.searchTerm) || Boolean(filters.selectedStatus)

  const handleOpenForm = (campaign?: Campaign) => {
    setEditingCampaign(campaign || null)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingCampaign(null)
  }

  const handleOpenDeleteConfirm = (campaign: Campaign) => {
    setDeletingCampaign(campaign)
    setShowDeleteConfirm(true)
  }

  const handleCloseDeleteConfirm = () => {
    setShowDeleteConfirm(false)
    setDeletingCampaign(null)
  }

  const handleSubmitCampaign = (data: CreateCampaignRequest | UpdateCampaignRequest) => {
    if (editingCampaign) {
      handleEditCampaign(editingCampaign.id, data as UpdateCampaignRequest)
    } else {
      handleAddCampaign(data as CreateCampaignRequest)
    }
    handleCloseForm()
  }

  const handleConfirmDelete = () => {
    if (deletingCampaign) {
      handleDeleteCampaign(deletingCampaign.id)
      handleCloseDeleteConfirm()
    }
  }

  if (isLoading && campaigns.length === 0) {
    return <Loading fullScreen text="Ładowanie kampanii..." />
  }

  return (
    <div className="space-y-6">
      {error && (
        <ErrorMessage 
          message={error} 
          onClose={clearError}
        />
      )}

      <CampaignHeader 
        onAddCampaign={() => handleOpenForm()}
        isLoading={isLoading}
      />

      <CampaignFiltersComponent
        filters={filters}
        onUpdateFilters={updateFilters}
      />

      <CampaignStatsComponent stats={stats} />

      <CampaignListComponent
        campaigns={filteredCampaigns}
        onAddCampaign={() => handleOpenForm()}
        onEditCampaign={(id) => {
          const campaign = campaigns.find(c => c.id === id)
          if (campaign) {
            handleOpenForm(campaign)
          }
        }}
        onDeleteCampaign={(id) => {
          const campaign = campaigns.find(c => c.id === id)
          if (campaign) {
            handleOpenDeleteConfirm(campaign)
          }
        }}
        onStartCampaign={handleStartCampaign}
        onPauseCampaign={handlePauseCampaign}
        isLoading={isLoading}
        hasFilters={hasFilters}
      />

      <ModalsSection
        showForm={showForm}
        editingCampaign={editingCampaign}
        showDeleteConfirm={showDeleteConfirm}
        deletingCampaign={deletingCampaign}
        isLoading={isLoading}
        onSubmitCampaign={handleSubmitCampaign}
        onConfirmDelete={handleConfirmDelete}
        onCloseForm={handleCloseForm}
        onCloseDeleteConfirm={handleCloseDeleteConfirm}
      />
    </div>
  )
} 