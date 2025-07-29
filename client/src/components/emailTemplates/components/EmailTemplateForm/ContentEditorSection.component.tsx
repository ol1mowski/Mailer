import { Label } from '@/components/ui'
import { CodeEditor } from '../CodeEditor.component'
import type { EmailTemplateFormData } from '../../types/emailTemplate.types'

interface ContentEditorSectionProps {
  formData: EmailTemplateFormData
  errors: Record<string, string>
  updateFormData: (updates: Partial<EmailTemplateFormData>) => void
  isLoading: boolean
}

export const ContentEditorSection = ({
  formData,
  errors,
  updateFormData,
  isLoading
}: ContentEditorSectionProps) => {
  return (
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
  )
}