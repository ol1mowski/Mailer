import { useState, useEffect } from 'react'
import type { Campaign, CreateCampaignRequest, UpdateCampaignRequest } from '@/lib/api'
import type { CampaignFormData, CampaignFormErrors } from '../../types/campaign.types'
import { validateCampaignForm } from '../../utils/campaignUtils.utils'

export const useCampaignForm = (
  campaign: Campaign | null | undefined,
  onSubmit: (data: CreateCampaignRequest | UpdateCampaignRequest) => void
) => {
  const [formData, setFormData] = useState<CampaignFormData>({
    name: '',
    subject: '',
    content: '',
    description: '',
    status: 'draft',
    scheduledAt: '',
    templateId: null,
    recipientIds: []
  })

  const [errors, setErrors] = useState<CampaignFormErrors>({})

  useEffect(() => {
    if (campaign) {
      setFormData({
        name: campaign.name,
        subject: campaign.subject,
        content: campaign.content,
        description: campaign.description || '',
        status: campaign.status,
        scheduledAt: campaign.scheduledAt ? new Date(campaign.scheduledAt).toISOString().slice(0, 16) : '',
        templateId: campaign.template?.id || null,
        recipientIds: campaign.recipients?.map(r => r.id) || []
      })
    }
  }, [campaign])

  const updateFormData = (field: keyof CampaignFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: CampaignFormErrors = {}

    switch (step) {
      case 1: // Basic Info
        if (!formData.name.trim()) newErrors.name = 'Nazwa kampanii jest wymagana'
        if (!formData.subject.trim()) newErrors.subject = 'Temat jest wymagany'
        break
      case 2: // Content
        if (!formData.content.trim()) newErrors.content = 'Treść jest wymagana'
        break
      case 3: // Recipients
        if (formData.recipientIds.length === 0) newErrors.recipientIds = 'Wybierz co najmniej jednego odbiorcę'
        break
      case 4: // Template (optional)
        break
      case 5: // Scheduling (optional)
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationErrors = validateCampaignForm({
      name: formData.name,
      subject: formData.subject,
      content: formData.content,
      status: formData.status
    })

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const submitData = {
      name: formData.name,
      subject: formData.subject,
      content: formData.content,
      description: formData.description,
      status: formData.status,
      scheduledAt: formData.scheduledAt ? new Date(formData.scheduledAt).toISOString() : undefined,
      templateId: formData.templateId || undefined,
      recipientIds: formData.recipientIds
    }

    onSubmit(submitData)
  }

  return {
    formData,
    errors,
    updateFormData,
    handleSubmit,
    validateStep
  }
}