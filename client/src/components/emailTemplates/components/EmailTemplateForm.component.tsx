import { useState, useEffect } from 'react'
import { X, Eye, EyeOff, Save, Loader2 } from 'lucide-react'
import { Button, Input, Label } from '@/components/ui'
import { CodeEditor } from './CodeEditor.component'
import { SafePreview } from './SafePreview.component'
import { EmailTemplates } from './EmailTemplates.component'
import { EditorTools } from './EditorTools.component'
import { SecurityInfo } from './SecurityInfo.component'
import type { EmailTemplate, EmailTemplateFormData } from '../types/emailTemplate.types'
import type { CreateEmailTemplateRequest, UpdateEmailTemplateRequest } from '@/lib/api'

interface EmailTemplateFormProps {
  template?: EmailTemplate | null
  onSubmit: (data: CreateEmailTemplateRequest | UpdateEmailTemplateRequest) => void
  onCancel: () => void
  isLoading: boolean
}

export const EmailTemplateForm = ({ 
  template, 
  onSubmit, 
  onCancel, 
  isLoading 
}: EmailTemplateFormProps) => {
  const [formData, setFormData] = useState<EmailTemplateFormData>({
    name: '',
    subject: '',
    content: '',
    description: '',
    status: 'active'
  })
  const [showPreview, setShowPreview] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name,
        subject: template.subject,
        content: template.content,
        description: template.description,
        status: template.status
      })
    }
  }, [template])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nazwa szablonu jest wymagana'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Temat jest wymagany'
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Treść jest wymagana'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const updateFormData = (updates: Partial<EmailTemplateFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const handleSelectTemplate = (templateContent: string) => {
    updateFormData({ content: templateContent })
  }

  const handleInsertCode = (code: string) => {
    updateFormData({ content: formData.content + '\n' + code })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {template ? 'Edytuj szablon' : 'Nowy szablon'}
          </h2>
          <div className="flex items-center gap-2">
            <EmailTemplates onSelectTemplate={handleSelectTemplate} />
            <EditorTools onInsertCode={handleInsertCode} />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showPreview ? 'Ukryj podgląd' : 'Pokaż podgląd'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Form */}
          <div className={`${showPreview ? 'w-1/2' : 'w-full'} p-6 overflow-y-auto border-r border-gray-200`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Security Info */}
              <SecurityInfo />

              {/* Basic Info */}
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

              {/* Content Editor */}
              <div>
                <Label htmlFor="content" className="text-sm font-medium text-gray-700">
                  Treść email * (HTML)
                </Label>
                <div className="mt-2">
                  <CodeEditor
                    value={formData.content}
                    onChange={(value) => updateFormData({ content: value })}
                    language="html"
                    height="400px"
                    placeholder="Wprowadź kod HTML..."
                    disabled={isLoading}
                  />
                  {errors.content && (
                    <p className="text-sm text-red-600 mt-1">{errors.content}</p>
                  )}
                  <div className="mt-2 text-xs text-gray-500 space-y-1">
                    <p>💡 <strong>Wskazówki:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Użyj szablonów HTML powyżej aby szybko rozpocząć</li>
                      <li>Użyj narzędzi aby wstawić gotowe elementy</li>
                      <li>Wszystkie tagi HTML są dozwolone i bezpieczne</li>
                      <li>Podgląd pokazuje jak email będzie wyglądał</li>
                      <li>Użyj inline CSS dla lepszej kompatybilności</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  Anuluj
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {template ? 'Aktualizuję...' : 'Tworzę...'}
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {template ? 'Aktualizuj' : 'Utwórz'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="w-1/2 p-6 overflow-y-auto bg-gray-50">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Podgląd email</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Temat:</p>
                    <p className="text-gray-900">{formData.subject || 'Brak tematu'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Treść:</p>
                    <div className="border border-gray-200 rounded-md bg-white overflow-hidden">
                      <SafePreview 
                        htmlContent={formData.content} 
                        className="p-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}