import { CampaignCard } from './CampaignCard.component'
import type { Campaign } from '@/lib/api'
import type { CreateCampaignRequest, UpdateCampaignRequest } from '@/lib/api'

interface CampaignListProps {
  campaigns: Campaign[]
  onAddCampaign: (data: CreateCampaignRequest) => void
  onEditCampaign: (id: number, data: UpdateCampaignRequest) => void
  onDeleteCampaign: (id: number) => void
  onStartCampaign: (id: number) => void
  onPauseCampaign: (id: number) => void
  isLoading: boolean
  hasFilters: boolean
}

export const CampaignListComponent = ({
  campaigns,
  onAddCampaign,
  onEditCampaign,
  onDeleteCampaign,
  onStartCampaign,
  onPauseCampaign,
  isLoading,
  hasFilters
}: CampaignListProps) => {
  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 text-gray-400">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          {hasFilters ? 'Brak kampanii spełniających kryteria' : 'Brak kampanii'}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {hasFilters ? 'Spróbuj zmienić filtry' : 'Rozpocznij od utworzenia pierwszej kampanii'}
        </p>
        {!hasFilters && (
          <div className="mt-6">
            <button
              onClick={() => onAddCampaign({
                name: '',
                subject: '',
                content: '',
                status: 'draft'
              })}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Utwórz kampanię
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          campaign={campaign}
          onEdit={onEditCampaign}
          onDelete={onDeleteCampaign}
          onStart={onStartCampaign}
          onPause={onPauseCampaign}
          isLoading={isLoading}
        />
      ))}
    </div>
  )
} 