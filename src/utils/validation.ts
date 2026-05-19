import type { OrderForm, OrderFormErrors } from '../types'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+0-9\s()-]{6,}$/

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim())
}

export function isValidPhone(value: string): boolean {
  return PHONE_RE.test(value.trim())
}

export function validateOrderForm(form: OrderForm): OrderFormErrors {
  const errors: OrderFormErrors = {}

  if (!form.bedriftsnavn.trim()) {
    errors.bedriftsnavn = 'Bedriftsnavn er påkrevd.'
  }

  if (!form.kontaktperson.trim()) {
    errors.kontaktperson = 'Kontaktperson er påkrevd.'
  }

  if (!form.epost.trim()) {
    errors.epost = 'E-post er påkrevd.'
  } else if (!isValidEmail(form.epost)) {
    errors.epost = 'Skriv en gyldig e-postadresse, f.eks. navn@bedrift.no.'
  }

  if (form.telefon.trim() && !isValidPhone(form.telefon)) {
    errors.telefon =
      'Skriv et gyldig telefonnummer. Du kan bruke siffer, mellomrom, plusstegn og parenteser.'
  }

  if (!form.adresse.trim()) {
    errors.adresse = 'Adresse eller sted er påkrevd.'
  }

  if (!form.samtykke) {
    errors.samtykke =
      'Du må godta at Nordic Devices AS kan kontakte deg om denne forespørselen.'
  }

  return errors
}

export function hasErrors(errors: OrderFormErrors): boolean {
  return Object.values(errors).some((value) => Boolean(value))
}
