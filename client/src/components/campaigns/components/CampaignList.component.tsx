import { Mail, Plus } from 'lucide-react'
import { Button, Card } from '@/components/ui'
import type { Campaign } from '../types/campaign.types'
import { CampaignCard } from './CampaignCard.component'

interface CampaignListProps {
  campaigns: Campaign[]
  onAddCampaign: () => void
  onEditCampaign: (id: string) => void
  onDeleteCampaign: (id: string) => void
  onStartCampaign: (id: string) => void
  onPauseCampaign: (id: string) => void
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
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Lista kampanii ({campaigns.length})
          </h2>
        </div>
        
        <div className="space-y-4">
          {campaigns.map(campaign => (
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
          
          {campaigns.length === 0 && (
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Brak kampanii</h3>
              <p className="text-gray-600 mb-4">
                {hasFilters 
                  ? 'Nie znaleziono kampanii pasujących do filtrów'
                  : 'Utwórz swoją pierwszą kampanię email, aby rozpocząć'
                }
              </p>
              {!hasFilters && (
                <Button onClick={onAddCampaign}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nowa kampania
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
} 