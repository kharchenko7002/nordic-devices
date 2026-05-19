import { useCallback, useEffect, useState } from 'react'
import type { ConsentChoice, CookiePreferences } from '../types'

const STORAGE_KEY = 'nd-cookie-consent-v2'

type StoredConsent = {
  choice: Exclude<ConsentChoice, null>
  preferences: CookiePreferences
}

const DEFAULT_PREFS: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
}

function readStored(): StoredConsent | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredConsent
    if (parsed.choice !== 'all' && parsed.choice !== 'necessary') return null
    return {
      choice: parsed.choice,
      preferences: { ...DEFAULT_PREFS, ...parsed.preferences, necessary: true },
    }
  } catch {
    return null
  }
}

export function useCookieConsent() {
  const [stored, setStored] = useState<StoredConsent | null>(() => readStored())

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      if (stored === null) {
        window.localStorage.removeItem(STORAGE_KEY)
      } else {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
      }
    } catch {
      /* ignore */
    }
  }, [stored])

  const acceptAll = useCallback(() => {
    setStored({
      choice: 'all',
      preferences: { necessary: true, analytics: true, marketing: true },
    })
  }, [])

  const acceptNecessary = useCallback(() => {
    setStored({ choice: 'necessary', preferences: DEFAULT_PREFS })
  }, [])

  const savePreferences = useCallback((prefs: Partial<CookiePreferences>) => {
    setStored((prev) => {
      const next: CookiePreferences = {
        necessary: true,
        analytics: Boolean(prefs.analytics ?? prev?.preferences.analytics),
        marketing: Boolean(prefs.marketing ?? prev?.preferences.marketing),
      }
      const choice: Exclude<ConsentChoice, null> =
        next.analytics || next.marketing ? 'all' : 'necessary'
      return { choice, preferences: next }
    })
  }, [])

  const reset = useCallback(() => setStored(null), [])

  return {
    choice: (stored?.choice ?? null) as ConsentChoice,
    preferences: stored?.preferences ?? DEFAULT_PREFS,
    hasDecided: stored !== null,
    analyticsEnabled: stored?.preferences.analytics ?? false,
    marketingEnabled: stored?.preferences.marketing ?? false,
    acceptAll,
    acceptNecessary,
    savePreferences,
    reset,
  }
}

export type UseCookieConsentReturn = ReturnType<typeof useCookieConsent>
