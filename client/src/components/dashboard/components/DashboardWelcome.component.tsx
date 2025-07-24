import { Card } from '@/components/ui'

export const DashboardWelcomeComponent = () => {
  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Witaj w systemie zarządzania mailami!
      </h2>
      <p className="text-gray-600 mb-6">
        Użyj nawigacji po lewej stronie, aby przejść do różnych sekcji aplikacji.
      </p>
    </Card>
  )
} 