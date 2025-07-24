import { MoreHorizontal, Edit, Copy, Trash2 } from 'lucide-react'
import { Badge, Button } from '@/components/ui'
import type { EmailTemplate } from '../types/emailTemplate.types'
import { getCategoryLabel } from '../utils/emailTemplateUtils.utils'

interface EmailTemplateCardProps {
  template: EmailTemplate
  onEdit: (id: string) => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
  onToggleActive: (id: string) => void
  isLoading: boolean
}

export const EmailTemplateCard = ({ 
  template, 
  onEdit, 
  onDuplicate, 
  onDelete, 
  onToggleActive,
  isLoading 
}: EmailTemplateCardProps) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
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
          onClick={() => onToggleActive(template.id)}
          disabled={isLoading}
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
          onClick={() => onEdit(template.id)}
          className="flex-1"
          disabled={isLoading}
        >
          <Edit className="h-3 w-3 mr-1" />
          Edytuj
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDuplicate(template.id)}
          disabled={isLoading}
        >
          <Copy className="h-3 w-3" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(template.id)}
          disabled={isLoading}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
} 