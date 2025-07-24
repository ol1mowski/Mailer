import { useState } from 'react'
import { BarChart3, TrendingUp, Users, Mail, MousePointer, Calendar, Download, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button.component'
import { Card } from '@/components/ui/card.component'
import { Badge } from '@/components/ui/badge.component'

interface AnalyticsData {
  totalEmails: number
  totalRecipients: number
  totalOpens: number
  totalClicks: number
  averageOpenRate: number
  averageClickRate: number
  bounceRate: number
  unsubscribeRate: number
}

const mockAnalytics: AnalyticsData = {
  totalEmails: 15,
  totalRecipients: 8500,
  totalOpens: 4250,
  totalClicks: 850,
  averageOpenRate: 50,
  averageClickRate: 10,
  bounceRate: 2.5,
  unsubscribeRate: 0.8,
}

const mockCampaignPerformance = [
  { name: 'Newsletter styczniowy', sent: 1250, opened: 625, clicked: 125, openRate: 50, clickRate: 10 },
  { name: 'Promocja walentynkowa', sent: 800, opened: 480, clicked: 96, openRate: 60, clickRate: 12 },
  { name: 'Powitanie nowych', sent: 150, opened: 90, clicked: 18, openRate: 60, clickRate: 12 },
  { name: 'Aktualizacja produktów', sent: 500, opened: 250, clicked: 50, openRate: 50, clickRate: 10 },
  { name: 'Przypomnienie płatności', sent: 200, opened: 120, clicked: 24, openRate: 60, clickRate: 12 },
]

const mockMonthlyData = [
  { month: 'Sty', emails: 3, opens: 1200, clicks: 240 },
  { month: 'Lut', emails: 4, opens: 1600, clicks: 320 },
  { month: 'Mar', emails: 2, opens: 800, clicks: 160 },
  { month: 'Kwi', emails: 5, opens: 2000, clicks: 400 },
  { month: 'Maj', emails: 3, opens: 1200, clicks: 240 },
  { month: 'Cze', emails: 4, opens: 1600, clicks: 320 },
]

export const AnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('opens')

  const periods = [
    { value: '7d', label: '7 dni' },
    { value: '30d', label: '30 dni' },
    { value: '90d', label: '90 dni' },
    { value: '1y', label: '1 rok' },
  ]

  const metrics = [
    { value: 'opens', label: 'Otwarcia', icon: Mail },
    { value: 'clicks', label: 'Kliknięcia', icon: MousePointer },
    { value: 'bounces', label: 'Odrzucenia', icon: TrendingUp },
  ]

  const handleExportData = () => {
    // TODO: Implement data export
    console.log('Export data')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Analizuj wyniki swoich kampanii email</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Eksportuj dane
          </Button>
        </div>
      </div>

      {/* Period Filter */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Okres:</span>
            <div className="flex space-x-1">
              {periods.map(period => (
                <Button
                  key={period.value}
                  variant={selectedPeriod === period.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPeriod(period.value)}
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Ostatnie {selectedPeriod === '7d' ? '7' : selectedPeriod === '30d' ? '30' : selectedPeriod === '90d' ? '90' : '365'} dni</span>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center">
            <Mail className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Wysłane maile</p>
              <p className="text-2xl font-semibold text-gray-900">{mockAnalytics.totalEmails}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Odbiorcy</p>
              <p className="text-2xl font-semibold text-gray-900">{mockAnalytics.totalRecipients.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Średni open rate</p>
              <p className="text-2xl font-semibold text-gray-900">{mockAnalytics.averageOpenRate}%</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center">
            <MousePointer className="h-8 w-8 text-orange-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Średni click rate</p>
              <p className="text-2xl font-semibold text-gray-900">{mockAnalytics.averageClickRate}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Wydajność</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Otwarcia</span>
              <span className="text-sm font-medium">{mockAnalytics.totalOpens.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Kliknięcia</span>
              <span className="text-sm font-medium">{mockAnalytics.totalClicks.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Odrzucenia</span>
              <span className="text-sm font-medium">{mockAnalytics.bounceRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Wypisania</span>
              <span className="text-sm font-medium">{mockAnalytics.unsubscribeRate}%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trendy</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Otwarcia</span>
              <Badge variant="default" className="text-xs">+12%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Kliknięcia</span>
              <Badge variant="default" className="text-xs">+8%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Odrzucenia</span>
              <Badge variant="destructive" className="text-xs">-5%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Wypisania</span>
              <Badge variant="destructive" className="text-xs">-2%</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Najlepsze godziny</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">9:00 - 11:00</span>
              <span className="text-sm font-medium">32%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">14:00 - 16:00</span>
              <span className="text-sm font-medium">28%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">18:00 - 20:00</span>
              <span className="text-sm font-medium">24%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Inne</span>
              <span className="text-sm font-medium">16%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Campaign Performance */}
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
                {mockCampaignPerformance.map((campaign, index) => (
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

      {/* Monthly Chart */}
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
                  onClick={() => setSelectedMetric(metric.value)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {metric.label}
                </Button>
              )
            })}
          </div>
          
          {/* Simple bar chart */}
          <div className="flex items-end justify-between h-48 space-x-2">
            {mockMonthlyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t relative">
                  <div 
                    className="bg-blue-600 rounded-t transition-all duration-300"
                    style={{ 
                      height: `${(data[selectedMetric as keyof typeof data] as number) / 2000 * 100}%` 
                    }}
                  />
                </div>
                <span className="text-xs text-gray-600 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
} 