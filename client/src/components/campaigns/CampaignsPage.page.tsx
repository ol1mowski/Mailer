import { useState } from 'react'
import { Search, Plus, Filter,Mail, Users, BarChart3, Calendar, Play, Pause, Trash2, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button.component'
import { Input } from '@/components/ui/input.component'
import { Badge } from '@/components/ui/badge.component'
import { Card } from '@/components/ui/card.component'
import { Loading } from '@/components/ui/loading.component'
import { ErrorMessage } from '@/components/ui/errorMessage.component'
import { CAMPAIGN_STATUSES } from '@/constants/app.constants'

interface Campaign {
  id: string
  name: string
  subject: string
  status: string
  recipients: number
  sent: number
  opened: number
  clicked: number
  scheduledAt?: string
  sentAt?: string
  createdAt: string
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Newsletter styczniowy',
    subject: 'Nowości w styczniu - sprawdź co dla Ciebie przygotowaliśmy',
    status: 'sent',
    recipients: 1250,
    sent: 1245,
    opened: 623,
    clicked: 156,
    sentAt: '2024-01-15T10:00:00Z',
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    name: 'Promocja walentynkowa',
    subject: 'Specjalna oferta na Walentynki - do -30%',
    status: 'scheduled',
    recipients: 800,
    sent: 0,
    opened: 0,
    clicked: 0,
    scheduledAt: '2024-02-14T09:00:00Z',
    createdAt: '2024-01-25',
  },
  {
    id: '3',
    name: 'Powitanie nowych użytkowników',
    subject: 'Witamy w naszej społeczności!',
    status: 'sending',
    recipients: 150,
    sent: 89,
    opened: 45,
    clicked: 12,
    createdAt: '2024-01-30',
  },
  {
    id: '4',
    name: 'Przypomnienie o płatności',
    subject: 'Przypomnienie o zaległej płatności',
    status: 'draft',
    recipients: 0,
    sent: 0,
    opened: 0,
    clicked: 0,
    createdAt: '2024-01-28',
  },
  {
    id: '5',
    name: 'Aktualizacja produktów',
    subject: 'Nowe produkty w naszej ofercie',
    status: 'failed',
    recipients: 500,
    sent: 0,
    opened: 0,
    clicked: 0,
    createdAt: '2024-01-20',
  },
]

export const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !selectedStatus || campaign.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleAddCampaign = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Add campaign')
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
      setError('Nie udało się wstrzymać kampanii')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const statusConfig = CAMPAIGN_STATUSES.find(s => s.value === status)
    return statusConfig?.color || 'gray'
  }

  const getStatusLabel = (status: string) => {
    const statusConfig = CAMPAIGN_STATUSES.find(s => s.value === status)
    return statusConfig?.label || status
  }

  const getOpenRate = (opened: number, sent: number) => {
    return sent > 0 ? Math.round((opened / sent) * 100) : 0
  }

  const getClickRate = (clicked: number, sent: number) => {
    return sent > 0 ? Math.round((clicked / sent) * 100) : 0
  }

  if (isLoading && campaigns.length === 0) {
    return <Loading fullScreen text="Ładowanie kampanii..." />
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <ErrorMessage 
          message={error} 
          onClose={() => setError(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kampanie</h1>
          <p className="text-gray-600">Zarządzaj kampaniami email i śledź ich wyniki</p>
        </div>
        <Button onClick={handleAddCampaign} disabled={isLoading}>
          {isLoading ? (
            <Loading size="sm" variant="dots" />
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Nowa kampania
            </>
          )}
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Wyszukaj kampanie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="">Wszystkie</option>
              {CAMPAIGN_STATUSES.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center">
            <Mail className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Wszystkie kampanie</p>
              <p className="text-2xl font-semibold text-gray-900">{campaigns.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <Play className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Aktywne</p>
              <p className="text-2xl font-semibold text-gray-900">
                {campaigns.filter(c => ['sending', 'scheduled'].includes(c.status)).length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Odbiorcy</p>
              <p className="text-2xl font-semibold text-gray-900">
                {campaigns.reduce((sum, c) => sum + c.recipients, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-orange-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Średni open rate</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.round(
                  campaigns
                    .filter(c => c.status === 'sent')
                    .reduce((sum, c) => sum + getOpenRate(c.opened, c.sent), 0) / 
                    Math.max(campaigns.filter(c => c.status === 'sent').length, 1)
                )}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Campaigns List */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Lista kampanii ({filteredCampaigns.length})
            </h2>
          </div>
          
          <div className="space-y-4">
            {filteredCampaigns.map(campaign => (
              <div
                key={campaign.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                      <Badge
                        variant={getStatusColor(campaign.status) as any}
                        className="text-xs"
                      >
                        {getStatusLabel(campaign.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{campaign.subject}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Odbiorcy: {campaign.recipients.toLocaleString()}</span>
                      {campaign.status === 'sent' && (
                        <>
                          <span>Wysłane: {campaign.sent.toLocaleString()}</span>
                          <span>Otwarcia: {getOpenRate(campaign.opened, campaign.sent)}%</span>
                          <span>Kliknięcia: {getClickRate(campaign.clicked, campaign.sent)}%</span>
                        </>
                      )}
                      {campaign.scheduledAt && (
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(campaign.scheduledAt).toLocaleDateString('pl-PL')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {campaign.status === 'draft' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStartCampaign(campaign.id)}
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                  )}
                  
                  {campaign.status === 'sending' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePauseCampaign(campaign.id)}
                    >
                      <Pause className="h-4 w-4 mr-1" />
                      Pauza
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditCampaign(campaign.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCampaign(campaign.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredCampaigns.length === 0 && (
              <div className="text-center py-12">
                <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Brak kampanii</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || selectedStatus 
                    ? 'Nie znaleziono kampanii pasujących do filtrów'
                    : 'Utwórz swoją pierwszą kampanię email, aby rozpocząć'
                  }
                </p>
                {!searchTerm && !selectedStatus && (
                  <Button onClick={handleAddCampaign}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nowa kampania
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
} 