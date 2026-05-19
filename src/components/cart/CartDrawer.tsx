import { useEffect, useRef, useState } from 'react'
import type { Order } from '../../types'
import { useOrderForm } from '../../hooks/useOrderForm'
import type { UseCartReturn } from '../../hooks/useCart'
import { generateOrderNumber } from '../../utils/generateOrderNumber'
import { hasErrors } from '../../utils/validation'
import { Button } from '../ui/Button'
import { EmptyState } from '../ui/EmptyState'
import { CartItem } from './CartItem'
import { CartSummary } from './CartSummary'
import { CheckoutForm } from './CheckoutForm'
import { OrderConfirmation } from './OrderConfirmation'

type Props = {
  open: boolean
  onClose: () => void
  cart: UseCartReturn
}

type Step = 'cart' | 'checkout' | 'confirm'

const FORM_ID = 'nd-checkout-form'

export function CartDrawer({ open, onClose, cart }: Props) {
  const [step, setStep] = useState<Step>('cart')
  const [order, setOrder] = useState<Order | null>(null)
  const [statusMessage, setStatusMessage] = useState<string>('')
  const orderForm = useOrderForm()
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) {
      setStep((current) => (current === 'confirm' ? 'confirm' : 'cart'))
      setStatusMessage('')
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  const isEmpty = cart.items.length === 0

  const goToCheckout = () => {
    if (isEmpty) return
    setStep('checkout')
    setStatusMessage('')
  }

  const handleSubmit = () => {
    const validation = orderForm.validate()
    if (hasErrors(validation)) {
      setStatusMessage(
        'Skjemaet har feil. Vennligst rett opp feltene merket med rødt.',
      )
      return
    }
    const newOrder: Order = {
      ordreNummer: generateOrderNumber(),
      opprettet: new Date().toISOString(),
      items: [...cart.items],
      total: cart.total,
      form: { ...orderForm.form },
      status: 'Bestilling registrert',
    }
    setOrder(newOrder)
    setStep('confirm')
    setStatusMessage(
      `Bestillingen ${newOrder.ordreNummer} er registrert. Du kan nå sende ordrebekreftelse på e-post.`,
    )
    cart.clear()
    orderForm.reset()
  }

  const handleClose = () => {
    if (step === 'confirm') {
      setOrder(null)
      setStep('cart')
    }
    onClose()
  }

  const title =
    step === 'cart'
      ? 'Handlekurv'
      : step === 'checkout'
      ? 'Kundeinformasjon'
      : 'Ordrebekreftelse'

  return (
    <>
      <div
        className={`cart-overlay ${open ? 'is-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        ref={drawerRef}
        className={`cart-drawer ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        aria-hidden={!open}
      >
        <header className="cart-header">
          <div>
            <p className="cart-stepper" aria-hidden="true">
              <span className={step === 'cart' ? 'is-active' : ''}>1. Kurv</span>
              <span className={step === 'checkout' ? 'is-active' : ''}>
                2. Info
              </span>
              <span className={step === 'confirm' ? 'is-active' : ''}>
                3. Bekreftelse
              </span>
            </p>
            <h2 id="cart-title">{title}</h2>
          </div>
          <button
            type="button"
            className="cart-close"
            onClick={handleClose}
            aria-label="Lukk handlekurv"
          >
            ✕
          </button>
        </header>

        <div className="cart-body">
          {step === 'cart' && (
            <>
              {isEmpty ? (
                <EmptyState
                  title="Handlekurven er tom"
                  description="Bla gjennom tjenester og produkter, og legg det du trenger til kurven."
                />
              ) : (
                <ul className="cart-list" aria-label="Varer i handlekurven">
                  {cart.items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={cart.updateQuantity}
                      onRemove={cart.remove}
                    />
                  ))}
                </ul>
              )}
              {!isEmpty && (
                <CartSummary itemCount={cart.count} total={cart.total} />
              )}
            </>
          )}

          {step === 'checkout' && (
            <CheckoutForm
              formId={FORM_ID}
              form={orderForm.form}
              errors={orderForm.errors}
              onChange={orderForm.setField}
              onSubmit={handleSubmit}
            />
          )}

          {step === 'confirm' && order && (
            <OrderConfirmation order={order} onClose={handleClose} />
          )}
        </div>

        {step !== 'confirm' && (
          <footer className="cart-footer">
            <div
              className="cart-status"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              {statusMessage}
            </div>

            <div className="cart-footer-actions">
              {step === 'cart' && (
                <>
                  <Button variant="ghost-dark" onClick={onClose}>
                    Fortsett å handle
                  </Button>
                  <Button
                    variant="primary"
                    onClick={goToCheckout}
                    disabled={isEmpty}
                  >
                    Gå til bestilling
                  </Button>
                </>
              )}
              {step === 'checkout' && (
                <>
                  <Button
                    variant="ghost-dark"
                    onClick={() => setStep('cart')}
                  >
                    Tilbake
                  </Button>
                  <Button
                    type="submit"
                    form={FORM_ID}
                    variant="primary"
                  >
                    Send bestilling
                  </Button>
                </>
              )}
            </div>
          </footer>
        )}
      </aside>
    </>
  )
}
