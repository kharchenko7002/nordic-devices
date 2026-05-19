import { useEffect, useState } from 'react'
import type { Order } from '../../types'
import { ORDER_EMAIL } from '../../data/navigation'
import { formatCurrency } from '../../utils/formatCurrency'
import { buildMailtoUrl } from '../../utils/emailReceipt'
import { sendOrderToApi } from '../../utils/sendOrder'
import { Button } from '../ui/Button'

type Props = {
  order: Order
  onClose: () => void
}

type EmailState =
  | { status: 'sending' }
  | { status: 'sent'; transport: string; previewUrl: string | null }
  | { status: 'error'; message: string }

export function OrderConfirmation({ order, onClose }: Props) {
  const [emailState, setEmailState] = useState<EmailState>({ status: 'sending' })

  useEffect(() => {
    let cancelled = false
    setEmailState({ status: 'sending' })
    sendOrderToApi(order).then((result) => {
      if (cancelled) return
      if (result.ok) {
        setEmailState({
          status: 'sent',
          transport: result.transport,
          previewUrl: result.previewUrl,
        })
      } else {
        setEmailState({ status: 'error', message: result.error })
      }
    })
    return () => {
      cancelled = true
    }
  }, [order])

  const handleRetry = async () => {
    setEmailState({ status: 'sending' })
    const result = await sendOrderToApi(order)
    if (result.ok) {
      setEmailState({
        status: 'sent',
        transport: result.transport,
        previewUrl: result.previewUrl,
      })
    } else {
      setEmailState({ status: 'error', message: result.error })
    }
  }

  const handleMailtoFallback = () => {
    window.location.href = buildMailtoUrl(order, order.form.epost || ORDER_EMAIL)
  }

  return (
    <div className="order-confirmation" aria-live="polite">
      <div className="confirm-badge" aria-hidden="true">✓</div>
      <h3>Bestillingen er registrert</h3>
      <p className="confirm-intro">
        Takk for bestillingen! Vi sender en ordrebekreftelse til{' '}
        <strong>{order.form.epost}</strong>.
      </p>

      <dl className="confirm-meta">
        <div>
          <dt>Ordrenummer</dt>
          <dd>{order.ordreNummer}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{order.status}</dd>
        </div>
        <div>
          <dt>Bedrift</dt>
          <dd>{order.form.bedriftsnavn}</dd>
        </div>
        <div>
          <dt>Kontakt</dt>
          <dd>
            {order.form.kontaktperson}
            <br />
            <span className="confirm-meta-sub">{order.form.epost}</span>
          </dd>
        </div>
      </dl>

      <ul className="confirm-items">
        {order.items.map((item) => (
          <li key={item.id}>
            <span>
              {item.quantity} × {item.name}
            </span>
            <span>{formatCurrency(item.priceFrom * item.quantity)}</span>
          </li>
        ))}
      </ul>

      <p className="confirm-total">
        <strong>Total</strong>
        <span>{formatCurrency(order.total)}</span>
      </p>

      <EmailStatus
        state={emailState}
        recipient={order.form.epost}
        onRetry={handleRetry}
        onMailto={handleMailtoFallback}
      />

      <div className="confirm-actions">
        <Button variant="primary" onClick={onClose} block>
          Lukk
        </Button>
      </div>
    </div>
  )
}

type StatusProps = {
  state: EmailState
  recipient: string
  onRetry: () => void
  onMailto: () => void
}

function EmailStatus({ state, recipient, onRetry, onMailto }: StatusProps) {
  if (state.status === 'sending') {
    return (
      <div className="email-status email-status-sending" role="status">
        <span className="email-status-spinner" aria-hidden="true" />
        Sender ordrebekreftelse til {recipient}…
      </div>
    )
  }

  if (state.status === 'sent') {
    return (
      <div className="email-status email-status-sent" role="status">
        <p className="email-status-title">
          <span aria-hidden="true">✓</span> Ordrebekreftelse sendt
        </p>
        <p>
          En e-post er sendt til <strong>{recipient}</strong>. Sjekk innboksen
          (og søppelpost) i løpet av få minutter.
        </p>
        {state.previewUrl && (
          <p className="email-status-preview">
            Testmodus (Ethereal) — åpne meldingen i nettleseren:{' '}
            <a href={state.previewUrl} target="_blank" rel="noreferrer">
              preview-lenke
            </a>
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="email-status email-status-error" role="alert">
      <p className="email-status-title">
        <span aria-hidden="true">⚠</span> Kunne ikke sende automatisk
      </p>
      <p>{state.message}</p>
      <div className="email-status-actions">
        <Button variant="ghost-dark" onClick={onRetry}>
          Prøv igjen
        </Button>
        <Button variant="primary" onClick={onMailto}>
          Send via e-postprogram
        </Button>
      </div>
    </div>
  )
}
