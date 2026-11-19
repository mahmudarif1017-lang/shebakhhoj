import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  MapPin,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  UserCheck,
  Users,
} from 'lucide-react'
import SearchBar from '../components/SearchBar'
import CategoryCard from '../components/CategoryCard'
import ProviderCard from '../components/ProviderCard'
import StatusBadge from '../components/StatusBadge'
import { categories } from '../data/categories'
import { useApp } from '../context/AppContext'
import { averageRating, toBn } from '../lib/utils'

const steps = [
  {
    icon: Search,
    title: 'প্রয়োজনীয় সেবা খুঁজুন',
    text: 'সাধারণ ভাষায় আপনার সমস্যা লিখুন বা ক্যাটাগরি বেছে নিন।',
  },
  {
    icon: UserCheck,
    title: 'পছন্দের সেবাদাতার প্রোফাইল দেখুন',
    text: 'অভিজ্ঞতা, দক্ষতা ও রিভিউ দেখে সঠিক মানুষটি বেছে নিন।',
  },
  {
    icon: PhoneCall,
    title: 'সরাসরি যোগাযোগ করুন',
    text: 'যোগাযোগের তথ্য দেখে কথা বলুন এবং কাজের বিষয় ঠিক করুন।',
  },
]

export default function HomePage() {
  const navigate = useNavigate()
  const { publicProviders } = useApp()

  const popular = [...publicProviders]
    .sort((a, b) => averageRating(b) - averageRating(a))
    .slice(0, 6)

  const spotlight = popular[0]

  const handleSearch = (query: string, location: string) => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (location) params.set('location', location)
    navigate(`/services${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="container-content relative grid gap-12 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-20">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-emerald-100">
              <MapPin className="h-3.5 w-3.5" /> রাজশাহীর জন্য তৈরি
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-[1.25] tracking-tight sm:text-4xl lg:text-[2.9rem]">
              আপনার এলাকার নির্ভরযোগ্য সেবা,{' '}
              <span className="text-emerald-300">এখন হাতের মুঠোয়।</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              ইলেকট্রিশিয়ান থেকে গৃহশিক্ষক—আপনার প্রয়োজনীয় দক্ষ সেবাদাতা খুঁজুন সহজেই।
            </p>

            <div className="mt-7 max-w-2xl">
              <SearchBar onSearch={handleSearch} showSmartHint />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-300" /> যাচাইকৃত প্রোফাইল</span>
              <span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-emerald-300" /> {toBn(publicProviders.length)}+ সেবাদাতা</span>
              <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-emerald-300" /> সহজ স্মার্ট সার্চ</span>
            </div>
          </div>

          {/* Spotlight card */}
          {spotlight && (
            <div className="relative mx-auto w-full max-w-sm animate-fade-up lg:mx-0">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur">
                <div className="rounded-xl bg-white p-5 text-slate-900 shadow-float">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">জনপ্রিয় সেবাদাতা</span>
                    <StatusBadge status={spotlight.verification} />
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy-50 text-2xl">
                      {spotlight.photo ? (
                        <img src={spotlight.photo} alt={spotlight.name} className="h-full w-full rounded-xl object-cover" />
                      ) : (
                        <span aria-hidden="true">{spotlight.avatar}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-bold text-navy">{spotlight.name}</p>
                      <p className="truncate text-sm text-slate-600">{spotlight.profession}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
                    <span className="inline-flex items-center gap-1.5 text-slate-600">
                      <MapPin className="h-4 w-4 text-emerald-600" /> {spotlight.location}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-navy">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {spotlight.reviews.length ? averageRating(spotlight).toFixed(1) : 'নতুন'}
                    </span>
                  </div>
                  <Link to={`/provider/${spotlight.id}`} className="btn-primary mt-4 w-full !py-2.5">
                    প্রোফাইল দেখুন <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-navy shadow-soft sm:inline-flex">
                <BadgeCheck className="h-4 w-4 text-emerald-600" /> ডেমো ডাটা দিয়ে তৈরি
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────── */}
      <section className="container-content py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="section-title">আপনার প্রয়োজনীয় সেবা খুঁজুন</h2>
            <p className="mt-2 text-sm text-slate-600">ছয়টি ক্যাটাগরিতে রাজশাহীর দক্ষ সেবাদাতাদের খুঁজে নিন।</p>
          </div>
          <Link to="/services" className="btn-ghost self-start">
            সব সেবা দেখুন <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* ── Popular providers ────────────────────────────── */}
      <section className="border-y border-slate-200 bg-white py-16">
        <div className="container-content">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="section-title">জনপ্রিয় সেবাদাতা</h2>
              <p className="mt-2 text-sm text-slate-600">রিভিউ ও অভিজ্ঞতার ভিত্তিতে কয়েকজন সেবাদাতা—ডেমো প্রোফাইল।</p>
            </div>
            <Link to="/services" className="btn-ghost self-start">
              আরও দেখুন <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Provider CTA ─────────────────────────────────── */}
      <section className="container-content py-16">
        <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-12 text-center text-white sm:px-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-2xl" />
          <div className="relative">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Sparkles className="h-6 w-6 text-emerald-300" />
            </span>
            <h2 className="mt-5 text-2xl font-bold sm:text-3xl">আপনিও কি একজন দক্ষ সেবাদাতা?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-300">
              ShebaKhoj-এ নিজের প্রোফাইল তৈরি করুন এবং পৌঁছে যান নতুন গ্রাহকের কাছে।
            </p>
            <Link to="/register" className="btn-accent mt-7">
              সেবাদাতা হিসেবে যোগ দিন <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="container-content pb-4">
        <div className="text-center">
          <h2 className="section-title">কীভাবে কাজ করে</h2>
          <p className="mt-2 text-sm text-slate-600">মাত্র তিন ধাপে আপনার প্রয়োজনীয় সেবা পেয়ে যান।</p>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="card p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <step.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold text-slate-300">ধাপ {toBn(index + 1)}</span>
              </div>
              <h3 className="mt-4 font-bold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
