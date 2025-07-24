import { useState } from 'react'
import { Search, Plus, Filter, MoreHorizontal, Mail, Phone, User, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button.component'
import { Input } from '@/components/ui/input.component'
import { Badge } from '@/components/ui/badge.component'
import { Card } from '@/components/ui/card.component'
import { CONTACT_TAGS } from '@/constants/app.constants'
import { cn } from '@/utils'

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  tags: string[]
  status: 'active' | 'inactive'
  createdAt: string
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Jan Kowalski',
    email: 'jan.kowalski@example.com',
    phone: '+48 123 456 789',
    tags: ['VIP', 'Aktywny'],
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Anna Nowak',
    email: 'anna.nowak@example.com',
    tags: ['Newsletter'],
    status: 'active',
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    name: 'Piotr Wiśniewski',
    email: 'piotr.wisniewski@example.com',
    phone: '+48 987 654 321',
    tags: ['Nowy klient'],
    status: 'inactive',
    createdAt: '2024-02-01',
  },
  {
    id: '4',
    name: 'Maria Wójcik',
    email: 'maria.wojcik@example.com',
    tags: ['VIP', 'Aktywny'],
    status: 'active',
    createdAt: '2024-01-10',
  },
  {
    id: '5',
    name: 'Tomasz Lewandowski',
    email: 'tomasz.lewandowski@example.com',
    phone: '+48 555 123 456',
    tags: ['Test'],
    status: 'inactive',
    createdAt: '2024-02-05',
  },
]

export const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => contact.tags.includes(tag))
    return matchesSearch && matchesTags
  })

  const handleAddContact = () => {
    // TODO: Implement add contact modal
    console.log('Add contact')
  }

  const handleDeleteContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id))
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kontakty</h1>
          <p className="text-gray-600">Zarządzaj swoimi kontaktami i listami mailingowymi</p>
        </div>
        <Button onClick={handleAddContact}>
          <Plus className="h-4 w-4 mr-2" />
          Dodaj kontakt
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Wyszukaj kontakty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Filtry:</span>
            <div className="flex flex-wrap gap-2">
              {CONTACT_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors cursor-pointer",
                    selectedTags.includes(tag) 
                      ? "border-transparent bg-primary text-primary-foreground hover:bg-primary/80" 
                      : "text-foreground hover:bg-gray-100"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center">
            <User className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Wszystkie kontakty</p>
              <p className="text-2xl font-semibold text-gray-900">{contacts.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <Mail className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Aktywne</p>
              <p className="text-2xl font-semibold text-gray-900">
                {contacts.filter(c => c.status === 'active').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center">
            <Tag className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">VIP</p>
              <p className="text-2xl font-semibold text-gray-900">
                {contacts.filter(c => c.tags.includes('VIP')).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Contacts List */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Lista kontaktów ({filteredContacts.length})
            </h2>
          </div>
          
          <div className="space-y-4">
            {filteredContacts.map(contact => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {contact.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                    {contact.phone && (
                      <p className="text-sm text-gray-500 flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {contact.phone}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex flex-wrap gap-1">
                    {contact.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Badge
                    variant={contact.status === 'active' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {contact.status === 'active' ? 'Aktywny' : 'Nieaktywny'}
                  </Badge>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteContact(contact.id)}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredContacts.length === 0 && (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Brak kontaktów</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || selectedTags.length > 0 
                    ? 'Nie znaleziono kontaktów pasujących do filtrów'
                    : 'Dodaj swój pierwszy kontakt, aby rozpocząć'
                  }
                </p>
                {!searchTerm && selectedTags.length === 0 && (
                  <Button onClick={handleAddContact}>
                    <Plus className="h-4 w-4 mr-2" />
                    Dodaj kontakt
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