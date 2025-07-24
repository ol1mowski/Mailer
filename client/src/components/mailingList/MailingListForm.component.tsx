import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type MailingListFormData, mailingListSchema } from '@/schemas/validation.schemas'
import { Button } from '@/components/ui/button.component'
import { Input } from '@/components/ui/input.component'
import { Label } from '@/components/ui/label.component'
import { Badge } from '@/components/ui/badge.component'
import { X, Plus } from 'lucide-react'
import { useState } from 'react'
import { CONTACT_TAGS } from '@/constants/app.constants'

interface MailingListFormProps {
  initialData?: Partial<MailingListFormData>
  onSubmit: (data: MailingListFormData) => void
  onCancel: () => void
  loading?: boolean
}

export const MailingListForm = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  loading = false 
}: MailingListFormProps) => {
  const [newTag, setNewTag] = useState('')
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MailingListFormData>({
    resolver: zodResolver(mailingListSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      tags: initialData?.tags || [],
    },
  })

  const currentTags = watch('tags')

  const handleAddTag = () => {
    if (newTag.trim() && !currentTags.includes(newTag.trim())) {
      setValue('tags', [...currentTags, newTag.trim()])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setValue('tags', currentTags.filter(tag => tag !== tagToRemove))
  }

  const handleAddPresetTag = (tag: string) => {
    if (!currentTags.includes(tag)) {
      setValue('tags', [...currentTags, tag])
    }
  }

  const handleFormSubmit = (data: MailingListFormData) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nazwa listy *</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Wprowadź nazwę listy mailingowej"
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Opis</Label>
        <textarea
          id="description"
          {...register('description')}
          placeholder="Wprowadź opis listy (opcjonalnie)"
          className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label>Tagi</Label>
        <div className="flex flex-wrap gap-2 mb-3">
          {currentTags.map(tag => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Dodaj nowy tag"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
          />
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleAddTag}
            disabled={!newTag.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-3">
          <p className="text-sm text-muted-foreground mb-2">Popularne tagi:</p>
          <div className="flex flex-wrap gap-1">
            {CONTACT_TAGS.map(tag => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer hover:bg-secondary"
                onClick={() => handleAddPresetTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Zapisywanie...' : initialData ? 'Aktualizuj' : 'Utwórz'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Anuluj
        </Button>
      </div>
    </form>
  )
} 