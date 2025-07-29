import { Input, Label } from '@/components/ui'
import type { EmailTemplateFormData } from '../../types/emailTemplate.types'

interface BasicInfoSectionProps {
  formData: EmailTemplateFormData
  errors: Record<string, string>
  updateFormData: (updates: Partial<EmailTemplateFormData>) => void
  isLoading: boolean
}

export const BasicInfoSection = ({
  formData,
  errors,
  updateFormData,
  isLoading
}: BasicInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Nazwa szablonu *
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          placeholder="Wprowadź nazwę szablonu..."
          className={errors.name ? 'border-red-300' : ''}
          disabled={isLoading}
        />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
          Temat email *
        </Label>
        <Input
          id="subject"
          value={formData.subject}
          onChange={(e) => updateFormData({ subject: e.target.value })}
          placeholder="Wprowadź temat email..."
          className={errors.subject ? 'border-red-300' : ''}
          disabled={isLoading}
        />
        {errors.subject && (
          <p className="text-sm text-red-600 mt-1">{errors.subject}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description" className="text-sm font-medium text-gray-700">
          Opis
        </Label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          placeholder="Wprowadź opis szablonu..."
          rows={3}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div>
        <Label htmlFor="status" className="text-sm font-medium text-gray-700">
          Status
        </Label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => updateFormData({ status: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        >
          <option value="active">🟢 Aktywny</option>
          <option value="inactive">🔴 Nieaktywny</option>
          <option value="draft">⚫ Szkic</option>
        </select>
      </div>
    </div>
  )
}