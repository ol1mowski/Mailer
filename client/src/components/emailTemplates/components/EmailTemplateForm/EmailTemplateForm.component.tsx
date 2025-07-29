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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="animate-in slide-in-from-top-4 duration-500 delay-100">
        <FormHeader
          template={template}
          showPreview={showPreview}
          onTogglePreview={() => setShowPreview(!showPreview)}
          onSelectTemplate={handleSelectTemplate}
          onInsertCode={handleInsertCode}
        />
      </div>

      <div className="flex gap-6 animate-in slide-in-from-bottom-4 duration-500 delay-200">
        <div className={`${showPreview ? 'w-1/2' : 'w-full'} space-y-6`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-in fade-in duration-500 delay-300">
              <SecurityInfo />
            </div>

            <div className="animate-in slide-in-from-left-4 duration-500 delay-400">
              <BasicInfoSection
                formData={formData}
                errors={errors}
                updateFormData={updateFormData}
                isLoading={isLoading}
              />
            </div>

            <div className="animate-in slide-in-from-left-4 duration-500 delay-500">
              <ContentEditorSection
                formData={formData}
                errors={errors}
                updateFormData={updateFormData}
                isLoading={isLoading}
              />
            </div>

            <div className="animate-in slide-in-from-bottom-4 duration-500 delay-600">
              <FormActions
                onCancel={onCancel}
                isLoading={isLoading}
                template={template}
              />
            </div>
          </form>
        </div>

        {showPreview && (
          <div className="w-1/2 animate-in slide-in-from-right-4 duration-500 delay-300">
            <PreviewSection
              formData={formData}
            />
          </div>
        )}
      </div>
    </div>
  )
}