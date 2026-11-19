import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ListFilter, RotateCcw, SlidersHorizontal, Sparkles, X } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import ProviderCard from '../components/ProviderCard'
import EmptyState from '../components/EmptyState'
import { categories, locations } from '../data/categories'
import { useApp } from '../context/AppContext'
import { searchEngine, suggestionCategories } from '../lib/smartSearch'
import { averageRating, toBn } from '../lib/utils'

const ratingOptions = [
  { value: '', label: 'যেকোনো রেটিং' },
  { value: '3', label: '৩+ তারকা' },
  { value: '4', label: '৪+ তারকা' },
  { value: '4.5', label: '৪.৫+ তারকা' },
]

const sortOptions = [
  { value: 'rating', label: 'সর্বোচ্চ রেটিং' },
  { value: 'experience', label: 'বেশি অভিজ্ঞতা' },
  { value: 'newest', label: 'নতুন যোগ দিয়েছেন' },
]

export default function ExplorePage() {
  const { publicProviders } = useApp()
  const [searchParams, setSearchParams] = useSearchParams()

  const q = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? ''
  const location = searchParams.get('location') ?? ''
  const minRating = searchParams.get('rating') ?? ''
  const sort = searchParams.get('sort') ?? 'rating'

  const intent = useMemo(() => (q ? searchEngine.detectIntent(q) : null), [q])

  const updateFilters = (changes: Record<string, string>) => {
    const next = new URLSearchParams(searchParams)
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value)
      else next.delete(key)
    }
    setSearchParams(next)
  }

  const handleSmartSearch = (text: string, loc: string) => {
    const detected = searchEngine.detectIntent(text)
    updateFilters({
      q: text,
      location: loc,
      category: detected.categoryId ?? '',
      rating: '',
      sort: '',
    })
  }

  const clearAll = () => setSearchParams(new URLSearchParams())

  const results = useMemo(() => {
    const filtered = publicProviders.filter((provider) => {
      if (category && provider.categoryId !== category) return false
      if (location && provider.location !== location) return false
      if (minRating && averageRating(provider) < Number(minRating)) return false

      if (q) {
        // When intent is detected, trust the category match only — this keeps
        // results focused instead of pulling in unrelated keyword overlaps.
        if (intent?.categoryId) {
          if (provider.categoryId !== intent.categoryId) return false
        } else {
          const haystack = [
            provider.name,
            provider.profession,
            provider.description,
            ...provider.skills,
            ...provider.services,
          ].join(' ').toLowerCase()
          const needle = q.toLowerCase()
          const words = needle.split(/\s+/).filter((word) => word.length > 2)
          const textMatch = haystack.includes(needle) || words.some((word) => haystack.includes(word))
          if (!textMatch) return false
        }
      }
      return true
    })

    return filtered.sort((a, b) => {
      if (sort === 'experience') return b.experience - a.experience
      if (sort === 'newest') return b.createdAt.localeCompare(a.createdAt)
      return averageRating(b) - averageRating(a)
    })
  }, [publicProviders, category, location, minRating, q, intent, sort])

  const activeFilterCount = [q, category, location, minRating].filter(Boolean).length

  return (
    <div className="container-content py-10 sm:py-12">
      <nav className="text-xs text-slate-500" aria-label="ব্রেডক্রাম্ব">
        <Link to="/" className="hover:text-emerald-700">হোম</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">সেবা খুঁজুন</span>
      </nav>

      <div className="mt-4">
        <h1 className="section-title">সেবা খুঁজুন</h1>
        <p className="mt-2 text-sm text-slate-600">
          নাম, ক্যাটাগরি বা সাধারণ ভাষায় সমস্যা লিখে রাজশাহীর সেবাদাতাদের খুঁজে নিন।
        </p>
      </div>

      <div className="mt-6">
        <SearchBar
          key={`${q}-${location}`}
          variant="inline"
          onSearch={handleSmartSearch}
          initialQuery={q}
          initialLocation={location}
          showSmartHint
        />
      </div>

      {/* Smart search feedback */}
      {q && intent && (
        intent.categoryId ? (
          <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <Sparkles className="h-4 w-4 shrink-0 text-emerald-700" />
            <span>
              স্মার্ট সার্চে শনাক্ত হয়েছে: <strong>{intent.detectedLabel}</strong> ক্যাটাগরি।
            </span>
            <span className="text-xs text-emerald-700">(কীওয়ার্ড-ভিত্তিক অনুসন্ধান—কোনো এআই মডেল নয়)</span>
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <p className="flex items-center gap-2 font-semibold">
              <Sparkles className="h-4 w-4 text-amber-600" />
              আমরা আপনার অনুসন্ধানটি বুঝতে পারিনি। নিচের ক্যাটাগরিগুলো থেকে বেছে নিন:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestionCategories.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => updateFilters({ category: item.id })}
                  className="rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-800 transition hover:bg-amber-100"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )
      )}

      {/* Filters */}
      <div className="card mt-5 p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="inline-flex items-center gap-2 text-sm font-bold text-navy">
            <SlidersHorizontal className="h-4 w-4 text-emerald-600" /> ফিল্টার
          </h2>
          {activeFilterCount > 0 && (
            <button type="button" onClick={clearAll} className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:underline">
              <RotateCcw className="h-3.5 w-3.5" /> সব ফিল্টার বাতিল করুন ({toBn(activeFilterCount)})
            </button>
          )}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="label" htmlFor="category-filter">ক্যাটাগরি</label>
            <select id="category-filter" className="input" value={category} onChange={(e) => updateFilters({ category: e.target.value })}>
              <option value="">সব ক্যাটাগরি</option>
              {categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="location-filter">অবস্থান</label>
            <select id="location-filter" className="input" value={location} onChange={(e) => updateFilters({ location: e.target.value })}>
              <option value="">সব অঞ্চল</option>
              {locations.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="rating-filter">সর্বনিম্ন রেটিং</label>
            <select id="rating-filter" className="input" value={minRating} onChange={(e) => updateFilters({ rating: e.target.value })}>
              {ratingOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="sort-filter">সাজান</label>
            <select id="sort-filter" className="input" value={sort} onChange={(e) => updateFilters({ sort: e.target.value })}>
              {sortOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-7 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">
          <ListFilter className="mr-1.5 inline h-4 w-4 text-emerald-600" />
          {toBn(results.length)}জন সেবাদাতা পাওয়া গেছে
        </p>
      </div>

      {results.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((provider) => <ProviderCard key={provider.id} provider={provider} />)}
        </div>
      ) : (
        <div className="mt-4">
          <EmptyState
            title="কোনো সেবাদাতা পাওয়া যায়নি"
            description="আপনার বেছে নেওয়া ফিল্টার-এ কেউ মেলেনি। অবস্থান বা রেটিং পরিবর্তন করে আবার চেষ্টা করুন, অথবা সব ফিল্টার বাতিল করুন।"
            action={
              <button type="button" onClick={clearAll} className="btn-primary">
                <X className="h-4 w-4" /> সব ফিল্টার বাতিল করুন
              </button>
            }
          />
        </div>
      )}
    </div>
  )
}
