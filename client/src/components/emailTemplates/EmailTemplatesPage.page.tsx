import { useState } from 'react'
import { Search, Plus, Filter, MoreHorizontal, FileText, Edit, Copy, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button.component'
import { Input } from '@/components/ui/input.component'
import { Badge } from '@/components/ui/badge.component'
import { Card } from '@/components/ui/card.component'
import { EMAIL_TEMPLATE_CATEGORIES } from '@/constants/app.constants'

interface EmailTemplate {
  id: string
  name: string
  subject: string
  category: string
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const mockTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Powitalny email',
    subject: 'Witamy w naszym serwisie!',
    category: 'welcome',
    description: 'Email powitalny dla nowych użytkowników',
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
  },
  {
    id: '2',
    name: 'Newsletter tygodniowy',
    subject: 'Tygodniowe podsumowanie',
    category: 'newsletter',
    description: 'Cotygodniowy newsletter z najnowszymi informacjami',
    isActive: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15',
  },
  {
    id: '3',
    name: 'Promocja sezonowa',
    subject: 'Specjalna oferta dla Ciebie!',
    category: 'promotion',
    description: 'Szablon dla kampanii promocyjnych',
    isActive: false,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-08',
  },
  {
    id: '4',
    name: 'Potwierdzenie zamówienia',
    subject: 'Twoje zamówienie zostało potwierdzone',
    category: 'order',
    description: 'Email potwierdzający zamówienie',
    isActive: true,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12',
  },
  {
    id: '5',
    name: 'Przypomnienie o hasło',
    subject: 'Resetowanie hasła',
    category: 'password',
    description: 'Email do resetowania hasła',
    isActive: true,
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18',
  },
]

export const EmailTemplatesPage = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>(mockTemplates)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddTemplate = () => {
    // TODO: Implement add template modal
    console.log('Add template')
  }

  const handleEditTemplate = (id: string) => {
    // TODO: Implement edit template
    console.log('Edit template', id)
  }

  const handleDuplicateTemplate = (id: string) => {
    // TODO: Implement duplicate template
    console.log('Duplicate template', id)
  }

  const handleDeleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(template => template.id !== id))
  }

  const handleToggleActive = (id: string) => {
    setTemplates(prev => prev.map(template => 
      template.id === id 
        ? { ...template, isActive: !template.isActive }
        : template
    ))
  }

  const getCategoryLabel = (category: string) => {
    return EMAIL_TEMPLATE_CATEGORIES.find(cat => cat.value === category)?.label || category
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Szablony email</h1>
          <p className="text-gray-600">Zarządzaj szablonami wiadomości email</p>
        </div>
        <Button onClick={handleAddTemplate}>
          <Plus className="h-4 w-4 mr-2" />
          Nowy szablon
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Wyszukaj szablony..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Kategoria:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="">Wszystkie</option>
              {EMAIL_TEMPLATE_CATEGORIES.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Wszystkie szablony</p>
              <p className="text-2xl font-semibold text-gray-900">{templates.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <Edit className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Aktywne</p>
              <p className="text-2xl font-semibold text-gray-900">
                {templates.filter(t => t.isActive).length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <Copy className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Kategorie</p>
              <p className="text-2xl font-semibold text-gray-900">
                {new Set(templates.map(t => t.category)).size}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Templates Grid */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Szablony ({filteredTemplates.length})
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map(template => (
              <div
                key={template.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{template.subject}</p>
                    <Badge variant="outline" className="text-xs">
                      {getCategoryLabel(template.category)}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleActive(template.id)}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {template.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>Utworzono: {template.createdAt}</span>
                  <Badge
                    variant={template.isActive ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {template.isActive ? 'Aktywny' : 'Nieaktywny'}
                  </Badge>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditTemplate(template.id)}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edytuj
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDuplicateTemplate(template.id)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Brak szablonów</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedCategory 
                  ? 'Nie znaleziono szablonów pasujących do filtrów'
                  : 'Utwórz swój pierwszy szablon, aby rozpocząć'
                }
              </p>
              {!searchTerm && !selectedCategory && (
                <Button onClick={handleAddTemplate}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nowy szablon
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
} 