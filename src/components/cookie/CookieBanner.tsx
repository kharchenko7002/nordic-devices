import { Button } from '../ui/Button'

type Props = {
  open: boolean
  onAcceptAll: () => void
  onAcceptNecessary: () => void
  onOpenSettings: () => void
}

export function CookieBanner({
  open,
  onAcceptAll,
  onAcceptNecessary,
  onOpenSettings,
}: Props) {
  if (!open) return null

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-text"
    >
      <div className="cookie-banner-inner">
        <div className="cookie-banner-text">
          <h2 id="cookie-banner-title">Informasjonskapsler</h2>
          <p id="cookie-banner-text">
            Vi bruker nødvendige informasjonskapsler for at nettsiden skal
            fungere. Med ditt samtykke kan vi også bruke valgfrie cookies for
            statistikk og forbedring av brukeropplevelsen. Ingen
            personopplysninger deles før du gir samtykke.
          </p>
        </div>
        <div className="cookie-banner-actions">
          <Button variant="ghost-light" onClick={onOpenSettings}>
            Innstillinger
          </Button>
          <Button variant="ghost-light" onClick={onAcceptNecessary}>
            Kun nødvendige
          </Button>
          <Button variant="primary" onClick={onAcceptAll}>
            Godta alle
          </Button>
        </div>
      </div>
    </div>
  )
}
