import { useDashboard } from './hooks/useDashboard.hook'
import { DashboardStatsComponent } from './components/DashboardStats.component'
import { DashboardContentComponent } from './components/DashboardContent.component'
import { ErrorMessage } from '@/components/ui'

export const Dashboard = () => {
  const {
    stats,
    quickActions,
    recentActivities,
    error,
    clearError
  } = useDashboard()

  return (
    <div className="space-y-6">
      {error && (
        <ErrorMessage 
          message={error} 
          onClose={clearError}
        />
      )}

      <DashboardStatsComponent stats={stats} />
      
      <DashboardContentComponent 
        quickActions={quickActions}
        recentActivities={recentActivities}
      />
    </div>
  )
} 