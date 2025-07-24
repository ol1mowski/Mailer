import { Card } from '@/components/ui'
import type { RecentActivity } from '../types/dashboard.types'
import { getStatusColor } from '../utils/dashboardUtils.utils'

interface RecentActivitiesProps {
  activities: RecentActivity[]
}

export const RecentActivitiesComponent = ({ activities }: RecentActivitiesProps) => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold text-cyan-900 mb-2">Ostatnie aktywności</h3>
      <ul className="text-sm text-cyan-800 space-y-1">
        {activities.map(activity => (
          <li key={activity.id} className={`flex items-center space-x-2 ${getStatusColor(activity.status)}`}>
            <span>•</span>
            <span>{activity.description}</span>
            <span className="text-xs opacity-75">({activity.timestamp})</span>
          </li>
        ))}
      </ul>
    </Card>
  )
} 