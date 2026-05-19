import { useEffect, useState } from 'react'
import type { CookiePreferences } from '../../types'
import { Button } from '../ui/Button'

type Props = {
  open: boolean
  preferences: CookiePreferences
  onSave: (next: Partial<CookiePreferences>) => void
  onAcceptAll: () => void
  onClose: () => void
}

export function CookieSettings({
  open,
  preferences,
  onSave,
  onAcceptAll,
  onClose,
}: Props) {
  const [analytics, setAnalytics] = useState(preferences.analytics)
  const [marketing, setMarketing] = useState(preferences.marketing)

  useEffect(() => {
    if (open) {
      setAnalytics(preferences.analytics)
      setMarketing(preferences.marketing)
    }
  }, [open, preferences.analytics, preferences.marketing])

  useEffect(() => {
    if (!open) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  const handleSave = () => {
    onSave({ analytics, marketing })
    onClose()
  }

  return (
    <div
      className="cookie-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-settings-title"
      onClick={onClose}
    >
      <div
        className="cookie-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="cookie-modal-header">
          <h2 id="cookie-settings-title">Cookieinnstillinger</h2>
          <button
            type="button"
            className="cart-close"
            onClick={onClose}
            aria-label="Lukk innstillinger"
          >
            ✕
          </button>
        </header>

        <p className="cookie-modal-intro">
          Du kan endre samtykket ditt når som helst. Nødvendige cookies kan
          ikke deaktiveres fordi de er kritiske for at nettsiden skal fungere.
        </p>

        <ul className="cookie-options">
          <li>
            <div>
              <p className="cookie-option-title">Nødvendige</p>
              <p className="cookie-option-text">
                Lagring av innstillinger, sesjon og samtykke. Alltid aktiv.
              </p>
            </div>
            <span className="cookie-option-status">Alltid på</span>
          </li>
          <li>
            <div>
              <p className="cookie-option-title">Statistikk</p>
              <p className="cookie-option-text">
                Anonym statistikk om hvordan siden brukes. Ingen tredjepartsdata.
              </p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
              />
              <span className="switch-track" aria-hidden="true" />
              <span className="visually-hidden">Statistikk</span>
            </label>
          </li>
          <li>
            <div>
              <p className="cookie-option-title">Markedsføring</p>
              <p className="cookie-option-text">
                Personalisert innhold og kampanjer. Krever ditt samtykke.
              </p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(event) => setMarketing(event.target.checked)}
              />
              <span className="switch-track" aria-hidden="true" />
              <span className="visually-hidden">Markedsføring</span>
            </label>
          </li>
        </ul>

        <div className="cookie-modal-actions">
          <Button variant="ghost-dark" onClick={onAcceptAll}>
            Godta alle
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Lagre valg
          </Button>
        </div>
      </div>
    </div>
  )
}
