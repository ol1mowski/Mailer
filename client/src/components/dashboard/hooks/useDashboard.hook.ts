import { useState } from 'react'
import type { DashboardStats, QuickAction, RecentActivity } from '../types/dashboard.types'
import { mockDashboardStats, mockQuickActions, mockRecentActivities } from '../data/mockDashboard.data'

export const useDashboard = () => {
  const [stats] = useState<DashboardStats>(mockDashboardStats)
  const [quickActions] = useState<QuickAction[]>(mockQuickActions)
  const [recentActivities] = useState<RecentActivity[]>(mockRecentActivities)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refreshStats = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Refreshing dashboard stats')
    } catch {
      setError('Nie udało się odświeżyć danych')
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => setError(null)

  return {
    stats,
    quickActions,
    recentActivities,
    isLoading,
    error,
    refreshStats,
    clearError
  }
} 