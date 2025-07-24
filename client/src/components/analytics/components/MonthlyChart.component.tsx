import { Mail, MousePointer, TrendingUp } from 'lucide-react'
import { Button, Card } from '@/components/ui'
import type { MonthlyData } from '../types/analytics.types'

interface MonthlyChartProps {
  data: MonthlyData[]
  selectedMetric: string
  onMetricChange: (metric: string) => void
}

export const MonthlyChartComponent = ({ data, selectedMetric, onMetricChange }: MonthlyChartProps) => {
  const metrics = [
    { value: 'opens', label: 'Otwarcia', icon: Mail },
    { value: 'clicks', label: 'Kliknięcia', icon: MousePointer },
    { value: 'bounces', label: 'Odrzucenia', icon: TrendingUp },
  ]

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trendy miesięczne</h3>
        <div className="flex items-center space-x-4 mb-4">
          {metrics.map(metric => {
            const Icon = metric.icon
            return (
              <Button
                key={metric.value}
                variant={selectedMetric === metric.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => onMetricChange(metric.value)}
              >
                <Icon className="h-4 w-4 mr-2" />
                {metric.label}
              </Button>
            )
          })}
        </div>
        
        {/* Simple bar chart */}
        <div className="flex items-end justify-between h-48 space-x-2">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-200 rounded-t relative">
                <div 
                  className="bg-blue-600 rounded-t transition-all duration-300"
                  style={{ 
                    height: `${(item[selectedMetric as keyof MonthlyData] as number) / 2000 * 100}%` 
                  }}
                />
              </div>
              <span className="text-xs text-gray-600 mt-2">{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
} 