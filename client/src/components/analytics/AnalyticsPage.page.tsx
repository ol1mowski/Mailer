import { useAnalytics } from './hooks/useAnalytics.hook'
import { AnalyticsHeader } from './components/AnalyticsHeader.component'
import { AnalyticsFiltersComponent } from './components/AnalyticsFilters.component'
import { AnalyticsMetricsComponent } from './components/AnalyticsMetrics.component'
import { AnalyticsDetailsComponent } from './components/AnalyticsDetails.component'
import { CampaignPerformanceTableComponent } from './components/CampaignPerformanceTable.component'
import { MonthlyChartComponent } from './components/MonthlyChart.component'
import { Loading, ErrorMessage } from '@/components/ui'

export const AnalyticsPage = () => {
  const {
    analytics,
    campaignPerformance,
    monthlyData,
    bestHours,
    trends,
    filters,
    periods,
    isLoading,
    error,
    handleExportData,
    updateFilters,
    clearError
  } = useAnalytics()

  if (isLoading && !analytics) {
    return <Loading fullScreen text="Ładowanie analityki..." />
  }

  return (
    <div className="space-y-6">
      {error && (
        <ErrorMessage 
          message={error} 
          onClose={clearError}
        />
      )}

      <AnalyticsHeader 
        onExportData={handleExportData}
        isLoading={isLoading}
      />

      <AnalyticsFiltersComponent
        filters={filters}
        periods={periods}
        onUpdateFilters={updateFilters}
      />

      {analytics && (
        <AnalyticsMetricsComponent data={analytics} />
      )}

      {analytics && bestHours && trends && (
        <AnalyticsDetailsComponent 
          data={analytics}
          bestHours={bestHours}
          trends={trends}
        />
      )}

      {campaignPerformance && (
        <CampaignPerformanceTableComponent campaigns={campaignPerformance} />
      )}

      {monthlyData && (
        <MonthlyChartComponent 
          data={monthlyData}
          selectedMetric={filters.selectedMetric}
          onMetricChange={(metric) => updateFilters({ selectedMetric: metric })}
        />
      )}
    </div>
  )
} 