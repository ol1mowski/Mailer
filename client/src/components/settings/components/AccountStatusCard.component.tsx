import { Card } from '@/components/ui'
import { Badge } from '@/components/ui'
import type { SettingsFormData } from '../types/settings.types'

interface AccountStatusCardProps {
  accountStatus: SettingsFormData['account']
}

export const AccountStatusCard = ({ accountStatus }: AccountStatusCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800'
      case 'SUSPENDED':
        return 'bg-yellow-100 text-yellow-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      case 'PENDING':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan.toUpperCase()) {
      case 'PREMIUM':
        return 'bg-purple-100 text-purple-800'
      case 'PRO':
        return 'bg-blue-100 text-blue-800'
      case 'FREE':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatStorage = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(1)} GB`
    }
    return `${mb.toFixed(1)} MB`
  }

  const getStoragePercentage = () => {
    if (accountStatus.storageLimit === 0) return 0
    return (accountStatus.storageUsed / accountStatus.storageLimit) * 100
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Status konta</h3>
        <p className="text-sm text-gray-600">
          Informacje o Twoim koncie i subskrypcji
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Status konta</span>
          <Badge className={getStatusColor(accountStatus.status)}>
            {accountStatus.status === 'ACTIVE' ? 'Aktywne' : 
             accountStatus.status === 'SUSPENDED' ? 'Zawieszone' :
             accountStatus.status === 'CANCELLED' ? 'Anulowane' :
             accountStatus.status === 'PENDING' ? 'Oczekujące' : accountStatus.status}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Plan subskrypcji</span>
          <Badge className={getPlanColor(accountStatus.plan)}>
            {accountStatus.plan === 'FREE' ? 'Darmowy' :
             accountStatus.plan === 'PRO' ? 'Pro' :
             accountStatus.plan === 'PREMIUM' ? 'Premium' : accountStatus.plan}
          </Badge>
        </div>

        {accountStatus.expires && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Wygasa</span>
            <span className="text-sm text-gray-900">
              {new Date(accountStatus.expires).toLocaleDateString('pl-PL')}
            </span>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Przestrzeń dyskowa</span>
            <span className="text-sm text-gray-900">
              {formatStorage(accountStatus.storageUsed)} / {formatStorage(accountStatus.storageLimit)}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(getStoragePercentage(), 100)}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {getStoragePercentage() > 80 && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              Uwaga: Przestrzeń dyskowa jest prawie pełna. Rozważ upgrade planu.
            </p>
          </div>
        )}
      </div>
    </Card>
  )
} 