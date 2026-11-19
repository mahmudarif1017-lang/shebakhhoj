import { BadgeCheck, Clock3, XCircle } from 'lucide-react'
import type { VerificationStatus } from '../types'
import { cn } from '../lib/utils'

export default function StatusBadge({
  status,
  className,
}: {
  status: VerificationStatus
  className?: string
}) {
  if (status === 'verified') {
    return (
      <span className={cn('inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700', className)}>
        <BadgeCheck className="h-3.5 w-3.5" /> যাচাইকৃত
      </span>
    )
  }
  if (status === 'pending') {
    return (
      <span className={cn('inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700', className)}>
        <Clock3 className="h-3.5 w-3.5" /> অনুমোদন অপেক্ষায়
      </span>
    )
  }
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700', className)}>
      <XCircle className="h-3.5 w-3.5" /> প্রত্যাখ্যাত
    </span>
  )
}
