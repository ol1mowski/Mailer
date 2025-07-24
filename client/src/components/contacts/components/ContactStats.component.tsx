import { User, Mail, Tag } from 'lucide-react'
import { Card } from '@/components/ui'
import type { ContactStats } from '../types/contact.types'

interface ContactStatsProps {
  stats: ContactStats
}

export const ContactStatsComponent = ({ stats }: ContactStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-4">
        <div className="flex items-center">
          <User className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Wszystkie kontakty</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <Mail className="h-8 w-8 text-green-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Aktywne</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.active}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center">
          <Tag className="h-8 w-8 text-purple-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">VIP</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.vip}</p>
          </div>
        </div>
      </Card>
    </div>
  )
} 