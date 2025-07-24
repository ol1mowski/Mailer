import { Badge, Card } from '@/components/ui'
import type { AnalyticsData, BestHours, TrendData } from '../types/analytics.types'

interface AnalyticsDetailsProps {
  data: AnalyticsData
  bestHours: BestHours[]
  trends: TrendData[]
}

export const AnalyticsDetailsComponent = ({ data, bestHours, trends }: AnalyticsDetailsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Wydajność</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Otwarcia</span>
            <span className="text-sm font-medium">{data.totalOpens.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Kliknięcia</span>
            <span className="text-sm font-medium">{data.totalClicks.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Odrzucenia</span>
            <span className="text-sm font-medium">{data.bounceRate}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Wypisania</span>
            <span className="text-sm font-medium">{data.unsubscribeRate}%</span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trendy</h3>
        <div className="space-y-4">
          {trends.map((trend, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{trend.metric}</span>
              <Badge 
                variant={trend.isPositive ? 'default' : 'destructive'} 
                className="text-xs"
              >
                {trend.isPositive ? '+' : ''}{trend.change}%
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Najlepsze godziny</h3>
        <div className="space-y-3">
          {bestHours.map((hour, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{hour.timeRange}</span>
              <span className="text-sm font-medium">{hour.percentage}%</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 