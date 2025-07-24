import { type MailingList } from '@/types'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card.component'
import { Badge } from '@/components/ui/badge.component'
import { Button } from '@/components/ui/button.component'
import { Users, Edit, Trash2, Mail } from 'lucide-react'
import { formatDate } from '@/utils'

interface MailingListCardProps {
  mailingList: MailingList
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onSendEmail: (id: string) => void
}

export const MailingListCard = ({ 
  mailingList, 
  onEdit, 
  onDelete, 
  onSendEmail 
}: MailingListCardProps) => {
  const handleEdit = () => onEdit(mailingList.id)
  const handleDelete = () => onDelete(mailingList.id)
  const handleSendEmail = () => onSendEmail(mailingList.id)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{mailingList.name}</CardTitle>
            {mailingList.description && (
              <CardDescription className="mt-2">
                {mailingList.description}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {mailingList.contacts.length} kontaktów
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {mailingList.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="mt-3 text-xs text-muted-foreground">
          Utworzono: {formatDate(mailingList.createdAt)}
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2">
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
          onClick={handleSendEmail}
          className="flex-1"
        >
          <Mail className="h-4 w-4 mr-1" />
          Wyślij
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