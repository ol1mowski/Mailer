import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { campaignApi, contactApi, emailTemplateApi } from '@/lib/api'
import type { CreateCampaignRequest, UpdateCampaignRequest } from '@/lib/api'
import type { CampaignFilters } from '../types/campaign.types'
import { filterCampaigns } from '../utils/campaignUtils.utils'

export const useCampaigns = () => {
  const queryClient = useQueryClient()
  const [filters, setFilters] = useState<CampaignFilters>({
    searchTerm: '',
    selectedStatus: '',
    selectedTemplate: ''
  })
  const [error, setError] = useState<string>('')

  const {
    data: campaigns = [],
    isLoading,
    error: fetchError
  } = useQuery({
    queryKey: ['campaigns'],
    queryFn: campaignApi.getAllCampaigns,
    staleTime: 5 * 60 * 1000,
  })

  const { data: contacts = [] } = useQuery({
    queryKey: ['contacts'],
    queryFn: contactApi.getAllContacts,
    staleTime: 10 * 60 * 1000,
  })

  const { data: templates = [] } = useQuery({
    queryKey: ['emailTemplates'],
    queryFn: emailTemplateApi.getAllTemplates,
    staleTime: 10 * 60 * 1000,
  })

  const filteredCampaigns = filterCampaigns(campaigns, filters)

  const createCampaignMutation = useMutation({
    mutationFn: campaignApi.createCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
      toast.success('Kampania została utworzona')
    },
    onError: (error: Error) => {
      setError(`Błąd tworzenia kampanii: ${error.message}`)
      toast.error('Błąd tworzenia kampanii')
    }
  })

  const updateCampaignMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCampaignRequest }) =>
      campaignApi.updateCampaign(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
      toast.success('Kampania została zaktualizowana')
    },
    onError: (error: Error) => {
      setError(`Błąd aktualizacji kampanii: ${error.message}`)
      toast.error('Błąd aktualizacji kampanii')
    }
  })

  const deleteCampaignMutation = useMutation({
    mutationFn: campaignApi.deleteCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
      toast.success('Kampania została usunięta')
    },
    onError: (error: Error) => {
      setError(`Błąd usuwania kampanii: ${error.message}`)
      toast.error('Błąd usuwania kampanii')
    }
  })

  const startCampaignMutation = useMutation({
    mutationFn: campaignApi.startCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
      toast.success('Kampania została uruchomiona')
    },
    onError: (error: Error) => {
      setError(`Błąd uruchamiania kampanii: ${error.message}`)
      toast.error('Błąd uruchamiania kampanii')
    }
  })

  const pauseCampaignMutation = useMutation({
    mutationFn: campaignApi.pauseCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
      toast.success('Kampania została wstrzymana')
    },
    onError: (error: Error) => {
      setError(`Błąd wstrzymywania kampanii: ${error.message}`)
      toast.error('Błąd wstrzymywania kampanii')
    }
  })

  const completeCampaignMutation = useMutation({
    mutationFn: campaignApi.completeCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
      toast.success('Kampania została zakończona')
    },
    onError: (error: Error) => {
      setError(`Błąd kończenia kampanii: ${error.message}`)
      toast.error('Błąd kończenia kampanii')
    }
  })

  const handleAddCampaign = (data: CreateCampaignRequest) => {
    createCampaignMutation.mutate(data)
  }

  const handleEditCampaign = (id: number, data: UpdateCampaignRequest) => {
    updateCampaignMutation.mutate({ id, data })
  }

  const handleDeleteCampaign = (id: number) => {
    deleteCampaignMutation.mutate(id)
  }

  const handleStartCampaign = (id: number) => {
    startCampaignMutation.mutate(id)
  }

  const handlePauseCampaign = (id: number) => {
    pauseCampaignMutation.mutate(id)
  }

  const handleCompleteCampaign = (id: number) => {
    completeCampaignMutation.mutate(id)
  }

  const updateFilters = (newFilters: Partial<CampaignFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const clearError = () => {
    setError('')
  }

  return {
    campaigns,
    filteredCampaigns,
    contacts,
    templates,
    filters,
    isLoading: isLoading || createCampaignMutation.isPending || updateCampaignMutation.isPending || deleteCampaignMutation.isPending,
    error: error || (fetchError?.message || ''),
    handleAddCampaign,
    handleEditCampaign,
    handleDeleteCampaign,
    handleStartCampaign,
    handlePauseCampaign,
    handleCompleteCampaign,
    updateFilters,
    clearError
  }
} 