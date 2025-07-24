import type { AnalyticsData, CampaignPerformance, MonthlyData, BestHours, TrendData } from '../types/analytics.types'

export const mockAnalytics: AnalyticsData = {
  totalEmails: 15,
  totalRecipients: 8500,
  totalOpens: 4250,
  totalClicks: 850,
  averageOpenRate: 50,
  averageClickRate: 10,
  bounceRate: 2.5,
  unsubscribeRate: 0.8,
}

export const mockCampaignPerformance: CampaignPerformance[] = [
  { name: 'Newsletter styczniowy', sent: 1250, opened: 625, clicked: 125, openRate: 50, clickRate: 10 },
  { name: 'Promocja walentynkowa', sent: 800, opened: 480, clicked: 96, openRate: 60, clickRate: 12 },
  { name: 'Powitanie nowych', sent: 150, opened: 90, clicked: 18, openRate: 60, clickRate: 12 },
  { name: 'Aktualizacja produktów', sent: 500, opened: 250, clicked: 50, openRate: 50, clickRate: 10 },
  { name: 'Przypomnienie płatności', sent: 200, opened: 120, clicked: 24, openRate: 60, clickRate: 12 },
]

export const mockMonthlyData: MonthlyData[] = [
  { month: 'Sty', emails: 3, opens: 1200, clicks: 240 },
  { month: 'Lut', emails: 4, opens: 1600, clicks: 320 },
  { month: 'Mar', emails: 2, opens: 800, clicks: 160 },
  { month: 'Kwi', emails: 5, opens: 2000, clicks: 400 },
  { month: 'Maj', emails: 3, opens: 1200, clicks: 240 },
  { month: 'Cze', emails: 4, opens: 1600, clicks: 320 },
]

export const mockBestHours: BestHours[] = [
  { timeRange: '9:00 - 11:00', percentage: 32 },
  { timeRange: '14:00 - 16:00', percentage: 28 },
  { timeRange: '18:00 - 20:00', percentage: 24 },
  { timeRange: 'Inne', percentage: 16 },
]

export const mockTrends: TrendData[] = [
  { metric: 'Otwarcia', change: 12, isPositive: true },
  { metric: 'Kliknięcia', change: 8, isPositive: true },
  { metric: 'Odrzucenia', change: -5, isPositive: false },
  { metric: 'Wypisania', change: -2, isPositive: false },
] 