import { demoProviders } from '../data/demoData'
import type {
  Provider,
  RegistrationInput,
  Review,
  VerificationStatus,
} from '../types'
import { makeId } from './utils'

const KEYS = {
  registered: 'shebakhhoj_registered_providers_v1',
  overrides: 'shebakhhoj_verification_overrides_v1',
  reviews: 'shebakhhoj_extra_reviews_v1',
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can be unavailable/full (e.g. large profile photo). Fail quietly.
  }
}

export function getRegisteredProviders(): Provider[] {
  return read<Provider[]>(KEYS.registered, [])
}

export function getStatusOverrides(): Record<string, VerificationStatus> {
  return read<Record<string, VerificationStatus>>(KEYS.overrides, {})
}

export function getExtraReviews(): Review[] {
  return read<Review[]>(KEYS.reviews, [])
}

/** Demo providers + locally registered providers, with admin changes applied. */
export function getAllProviders(): Provider[] {
  const overrides = getStatusOverrides()
  const extraReviews = getExtraReviews()

  const apply = (provider: Provider): Provider => ({
    ...provider,
    verification: overrides[provider.id] ?? provider.verification,
    reviews: [
      ...provider.reviews,
      ...extraReviews.filter((review) => review.providerId === provider.id),
    ],
  })

  return [
    ...demoProviders.map(apply),
    ...getRegisteredProviders().map(apply),
  ]
}

/** Providers visible in public listings (rejected ones are hidden). */
export function getPublicProviders(): Provider[] {
  return getAllProviders().filter((provider) => provider.verification !== 'rejected')
}

export function getProviderById(id: string): Provider | undefined {
  return getAllProviders().find((provider) => provider.id === id)
}

export function registerProvider(input: RegistrationInput): Provider {
  const provider: Provider = {
    id: makeId('provider'),
    name: input.name.trim(),
    phone: input.phone.trim(),
    profession: input.profession.trim(),
    categoryId: input.categoryId,
    location: input.location,
    experience: input.experience,
    description: input.description.trim(),
    skills: input.skills,
    services: input.skills.slice(0, 5),
    avatar: '🙂',
    photo: input.photo,
    gallery: [],
    reviews: [],
    verification: 'pending',
    isDemo: false,
    createdAt: new Date().toISOString(),
  }

  const existing = getRegisteredProviders()
  write(KEYS.registered, [provider, ...existing])
  return provider
}

export function addReview(
  providerId: string,
  input: { customerName: string; rating: number; text: string },
): Review {
  const review: Review = {
    id: makeId('review'),
    providerId,
    customerName: input.customerName.trim(),
    rating: input.rating,
    text: input.text.trim(),
    createdAt: new Date().toISOString(),
    isDemo: false,
  }
  write(KEYS.reviews, [review, ...getExtraReviews()])
  return review
}

export function setVerification(id: string, status: VerificationStatus): void {
  const overrides = getStatusOverrides()
  overrides[id] = status
  write(KEYS.overrides, overrides)
}
