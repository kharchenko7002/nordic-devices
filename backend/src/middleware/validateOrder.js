const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isString(value, max = 500) {
  return typeof value === 'string' && value.length <= max
}

function isStringRequired(value, max = 500) {
  return isString(value, max) && value.trim().length > 0
}

export function validateOrderPayload(payload) {
  const errors = []

  if (!payload || typeof payload !== 'object') {
    return { errors: ['Forventet et JSON-objekt.'], order: null }
  }

  const { ordreNummer, opprettet, items, total, form, status } = payload

  if (!isStringRequired(ordreNummer, 64)) errors.push('Mangler ordrenummer.')
  if (!isStringRequired(opprettet, 64)) errors.push('Mangler opprettet-tid.')
  if (!isStringRequired(status, 64)) errors.push('Mangler status.')

  if (typeof total !== 'number' || !Number.isFinite(total) || total < 0) {
    errors.push('Ugyldig total.')
  }

  if (!Array.isArray(items) || items.length === 0) {
    errors.push('Bestillingen må inneholde minst én vare.')
  } else if (items.length > 50) {
    errors.push('For mange varer i bestillingen.')
  } else {
    items.forEach((item, index) => {
      if (!item || typeof item !== 'object') {
        errors.push(`Vare ${index + 1}: ugyldig.`)
        return
      }
      if (!isStringRequired(item.id, 64) || !isStringRequired(item.name, 200)) {
        errors.push(`Vare ${index + 1}: mangler navn eller id.`)
      }
      if (
        typeof item.quantity !== 'number' ||
        item.quantity < 1 ||
        item.quantity > 999
      ) {
        errors.push(`Vare ${index + 1}: ugyldig antall.`)
      }
      if (typeof item.priceFrom !== 'number' || item.priceFrom < 0) {
        errors.push(`Vare ${index + 1}: ugyldig pris.`)
      }
    })
  }

  if (!form || typeof form !== 'object') {
    errors.push('Mangler skjemafelter.')
  } else {
    if (!isStringRequired(form.bedriftsnavn, 200)) errors.push('Bedriftsnavn er påkrevd.')
    if (!isStringRequired(form.kontaktperson, 200)) errors.push('Kontaktperson er påkrevd.')
    if (!isStringRequired(form.epost, 200) || !EMAIL_RE.test(form.epost.trim())) {
      errors.push('Ugyldig e-postadresse.')
    }
    if (!isStringRequired(form.adresse, 300)) errors.push('Adresse er påkrevd.')
    if (form.telefon && !isString(form.telefon, 60)) errors.push('Ugyldig telefon.')
    if (form.kommentar && !isString(form.kommentar, 2000)) errors.push('Kommentar er for lang.')
    if (form.samtykke !== true) errors.push('Samtykke er påkrevd.')
  }

  if (errors.length > 0) return { errors, order: null }

  return {
    errors: [],
    order: {
      ordreNummer: ordreNummer.trim(),
      opprettet,
      status,
      total,
      items: items.map((item) => ({
        id: item.id.trim(),
        name: item.name.trim(),
        type: isString(item.type, 32) ? item.type : 'produkt',
        category: isString(item.category, 64) ? item.category : '',
        priceFrom: item.priceFrom,
        unit: isString(item.unit, 64) ? item.unit : '',
        quantity: item.quantity,
      })),
      form: {
        bedriftsnavn: form.bedriftsnavn.trim(),
        kontaktperson: form.kontaktperson.trim(),
        epost: form.epost.trim(),
        telefon: (form.telefon || '').trim(),
        adresse: form.adresse.trim(),
        kommentar: (form.kommentar || '').trim(),
        samtykke: true,
      },
    },
  }
}
