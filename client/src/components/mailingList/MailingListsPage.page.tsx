import { useState } from 'react'
import { useMailingLists } from '@/hooks/useMailingLists.hook'
import { MailingListCard } from './MailingListCard.component'
import { MailingListForm } from './MailingListForm.component'
import { Button } from '@/components/ui/button.component'
import { Input } from '@/components/ui/input.component'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card.component'
import { Plus, Search, Users, Mail } from 'lucide-react'
import { type MailingListFormData } from '@/schemas/validation.schemas'
import { debounce } from '@/utils'

export const MailingListsPage = () => {
  const {
    mailingLists,
    loading,
    error,
    addMailingList,
    updateMailingList,
    deleteMailingList,
  } = useMailingLists()

  const [showForm, setShowForm] = useState(false)
  const [editingList, setEditingList] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredLists, setFilteredLists] = useState(mailingLists)

  const debouncedSearch = debounce((query: string) => {
    const filtered = mailingLists.filter(list =>
      list.name.toLowerCase().includes(query.toLowerCase()) ||
      list.description?.toLowerCase().includes(query.toLowerCase()) ||
      list.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )
    setFilteredLists(filtered)
  }, 300)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    debouncedSearch(query)
  }

  const handleAddMailingList = (data: MailingListFormData) => {
    addMailingList(data)
    setShowForm(false)
  }

  const handleUpdateMailingList = (data: MailingListFormData) => {
    if (editingList) {
      updateMailingList(editingList, data)
      setEditingList(null)
    }
  }

  const handleEdit = (id: string) => {
    const list = mailingLists.find(l => l.id === id)
    if (list) {
      setEditingList(id)
      setShowForm(true)
    }
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć tę listę mailingową?')) {
      deleteMailingList(id)
    }
  }

  const handleSendEmail = (id: string) => {
    // TODO: Implement email sending functionality
    console.log('Send email to list:', id)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingList(null)
  }

  const editingListData = editingList 
    ? mailingLists.find(l => l.id === editingList)
    : null

  const totalContacts = mailingLists.reduce((sum, list) => sum + list.contacts.length, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Listy mailingowe</h1>
          <p className="text-gray-600 mt-1">
            Zarządzaj listami kontaktów do wysyłania maili
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} disabled={showForm}>
          <Plus className="h-4 w-4 mr-2" />
          Nowa lista
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Listy mailingowe</p>
                <p className="text-2xl font-semibold text-gray-900">{mailingLists.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Łącznie kontaktów</p>
                <p className="text-2xl font-semibold text-gray-900">{totalContacts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-purple-600 font-semibold">Ø</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Średnio na listę</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {mailingLists.length > 0 ? Math.round(totalContacts / mailingLists.length) : 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Szukaj list mailingowych..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingList ? 'Edytuj listę mailingową' : 'Nowa lista mailingowa'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MailingListForm
              initialData={editingListData || undefined}
              onSubmit={editingList ? handleUpdateMailingList : handleAddMailingList}
              onCancel={handleCancel}
              loading={loading}
            />
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {!showForm && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLists.map(mailingList => (
            <MailingListCard
              key={mailingList.id}
              mailingList={mailingList}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSendEmail={handleSendEmail}
            />
          ))}
        </div>
      )}

      {!showForm && filteredLists.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? 'Nie znaleziono list' : 'Brak list mailingowych'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery 
                ? 'Spróbuj zmienić kryteria wyszukiwania'
                : 'Utwórz pierwszą listę mailingową, aby rozpocząć'
              }
            </p>
            {!searchQuery && (
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Utwórz listę
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
} 