import type { CartItem as CartItemType } from '../../types'
import { formatCurrency } from '../../utils/formatCurrency'

type Props = {
  item: CartItemType
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: Props) {
  const subtotal = item.priceFrom * item.quantity

  const setQuantity = (next: number) => {
    const clamped = Math.max(1, Math.min(99, next))
    onUpdateQuantity(item.id, clamped)
  }

  return (
    <li className="cart-item">
      <div className="cart-item-info">
        <p className="cart-item-name">{item.name}</p>
        <p className="cart-item-meta">
          <span className={`tag tag-${item.type}`}>
            {item.type === 'produkt' ? 'Produkt' : 'Tjeneste'}
          </span>
          <span className="cart-item-category">{item.category}</span>
        </p>
        <p className="cart-item-price">
          {formatCurrency(item.priceFrom)} <span>{item.unit}</span>
        </p>
      </div>

      <div className="cart-item-actions">
        <div className="qty-control" role="group" aria-label={`Antall for ${item.name}`}>
          <button
            type="button"
            className="qty-step"
            onClick={() => setQuantity(item.quantity - 1)}
            aria-label="Reduser antall"
            disabled={item.quantity <= 1}
          >
            −
          </button>
          <label className="qty-label">
            <span className="visually-hidden">Antall for {item.name}</span>
            <input
              type="number"
              min={1}
              max={99}
              value={item.quantity}
              onChange={(event) => {
                const value = parseInt(event.target.value, 10)
                if (!Number.isNaN(value)) setQuantity(value)
              }}
            />
          </label>
          <button
            type="button"
            className="qty-step"
            onClick={() => setQuantity(item.quantity + 1)}
            aria-label="Øk antall"
            disabled={item.quantity >= 99}
          >
            +
          </button>
        </div>

        <p className="cart-item-subtotal" aria-label={`Sum for ${item.name}`}>
          {formatCurrency(subtotal)}
        </p>

        <button
          type="button"
          className="cart-remove"
          onClick={() => onRemove(item.id)}
          aria-label={`Fjern ${item.name} fra handlekurven`}
        >
          Fjern
        </button>
      </div>
    </li>
  )
}
