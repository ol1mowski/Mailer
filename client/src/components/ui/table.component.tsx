import { cn } from '@/utils'
import { type ReactNode } from 'react'

interface TableProps {
  children: ReactNode
  className?: string
}

interface TableHeaderProps {
  children: ReactNode
  className?: string
}

interface TableBodyProps {
  children: ReactNode
  className?: string
}

interface TableRowProps {
  children: ReactNode
  className?: string
}

interface TableHeadProps {
  children: ReactNode
  className?: string
}

interface TableCellProps {
  children: ReactNode
  className?: string
}

export const Table = ({ children, className }: TableProps) => {
  return (
    <div className={cn('relative w-full overflow-auto', className)}>
      <table className="w-full caption-bottom text-sm">
        {children}
      </table>
    </div>
  )
}

export const TableHeader = ({ children, className }: TableHeaderProps) => {
  return (
    <thead className={cn('[&_tr]:border-b', className)}>
      {children}
    </thead>
  )
}

export const TableBody = ({ children, className }: TableBodyProps) => {
  return (
    <tbody className={cn('[&_tr:last-child]:border-0', className)}>
      {children}
    </tbody>
  )
}

export const TableRow = ({ children, className }: TableRowProps) => {
  return (
    <tr className={cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className)}>
      {children}
    </tr>
  )
}

export const TableHead = ({ children, className }: TableHeadProps) => {
  return (
    <th className={cn('h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0', className)}>
      {children}
    </th>
  )
}

export const TableCell = ({ children, className }: TableCellProps) => {
  return (
    <td className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}>
      {children}
    </td>
  )
} 