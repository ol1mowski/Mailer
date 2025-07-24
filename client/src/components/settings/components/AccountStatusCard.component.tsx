import { Card, Badge, Button } from '@/components/ui'
import type { AccountStatus } from '../types/settings.types'
import { getStatusBadgeVariant } from '../utils/settingsUtils.utils'

interface AccountStatusCardProps {
  accountStatus: AccountStatus
}

export const AccountStatusCard = ({ accountStatus }: AccountStatusCardProps) => {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Status konta</h2>
            <p className="text-sm text-gray-600">
              Plan: {accountStatus.plan} • Aktywne do: {accountStatus.activeUntil}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={getStatusBadgeVariant(accountStatus.status) as any}>
              {accountStatus.status === 'active' ? 'Aktywne' : 
               accountStatus.status === 'inactive' ? 'Nieaktywne' : 'Zawieszone'}
            </Badge>
            <Button variant="outline" size="sm">
              Zmień plan
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
} 