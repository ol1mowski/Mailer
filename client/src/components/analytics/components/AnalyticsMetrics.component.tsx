import { Mail, Users, TrendingUp, MousePointer } from 'lucide-react'
import { Card } from '@/components/ui'
import type { AnalyticsData } from '../types/analytics.types'

interface AnalyticsMetricsProps {
  data: AnalyticsData
}

export const AnalyticsMetricsComponent = ({ data }: AnalyticsMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-6">
        <div className="flex items-center">
          <Mail className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Wysłane maile</p>
            <p className="text-2xl font-semibold text-gray-900">{data.totalEmails}</p>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex items-center">
          <Users className="h-8 w-8 text-green-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Odbiorcy</p>
            <p className="text-2xl font-semibold text-gray-900">{data.totalRecipients.toLocaleString()}</p>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex items-center">
          <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Średni open rate</p>
            <p className="text-2xl font-semibold text-gray-900">{data.averageOpenRate}%</p>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex items-center">
          <MousePointer className="h-8 w-8 text-orange-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Średni click rate</p>
            <p className="text-2xl font-semibold text-gray-900">{data.averageClickRate}%</p>
          </div>
        </div>
      </Card>
    </div>
  )
} 