const COUNTER_KEY = 'nd-order-counter-v1'

function readCounter(): number {
  if (typeof window === 'undefined') return 0
  try {
    const raw = window.localStorage.getItem(COUNTER_KEY)
    const value = raw ? parseInt(raw, 10) : 0
    return Number.isFinite(value) && value > 0 ? value : 0
  } catch {
    return 0
  }
}

function writeCounter(value: number): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(COUNTER_KEY, String(value))
  } catch {
    /* ignore quota errors */
  }
}

export function generateOrderNumber(): string {
  const year = new Date().getFullYear()
  const next = readCounter() + 1
  writeCounter(next)
  const sequence = String(next).padStart(4, '0')
  return `ND-${year}-${sequence}`
}
