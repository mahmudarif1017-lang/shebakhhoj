import type { Provider } from '../types'

const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']

/** Convert ASCII digits in a string to Bengali numerals. */
export function toBn(value: string | number): string {
  return String(value).replace(/[0-9]/g, (digit) => bnDigits[Number(digit)])
}

/** Small className joiner. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

/** Average of a provider's reviews (0 when there are none). */
export function averageRating(provider: Provider): number {
  if (!provider.reviews.length) return 0
  const total = provider.reviews.reduce((sum, review) => sum + review.rating, 0)
  return Math.round((total / provider.reviews.length) * 10) / 10
}

export function reviewCount(provider: Provider): number {
  return provider.reviews.length
}

/** Format an ISO date as a short Bengali-friendly date. */
export function formatDate(iso: string): string {
  try {
    const date = new Date(iso)
    return `${toBn(date.getDate())} ${bnMonth(date.getMonth())} ${toBn(date.getFullYear())}`
  } catch {
    return ''
  }
}

function bnMonth(month: number): string {
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর',
  ]
  return months[month] ?? ''
}

/** Bangladesh-style mobile number validation. */
export function isValidBangladeshPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s()-]/g, '')
  return /^(?:\+?88)?01[3-9]\d{8}$/.test(cleaned)
}

/** Normalise a valid BD number to +8801XXXXXXXXX for links. */
export function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/[\s()-]/g, '')
  const local = cleaned.replace(/^(?:\+?88)?0/, '')
  return `+880${local}`
}

export function telLink(phone: string): string {
  return `tel:${normalizePhone(phone)}`
}

export function whatsappLink(phone: string, message?: string): string {
  const number = normalizePhone(phone).replace('+', '')
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${number}${text}`
}

export function makeId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}
