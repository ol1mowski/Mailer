import { useCampaigns } from './hooks/useCampaigns.hook'
import { calculateCampaignStats } from './utils/campaignUtils.utils'
import { CampaignHeader } from './components/CampaignHeader.component'
import { CampaignFiltersComponent } from './components/CampaignFilters.component'
import { CampaignStatsComponent } from './components/CampaignStats.component'
import { CampaignListComponent } from './components/CampaignList.component'
import { Loading, ErrorMessage } from '@/components/ui'

export const CampaignsPage = () => {
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
        onAddCampaign={handleAddCampaign}
        isLoading={isLoading}
      />

      <CampaignFiltersComponent
        filters={filters}
        onUpdateFilters={updateFilters}
      />

      <CampaignStatsComponent stats={stats} />

      <CampaignListComponent
        campaigns={filteredCampaigns}
        onAddCampaign={handleAddCampaign}
        onEditCampaign={handleEditCampaign}
        onDeleteCampaign={handleDeleteCampaign}
        onStartCampaign={handleStartCampaign}
        onPauseCampaign={handlePauseCampaign}
        isLoading={isLoading}
        hasFilters={hasFilters}
      />
    </div>
  )
} 