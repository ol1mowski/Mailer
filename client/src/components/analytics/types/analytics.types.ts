import type { AnalyticsData, CampaignPerformance, MonthlyData, BestHours, TrendData } from '@/lib/api'

export type { AnalyticsData, CampaignPerformance, MonthlyData, BestHours, TrendData }

export interface AnalyticsFilters {
  selectedPeriod: string
  selectedMetric: string
}

export interface AnalyticsPeriods {
  value: string
  label: string
}

export interface AnalyticsMetrics {
  value: string
  label: string
} 