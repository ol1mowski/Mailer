import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { analyticsApi } from '@/lib/api'
import type { AnalyticsFilters, AnalyticsPeriods, AnalyticsMetrics } from '../types/analytics.types'

export const useAnalytics = () => {
  const [filters, setFilters] = useState<AnalyticsFilters>({
    selectedPeriod: '30d',
    selectedMetric: 'opens'
  })
  const [error, setError] = useState<string>('')

  const periods: AnalyticsPeriods[] = [
    { value: '7d', label: '7 dni' },
    { value: '30d', label: '30 dni' },
    { value: '90d', label: '90 dni' },
    { value: '1y', label: '1 rok' },
  ]

  const metrics: AnalyticsMetrics[] = [
    { value: 'opens', label: 'Otwarcia' },
    { value: 'clicks', label: 'Kliknięcia' },
    { value: 'bounces', label: 'Odrzucenia' },
  ]

  const {
    data: analytics,
    isLoading: isLoadingAnalytics,
    error: analyticsError
  } = useQuery({
    queryKey: ['analytics', filters.selectedPeriod],
    queryFn: () => analyticsApi.getAnalytics(filters.selectedPeriod),
    staleTime: 5 * 60 * 1000,
  })

  const {
    data: campaignPerformance,
    isLoading: isLoadingPerformance,
    error: performanceError
  } = useQuery({
    queryKey: ['campaignPerformance', filters.selectedPeriod],
    queryFn: () => analyticsApi.getCampaignPerformance(filters.selectedPeriod),
    staleTime: 5 * 60 * 1000,
  })

  const {
    data: monthlyData,
    isLoading: isLoadingMonthly,
    error: monthlyError
  } = useQuery({
    queryKey: ['monthlyData', filters.selectedPeriod],
    queryFn: () => analyticsApi.getMonthlyData(filters.selectedPeriod),
    staleTime: 5 * 60 * 1000,
  })

  const {
    data: bestHours,
    isLoading: isLoadingBestHours,
    error: bestHoursError
  } = useQuery({
    queryKey: ['bestHours'],
    queryFn: analyticsApi.getBestHours,
    staleTime: 10 * 60 * 1000,
  })

  const {
    data: trends,
    isLoading: isLoadingTrends,
    error: trendsError
  } = useQuery({
    queryKey: ['trends', filters.selectedPeriod],
    queryFn: () => analyticsApi.getTrends(filters.selectedPeriod),
    staleTime: 5 * 60 * 1000,
  })

  const exportDataMutation = useMutation({
    mutationFn: analyticsApi.exportData,
    onSuccess: () => {
      toast.success('Dane zostały wyeksportowane i pobrane')
    },
    onError: (error: Error) => {
      setError(`Błąd eksportu danych: ${error.message}`)
      toast.error('Błąd eksportu danych')
    }
  })

  const handleExportData = async (format: string = 'xml') => {
    exportDataMutation.mutate({
      period: filters.selectedPeriod,
      format
    })
  }

  const updateFilters = (newFilters: Partial<AnalyticsFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const clearError = () => setError('')

  const isLoading = isLoadingAnalytics || isLoadingPerformance || isLoadingMonthly || 
                   isLoadingBestHours || isLoadingTrends || exportDataMutation.isPending

  const combinedError = error || analyticsError?.message || performanceError?.message || 
                       monthlyError?.message || bestHoursError?.message || trendsError?.message

  return {
    analytics,
    campaignPerformance,
    monthlyData,
    bestHours,
    trends,
    filters,
    periods,
    metrics,
    isLoading,
    error: combinedError || '',
    handleExportData,
    updateFilters,
    clearError
  }
} 