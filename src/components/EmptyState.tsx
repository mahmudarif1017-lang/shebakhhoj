import type { LucideIcon } from 'lucide-react'
import { SearchX } from 'lucide-react'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  action?: React.ReactNode
}

export default function EmptyState({ icon: Icon = SearchX, title, description, action }: EmptyStateProps) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-50 text-navy">
        <Icon className="h-8 w-8" />
      </span>
      <h3 className="mt-5 text-lg font-bold text-navy">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
