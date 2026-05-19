import type { OrderForm, OrderFormErrors } from '../../types'
import { PaymentPanel } from './PaymentPanel'

type Props = {
  formId: string
  form: OrderForm
  errors: OrderFormErrors
  onChange: <K extends keyof OrderForm>(field: K, value: OrderForm[K]) => void
  onSubmit: () => void
}

export function CheckoutForm({
  formId,
  form,
  errors,
  onChange,
  onSubmit,
}: Props) {
  return (
    <form
      id={formId}
      className="checkout-form"
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
      aria-describedby={`${formId}-help`}
    >
      <p id={`${formId}-help`} className="checkout-form-help">
        Felter merket med * er påkrevd. Vi bruker bare opplysningene til å
        kontakte deg om denne bestillingen.
      </p>

      <div className="field-grid">
        <label className="field">
          <span>
            Bedriftsnavn <span aria-hidden="true">*</span>
          </span>
          <input
            type="text"
            name="bedriftsnavn"
            autoComplete="organization"
            required
            value={form.bedriftsnavn}
            onChange={(e) => onChange('bedriftsnavn', e.target.value)}
            aria-invalid={Boolean(errors.bedriftsnavn)}
            aria-describedby={errors.bedriftsnavn ? 'err-bedriftsnavn' : undefined}
          />
          {errors.bedriftsnavn && (
            <span id="err-bedriftsnavn" className="field-error">
              {errors.bedriftsnavn}
            </span>
          )}
        </label>

        <label className="field">
          <span>
            Kontaktperson <span aria-hidden="true">*</span>
          </span>
          <input
            type="text"
            name="kontaktperson"
            autoComplete="name"
            required
            value={form.kontaktperson}
            onChange={(e) => onChange('kontaktperson', e.target.value)}
            aria-invalid={Boolean(errors.kontaktperson)}
            aria-describedby={errors.kontaktperson ? 'err-kontaktperson' : undefined}
          />
          {errors.kontaktperson && (
            <span id="err-kontaktperson" className="field-error">
              {errors.kontaktperson}
            </span>
          )}
        </label>

        <label className="field">
          <span>
            E-post <span aria-hidden="true">*</span>
          </span>
          <input
            type="email"
            name="epost"
            autoComplete="email"
            required
            value={form.epost}
            onChange={(e) => onChange('epost', e.target.value)}
            aria-invalid={Boolean(errors.epost)}
            aria-describedby={errors.epost ? 'err-epost' : undefined}
          />
          {errors.epost && (
            <span id="err-epost" className="field-error">
              {errors.epost}
            </span>
          )}
        </label>

        <label className="field">
          <span>Telefon</span>
          <input
            type="tel"
            name="telefon"
            autoComplete="tel"
            placeholder="+47 22 00 00 00"
            value={form.telefon}
            onChange={(e) => onChange('telefon', e.target.value)}
            aria-invalid={Boolean(errors.telefon)}
            aria-describedby={errors.telefon ? 'err-telefon' : undefined}
          />
          {errors.telefon && (
            <span id="err-telefon" className="field-error">
              {errors.telefon}
            </span>
          )}
        </label>

        <label className="field field-full">
          <span>
            Adresse eller sted <span aria-hidden="true">*</span>
          </span>
          <input
            type="text"
            name="adresse"
            autoComplete="street-address"
            required
            value={form.adresse}
            onChange={(e) => onChange('adresse', e.target.value)}
            aria-invalid={Boolean(errors.adresse)}
            aria-describedby={errors.adresse ? 'err-adresse' : undefined}
          />
          {errors.adresse && (
            <span id="err-adresse" className="field-error">
              {errors.adresse}
            </span>
          )}
        </label>

        <label className="field field-full">
          <span>Kommentar</span>
          <textarea
            name="kommentar"
            rows={3}
            value={form.kommentar}
            onChange={(e) => onChange('kommentar', e.target.value)}
          />
        </label>

        <label className="field field-full field-checkbox">
          <input
            type="checkbox"
            name="samtykke"
            checked={form.samtykke}
            onChange={(e) => onChange('samtykke', e.target.checked)}
            aria-invalid={Boolean(errors.samtykke)}
            aria-describedby={errors.samtykke ? 'err-samtykke' : undefined}
          />
          <span>
            Jeg godtar at Nordic Devices AS kan kontakte meg om denne
            forespørselen.
          </span>
        </label>
        {errors.samtykke && (
          <span id="err-samtykke" className="field-error field-full">
            {errors.samtykke}
          </span>
        )}
      </div>

      <PaymentPanel />
    </form>
  )
}
