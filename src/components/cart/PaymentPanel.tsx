export function PaymentPanel() {
  return (
    <aside className="payment-panel" aria-label="Informasjon om bestilling">
      <p className="payment-panel-title">
        <span aria-hidden="true">🔒</span> Trygg bestilling
      </p>
      <p>
        Dette er en prototype for bestilling og betalingsflyt. Ingen
        kortinformasjon behandles i denne løsningen.
      </p>
      <p className="payment-panel-help">
        I produksjon vil betalingen håndteres av en godkjent
        betalingsleverandør (Stripe, Vipps eller Nets) over HTTPS.
      </p>
    </aside>
  )
}
