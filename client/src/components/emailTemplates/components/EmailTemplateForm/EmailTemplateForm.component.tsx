import { useState } from 'react'
import { SecurityInfo } from '../SecurityInfo.component'
import { FormHeader } from './FormHeader.component'
import { BasicInfoSection } from './BasicInfoSection.component'
import { ContentEditorSection } from './ContentEditorSection.component'
import { FormActions } from './FormActions.component'
import { PreviewSection } from './PreviewSection.component'
import { useEmailTemplateForm } from './useEmailTemplateForm.hook'
import type { EmailTemplate } from '../../types/emailTemplate.types'
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
  const [showPreview, setShowPreview] = useState<boolean>(false)
  
  const {
    formData,
    errors,
    updateFormData,
    handleSubmit,
    handleSelectTemplate,
    handleInsertCode
  } = useEmailTemplateForm(template, onSubmit)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl h-[90vh] flex flex-col">
        <FormHeader
          template={template}
          showPreview={showPreview}
          onTogglePreview={() => setShowPreview(!showPreview)}
          onCancel={onCancel}
          onSelectTemplate={handleSelectTemplate}
          onInsertCode={handleInsertCode}
          isLoading={isLoading}
        />

        <div className="flex-1 flex overflow-hidden">
          <div className={`${showPreview ? 'w-1/2' : 'w-full'} p-6 overflow-y-auto border-r border-gray-200`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <SecurityInfo />

              <BasicInfoSection
                formData={formData}
                errors={errors}
                updateFormData={updateFormData}
                isLoading={isLoading}
              />

              <ContentEditorSection
                formData={formData}
                errors={errors}
                updateFormData={updateFormData}
                isLoading={isLoading}
              />

              <FormActions
                onCancel={onCancel}
                isLoading={isLoading}
                template={template}
              />
            </form>
          </div>

          {showPreview && (
            <PreviewSection
              formData={formData}
            />
          )}
        </div>
      </div>
    </div>
  )
}