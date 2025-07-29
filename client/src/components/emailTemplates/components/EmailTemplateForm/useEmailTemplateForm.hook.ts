import { useState, useEffect } from 'react'
import type { EmailTemplate, EmailTemplateFormData } from '../../types/emailTemplate.types'
import type { CreateEmailTemplateRequest, UpdateEmailTemplateRequest } from '@/lib/api'

export const useEmailTemplateForm = (template: EmailTemplate | null | undefined, onSubmit: (data: CreateEmailTemplateRequest | UpdateEmailTemplateRequest) => void) => {
  const [formData, setFormData] = useState<EmailTemplateFormData>({
    name: '',
    subject: '',
    content: '',
    description: '',
    status: 'active'
  })
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

  return {
    formData,
    errors,
    updateFormData,
    validateForm,
    handleSubmit,
    handleSelectTemplate,
    handleInsertCode
  }
}