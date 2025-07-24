import { Plus } from 'lucide-react'
import { Button, Loading } from '@/components/ui'

interface ContactHeaderProps {
  onAddContact: () => void
  isLoading: boolean
}

export const ContactHeader = ({ onAddContact, isLoading }: ContactHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kontakty</h1>
        <p className="text-gray-600">Zarządzaj swoimi kontaktami i listami mailingowymi</p>
      </div>
      <Button onClick={onAddContact} disabled={isLoading}>
        {isLoading ? (
          <Loading size="sm" variant="dots" />
        ) : (
          <>
            <Plus className="h-4 w-4 mr-2" />
            Dodaj kontakt
          </>
        )}
      </Button>
    </div>
  )
} 