import { Edit, Trash2, Play, Pause, Mail, Users, Eye, MousePointer } from 'lucide-react'
import { Button, Card, Badge } from '@/components/ui'
import type { Campaign, UpdateCampaignRequest } from '@/lib/api'
import { CAMPAIGN_STATUS_LABELS, CAMPAIGN_STATUS_COLORS } from '../types/campaign.types'
import { getOpenRate, getClickRate, formatDate } from '../utils/campaignUtils.utils'

interface CampaignCardProps {
  campaign: Campaign
  onEdit: (id: number, data: UpdateCampaignRequest) => void
  onDelete: (id: number) => void
  onStart: (id: number) => void
  onPause: (id: number) => void
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
  const statusLabel = CAMPAIGN_STATUS_LABELS[campaign.status as keyof typeof CAMPAIGN_STATUS_LABELS] || campaign.status
  const statusColor = CAMPAIGN_STATUS_COLORS[campaign.status as keyof typeof CAMPAIGN_STATUS_COLORS] || 'bg-gray-100 text-gray-800'
  
  const openRate = getOpenRate(campaign.openedEmails, campaign.sentEmails)
  const clickRate = getClickRate(campaign.clickedEmails, campaign.sentEmails)

  const handleEdit = () => {
    onEdit(campaign.id, {
      name: campaign.name,
      subject: campaign.subject,
      content: campaign.content,
      description: campaign.description,
      status: campaign.status,
      scheduledAt: campaign.scheduledAt || undefined,
      templateId: campaign.template?.id || undefined,
      recipientIds: campaign.recipients?.map(r => r.id) || []
    })
  }

  const canStart = campaign.status === 'draft' || campaign.status === 'scheduled'
  const canPause = campaign.status === 'active'
  const canEdit = campaign.status === 'draft' || campaign.status === 'scheduled'

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{campaign.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{campaign.subject}</p>
          <Badge className={statusColor}>
            {statusLabel}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          {canEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              disabled={isLoading}
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {canStart && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStart(campaign.id)}
              disabled={isLoading}
              className="text-green-600 border-green-200 hover:bg-green-50"
            >
              <Play className="h-4 w-4" />
            </Button>
          )}
          {canPause && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPause(campaign.id)}
              disabled={isLoading}
              className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
            >
              <Pause className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(campaign.id)}
            disabled={isLoading}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {campaign.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {campaign.description}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span>{campaign.totalRecipients} odbiorców</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="h-4 w-4" />
          <span>{campaign.sentEmails} wysłanych</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Eye className="h-4 w-4" />
          <span>{openRate}% otwartych</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MousePointer className="h-4 w-4" />
          <span>{clickRate}% kliknięć</span>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Utworzono: {formatDate(campaign.createdAt)}
        {campaign.scheduledAt && (
          <div>Zaplanowano: {formatDate(campaign.scheduledAt)}</div>
        )}
        {campaign.startedAt && (
          <div>Rozpoczęto: {formatDate(campaign.startedAt)}</div>
        )}
        {campaign.completedAt && (
          <div>Zakończono: {formatDate(campaign.completedAt)}</div>
        )}
      </div>
    </Card>
  )
} 