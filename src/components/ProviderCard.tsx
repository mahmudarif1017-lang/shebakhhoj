import { Link } from 'react-router-dom'
import { ArrowUpRight, BriefcaseBusiness, MapPin, Sparkles, Star } from 'lucide-react'
import type { Provider } from '../types'
import { averageRating, cn, reviewCount, toBn } from '../lib/utils'
import StatusBadge from './StatusBadge'

export default function ProviderCard({ provider }: { provider: Provider }) {
  const rating = averageRating(provider)
  const reviews = reviewCount(provider)

  return (
    <Link
      to={`/provider/${provider.id}`}
      className="group card flex h-full flex-col overflow-hidden transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-soft"
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-navy to-emerald-500" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-navy-50 text-2xl">
            {provider.photo ? (
              <img src={provider.photo} alt={provider.name} className="h-full w-full object-cover" />
            ) : (
              <span aria-hidden="true">{provider.avatar}</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-bold text-navy">{provider.name}</h3>
            <p className="truncate text-sm text-slate-600">{provider.profession}</p>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <StatusBadge status={provider.verification} />
              {provider.isDemo && (
                <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500">ডেমো</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-emerald-600" /> {provider.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BriefcaseBusiness className="h-3.5 w-3.5 text-emerald-600" /> {toBn(provider.experience)} বছর অভিজ্ঞতা
          </span>
        </div>

        <div className="mt-4 flex items-center gap-1.5">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-navy">
            {reviews ? rating.toFixed(1) : 'নতুন'}
          </span>
          {reviews > 0 && <span className="text-xs text-slate-500">({toBn(reviews)}টি রিভিউ)</span>}
        </div>

        {provider.skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {provider.skills.slice(0, 2).map((skill) => (
              <span key={skill} className="chip !text-[11px]">{skill}</span>
            ))}
          </div>
        )}

        <span className={cn(
          'mt-5 inline-flex items-center justify-center gap-1.5 rounded-xl border border-navy/10 bg-navy-50 px-4 py-2.5 text-sm font-semibold text-navy transition group-hover:border-navy group-hover:bg-navy group-hover:text-white',
        )}>
          প্রোফাইল দেখুন
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      {provider.verification === 'pending' && (
        <span className="sr-only">
          <Sparkles aria-hidden="true" /> এই প্রোফাইলটি অনুমোদনের অপেক্ষায় আছে
        </span>
      )}
    </Link>
  )
}
