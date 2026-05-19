import { formatCurrency } from '../../utils/formatCurrency'

type Props = {
  count: number
  total: number
  onClick: () => void
}

export function CartButton({ count, total, onClick }: Props) {
  const label = count === 0
    ? 'Åpne handlekurv. Tom.'
    : `Åpne handlekurv. ${count} ${count === 1 ? 'vare' : 'varer'}, total ${formatCurrency(total)}.`

  return (
    <button
      type="button"
      className="cart-button"
      onClick={onClick}
      aria-label={label}
    >
      <span className="cart-button-icon" aria-hidden="true">🛒</span>
      <span className="cart-button-label">Handlekurv</span>
      {count > 0 && (
        <span className="cart-button-total" aria-hidden="true">
          {formatCurrency(total)}
        </span>
      )}
      <span
        className={`cart-count ${count === 0 ? 'is-empty' : ''}`}
        aria-hidden="true"
      >
        {count}
      </span>
    </button>
  )
}
