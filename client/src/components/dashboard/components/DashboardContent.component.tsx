import { DashboardWelcomeComponent } from './DashboardWelcome.component'
import { QuickActionsComponent } from './QuickActions.component'
import { RecentActivitiesComponent } from './RecentActivities.component'
import type { QuickAction, RecentActivity } from '../types/dashboard.types'

interface DashboardContentProps {
  quickActions: QuickAction[]
  recentActivities: RecentActivity[]
}

export const DashboardContentComponent = ({ quickActions, recentActivities }: DashboardContentProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-8">
      <DashboardWelcomeComponent />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <QuickActionsComponent actions={quickActions} />
        <RecentActivitiesComponent activities={recentActivities} />
      </div>
    </div>
  )
} 