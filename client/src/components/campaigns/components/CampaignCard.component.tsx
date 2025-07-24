import { Mail, Calendar, Play, Pause, Trash2, Edit } from 'lucide-react'
import { Badge, Button } from '@/components/ui'
import type { Campaign } from '../types/campaign.types'
import { getStatusColor, getStatusLabel, getOpenRate, getClickRate } from '../utils/campaignUtils.utils'

interface CampaignCardProps {
  campaign: Campaign
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onStart: (id: string) => void
  onPause: (id: string) => void
  isLoading: boolean
}

export const CampaignCard = ({ 
  campaign, 
  onEdit, 
  onDelete, 
  onStart, 
  onPause,
  isLoading 
}: CampaignCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Mail className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-medium text-gray-900">{campaign.name}</h3>
            <Badge
              variant={getStatusColor(campaign.status) as any}
              className="text-xs"
            >
              {getStatusLabel(campaign.status)}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mb-2">{campaign.subject}</p>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>Odbiorcy: {campaign.recipients.toLocaleString()}</span>
            {campaign.status === 'sent' && (
              <>
                <span>Wysłane: {campaign.sent.toLocaleString()}</span>
                <span>Otwarcia: {getOpenRate(campaign.opened, campaign.sent)}%</span>
                <span>Kliknięcia: {getClickRate(campaign.clicked, campaign.sent)}%</span>
              </>
            )}
            {campaign.scheduledAt && (
              <span className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(campaign.scheduledAt).toLocaleDateString('pl-PL')}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {campaign.status === 'draft' && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onStart(campaign.id)}
            disabled={isLoading}
          >
            <Play className="h-4 w-4 mr-1" />
            Start
          </Button>
        )}
        
        {campaign.status === 'sending' && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPause(campaign.id)}
            disabled={isLoading}
          >
            <Pause className="h-4 w-4 mr-1" />
            Pauza
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(campaign.id)}
          disabled={isLoading}
        >
          <Edit className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(campaign.id)}
          disabled={isLoading}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 