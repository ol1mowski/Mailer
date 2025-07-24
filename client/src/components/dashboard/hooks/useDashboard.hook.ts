import { useState } from 'react'
import type { DashboardStats, QuickAction, RecentActivity } from '../types/dashboard.types'
import { mockDashboardStats, mockQuickActions, mockRecentActivities } from '../data/mockDashboard.data'

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>(mockDashboardStats)
  const [quickActions, setQuickActions] = useState<QuickAction[]>(mockQuickActions)
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>(mockRecentActivities)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refreshStats = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Tutaj można dodać rzeczywiste wywołanie API
      console.log('Refreshing dashboard stats')
    } catch (err) {
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