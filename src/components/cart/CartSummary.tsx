import { formatCurrency } from '../../utils/formatCurrency'

type Props = {
  itemCount: number
  total: number
}

export function CartSummary({ itemCount, total }: Props) {
  return (
    <div className="cart-summary" aria-live="polite">
      <div className="cart-summary-row">
        <span>Antall varer</span>
        <strong>{itemCount}</strong>
      </div>
      <div className="cart-summary-row">
        <span>Total</span>
        <strong className="cart-summary-total">{formatCurrency(total)}</strong>
      </div>
    </div>
  )
}
