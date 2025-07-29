import { useState } from 'react'
import { Label } from '@/components/ui'
import { useQuery } from '@tanstack/react-query'
import { emailTemplateApi } from '@/lib/api'
import type { CampaignFormData, CampaignFormErrors } from '../../types/campaign.types'

interface TemplateSectionProps {
  formData: CampaignFormData
  errors: CampaignFormErrors
  updateFormData: (field: keyof CampaignFormData, value: string | number | null) => void
  isLoading: boolean
}

export const TemplateSection = ({
  formData,
  errors,
  updateFormData,
  isLoading
}: TemplateSectionProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const { data: templates = [] } = useQuery({
    queryKey: ['emailTemplates'],
    queryFn: emailTemplateApi.getAllTemplates,
    staleTime: 10 * 60 * 1000,
  })

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleTemplateSelect = (templateId: number | null) => {
    updateFormData('templateId', templateId)
  }

  const selectedTemplate = templates.find(t => t.id === formData.templateId)

  return (
    <div className="space-y-6 animate-in slide-in-from-left-4 duration-500 delay-700">
      <div>
        <Label>Wybierz szablon (opcjonalnie)</Label>
        <p className="text-sm text-gray-600 mt-1">
          Możesz wybrać szablon email, który zostanie użyty jako podstawa
        </p>
      </div>

      <div>
        <input
          type="text"
          placeholder="Szukaj szablonów..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="radio"
            id="no-template"
            name="template"
            checked={formData.templateId === null}
            onChange={() => handleTemplateSelect(null)}
            disabled={isLoading}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          />
          <label htmlFor="no-template" className="text-sm font-medium text-gray-900">
            Bez szablonu - użyj własnej treści
          </label>
        </div>

        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                id={`template-${template.id}`}
                name="template"
                checked={formData.templateId === template.id}
                onChange={() => handleTemplateSelect(template.id)}
                disabled={isLoading}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mt-1"
              />
              <div className="flex-1">
                <label htmlFor={`template-${template.id}`} className="cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{template.name}</h4>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      template.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {template.status === 'active' ? 'Aktywny' : 'Nieaktywny'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{template.subject}</p>
                  {template.description && (
                    <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                  )}
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTemplate && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-in fade-in duration-300">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Wybrany szablon</h4>
          <p className="text-sm text-blue-800">{selectedTemplate.name}</p>
          <p className="text-sm text-blue-700 mt-1">{selectedTemplate.subject}</p>
        </div>
      )}

      {errors.templateId && (
        <p className="text-sm text-red-600">{errors.templateId}</p>
      )}
    </div>
  )
}