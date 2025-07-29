import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

interface TextareaProps {
  children?: ReactNode
  className?: string
  rows?: number
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  disabled?: boolean
  id?: string
}

export const Textarea = ({ 
  children, 
  className, 
  rows = 3,
  placeholder,
  value,
  onChange,
  onKeyDown,
  disabled = false,
  id,
  ...props 
}: TextareaProps) => {
  return (
    <textarea
      id={id}
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={disabled}
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </textarea>
  )
}