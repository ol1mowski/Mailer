import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui'
import { EmailTemplates } from '../EmailTemplates.component'
import { EditorTools } from '../EditorTools.component'
import type { EmailTemplate } from '../../types/emailTemplate.types'

interface FormHeaderProps {
  template?: EmailTemplate | null
  showPreview: boolean
  onTogglePreview: () => void
  onSelectTemplate: (template: string) => void
  onInsertCode: (code: string) => void
}

export const FormHeader = ({
  template,
  showPreview,
  onTogglePreview,
  onSelectTemplate,
  onInsertCode
}: FormHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900">
        {template ? 'Edytuj szablon' : 'Nowy szablon'}
      </h2>
      <div className="flex items-center gap-2">
        <EmailTemplates onSelectTemplate={onSelectTemplate} />
        <EditorTools onInsertCode={onInsertCode} />
        <Button
          variant="outline"
          size="sm"
          onClick={onTogglePreview}
          className="text-blue-600 border-blue-200 hover:bg-blue-50"
        >
          {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showPreview ? 'Ukryj podgląd' : 'Pokaż podgląd'}
        </Button>
      </div>
    </div>
  )
}