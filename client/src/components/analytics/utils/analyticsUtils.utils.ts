import type { MonthlyData } from '../types/analytics.types'

export const getPeriodLabel = (period: string): string => {
  const periodMap: Record<string, string> = {
    '7d': '7 dni',
    '30d': '30 dni',
    '90d': '90 dni',
    '1y': '1 rok'
  }
  return periodMap[period] || period
}

export const getPeriodDays = (period: string): number => {
  const daysMap: Record<string, number> = {
    '7d': 7,
    '30d': 30,
    '90d': 90,
    '1y': 365
  }
  return daysMap[period] || 30
}

export const formatNumber = (num: number): string => {
  return num.toLocaleString()
}

export const formatPercentage = (num: number): string => {
  return `${num}%`
}

export const calculateChartHeight = (data: MonthlyData[], metric: string, maxValue: number = 2000): number => {
  const value = data.reduce((max, item) => {
    const itemValue = item[metric as keyof MonthlyData] as number
    return Math.max(max, itemValue)
  }, 0)
  return (value / maxValue) * 100
} 