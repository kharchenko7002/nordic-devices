import type { Order } from '../types'
import { ORDER_EMAIL } from '../data/navigation'
import { formatCurrency } from './formatCurrency'

/**
 * Plain-text receipt used as a manual mailto fallback when the backend is
 * unreachable. The primary path is POST /api/orders — see src/utils/sendOrder.ts.
 */
export function buildReceiptText(order: Order): string {
  const lines: string[] = []
  lines.push('Ordrebekreftelse fra Nordic Devices AS')
  lines.push('')
  lines.push(`Ordrenummer:    ${order.ordreNummer}`)
  lines.push(`Status:         ${order.status}`)
  lines.push(`Opprettet:      ${new Date(order.opprettet).toLocaleString('no-NB')}`)
  lines.push('')
  lines.push('Kundeinformasjon')
  lines.push(`  Bedrift:      ${order.form.bedriftsnavn}`)
  lines.push(`  Kontakt:      ${order.form.kontaktperson}`)
  lines.push(`  E-post:       ${order.form.epost}`)
  if (order.form.telefon.trim()) {
    lines.push(`  Telefon:      ${order.form.telefon}`)
  }
  lines.push(`  Adresse:      ${order.form.adresse}`)
  if (order.form.kommentar.trim()) {
    lines.push('')
    lines.push('Kommentar')
    lines.push(`  ${order.form.kommentar}`)
  }
  lines.push('')
  lines.push('Bestilte varer og tjenester')
  for (const item of order.items) {
    const sub = formatCurrency(item.priceFrom * item.quantity)
    lines.push(
      `  ${item.quantity} × ${item.name} (${item.type}, ${item.category}) — ${sub}`,
    )
  }
  lines.push('')
  lines.push(`Total: ${formatCurrency(order.total)}`)
  return lines.join('\n')
}

export function buildMailtoUrl(order: Order, to: string = ORDER_EMAIL): string {
  const subject = `Ordrebekreftelse ${order.ordreNummer}`
  const body = buildReceiptText(order)
  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`
}
