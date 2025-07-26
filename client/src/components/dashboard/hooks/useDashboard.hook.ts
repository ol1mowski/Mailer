import { useState, useEffect } from 'react';
import { dashboardApi } from '@/lib/api';
import type { DashboardStats, QuickAction, RecentActivity } from '../types/dashboard.types';
import { mockQuickActions } from '../data/mockDashboard.data';

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [quickActions] = useState<QuickAction[]>(mockQuickActions);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [statsData, activitiesData] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getRecentActivities()
      ]);
      
      setStats(statsData);
      setRecentActivities(activitiesData.map(activity => ({
        ...activity,
        status: activity.status as 'success' | 'info' | 'warning' | 'error'
      })));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Nie udało się pobrać danych dashboard';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshStats = async () => {
    await fetchDashboardData();
  };

  const clearError = () => setError(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    stats,
    quickActions,
    recentActivities,
    isLoading,
    error,
    refreshStats,
    clearError
  };
}; 