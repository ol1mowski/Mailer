import { Mail, Users } from 'lucide-react'
import { Card } from '@/components/ui'
import type { MailingListStats } from '../types/mailingList.types'

interface MailingListStatsProps {
  stats: MailingListStats
}

export const MailingListStatsComponent = ({ stats }: MailingListStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <div className="p-6">
          <div className="flex items-center">
            <Mail className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Listy mailingowe</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
      </Card>
      
      <Card>
        <div className="p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Łącznie kontaktów</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalContacts}</p>
            </div>
          </div>
        </div>
      </Card>
      
      <Card>
        <div className="p-6">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-purple-600 font-semibold">Ø</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Średnio na listę</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.averageContactsPerList}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 