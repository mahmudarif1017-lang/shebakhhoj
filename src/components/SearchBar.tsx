import { useState, type FormEvent } from 'react'
import { MapPin, Search, Sparkles } from 'lucide-react'
import { locations } from '../data/categories'
import { cn } from '../lib/utils'

interface SearchBarProps {
  onSearch: (query: string, location: string) => void
  placeholder?: string
  buttonLabel?: string
  initialQuery?: string
  initialLocation?: string
  variant?: 'hero' | 'inline'
  showSmartHint?: boolean
}

export default function SearchBar({
  onSearch,
  placeholder = 'আপনার কী ধরনের সেবা প্রয়োজন? যেমন: বাসার পানির কল নষ্ট হয়েছে...',
  buttonLabel = 'সেবা খুঁজুন',
  initialQuery = '',
  initialLocation = '',
  variant = 'hero',
  showSmartHint = false,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const [location, setLocation] = useState(initialLocation)

  const submit = (event: FormEvent) => {
    event.preventDefault()
    onSearch(query.trim(), location)
  }

  const hero = variant === 'hero'

  return (
    <div className={cn(hero ? 'card rounded-2xl p-2 shadow-float' : 'w-full')}>
      <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            aria-label="সেবা বা সমস্যা লিখুন"
            className={cn(
              'input h-12 pl-3.5 pr-11',
              hero ? 'border-transparent bg-slate-50 text-sm sm:text-base' : '',
            )}
          />
        </div>

        <div className="relative sm:w-44">
          <MapPin className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <select
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            aria-label="অবস্থান নির্বাচন করুন"
            className={cn(
              'input h-12 appearance-none pl-3 pr-9 text-sm',
              hero ? 'border-transparent bg-slate-50' : '',
            )}
          >
            <option value="">সব অঞ্চল</option>
            {locations.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <button type="submit" className={cn('btn-accent h-12 shrink-0 !rounded-xl', hero ? 'px-6' : '')}>
          <Search className="h-4 w-4" />
          {buttonLabel}
        </button>
      </form>

      {showSmartHint && (
        <p className="mt-2 flex items-center gap-1.5 px-2 pb-1 text-xs text-slate-500">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
          স্মার্ট সার্চ: সাধারণ ভাষায় আপনার সমস্যা লিখলেই আমরা সেবা ক্যাটাগরি বুঝে নেব।
        </p>
      )}
    </div>
  )
}
