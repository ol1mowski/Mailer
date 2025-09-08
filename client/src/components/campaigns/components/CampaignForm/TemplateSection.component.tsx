import { useState, useEffect } from 'react'
import { Label, HtmlEditor } from '@/components/ui'
import { useQuery } from '@tanstack/react-query'
import { emailTemplateApi } from '@/lib/api'
import type { CampaignFormData, CampaignFormErrors } from '../../types/campaign.types'

interface TemplateSectionProps {
  formData: CampaignFormData
  errors: CampaignFormErrors
  updateFormData: (field: keyof CampaignFormData, value: string | number | number[] | null) => void
  isLoading: boolean
}

export const TemplateSection = ({
  formData,
  errors,
  updateFormData,
  isLoading
}: TemplateSectionProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showPreview, setShowPreview] = useState(true)
  const [customContent, setCustomContent] = useState(formData.content)
  
  const { data: templates = [] } = useQuery({
    queryKey: ['emailTemplates'],
    queryFn: emailTemplateApi.getAllTemplates,
    staleTime: 10 * 60 * 1000,
  })

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedTemplate = templates.find(t => t.id === formData.templateId)

  useEffect(() => {
    if (selectedTemplate && selectedTemplate.content) {
      setCustomContent(selectedTemplate.content)
      updateFormData('content', selectedTemplate.content)
    } else if (!formData.templateId) {
      const basicContent = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h1 style="color: #333; text-align: center;">Witaj!</h1>
  <p style="color: #666; line-height: 1.6;">
    Tutaj wpisz treść swojego email...
  </p>
  <div style="text-align: center; margin: 30px 0;">
    <a href="#" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
      Przycisk CTA
    </a>
  </div>
  <p style="color: #999; font-size: 12px; text-align: center;">
    © 2024 Twoja Firma. Wszystkie prawa zastrzeżone.
  </p>
</div>`
      setCustomContent(basicContent)
      updateFormData('content', basicContent)
    }
  }, [selectedTemplate, formData.templateId, updateFormData])

  const handleTemplateSelect = (templateId: number | null) => {
    updateFormData('templateId', templateId)
  }

  const handleContentChange = (content: string) => {
    setCustomContent(content)
    updateFormData('content', content)
  }

  const renderPreview = () => {
    if (!customContent) return <p className="text-gray-500 italic">Brak treści do wyświetlenia</p>
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 h-full overflow-auto">
        <div className="mb-4 pb-2 border-b border-gray-200">
          <h4 className="text-sm font-medium text-gray-900">Podgląd email</h4>
          {selectedTemplate && (
            <p className="text-xs text-gray-600 mt-1">Szablon: {selectedTemplate.name}</p>
          )}
        </div>
        <div 
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: customContent }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-left-4 duration-500 delay-500">
      <div>
        <Label>Wybierz szablon email</Label>
        <p className="text-sm text-gray-600 mt-1">
          Wybierz gotowy szablon lub rozpocznij z pustym szablonem
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

      <div className="space-y-3 max-h-48 overflow-y-auto">
        <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
          <input
            type="radio"
            id="no-template"
            name="template"
            checked={formData.templateId === null}
            onChange={() => handleTemplateSelect(null)}
            disabled={isLoading}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          />
          <label htmlFor="no-template" className="text-sm font-medium text-gray-900 cursor-pointer">
            Pusty szablon - zacznij od podstaw
          </label>
        </div>

        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors"
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

      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-4">
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
            <HtmlEditor
              value={customContent}
              onChange={handleContentChange}
              height="500px"
              disabled={isLoading}
              className="mt-1"
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content}</p>
            )}
            <div className="text-xs text-gray-500 mt-2">
              <p>💡 <strong>Wskazówki:</strong> Użyj snippetów: <code>email-container</code>, <code>email-header</code>, <code>email-button</code>, <code>email-footer</code></p>
            </div>
          </div>

          {showPreview && (
            <div className="w-1/2 animate-in slide-in-from-right-4 duration-500">
              {renderPreview()}
            </div>
          )}
        </div>
      </div>

      {errors.templateId && (
        <p className="text-sm text-red-600">{errors.templateId}</p>
      )}
    </div>
  )
}