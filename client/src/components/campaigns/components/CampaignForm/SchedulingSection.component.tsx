import { Label } from '@/components/ui'
import type { CampaignFormData, CampaignFormErrors } from '../../types/campaign.types'

interface SchedulingSectionProps {
  formData: CampaignFormData
  errors: CampaignFormErrors
  updateFormData: (field: keyof CampaignFormData, value: any) => void
  isLoading: boolean
}

export const SchedulingSection = ({
  formData,
  errors,
  updateFormData,
  isLoading
}: SchedulingSectionProps) => {
  const handleScheduleChange = (value: string) => {
    updateFormData('scheduledAt', value)
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-left-4 duration-500 delay-800">
      <div>
        <Label>Harmonogram kampanii</Label>
        <p className="text-sm text-gray-600 mt-1">
          Zaplanuj kiedy kampania ma zostać uruchomiona
        </p>
      </div>

      <div className="space-y-4">
        
        {formData.status === 'scheduled' && (
          <div className="animate-in fade-in duration-300">
            <Label htmlFor="scheduledAt">Data i godzina uruchomienia</Label>
            <input
              id="scheduledAt"
              type="datetime-local"
              value={formData.scheduledAt}
              onChange={(e) => handleScheduleChange(e.target.value)}
              disabled={isLoading}
              min={new Date().toISOString().slice(0, 16)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Kampania zostanie automatycznie uruchomiona o wybranej godzinie
            </p>
          </div>
        )}

        {formData.status === 'active' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-in fade-in duration-300">
            <h4 className="text-sm font-medium text-green-900 mb-2">Kampania aktywna</h4>
            <p className="text-sm text-green-800">
              Kampania zostanie uruchomiona natychmiast po zapisaniu
            </p>
          </div>
        )}

        {formData.status === 'draft' && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 animate-in fade-in duration-300">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Kampania w szkicu</h4>
            <p className="text-sm text-gray-800">
              Kampania zostanie zapisana jako szkic. Możesz ją uruchomić później
            </p>
          </div>
        )}

        {formData.status === 'paused' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 animate-in fade-in duration-300">
            <h4 className="text-sm font-medium text-yellow-900 mb-2">Kampania wstrzymana</h4>
            <p className="text-sm text-yellow-800">
              Kampania jest obecnie wstrzymana. Możesz ją wznowić lub zmienić status
            </p>
          </div>
        )}

        {formData.status === 'completed' && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 animate-in fade-in duration-300">
            <h4 className="text-sm font-medium text-purple-900 mb-2">Kampania zakończona</h4>
            <p className="text-sm text-purple-800">
              Kampania została zakończona. Możesz edytować jej dane, ale nie możesz jej ponownie uruchomić
            </p>
          </div>
        )}

        {formData.status === 'cancelled' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-in fade-in duration-300">
            <h4 className="text-sm font-medium text-red-900 mb-2">Kampania anulowana</h4>
            <p className="text-sm text-red-800">
              Kampania została anulowana. Możesz edytować jej dane, ale nie możesz jej ponownie uruchomić
            </p>
          </div>
        )}
      </div>

      {errors.scheduledAt && (
        <p className="text-sm text-red-600">{errors.scheduledAt}</p>
      )}
    </div>
  )
}