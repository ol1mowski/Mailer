import { cn } from '@/utils'
import { type ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

interface CardFooterProps {
  children: ReactNode
  className?: string
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}>
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className }: CardHeaderProps) => {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)}>
      {children}
    </div>
  )
}

export const CardTitle = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)}>
      {children}
    </h3>
  )
}

export const CardDescription = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>
      {children}
    </p>
  )
}

export const CardContent = ({ children, className }: CardContentProps) => {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  )
}

export const CardFooter = ({ children, className }: CardFooterProps) => {
  return (
    <div className={cn('flex items-center p-6 pt-0', className)}>
      {children}
    </div>
  )
} 