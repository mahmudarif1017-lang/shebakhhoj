export type VerificationStatus = 'verified' | 'pending' | 'rejected'

export interface Review {
  id: string
  providerId: string
  customerName: string
  rating: number
  text: string
  createdAt: string
  isDemo?: boolean
}

export interface Provider {
  id: string
  name: string
  phone: string
  profession: string
  categoryId: string
  location: string
  experience: number
  description: string
  skills: string[]
  services: string[]
  avatar: string
  photo?: string
  gallery: string[]
  reviews: Review[]
  verification: VerificationStatus
  isDemo: boolean
  createdAt: string
}

export interface ServiceItem {
  en: string
  bn: string
}

export interface Category {
  id: string
  name: string
  nameEn: string
  description: string
  icon: string
  services: ServiceItem[]
}

export interface RegistrationInput {
  name: string
  phone: string
  profession: string
  categoryId: string
  location: string
  experience: number
  description: string
  skills: string[]
  photo?: string
}
