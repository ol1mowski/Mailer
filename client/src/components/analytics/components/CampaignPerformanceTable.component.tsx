import { Card } from '@/components/ui'
import type { CampaignPerformance } from '../types/analytics.types'

interface CampaignPerformanceTableProps {
  campaigns: CampaignPerformance[]
}

export const CampaignPerformanceTableComponent = ({ campaigns }: CampaignPerformanceTableProps) => {
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Wydajność kampanii</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-sm font-medium text-gray-600">Kampania</th>
                <th className="text-right py-2 text-sm font-medium text-gray-600">Wysłane</th>
                <th className="text-right py-2 text-sm font-medium text-gray-600">Otwarcia</th>
                <th className="text-right py-2 text-sm font-medium text-gray-600">Kliknięcia</th>
                <th className="text-right py-2 text-sm font-medium text-gray-600">Open Rate</th>
                <th className="text-right py-2 text-sm font-medium text-gray-600">Click Rate</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 text-sm font-medium text-gray-900">{campaign.name}</td>
                  <td className="py-3 text-sm text-gray-600 text-right">{campaign.sent.toLocaleString()}</td>
                  <td className="py-3 text-sm text-gray-600 text-right">{campaign.opened.toLocaleString()}</td>
                  <td className="py-3 text-sm text-gray-600 text-right">{campaign.clicked.toLocaleString()}</td>
                  <td className="py-3 text-sm text-gray-600 text-right">{campaign.openRate}%</td>
                  <td className="py-3 text-sm text-gray-600 text-right">{campaign.clickRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  )
} 