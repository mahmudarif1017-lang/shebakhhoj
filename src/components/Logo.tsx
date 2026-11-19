import { Link } from 'react-router-dom'
import { cn } from '../lib/utils'

interface LogoProps {
  compact?: boolean
  className?: string
  light?: boolean
}

export default function Logo({ compact = false, className, light = false }: LogoProps) {
  return (
    <Link to="/" className={cn('inline-flex items-center gap-2.5', className)} aria-label="সেবাখোঁজ হোমপেজ">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy shadow-soft">
        <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
          <path
            d="M16 3.5c-5 0-9 4-9 9 0 6.6 9 16 9 16s9-9.4 9-16c0-5-4-9-9-9z"
            fill="none"
            stroke="white"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="12.5" r="3.6" fill="#10B981" />
          <path d="M14.4 12.5l1.1 1.1 2.2-2.3" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={cn('text-lg font-bold tracking-tight', light ? 'text-white' : 'text-navy')}>
            সেবাখোঁজ
          </span>
          <span className={cn('mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]', light ? 'text-emerald-200' : 'text-emerald-600')}>
            ShebaKhoj
          </span>
        </span>
      )}
    </Link>
  )
}
