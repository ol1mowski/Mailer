import { FileText, Edit, Copy } from 'lucide-react'
import { Card } from '@/components/ui'
import type { EmailTemplateStats } from '../../types/emailTemplate.types'

interface StatsSectionProps {
  stats: EmailTemplateStats
}

export const StatsSection = ({ stats }: StatsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-4">
        <div className="flex items-center">
          <FileText className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Wszystkie szablony</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <Edit className="h-8 w-8 text-green-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Aktywne</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.active}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <Copy className="h-8 w-8 text-purple-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Statusy</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.categories}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}