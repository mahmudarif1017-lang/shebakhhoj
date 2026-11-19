import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, CheckCircle2, ImagePlus, ShieldCheck, UserPlus } from 'lucide-react'
import { categories, locations } from '../data/categories'
import { useApp } from '../context/AppContext'
import DemoNotice from '../components/DemoNotice'
import type { Provider, RegistrationInput } from '../types'
import { isValidBangladeshPhone } from '../lib/utils'

type Errors = Partial<Record<keyof RegistrationInput | 'photo', string>>

const emptyForm: RegistrationInput = {
  name: '',
  phone: '',
  profession: '',
  categoryId: '',
  location: '',
  experience: 0,
  description: '',
  skills: [],
  photo: '',
}

export default function RegisterPage() {
  const { registerProvider } = useApp()
  const [form, setForm] = useState<RegistrationInput>(emptyForm)
  const [skillsInput, setSkillsInput] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState<Provider | null>(null)

  const setField = <K extends keyof RegistrationInput>(key: K, value: RegistrationInput[K]) => {
    setForm((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => ({ ...previous, [key]: undefined }))
  }

  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setErrors((previous) => ({ ...previous, photo: 'শুধু ছবি ফাইল আপলোড করুন।' }))
      return
    }
    if (file.size > 1_500_000) {
      setErrors((previous) => ({ ...previous, photo: 'ছবির আকার ১.৫ MB-এর কম হতে হবে।' }))
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setField('photo', String(reader.result ?? ''))
    }
    reader.readAsDataURL(file)
  }

  const validate = (): Errors => {
    const next: Errors = {}
    if (form.name.trim().length < 2) next.name = 'পুরো নাম দিন (কমপক্ষে ২ অক্ষর)।'
    if (!isValidBangladeshPhone(form.phone)) next.phone = 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন ০১৭১২৩৪৫৬৭৮)।'
    if (form.profession.trim().length < 2) next.profession = 'পেশা লিখুন (যেমন: ইলেকট্রিশিয়ান)।'
    if (!form.categoryId) next.categoryId = 'একটি সেবা ক্যাটাগরি বেছে নিন।'
    if (!form.location) next.location = 'আপনার অবস্থান বেছে নিন।'
    if (!Number.isFinite(form.experience) || form.experience < 0 || form.experience > 60) {
      next.experience = '০ থেকে ৬০-এর মধ্যে অভিজ্ঞতা লিখুন।'
    }
    if (form.description.trim().length < 20) next.description = 'কমপক্ষে ২০ অক্ষরের সংক্ষিপ্ত বিবরণ লিখুন।'
    if (skillsInput.split(',').map((skill) => skill.trim()).filter(Boolean).length === 0) {
      next.skills = 'কমপক্ষে একটি দক্ষতা লিখুন (কমা দিয়ে আলাদা করুন)।'
    }
    return next
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const skills = skillsInput.split(',').map((skill) => skill.trim()).filter(Boolean)
    const provider = registerProvider({ ...form, experience: Number(form.experience), skills })
    setSubmitted(provider)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const reset = () => {
    setForm(emptyForm)
    setSkillsInput('')
    setErrors({})
    setSubmitted(null)
  }

  if (submitted) {
    return (
      <div className="container-content py-14 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="card p-8 text-center sm:p-10">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-9 w-9" />
            </span>
            <h1 className="mt-6 text-2xl font-bold text-navy">আপনার প্রোফাইল তৈরি হয়েছে!</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              অভিনন্দন {submitted.name}! আপনার তথ্য এই ব্রাউজারে (localStorage) সংরক্ষিত হয়েছে। প্রোফাইলটি এখন{' '}
              <strong>অনুমোদনের অপেক্ষায়</strong>—এখনো যাচাইকৃত নয়।
            </p>
            <DemoNotice className="mt-5 text-left">
              এটি একটি ডেমো প্রোটোটাইপ। ডেমো অ্যাডমিন প্যানেল থেকে অনুমোদন করলেই প্রোফাইলে যাচাইকৃত ব্যাজ দেখা যাবে। কোনো বাস্তব পরিচয় যাচাই হয় না।
            </DemoNotice>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to={`/provider/${submitted.id}`} className="btn-primary">
                আমার প্রোফাইল দেখুন <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/services" className="btn-outline">সেবা খুঁজুন</Link>
            </div>
            <button type="button" onClick={reset} className="btn-ghost mt-3">নতুন প্রোফাইল তৈরি করুন</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-content py-10 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <nav className="text-xs text-slate-500" aria-label="ব্রেডক্রাম্ব">
          <Link to="/" className="hover:text-emerald-700">হোম</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-700">সেবাদাতা হিসেবে যোগ দিন</span>
        </nav>

        <div className="mt-4 flex items-start gap-4">
          <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 sm:inline-flex">
            <UserPlus className="h-6 w-6" />
          </span>
          <div>
            <h1 className="section-title">সেবাদাতা হিসেবে যোগ দিন</h1>
            <p className="mt-2 text-sm text-slate-600">
              নিজের প্রোফাইল তৈরি করুন এবং রাজশাহীর নতুন গ্রাহকের কাছে পৌঁছে যান।
            </p>
          </div>
        </div>

        <DemoNotice className="mt-6">
          এটি একটি ডেমো ফর্ম। আপনার দেওয়া তথ্য শুধু এই ব্রাউজারে সংরক্ষিত হয়—কোনো সার্ভারে যায় না। নতুন প্রোফাইল সবসময় <strong>অনুমোদনের অপেক্ষায়</strong> থাকে।
        </DemoNotice>

        <form onSubmit={submit} className="card mt-6 space-y-6 p-5 sm:p-7" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="label">পুরো নাম *</label>
              <input id="name" className="input" value={form.name} onChange={(e) => setField('name', e.target.value)} placeholder="যেমন: আব্দুল হক" />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>
            <div>
              <label htmlFor="phone" className="label">মোবাইল নম্বর *</label>
              <input id="phone" type="tel" dir="ltr" className="input" value={form.phone} onChange={(e) => setField('phone', e.target.value)} placeholder="01712345678" />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>
            <div>
              <label htmlFor="profession" className="label">পেশা *</label>
              <input id="profession" className="input" value={form.profession} onChange={(e) => setField('profession', e.target.value)} placeholder="যেমন: ইলেকট্রিশিয়ান" />
              {errors.profession && <span className="field-error">{errors.profession}</span>}
            </div>
            <div>
              <label htmlFor="categoryId" className="label">সেবা ক্যাটাগরি *</label>
              <select id="categoryId" className="input" value={form.categoryId} onChange={(e) => setField('categoryId', e.target.value)}>
                <option value="">ক্যাটাগরি বেছে নিন</option>
                {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
              {errors.categoryId && <span className="field-error">{errors.categoryId}</span>}
            </div>
            <div>
              <label htmlFor="location" className="label">অবস্থান (রাজশাহী) *</label>
              <select id="location" className="input" value={form.location} onChange={(e) => setField('location', e.target.value)}>
                <option value="">অঞ্চল বেছে নিন</option>
                {locations.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
              {errors.location && <span className="field-error">{errors.location}</span>}
            </div>
            <div>
              <label htmlFor="experience" className="label">অভিজ্ঞতা (বছর) *</label>
              <input id="experience" type="number" min={0} max={60} className="input" value={form.experience} onChange={(e) => setField('experience', Number(e.target.value))} />
              {errors.experience && <span className="field-error">{errors.experience}</span>}
            </div>
          </div>

          <div>
            <label htmlFor="description" className="label">সংক্ষিপ্ত বিবরণ *</label>
            <textarea id="description" rows={4} className="input resize-y" value={form.description} onChange={(e) => setField('description', e.target.value)} placeholder="আপনার কাজ, অভিজ্ঞতা ও বিশেষত্ব সম্পর্কে কয়েকটি বাক্য লিখুন..." />
            {errors.description && <span className="field-error">{errors.description}</span>}
          </div>

          <div>
            <label htmlFor="skills" className="label">দক্ষতা *</label>
            <input id="skills" className="input" value={skillsInput} onChange={(e) => { setSkillsInput(e.target.value); setErrors((prev) => ({ ...prev, skills: undefined })) }} placeholder="যেমন: তারের কাজ, সুইচবোর্ড, ফ্যান ফিটিং" />
            <p className="mt-1.5 text-xs text-slate-500">কমা (,) দিয়ে একাধিক দক্ষতা আলাদা করুন।</p>
            {errors.skills && <span className="field-error">{errors.skills}</span>}
          </div>

          <div>
            <label htmlFor="photo" className="label">প্রোফাইল ছবি (ঐচ্ছিক)</label>
            <label htmlFor="photo" className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center transition hover:border-emerald-400 hover:bg-emerald-50/40">
              {form.photo ? (
                <img src={form.photo} alt="প্রোফাইল প্রিভিউ" className="h-20 w-20 rounded-full object-cover" />
              ) : (
                <ImagePlus className="h-7 w-7 text-slate-400" />
              )}
              <span className="mt-2 text-sm font-medium text-slate-600">{form.photo ? 'ছবি বদলান' : 'ছবি আপলোড করুন'}</span>
              <span className="mt-0.5 text-xs text-slate-400">JPG/PNG, সর্বোচ্চ ১.৫ MB</span>
            </label>
            <input id="photo" type="file" accept="image/*" className="sr-only" onChange={handlePhoto} />
            {errors.photo && <span className="field-error">{errors.photo}</span>}
          </div>

          <div className="rounded-xl bg-navy-50 p-4 text-xs leading-6 text-slate-600">
            <p className="inline-flex items-center gap-1.5 font-semibold text-navy">
              <ShieldCheck className="h-4 w-4 text-emerald-600" /> যাচাইকরণ সম্পর্কে
            </p>
            <p className="mt-1">নতুন প্রোফাইল কখনো স্বয়ংক্রিয়ভাবে যাচাইকৃত হয় না। ডেমো অ্যাডমিন প্যানেল থেকে অনুমোদনের পর যাচাইকৃত ব্যাজ দেখা যাবে—এটি কোনো বাস্তব পরিচয় যাচাই নয়।</p>
          </div>

          <button type="submit" className="btn-primary w-full sm:w-auto">
            প্রোফাইল তৈরি করুন <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
          <BadgeCheck className="h-4 w-4 text-emerald-600" />
          ইতিমধ্যে প্রোফাইল তৈরি করেছেন? <Link to="/services" className="font-semibold text-emerald-700 hover:underline">সেবা খুঁজুন</Link>
        </p>
      </div>
    </div>
  )
}
