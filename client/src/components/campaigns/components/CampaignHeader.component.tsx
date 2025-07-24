import { Plus } from 'lucide-react'
import { Button, Loading } from '@/components/ui'

interface CampaignHeaderProps {
  onAddCampaign: () => void
  isLoading: boolean
}

export const CampaignHeader = ({ onAddCampaign, isLoading }: CampaignHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kampanie</h1>
        <p className="text-gray-600">Zarządzaj kampaniami email i śledź ich wyniki</p>
      </div>
      <Button onClick={onAddCampaign} disabled={isLoading}>
        {isLoading ? (
          <Loading size="sm" variant="dots" />
        ) : (
          <>
            <Plus className="h-4 w-4 mr-2" />
            Nowa kampania
          </>
        )}
      </Button>
    </div>
  )
} 