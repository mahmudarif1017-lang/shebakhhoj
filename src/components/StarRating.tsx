import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '../lib/utils'

interface StarRatingProps {
  value: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  className?: string
}

const sizes = { sm: 'h-3.5 w-3.5', md: 'h-4 w-4', lg: 'h-5 w-5' }

export function StarRating({ value, size = 'md', showValue = false, className }: StarRatingProps) {
  const rounded = Math.round(value)
  return (
    <span className={cn('inline-flex items-center gap-1', className)} aria-label={`${value} এর মধ্যে ৫ তারকা`}>
      <span className="inline-flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(sizes[size], star <= rounded ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200')}
          />
        ))}
      </span>
      {showValue && <span className="ml-1 text-sm font-semibold text-slate-700">{value.toFixed(1)}</span>}
    </span>
  )
}

interface StarInputProps {
  value: number
  onChange: (value: number) => void
}

export function StarInput({ value, onChange }: StarInputProps) {
  const [hover, setHover] = useState(0)
  const active = hover || value

  return (
    <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          aria-label={`${star} তারকা`}
          className="rounded p-0.5 transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        >
          <Star
            className={cn('h-7 w-7', star <= active ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200')}
          />
        </button>
      ))}
      <span className="mr-2 text-sm font-medium text-slate-600">
        {active ? `${active} / ৫` : 'রেটিং দিন'}
      </span>
    </div>
  )
}
