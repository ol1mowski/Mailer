import { useState } from 'react'
import type { AnalyticsFilters } from '../types/analytics.types'

export const useAnalytics = () => {
  const [filters, setFilters] = useState<AnalyticsFilters>({
    selectedPeriod: '30d',
    selectedMetric: 'opens'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const periods = [
    { value: '7d', label: '7 dni' },
    { value: '30d', label: '30 dni' },
    { value: '90d', label: '90 dni' },
    { value: '1y', label: '1 rok' },
  ]

  const metrics = [
    { value: 'opens', label: 'Otwarcia' },
    { value: 'clicks', label: 'Kliknięcia' },
    { value: 'bounces', label: 'Odrzucenia' },
  ]

  const handleExportData = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Export data')
    } catch (err) {
      setError('Nie udało się wyeksportować danych')
    } finally {
      setIsLoading(false)
    }
  }

  const updateFilters = (newFilters: Partial<AnalyticsFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const clearError = () => setError(null)

  return {
    filters,
    periods,
    metrics,
    isLoading,
    error,
    handleExportData,
    updateFilters,
    clearError
  }
} 