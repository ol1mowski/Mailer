import { useState } from 'react'
import { Label } from '@/components/ui'
import { useQuery } from '@tanstack/react-query'
import { contactApi } from '@/lib/api'
import type { CampaignFormData, CampaignFormErrors } from '../../types/campaign.types'

interface RecipientsSectionProps {
  formData: CampaignFormData
  errors: CampaignFormErrors
  updateFormData: (field: keyof CampaignFormData, value: any) => void
  isLoading: boolean
}

export const RecipientsSection = ({
  formData,
  errors,
  updateFormData,
  isLoading
}: RecipientsSectionProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const { data: contacts = [] } = useQuery({
    queryKey: ['contacts'],
    queryFn: contactApi.getAllContacts,
    staleTime: 10 * 60 * 1000,
  })

  const filteredContacts = contacts.filter(contact =>
    contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleContactToggle = (contactId: number) => {
    const currentIds = formData.recipientIds
    const newIds = currentIds.includes(contactId)
      ? currentIds.filter(id => id !== contactId)
      : [...currentIds, contactId]
    
    updateFormData('recipientIds', newIds)
  }

  const handleSelectAll = () => {
    updateFormData('recipientIds', filteredContacts.map(c => c.id))
  }

  const handleDeselectAll = () => {
    updateFormData('recipientIds', [])
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-left-4 duration-500 delay-600">
      <div>
        <Label>Wybierz odbiorców *</Label>
        <p className="text-sm text-gray-600 mt-1">
          Wybierz kontakty, które otrzymają tę kampanię
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Szukaj kontaktów..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={handleSelectAll}
          className="px-3 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Wybierz wszystkie
        </button>
        <button
          type="button"
          onClick={handleDeselectAll}
          className="px-3 py-2 text-sm text-gray-600 hover:text-gray-700 font-medium"
        >
          Odznacz wszystkie
        </button>
      </div>

      <div className="border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Brak kontaktów do wyświetlenia
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredContacts.map((contact) => (
              <label
                key={contact.id}
                className="flex items-center p-4 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.recipientIds.includes(contact.id)}
                  onChange={() => handleContactToggle(contact.id)}
                  disabled={isLoading}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {contact.firstName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {contact.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {contact.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">
          Wybrano: {formData.recipientIds.length} z {contacts.length} kontaktów
        </span>
        {errors.recipientIds && (
          <span className="text-red-600">{errors.recipientIds}</span>
        )}
      </div>
    </div>
  )
}