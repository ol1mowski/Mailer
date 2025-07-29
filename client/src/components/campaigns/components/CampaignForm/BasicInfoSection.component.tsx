import { Input, Label, Textarea } from '@/components/ui'
import type { CampaignFormData, CampaignFormErrors } from '../../types/campaign.types'
import { CAMPAIGN_STATUS_LABELS } from '../../types/campaign.types'

interface BasicInfoSectionProps {
  formData: CampaignFormData
  errors: CampaignFormErrors
  updateFormData: (field: keyof CampaignFormData, value: any) => void
  isLoading: boolean
}

export const BasicInfoSection = ({
  formData,
  errors,
  updateFormData,
  isLoading
}: BasicInfoSectionProps) => {
  return (
    <div className="space-y-6 animate-in slide-in-from-left-4 duration-500 delay-400">
      <div>
        <Label htmlFor="name">Nazwa kampanii *</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          placeholder="Wprowadź nazwę kampanii"
          disabled={isLoading}
          className="mt-1"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <Label htmlFor="subject">Temat email *</Label>
        <Input
          id="subject"
          type="text"
          value={formData.subject}
          onChange={(e) => updateFormData('subject', e.target.value)}
          placeholder="Wprowadź temat email"
          disabled={isLoading}
          className="mt-1"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Opis kampanii</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          placeholder="Opisz kampanię (opcjonalnie)"
          disabled={isLoading}
          className="mt-1"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="status">Status kampanii *</Label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => updateFormData('status', e.target.value)}
          disabled={isLoading}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          {Object.entries(CAMPAIGN_STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status}</p>
        )}
      </div>
    </div>
  )
}