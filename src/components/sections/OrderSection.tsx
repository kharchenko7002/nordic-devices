import { Button } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'

type Props = {
  cartCount: number
  onOpenCart: () => void
  onNavigate: (id: string) => void
}

export function OrderSection({ cartCount, onOpenCart, onNavigate }: Props) {
  return (
    <section id="bestilling" className="section" aria-labelledby="bestilling-title">
      <div className="container">
        <SectionHeader
          id="bestilling-title"
          eyebrow="Bestilling og betaling"
          title="Slik fungerer bestillingen"
          lead="Du kan legge produkter og tjenester i handlekurven, sende en samlet bestilling og motta en ordrebekreftelse på e-post."
        />

        <div className="order-flow">
          <ol className="flow-steps">
            <li>
              <span className="flow-step-num">01</span>
              <h3>Velg fra katalog</h3>
              <p>
                Bla gjennom produkter og tjenester og legg det du trenger i
                handlekurven.
              </p>
            </li>
            <li>
              <span className="flow-step-num">02</span>
              <h3>Bekreft handlekurven</h3>
              <p>
                Juster antall, fjern det du ikke trenger og se totalprisen
                oppdatert i sanntid.
              </p>
            </li>
            <li>
              <span className="flow-step-num">03</span>
              <h3>Fyll ut bedriftsinfo</h3>
              <p>
                Bedriftsnavn, kontaktperson, e-post og adresse — vi spør ikke
                om kortdata.
              </p>
            </li>
            <li>
              <span className="flow-step-num">04</span>
              <h3>Få ordrebekreftelse</h3>
              <p>
                Du får ordrenummer (ND-2026-XXXX) og kan sende bekreftelsen
                til din egen e-postadresse.
              </p>
            </li>
          </ol>

          <div className="order-cta">
            <Button variant="primary" onClick={onOpenCart}>
              Åpne handlekurv {cartCount > 0 ? `(${cartCount})` : ''}
            </Button>
            <Button variant="ghost-dark" onClick={() => onNavigate('produkter')}>
              Bla i produkter
            </Button>
          </div>

          <div className="future-payment">
            <h3>Fremtidig betalingsløsning</h3>
            <p>
              Dette er en prototype. I produksjon vil bestillingen håndteres slik:
            </p>
            <ol>
              <li>Frontend sender ordren til et backend-API over HTTPS.</li>
              <li>Backend validerer ordren og beregner totalsummen på nytt.</li>
              <li>
                Backend oppretter en sikker betalingssesjon hos en godkjent
                betalingsleverandør (Stripe, Vipps eller Nets).
              </li>
              <li>
                Brukeren betaler hos den eksterne leverandøren — ingen kortdata
                berører Nordic Devices.
              </li>
              <li>En webhook fra leverandøren bekrefter at betaling er gjennomført.</li>
              <li>Backend lagrer ordren i en database og sender en kvittering på e-post.</li>
              <li>
                GDPR ivaretas ved dataminimering, samtykke og kryptering både
                i ro og i transport.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
