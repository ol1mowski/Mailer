import { cn } from '@/utils'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'spinner' | 'dots' | 'pulse'
  className?: string
  text?: string
  fullScreen?: boolean
}

export const Loading = ({ 
  size = 'md', 
  variant = 'spinner', 
  className,
  text = 'Ładowanie...',
  fullScreen = false 
}: LoadingProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }

  const spinnerClasses = cn(
    'animate-spin rounded-full border-b-2 border-blue-600',
    sizeClasses[size],
    className
  )

  const dotsClasses = cn(
    'flex space-x-1',
    className
  )

  const pulseClasses = cn(
    'animate-pulse bg-blue-600 rounded-full',
    sizeClasses[size],
    className
  )

  const content = (
    <div className="text-center">
      {variant === 'spinner' && (
        <div className={spinnerClasses} />
      )}
      
      {variant === 'dots' && (
        <div className={dotsClasses}>
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      )}
      
      {variant === 'pulse' && (
        <div className={pulseClasses} />
      )}
      
      {text && (
        <p className="text-gray-600 mt-2 text-sm">{text}</p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {content}
      </div>
    )
  }

  return content
} 