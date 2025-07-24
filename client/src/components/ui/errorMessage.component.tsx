import { AlertTriangle, X } from 'lucide-react'
import { cn } from '@/utils'

interface ErrorMessageProps {
  title?: string
  message: string
  variant?: 'default' | 'destructive' | 'warning'
  className?: string
  onClose?: () => void
  showIcon?: boolean
}

export const ErrorMessage = ({ 
  title = 'Błąd',
  message, 
  variant = 'default',
  className,
  onClose,
  showIcon = true
}: ErrorMessageProps) => {
  const variantClasses = {
    default: 'bg-red-50 border-red-200 text-red-800',
    destructive: 'bg-red-100 border-red-300 text-red-900',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
  }

  const iconClasses = {
    default: 'text-red-500',
    destructive: 'text-red-600',
    warning: 'text-yellow-500'
  }

  return (
    <div className={cn(
      'border rounded-lg p-4 relative',
      variantClasses[variant],
      className
    )}>
      <div className="flex items-start">
        {showIcon && (
          <AlertTriangle className={cn(
            'h-5 w-5 mr-3 mt-0.5 flex-shrink-0',
            iconClasses[variant]
          )} />
        )}
        
        <div className="flex-1">
          {title && (
            <h3 className="font-medium mb-1">{title}</h3>
          )}
          <p className="text-sm">{message}</p>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 p-1 hover:bg-red-100 rounded transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
} 