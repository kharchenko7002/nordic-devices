import { useState, type FormEvent } from 'react'
import {
  COMPANY_ADDRESS,
  OFFICE_HOURS,
  ORDER_EMAIL,
  SUPPORT_PHONE,
} from '../../data/navigation'
import { Button } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'

export function ContactSection() {
  const [status, setStatus] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('Takk for henvendelsen! Vi tar kontakt så snart som mulig.')
    form.reset()
  }

  return (
    <section
      id="kontakt"
      className="section section-alt"
      aria-labelledby="kontakt-title"
    >
      <div className="container">
        <SectionHeader
          id="kontakt-title"
          eyebrow="Kontakt"
          title="Ta kontakt med Nordic Devices"
          lead="Vi svarer raskt på henvendelser og setter gjerne opp et uforpliktende møte."
        />

        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-card">
              <span className="info-icon" aria-hidden="true">📧</span>
              <div>
                <p className="info-label">E-post</p>
                <a href={`mailto:${ORDER_EMAIL}`}>{ORDER_EMAIL}</a>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon" aria-hidden="true">📞</span>
              <div>
                <p className="info-label">Telefon</p>
                <a href={`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`}>
                  {SUPPORT_PHONE}
                </a>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon" aria-hidden="true">📍</span>
              <div>
                <p className="info-label">Adresse</p>
                <p className="info-value">{COMPANY_ADDRESS}</p>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon" aria-hidden="true">🕒</span>
              <div>
                <p className="info-label">Åpningstid</p>
                <p className="info-value">{OFFICE_HOURS}</p>
              </div>
            </div>
          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
            aria-describedby="kontakt-status"
            noValidate
          >
            <h3>Send en henvendelse</h3>
            <label className="field">
              <span>Navn</span>
              <input
                type="text"
                name="navn"
                autoComplete="name"
                placeholder="Ditt fulle navn"
                required
              />
            </label>
            <label className="field">
              <span>E-post</span>
              <input
                type="email"
                name="epost"
                autoComplete="email"
                placeholder="navn@bedrift.no"
                required
              />
            </label>
            <label className="field">
              <span>Melding</span>
              <textarea
                name="melding"
                placeholder="Fortell oss kort hva du trenger hjelp med..."
                rows={5}
                required
              />
            </label>
            <Button type="submit" variant="primary">
              Send forespørsel
            </Button>
            <p
              id="kontakt-status"
              className="form-status"
              role="status"
              aria-live="polite"
            >
              {status}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
