import { useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { categoryName } from '../data/categories'
import { StarInput, StarRating } from '../components/StarRating'
import StatusBadge from '../components/StatusBadge'
import DemoNotice from '../components/DemoNotice'
import EmptyState from '../components/EmptyState'
import {
  averageRating,
  formatDate,
  isValidBangladeshPhone,
  telLink,
  toBn,
  whatsappLink,
} from '../lib/utils'

export default function ProviderProfilePage() {
  const { id } = useParams()
  const { providers, addReview } = useApp()

  const provider = providers.find((item) => item.id === id)

  const [customerName, setCustomerName] = useState('')
  const [rating, setRating] = useState(0)
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  if (!provider) {
    return (
      <div className="container-content py-14">
        <EmptyState
          title="প্রোফাইল পাওয়া যায়নি"
          description="আপনি যে প্রোফাইলটি খুঁজছেন তা নেই। হয়তো লিংকটি ভুল বা প্রোফাইলটি প্রত্যাখ্যাত হয়েছে।"
          action={<Link to="/services" className="btn-primary">সেবা খুঁজুন</Link>}
        />
      </div>
    )
  }

  const ratingValue = averageRating(provider)
  const hasContact = Boolean(provider.phone && isValidBangladeshPhone(provider.phone))

  const submitReview = (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (customerName.trim().length < 2) {
      setError('আপনার নাম দিন (কমপক্ষে ২ অক্ষর)।')
      return
    }
    if (rating < 1) {
      setError('অনুগ্রহ করে তারকা রেটিং দিন।')
      return
    }
    if (text.trim().length < 10) {
      setError('রিভিউ কমপক্ষে ১০ অক্ষরের হতে হবে।')
      return
    }

    addReview(provider.id, { customerName, rating, text })
    setCustomerName('')
    setRating(0)
    setText('')
    setSuccess('ধন্যবাদ! আপনার রিভিউ জমা হয়েছে এবং গড় রেটিং আপডেট হয়েছে।')
  }

  return (
    <div className="container-content py-8 sm:py-10">
      <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-emerald-700">
        <ArrowLeft className="h-4 w-4" /> সেবা খুঁজুন
      </Link>

      {/* Profile header */}
      <section className="card mt-5 overflow-hidden">
        <div className="h-20 bg-gradient-to-r from-navy to-navy-700 sm:h-24" />
        <div className="px-5 pb-6 sm:px-7">
          <div className="-mt-10 flex flex-col gap-4 sm:-mt-12 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-navy-50 text-5xl shadow-soft">
                {provider.photo ? (
                  <img src={provider.photo} alt={provider.name} className="h-full w-full object-cover" />
                ) : (
                  <span aria-hidden="true">{provider.avatar}</span>
                )}
              </div>
              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold text-navy">{provider.name}</h1>
                  {provider.isDemo && <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-500">ডেমো প্রোফাইল</span>}
                </div>
                <p className="mt-0.5 text-sm font-medium text-slate-600">{provider.profession} · {categoryName(provider.categoryId)}</p>
              </div>
            </div>
            <StatusBadge status={provider.verification} className="self-start sm:self-auto" />
          </div>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-100 pt-5 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-emerald-600" /> {provider.location}, রাজশাহী</span>
            <span className="inline-flex items-center gap-2"><BriefcaseBusiness className="h-4 w-4 text-emerald-600" /> {toBn(provider.experience)} বছর অভিজ্ঞতা</span>
            <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-emerald-600" /> যোগ দিয়েছেন {formatDate(provider.createdAt)}</span>
            <span className="inline-flex items-center gap-2">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <strong className="text-navy">{provider.reviews.length ? ratingValue.toFixed(1) : 'নতুন'}</strong>
              <span className="text-xs">({toBn(provider.reviews.length)} রিভিউ)</span>
            </span>
          </div>

          {provider.verification === 'verified' && provider.isDemo && (
            <p className="mt-4 flex items-start gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs leading-5 text-emerald-800">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              এই যাচাইকৃত ব্যাজটি শুধু ডেমো—কোনো বাস্তব পরিচয় যাচাই নয়।
            </p>
          )}
          {provider.verification === 'pending' && (
            <p className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              এই প্রোফাইলটি অনুমোদনের অপেক্ষায় আছে। ডেমো অ্যাডমিন প্যানেল থেকে অনুমোদন করা হলে যাচাইকৃত ব্যাজ দেখা যাবে।
            </p>
          )}
        </div>
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          {/* About */}
          <section className="card p-5 sm:p-6">
            <h2 className="text-lg font-bold text-navy">সংক্ষিপ্ত পরিচিতি</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{provider.description || 'এই প্রোফাইলে এখনো বিবরণ যোগ করা হয়নি।'}</p>
          </section>

          {/* Skills & services */}
          <section className="card p-5 sm:p-6">
            <h2 className="text-lg font-bold text-navy">দক্ষতা ও সেবা</h2>
            <h3 className="mt-4 text-sm font-semibold text-slate-700">দক্ষতা</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {provider.skills.length ? provider.skills.map((skill) => (
                <span key={skill} className="chip">{skill}</span>
              )) : <span className="text-sm text-slate-500">কোনো দক্ষতা যোগ করা হয়নি।</span>}
            </div>
            <h3 className="mt-5 text-sm font-semibold text-slate-700">প্রদত্ত সেবা</h3>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {provider.services.length ? provider.services.map((service) => (
                <li key={service} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> {service}
                </li>
              )) : <li className="text-sm text-slate-500">কোনো সেবা তালিকাভুক্ত হয়নি।</li>}
            </ul>
          </section>

          {/* Gallery */}
          <section className="card p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-navy">কাজের নমুনা</h2>
              <Camera className="h-4 w-4 text-slate-400" />
            </div>
            {provider.gallery.length ? (
              <>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {provider.gallery.map((item, index) => (
                    <div key={`${item}-${index}`} className="flex h-28 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 p-3 text-center">
                      <Camera className="h-6 w-6 text-slate-400" />
                      <span className="mt-2 text-xs font-medium text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>
                {provider.isDemo && <p className="mt-2 text-xs text-slate-400">এগুলো ডেমো স্থানধারক ছবি—বাস্তব কাজের নমুনা নয়।</p>}
              </>
            ) : (
              <p className="mt-3 text-sm text-slate-500">এই প্রোফাইলে এখনো কাজের নমুনা যোগ করা হয়নি।</p>
            )}
          </section>
        </div>

        {/* Sidebar: contact */}
        <aside className="space-y-5">
          <section className="card p-5 sm:p-6">
            <h2 className="text-lg font-bold text-navy">যোগাযোগ করুন</h2>
            {hasContact ? (
              <>
                <p className="mt-2 text-sm text-slate-600">সরাসরি কথা বলে আপনার কাজের বিষয়টি ঠিক করে নিন।</p>
                <div className="mt-4 space-y-3">
                  <a href={telLink(provider.phone)} className="btn-primary w-full">
                    <Phone className="h-4 w-4" /> ফোন করুন
                  </a>
                  <a
                    href={whatsappLink(provider.phone, `আসসালামু আলাইকুম, ${provider.name} Sir, আপনার সেবা নিয়ে কথা বলতে চাই।`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-accent w-full"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp-এ যোগাযোগ করুন
                  </a>
                </div>
                <p className="mt-4 break-all rounded-lg bg-slate-50 px-3 py-2 text-center text-sm font-semibold text-navy" dir="ltr">
                  {provider.phone}
                </p>
              </>
            ) : (
              <>
                <DemoNotice className="!bg-slate-50 !text-slate-600 !border-slate-200">
                  এটি একটি ডেমো প্রোফাইল। কোনো বাস্তব ফোন নম্বর দেওয়া হয়নি, তাই ফোন ও WhatsApp বাটন কাজ করবে না।
                </DemoNotice>
                <div className="mt-4 space-y-3">
                  <button type="button" disabled className="btn-primary w-full !opacity-50" title="ডেমো প্রোফাইলে ফোন নম্বর নেই">
                    <Phone className="h-4 w-4" /> ফোন করুন
                  </button>
                  <button type="button" disabled className="btn-accent w-full !opacity-50" title="ডেমো প্রোফাইলে ফোন নম্বর নেই">
                    <MessageCircle className="h-4 w-4" /> WhatsApp-এ যোগাযোগ করুন
                  </button>
                </div>
              </>
            )}
          </section>

          <section className="card p-5 sm:p-6">
            <h2 className="text-sm font-bold text-navy">রেটিং সারাংশ</h2>
            {provider.reviews.length ? (
              <>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-4xl font-bold text-navy">{ratingValue.toFixed(1)}</span>
                  <div>
                    <StarRating value={ratingValue} />
                    <p className="mt-1 text-xs text-slate-500">{toBn(provider.reviews.length)}টি রিভিউ</p>
                  </div>
                </div>
              </>
            ) : (
              <p className="mt-3 text-sm text-slate-500">এখনো কোনো রিভিউ নেই। প্রথম রিভিউটি আপনি দিন।</p>
            )}
          </section>
        </aside>
      </div>

      {/* Reviews */}
      <section className="card mt-5 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-navy">গ্রাহকের রিভিউ</h2>
          <span className="text-sm text-slate-500">{toBn(provider.reviews.length)}টি মতামত</span>
        </div>
        <DemoNotice className="mt-4">
          এই MVP-র রিভিউগুলো শুধু ডেমো জমা। এগুলো কোনো কেনাকাটা বা সম্পন্ন কাজের সত্যায়িত প্রমাণ নয়—ব্যবহারকারী নিজেরা জমা করেন।
        </DemoNotice>

        <div className="mt-5 space-y-3">
          {provider.reviews.length ? provider.reviews.map((review) => (
            <div key={review.id} className="rounded-xl border border-slate-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-50 text-sm font-bold text-navy">
                    {review.customerName.charAt(0)}
                  </span>
                  <span className="text-sm font-semibold text-navy">{review.customerName}</span>
                  {review.isDemo && <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">ডেমো</span>}
                </div>
                <span className="text-xs text-slate-400">{formatDate(review.createdAt)}</span>
              </div>
              <div className="mt-2"><StarRating value={review.rating} size="sm" /></div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{review.text}</p>
            </div>
          )) : (
            <p className="text-sm text-slate-500">এখনো কোনো রিভিউ নেই।</p>
          )}
        </div>

        {/* Review form */}
        <div className="mt-7 border-t border-slate-200 pt-6">
          <h3 className="text-base font-bold text-navy">রিভিউ দিন</h3>
          <p className="mt-1 text-xs text-slate-500">আপনার মতামত এই প্রোফাইলে ডেমো হিসেবে যোগ হবে।</p>
          <form onSubmit={submitReview} className="mt-4 max-w-2xl space-y-4">
            <div>
              <label htmlFor="review-name" className="label">আপনার নাম *</label>
              <input id="review-name" className="input" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="যেমন: রাহিম" />
            </div>
            <div>
              <span className="label">রেটিং *</span>
              <StarInput value={rating} onChange={(value) => { setRating(value); setError('') }} />
            </div>
            <div>
              <label htmlFor="review-text" className="label">আপনার মতামত *</label>
              <textarea id="review-text" rows={4} className="input resize-y" value={text} onChange={(e) => setText(e.target.value)} placeholder="সেবাটি কেমন ছিল? কমপক্ষে ১০ অক্ষর লিখুন..." />
            </div>
            {error && <p className="field-error" role="alert">{error}</p>}
            {success && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700" role="status">{success}</p>}
            <button type="submit" className="btn-primary">রিভিউ জমা দিন</button>
          </form>
        </div>
      </section>
    </div>
  )
}
