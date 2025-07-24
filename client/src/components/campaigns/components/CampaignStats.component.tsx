import { Mail, Play, Users, BarChart3 } from 'lucide-react'
import { Card } from '@/components/ui'
import type { CampaignStats } from '../types/campaign.types'

interface CampaignStatsProps {
  stats: CampaignStats
}

export const CampaignStatsComponent = ({ stats }: CampaignStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="flex items-center">
          <Mail className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Wszystkie kampanie</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <Play className="h-8 w-8 text-green-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Aktywne</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.active}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <Users className="h-8 w-8 text-purple-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Odbiorcy</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.recipients.toLocaleString()}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <BarChart3 className="h-8 w-8 text-orange-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Średni open rate</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.averageOpenRate}%</p>
          </div>
        </div>
      </Card>
    </div>
  )
} 