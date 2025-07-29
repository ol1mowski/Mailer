import { Plus } from 'lucide-react'
import { Button } from '@/components/ui'
import type { CreateCampaignRequest } from '@/lib/api'

interface CampaignHeaderProps {
  onAddCampaign: (data: CreateCampaignRequest) => void
  isLoading: boolean
}

export const CampaignHeader = ({ onAddCampaign, isLoading }: CampaignHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kampanie</h1>
        <p className="text-gray-600">Zarządzaj kampaniami email</p>
      </div>
      <Button
        onClick={() => onAddCampaign({
          name: '',
          subject: '',
          content: '',
          status: 'draft'
        })}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700"
      >
        <Plus className="h-4 w-4 mr-2" />
        Nowa kampania
      </Button>
    </div>
  )
} 