import { useState } from 'react'
import { Label, Textarea } from '@/components/ui'
import type { CampaignFormData, CampaignFormErrors } from '../../types/campaign.types'

interface ContentSectionProps {
  formData: CampaignFormData
  errors: CampaignFormErrors
  updateFormData: (field: keyof CampaignFormData, value: string) => void
  isLoading: boolean
}

export const ContentSection = ({
  formData,
  errors,
  updateFormData,
  isLoading
}: ContentSectionProps) => {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="space-y-6 animate-in slide-in-from-left-4 duration-500 delay-500">
      <div className="flex items-center justify-between">
        <Label htmlFor="content">Treść email *</Label>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {showPreview ? 'Ukryj podgląd' : 'Pokaż podgląd'}
        </button>
      </div>

      <div className="flex gap-6">
        <div className={`${showPreview ? 'w-1/2' : 'w-full'}`}>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => updateFormData('content', e.target.value)}
            placeholder="Wprowadź treść email w formacie HTML..."
            disabled={isLoading}
            className="mt-1 font-mono text-sm"
            rows={15}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content}</p>
          )}
        </div>

        {showPreview && (
          <div className="w-1/2 animate-in slide-in-from-right-4 duration-500 delay-300">
            <div className="bg-white border border-gray-200 rounded-lg p-4 h-full">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Podgląd</h4>
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: formData.content }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="text-sm text-gray-600">
        <p>Możesz używać HTML do formatowania treści. Wspierane tagi: &lt;p&gt;, &lt;h1&gt;-&lt;h6&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;a&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;, &lt;img&gt;</p>
      </div>
    </div>
  )
}