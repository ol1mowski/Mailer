import { Download } from 'lucide-react'
import { Button, Loading } from '@/components/ui'

interface AnalyticsHeaderProps {
  onExportData: (format: string) => void
  isLoading: boolean
}

export const AnalyticsHeader = ({ onExportData, isLoading }: AnalyticsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Analizuj wyniki swoich kampanii email</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" onClick={() => onExportData('csv')} disabled={isLoading}>
          {isLoading ? (
            <Loading size="sm" variant="dots" />
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Eksportuj dane
            </>
          )}
        </Button>
      </div>
    </div>
  )
} 