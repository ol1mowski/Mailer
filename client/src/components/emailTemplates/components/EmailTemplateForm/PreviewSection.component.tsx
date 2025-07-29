import { SafePreview } from '../SafePreview.component'
import type { EmailTemplateFormData } from '../../types/emailTemplate.types'

interface PreviewSectionProps {
  formData: EmailTemplateFormData
}

export const PreviewSection = ({ formData }: PreviewSectionProps) => {
  return (
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
  )
}