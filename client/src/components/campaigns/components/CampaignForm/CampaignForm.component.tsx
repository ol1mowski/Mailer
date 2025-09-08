import { useState } from 'react'
import { BasicInfoSection } from './BasicInfoSection.component'
import { RecipientsSection } from './RecipientsSection.component'
import { TemplateSection } from './TemplateSection.component'
import { SchedulingSection } from './SchedulingSection.component'
import { FormActions } from './FormActions.component'
import { useCampaignForm } from './useCampaignForm.hook'
import type { Campaign, CreateCampaignRequest, UpdateCampaignRequest } from '@/lib/api'

interface CampaignFormProps {
  campaign?: Campaign | null
  onSubmit: (data: CreateCampaignRequest | UpdateCampaignRequest) => void
  onCancel: () => void
  isLoading: boolean
}

export const CampaignForm = ({ 
  campaign, 
  onSubmit, 
  onCancel, 
  isLoading 
}: CampaignFormProps) => {
  const [activeStep, setActiveStep] = useState(1)
  
  const {
    formData,
    errors,
    updateFormData,
    handleSubmit,
    validateStep
  } = useCampaignForm(campaign, onSubmit)

  const steps = [
    { id: 1, name: 'Podstawowe informacje', component: BasicInfoSection },
    { id: 2, name: 'Szablon i treść', component: TemplateSection },
    { id: 3, name: 'Odbiorcy', component: RecipientsSection },
    { id: 4, name: 'Harmonogram', component: SchedulingSection }
  ]

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => Math.min(prev + 1, steps.length))
    }
  }

  const handlePrevious = () => {
    setActiveStep(prev => Math.max(prev - 1, 1))
  }

  const CurrentStepComponent = steps[activeStep - 1].component

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Progress Steps */}
      <div className="animate-in slide-in-from-top-4 duration-500 delay-100">
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                activeStep >= step.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step.id}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-2 ${
                  activeStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {steps[activeStep - 1].name}
        </h3>
      </div>

      {/* Form Content */}
      <div className="animate-in slide-in-from-bottom-4 duration-500 delay-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <CurrentStepComponent
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
            isLoading={isLoading}
          />

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 animate-in slide-in-from-bottom-4 duration-500 delay-300">
            <div className="flex gap-3">
              {activeStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Wstecz
                </button>
              )}
            </div>

            <div className="flex gap-3">
              {activeStep < steps.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Dalej
                </button>
              ) : (
                <FormActions
                  onCancel={onCancel}
                  isLoading={isLoading}
                  campaign={campaign}
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}