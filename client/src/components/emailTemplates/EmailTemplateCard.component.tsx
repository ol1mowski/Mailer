import { type EmailTemplate } from '@/types'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card.component'
import { Badge } from '@/components/ui/badge.component'
import { Button } from '@/components/ui/button.component'
import { Edit, Trash2, Copy, Eye, EyeOff } from 'lucide-react'
import { formatDate, truncateText } from '@/utils'
import { EMAIL_TEMPLATE_CATEGORIES } from '@/constants/app.constants'

interface EmailTemplateCardProps {
  emailTemplate: EmailTemplate
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onDuplicate: (id: string) => void
  onToggleStatus: (id: string) => void
  onPreview: (id: string) => void
}

export const EmailTemplateCard = ({ 
  emailTemplate, 
  onEdit, 
  onDelete, 
  onDuplicate, 
  onToggleStatus,
  onPreview
}: EmailTemplateCardProps) => {
  const handleEdit = () => onEdit(emailTemplate.id)
  const handleDelete = () => onDelete(emailTemplate.id)
  const handleDuplicate = () => onDuplicate(emailTemplate.id)
  const handleToggleStatus = () => onToggleStatus(emailTemplate.id)
  const handlePreview = () => onPreview(emailTemplate.id)

  const categoryLabel = EMAIL_TEMPLATE_CATEGORIES.find(
    cat => cat.value === emailTemplate.category
  )?.label || emailTemplate.category

  return (
    <Card className={`hover:shadow-md transition-shadow ${!emailTemplate.isActive ? 'opacity-60' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg">{emailTemplate.name}</CardTitle>
              <Badge 
                variant={emailTemplate.isActive ? 'default' : 'secondary'}
                className="text-xs"
              >
                {emailTemplate.isActive ? 'Aktywny' : 'Nieaktywny'}
              </Badge>
            </div>
            <CardDescription className="text-sm">
              {truncateText(emailTemplate.subject, 60)}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {categoryLabel}
            </Badge>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p className="mb-1">
              <strong>Temat:</strong> {truncateText(emailTemplate.subject, 50)}
            </p>
            <p>
              <strong>Treść:</strong> {truncateText(emailTemplate.content.replace(/<[^>]*>/g, ''), 80)}
            </p>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Utworzono: {formatDate(emailTemplate.createdAt)}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handlePreview}
          className="flex-1"
        >
          <Eye className="h-4 w-4 mr-1" />
          Podgląd
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleEdit}
          className="flex-1"
        >
          <Edit className="h-4 w-4 mr-1" />
          Edytuj
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleDuplicate}
          className="flex-1"
        >
          <Copy className="h-4 w-4 mr-1" />
          Duplikuj
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleToggleStatus}
          className="text-blue-600 hover:text-blue-700"
        >
          {emailTemplate.isActive ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleDelete}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
} 