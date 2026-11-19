import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Check,
  CheckCircle2,
  Clock3,
  Eye,
  MessageSquareText,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { categoryName } from '../data/categories'
import StatusBadge from '../components/StatusBadge'
import DemoNotice from '../components/DemoNotice'
import { formatDate, toBn } from '../lib/utils'
import type { VerificationStatus } from '../types'

export default function AdminPage() {
  const { providers, setVerification } = useApp()
  const [message, setMessage] = useState('')

  const pending = providers.filter((provider) => provider.verification === 'pending')
  const verified = providers.filter((provider) => provider.verification === 'verified').length
  const rejected = providers.filter((provider) => provider.verification === 'rejected').length
  const allReviews = providers.flatMap((provider) => provider.reviews)

  const act = (id: string, name: string, status: VerificationStatus) => {
    setVerification(id, status)
    const labels: Record<VerificationStatus, string> = {
      verified: 'অনুমোদন',
      rejected: 'প্রত্যাখ্যাত',
      pending: 'অপেক্ষামান',
    }
    setMessage(`${name} প্রোফাইলটি ${labels[status]} হয়েছে। (ডেমো অ্যাকশন)`)
  }

  const stats = [
    { label: 'মোট সেবাদাতা', value: providers.length, icon: Users, color: 'text-navy' },
    { label: 'যাচাইকৃত', value: verified, icon: CheckCircle2, color: 'text-emerald-600' },
    { label: 'অপেক্ষামান', value: pending.length, icon: Clock3, color: 'text-amber-600' },
    { label: 'মোট রিভিউ', value: allReviews.length, icon: MessageSquareText, color: 'text-indigo-600' },
  ]

  return (
    <div className="container-content py-10 sm:py-12">
      <nav className="text-xs text-slate-500" aria-label="ব্রেডক্রাম্ব">
        <Link to="/" className="hover:text-emerald-700">হোম</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">ডেমো অ্যাডমিন</span>
      </nav>

      <div className="mt-4 flex items-start gap-4">
        <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy sm:inline-flex">
          <ShieldCheck className="h-6 w-6" />
        </span>
        <div>
          <h1 className="section-title">অ্যাডমিন ডেমো প্যানেল</h1>
          <p className="mt-2 text-sm text-slate-600">নিবন্ধন, অনুমোদন ও রিভিউ—সবকিছুর ডেমো ব্যবস্থাপনা।</p>
        </div>
      </div>

      <DemoNotice className="mt-6">
        <strong>গুরুত্বপূর্ণ:</strong> এটি একটি প্রোটোটাইপ অ্যাডমিন প্যানেল—কোনো নিরাপদ লগইন বা প্রমাণীকরণ নেই। এখানকার অনুমোদন কোনো বাস্তব পরিচয় যাচাই নয়, শুধু ডেমো অবস্থা পরিবর্তন।
      </DemoNotice>

      {message && (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800" role="status">
          <span>{message}</span>
          <button type="button" onClick={() => setMessage('')} className="text-xs font-semibold hover:underline">বন্ধ</button>
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">{stat.label}</span>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <p className="mt-2 text-2xl font-bold text-navy">{toBn(stat.value)}</p>
          </div>
        ))}
      </div>

      {/* Pending */}
      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-lg font-bold text-navy">
          <Clock3 className="h-5 w-5 text-amber-600" /> অনুমোদনের অপেক্ষায় ({toBn(pending.length)})
        </h2>
        {pending.length ? (
          <div className="mt-4 space-y-3">
            {pending.map((provider) => (
              <div key={provider.id} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-navy-50 text-xl">
                    {provider.photo ? <img src={provider.photo} alt="" className="h-full w-full object-cover" /> : <span>{provider.avatar}</span>}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-bold text-navy">{provider.name}</p>
                    <p className="truncate text-xs text-slate-600">{provider.profession} · {categoryName(provider.categoryId)} · {provider.location}</p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Link to={`/provider/${provider.id}`} className="btn-outline !px-3 !py-2"><Eye className="h-4 w-4" /> দেখুন</Link>
                  <button type="button" onClick={() => act(provider.id, provider.name, 'verified')} className="btn-accent !px-3 !py-2"><Check className="h-4 w-4" /> অনুমোদন</button>
                  <button type="button" onClick={() => act(provider.id, provider.name, 'rejected')} className="btn-outline !border-red-200 !px-3 !py-2 !text-red-600"><X className="h-4 w-4" /> প্রত্যাখ্যান</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card mt-4 p-6 text-center text-sm text-slate-600">কোনো অপেক্ষামান নিবন্ধন নেই।</div>
        )}
      </section>

      {/* All providers */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-lg font-bold text-navy">
          <Users className="h-5 w-5 text-emerald-600" /> সব সেবাদাতা ({toBn(providers.length)})
        </h2>
        <div className="card mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">নাম</th>
                <th className="px-4 py-3 font-semibold">পেশা</th>
                <th className="px-4 py-3 font-semibold">অবস্থান</th>
                <th className="px-4 py-3 font-semibold">অবস্থা</th>
                <th className="px-4 py-3 font-semibold">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {providers.map((provider) => (
                <tr key={provider.id}>
                  <td className="px-4 py-3">
                    <Link to={`/provider/${provider.id}`} className="font-semibold text-navy hover:underline">{provider.name}</Link>
                    {provider.isDemo && <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">ডেমো</span>}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{provider.profession}</td>
                  <td className="px-4 py-3 text-slate-600">{provider.location}</td>
                  <td className="px-4 py-3"><StatusBadge status={provider.verification} /></td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {provider.verification !== 'verified' && (
                        <button type="button" onClick={() => act(provider.id, provider.name, 'verified')} className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100">অনুমোদন</button>
                      )}
                      {provider.verification !== 'rejected' && (
                        <button type="button" onClick={() => act(provider.id, provider.name, 'rejected')} className="rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100">প্রত্যাখ্যান</button>
                      )}
                      {provider.verification === 'rejected' && (
                        <button type="button" onClick={() => act(provider.id, provider.name, 'pending')} className="rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-100">পুনরায় অপেক্ষামান</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reviews */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-lg font-bold text-navy">
          <MessageSquareText className="h-5 w-5 text-indigo-600" /> জমা দেওয়া রিভিউ ({toBn(allReviews.length)})
        </h2>
        <p className="mt-1 text-xs text-slate-500">এগুলো ডেমো জমা—কোনো কেনাকাটা বা সম্পন্ন কাজের সত্যায়িত প্রমাণ নয়।</p>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {allReviews.slice(0, 30).map((review) => {
            const provider = providers.find((item) => item.id === review.providerId)
            return (
              <div key={review.id} className="card p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-navy">{review.customerName}</span>
                  <span className="text-xs font-semibold text-amber-600">{toBn(review.rating)}/৫</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {provider?.name ?? 'অজানা'} · {formatDate(review.createdAt)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{review.text}</p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
