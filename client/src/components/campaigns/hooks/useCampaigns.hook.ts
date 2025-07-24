import { useState } from 'react'
import type { Campaign, CampaignFilters } from '../types/campaign.types'
import { mockCampaigns } from '../data/mockCampaigns.data'
import { filterCampaigns } from '../utils/campaignUtils.utils'

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns)
  const [filters, setFilters] = useState<CampaignFilters>({
    searchTerm: '',
    selectedStatus: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const filteredCampaigns = filterCampaigns(campaigns, filters)

  const handleAddCampaign = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Add campaign')
    } catch {
      setError('Nie udało się utworzyć kampanii')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditCampaign = async (id: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      console.log('Edit campaign', id)
    } catch {
      setError('Nie udało się edytować kampanii')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteCampaign = async (id: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      setCampaigns(prev => prev.filter(campaign => campaign.id !== id))
    } catch {
      setError('Nie udało się usunąć kampanii')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartCampaign = async (id: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      setCampaigns(prev => prev.map(campaign => 
        campaign.id === id 
          ? { ...campaign, status: 'sending' }
          : campaign
      ))
    } catch {
      setError('Nie udało się uruchomić kampanii')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePauseCampaign = async (id: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      setCampaigns(prev => prev.map(campaign => 
        campaign.id === id 
          ? { ...campaign, status: 'draft' }
          : campaign
      ))
    } catch {
      setError('Nie udało się wstrzymać kampanii')
    } finally {
      setIsLoading(false)
    }
  }

  const updateFilters = (newFilters: Partial<CampaignFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const clearError = () => setError(null)

  return {
    campaigns,
    filteredCampaigns,
    filters,
    isLoading,
    error,
    handleAddCampaign,
    handleEditCampaign,
    handleDeleteCampaign,
    handleStartCampaign,
    handlePauseCampaign,
    updateFilters,
    clearError
  }
} 