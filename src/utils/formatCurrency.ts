export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('no-NB', {
    style: 'currency',
    currency: 'NOK',
    maximumFractionDigits: 0,
  }).format(value)
}
