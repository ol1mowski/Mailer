import { Card } from '@/components/ui';
import type { RecentActivity } from '../types/dashboard.types';
import { getStatusColor, formatTimestamp } from '../utils/dashboardUtils.utils';

interface RecentActivitiesProps {
  activities: RecentActivity[];
  isLoading?: boolean;
}

export const RecentActivitiesComponent = ({ activities, isLoading = false }: RecentActivitiesProps) => {
  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold text-cyan-900 mb-2">Ostatnie aktywności</h3>
        <div className="space-y-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse flex-1" />
              <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (activities.length === 0) {
    return (
      <Card className="p-4">
        <h3 className="font-semibold text-cyan-900 mb-2">Ostatnie aktywności</h3>
        <p className="text-sm text-gray-500">Brak aktywności do wyświetlenia</p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold text-cyan-900 mb-2">Ostatnie aktywności</h3>
      <ul className="text-sm text-cyan-800 space-y-1">
        {activities.map(activity => (
          <li key={activity.id} className={`flex items-center space-x-2 ${getStatusColor(activity.status)}`}>
            <span>•</span>
            <span>{activity.description}</span>
            <span className="text-xs opacity-75">({formatTimestamp(activity.timestamp)})</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}; 