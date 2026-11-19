import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import {
  addReview as addReviewToStorage,
  getAllProviders,
  getPublicProviders,
  registerProvider as registerProviderInStorage,
  setVerification as setVerificationInStorage,
} from '../lib/storage'
import type { Provider, RegistrationInput, Review, VerificationStatus } from '../types'

interface AppContextValue {
  providers: Provider[]
  publicProviders: Provider[]
  refresh: () => void
  registerProvider: (input: RegistrationInput) => Provider
  addReview: (providerId: string, input: Pick<Review, 'customerName' | 'rating' | 'text'>) => void
  setVerification: (id: string, status: VerificationStatus) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState(0)

  const providers = useMemo(() => {
    void version
    return getAllProviders()
  }, [version])

  const publicProviders = useMemo(
    () => providers.filter((provider) => provider.verification !== 'rejected'),
    [providers],
  )

  const refresh = () => setVersion((value) => value + 1)

  const value: AppContextValue = {
    providers,
    publicProviders,
    refresh,
    registerProvider: (input) => {
      const provider = registerProviderInStorage(input)
      refresh()
      return provider
    },
    addReview: (providerId, input) => {
      addReviewToStorage(providerId, input)
      refresh()
    },
    setVerification: (id, status) => {
      setVerificationInStorage(id, status)
      refresh()
    },
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used inside AppProvider')
  return context
}
