import { Mail, Users, Eye, MousePointer } from 'lucide-react'
import { Card } from '@/components/ui'
import type { CampaignStats } from '../types/campaign.types'

interface CampaignStatsComponentProps {
  stats: CampaignStats
}

export const CampaignStatsComponent = ({ stats }: CampaignStatsComponentProps) => {
  const totalOpenRate = stats.totalSent > 0 ? Math.round((stats.totalOpened / stats.totalSent) * 100) : 0
  const totalClickRate = stats.totalSent > 0 ? Math.round((stats.totalClicked / stats.totalSent) * 100) : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Wszystkie kampanie</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.total.toLocaleString()}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-500">Aktywne: {stats.active}</span>
          <span className="text-gray-500">Szkice: {stats.draft}</span>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Odbiorcy</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.totalRecipients.toLocaleString()}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-500">Wysłane: {stats.totalSent}</span>
          <span className="text-gray-500">Otwarcia: {stats.totalOpened}</span>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Eye className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Współczynnik otwarć</p>
            <p className="text-2xl font-semibold text-gray-900">{totalOpenRate}%</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-500">Otwarcia: {stats.totalOpened}</span>
          <span className="text-gray-500">Wysłane: {stats.totalSent}</span>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center">
          <div className="p-2 bg-orange-100 rounded-lg">
            <MousePointer className="h-6 w-6 text-orange-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Współczynnik kliknięć</p>
            <p className="text-2xl font-semibold text-gray-900">{totalClickRate}%</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-500">Kliknięcia: {stats.totalClicked}</span>
          <span className="text-gray-500">Wysłane: {stats.totalSent}</span>
        </div>
      </Card>
    </div>
  )
} 