import { Info } from 'lucide-react'
import { cn } from '../lib/utils'

export default function DemoNotice({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900', className)}>
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
      <div>{children}</div>
    </div>
  )
}
