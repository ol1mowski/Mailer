import { useDashboard } from './hooks/useDashboard.hook'
import { DashboardStatsComponent } from './components/DashboardStats.component'
import { DashboardContentComponent } from './components/DashboardContent.component'
import { ErrorMessage } from '@/components/ui'

export const Dashboard = () => {
  const {
    stats,
    quickActions,
    recentActivities,
    isLoading,
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

      <DashboardStatsComponent stats={stats} isLoading={isLoading} />
      
      <DashboardContentComponent 
        quickActions={quickActions}
        recentActivities={recentActivities}
        isLoading={isLoading}
      />
    </div>
  )
} 