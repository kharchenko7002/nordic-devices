import { SectionHeader } from '../ui/SectionHeader'

type SecurityItem = {
  icon: string
  title: string
  description: string
}

const SECURITY_ITEMS: SecurityItem[] = [
  {
    icon: '🔑',
    title: 'SSH med nøkler',
    description:
      'Ekstern administrasjon skjer via ed25519-nøkler. Passordpålogging deaktiveres etter at nøkkeltilgang er testet.',
  },
  {
    icon: '🌍',
    title: 'HTTPS / TLS',
    description:
      'Self-signed sertifikat i testmiljøet og Let’s Encrypt anbefalt i produksjon for kryptert trafikk.',
  },
  {
    icon: '🧱',
    title: 'Brannmur og porter',
    description:
      'Kun nødvendige porter (22, 80, 443) er åpne. Resten blokkeres for å redusere angrepsflaten.',
  },
  {
    icon: '🔒',
    title: 'GDPR og samtykke',
    description:
      'Eksplisitt samtykke til cookies. Mulighet for å trekke samtykke tilbake. Ingen tredjepartssporing før godkjenning.',
  },
  {
    icon: '🪪',
    title: 'Tilgangsstyring',
    description:
      'Minste privilegium-prinsippet: brukere får kun de rettighetene rollen krever.',
  },
  {
    icon: '🐳',
    title: 'Docker-isolasjon',
    description:
      'Applikasjonen kjører i en kontrollert container. Begrenser hva som eksponeres på verten.',
  },
]

export function SecuritySection() {
  return (
    <section
      id="sikkerhet"
      className="section section-dark"
      aria-labelledby="sikkerhet-title"
    >
      <div className="container">
        <SectionHeader
          id="sikkerhet-title"
          eyebrow="Sikkerhet"
          title="Sikkerhet er bygget inn fra start"
          lead="Vi følger anerkjente prinsipper for sikker drift og legger til rette for at kundene enkelt kan etterleve dem."
          variant="light"
        />

        <div className="grid grid-cards">
          {SECURITY_ITEMS.map((item) => (
            <article key={item.title} className="security-card">
              <div className="security-icon" aria-hidden="true">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
