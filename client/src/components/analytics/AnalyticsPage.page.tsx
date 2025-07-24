import { useAnalytics } from './hooks/useAnalytics.hook'
import { mockAnalytics, mockCampaignPerformance, mockMonthlyData, mockBestHours, mockTrends } from './data/mockAnalytics.data'
import { AnalyticsHeader } from './components/AnalyticsHeader.component'
import { AnalyticsFiltersComponent } from './components/AnalyticsFilters.component'
import { AnalyticsMetricsComponent } from './components/AnalyticsMetrics.component'
import { AnalyticsDetailsComponent } from './components/AnalyticsDetails.component'
import { CampaignPerformanceTableComponent } from './components/CampaignPerformanceTable.component'
import { MonthlyChartComponent } from './components/MonthlyChart.component'
import { ErrorMessage } from '@/components/ui'

export const AnalyticsPage = () => {
  const {
    filters,
    periods,
    isLoading,
    error,
    handleExportData,
    updateFilters,
    clearError
  } = useAnalytics()

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

      <AnalyticsMetricsComponent data={mockAnalytics} />

      <AnalyticsDetailsComponent 
        data={mockAnalytics}
        bestHours={mockBestHours}
        trends={mockTrends}
      />

      <CampaignPerformanceTableComponent campaigns={mockCampaignPerformance} />

      <MonthlyChartComponent 
        data={mockMonthlyData}
        selectedMetric={filters.selectedMetric}
        onMetricChange={(metric) => updateFilters({ selectedMetric: metric })}
      />
    </div>
  )
} 