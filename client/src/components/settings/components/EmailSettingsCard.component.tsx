import { useState } from 'react'
import { Card } from '@/components/ui'
import { Input, Label } from '@/components/ui'
import { RESEND_HELP_TEXT } from '../types/settings.types'
import type { SettingsFormData } from '../types/settings.types'

interface EmailSettingsCardProps {
  emailSettings: SettingsFormData['email']
  onUpdateSettings: (formData: SettingsFormData) => void
  isLoading?: boolean
}

export const EmailSettingsCard = ({ emailSettings, onUpdateSettings, isLoading }: EmailSettingsCardProps) => {
  const [formData, setFormData] = useState(emailSettings)

  const handleInputChange = (field: keyof typeof emailSettings, value: string) => {
    const updatedData = { ...formData, [field]: value }
    setFormData(updatedData)
    
    onUpdateSettings({
      user: { firstName: '', lastName: '', timezone: '' },
      email: updatedData,
      account: { status: '', plan: '', expires: '' }
    })
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Ustawienia Resend Email</h3>
        <p className="text-sm text-gray-600">
          Skonfiguruj Resend do wysyłania emaili z Twojej domeny
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="resendApiKey" className="text-sm font-medium text-gray-700">
            Klucz API Resend *
          </Label>
          <Input
            id="resendApiKey"
            type="password"
            value={formData.resendApiKey}
            onChange={(e) => handleInputChange('resendApiKey', e.target.value)}
            className="mt-1"
            placeholder="re_..."
            disabled={isLoading}
          />
          <p className="mt-1 text-xs text-gray-500">
            {RESEND_HELP_TEXT.apiKey}
          </p>
        </div>

        <div>
          <Label htmlFor="fromEmail" className="text-sm font-medium text-gray-700">
            Email nadawcy *
          </Label>
          <Input
            id="fromEmail"
            type="email"
            value={formData.fromEmail}
            onChange={(e) => handleInputChange('fromEmail', e.target.value)}
            className="mt-1"
            placeholder="noreply@twoja-domena.com"
            disabled={isLoading}
          />
          <p className="mt-1 text-xs text-gray-500">
            {RESEND_HELP_TEXT.fromEmail}
          </p>
        </div>

        <div>
          <Label htmlFor="fromName" className="text-sm font-medium text-gray-700">
            Nazwa nadawcy
          </Label>
          <Input
            id="fromName"
            type="text"
            value={formData.fromName}
            onChange={(e) => handleInputChange('fromName', e.target.value)}
            className="mt-1"
            placeholder="Twoja Firma"
            disabled={isLoading}
          />
          <p className="mt-1 text-xs text-gray-500">
            Opcjonalna nazwa wyświetlana jako nadawca
          </p>
        </div>

        <div>
          <Label htmlFor="replyToEmail" className="text-sm font-medium text-gray-700">
            Reply-To Email
          </Label>
          <Input
            id="replyToEmail"
            type="email"
            value={formData.replyToEmail}
            onChange={(e) => handleInputChange('replyToEmail', e.target.value)}
            className="mt-1"
            placeholder="kontakt@twoja-domena.com"
            disabled={isLoading}
          />
          <p className="mt-1 text-xs text-gray-500">
            Adres na który będą kierowane odpowiedzi
          </p>
        </div>

        <div>
          <Label htmlFor="customDomain" className="text-sm font-medium text-gray-700">
            Domena niestandardowa
          </Label>
          <Input
            id="customDomain"
            type="text"
            value={formData.customDomain}
            onChange={(e) => handleInputChange('customDomain', e.target.value)}
            className="mt-1"
            placeholder="twoja-domena.com"
            disabled={isLoading}
          />
          <p className="mt-1 text-xs text-gray-500">
            {RESEND_HELP_TEXT.customDomain}
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Informacje o Resend
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Resend to nowoczesna usługa email API. Aby rozpocząć:
              </p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Utwórz konto na <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="underline">resend.com</a></li>
                <li>Zweryfikuj swoją domenę w panelu Resend</li>
                <li>Wygeneruj klucz API i wklej go powyżej</li>
                <li>Skonfiguruj adres nadawcy z zweryfikowanej domeny</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}