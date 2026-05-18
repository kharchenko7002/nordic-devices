import { useEffect, useState, type FormEvent } from 'react'

type NavItem = { id: string; label: string }

type Employee = {
  name: string
  role: string
  description: string
  email: string
  initials: string
}

type Service = {
  icon: string
  title: string
  description: string
}

type Product = {
  icon: string
  name: string
  description: string
  status: 'Tilgjengelig' | 'Populær' | 'For bedrifter'
}

type Persona = {
  icon: string
  title: string
  needs: string
}

type SecurityItem = {
  icon: string
  title: string
  description: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hjem', label: 'Hjem' },
  { id: 'om-oss', label: 'Om oss' },
  { id: 'ansatte', label: 'Ansatte' },
  { id: 'tjenester', label: 'Tjenester' },
  { id: 'produkter', label: 'Produkter' },
  { id: 'brukere', label: 'Brukere' },
  { id: 'sikkerhet', label: 'Sikkerhet' },
  { id: 'teknisk', label: 'Teknisk' },
  { id: 'kontakt', label: 'Kontakt' },
]

const EMPLOYEES: Employee[] = [
  {
    name: 'Emma Larsen',
    role: 'Daglig leder',
    description:
      'Leder selskapets strategi og kundedialog. Har lang erfaring fra IT-bransjen og bygger Nordic Devices som en pålitelig partner.',
    email: 'emma.larsen@nordicdevices.no',
    initials: 'EL',
  },
  {
    name: 'Jonas Berg',
    role: 'IT-konsulent',
    description:
      'Rådgir kundene om drift, lisenser og infrastruktur. Hjelper bedrifter med å velge løsninger som passer behov og budsjett.',
    email: 'jonas.berg@nordicdevices.no',
    initials: 'JB',
  },
  {
    name: 'Sara Nguyen',
    role: 'Systemutvikler',
    description:
      'Utvikler interne verktøy og webapplikasjoner. Jobber med React, TypeScript og containerbaserte miljøer.',
    email: 'sara.nguyen@nordicdevices.no',
    initials: 'SN',
  },
  {
    name: 'Markus Holm',
    role: 'Nettverksadministrator',
    description:
      'Setter opp og vedlikeholder nettverk, DHCP, brannmur og rutere. Sørger for at infrastrukturen er stabil og sikker.',
    email: 'markus.holm@nordicdevices.no',
    initials: 'MH',
  },
  {
    name: 'Ingrid Solheim',
    role: 'Sikkerhetsrådgiver',
    description:
      'Følger opp tilgangsstyring, passordpolicy og rutiner for sikker drift. Gjennomfører risikovurderinger for kunder.',
    email: 'ingrid.solheim@nordicdevices.no',
    initials: 'IS',
  },
  {
    name: 'Anders Vik',
    role: 'DevOps-ingeniør',
    description:
      'Automatiserer leveranser med Docker og CI/CD. Sørger for at applikasjoner kan startes og flyttes kontrollert.',
    email: 'anders.vik@nordicdevices.no',
    initials: 'AV',
  },
]

const SERVICES: Service[] = [
  {
    icon: '⚙️',
    title: 'IT-drift og support',
    description:
      'Daglig drift, overvåkning og brukerstøtte. Vi sørger for at systemer er tilgjengelige og at ansatte får hjelp når de trenger det.',
  },
  {
    icon: '🌐',
    title: 'Nettverksoppsett',
    description:
      'Konfigurasjon av rutere, switcher, DHCP og VLAN. Vi designer nettverk som er trygge, oversiktlige og enkle å skalere.',
  },
  {
    icon: '🖥️',
    title: 'Virtualisering',
    description:
      'Virtuelle maskiner for utvikling, test og produksjon. Bedre ressursutnyttelse og enklere drift av flere tjenester.',
  },
  {
    icon: '📦',
    title: 'Containerteknologi',
    description:
      'Vi pakker applikasjoner med Docker, slik at de kan startes likt på laptop, server og i sky.',
  },
  {
    icon: '👥',
    title: 'Brukeradministrasjon',
    description:
      'Oppretting, vedlikehold og deaktivering av brukerkontoer. Tydelig kontroll på roller og tilganger.',
  },
  {
    icon: '🔐',
    title: 'Sikkerhet og tilgangsstyring',
    description:
      'Sterke passord, MFA, brannmur og logging. Vi hjelper kundene å etterleve gode sikkerhetsrutiner.',
  },
  {
    icon: '🚀',
    title: 'Web- og applikasjonsdrift',
    description:
      'Drift av interne og eksterne webapplikasjoner. Stabil leveranse, oppdateringer og enkel videreutvikling.',
  },
  {
    icon: '💾',
    title: 'Backup og dokumentasjon',
    description:
      'Sikkerhetskopier, gjenoppretting og oppdatert dokumentasjon. Forutsigbar drift selv ved uventede hendelser.',
  },
]

const PRODUCTS: Product[] = [
  {
    icon: '💻',
    name: 'Bærbare PC-er',
    description:
      'Forhåndskonfigurerte bærbare med standard programvare, antivirus og tilgang til bedriftens nettverk.',
    status: 'Populær',
  },
  {
    icon: '🖱️',
    name: 'Arbeidsstasjoner',
    description:
      'Stasjonære maskiner for kontor, utvikling og tyngre arbeidsoppgaver. Levert med oppsett og garanti.',
    status: 'Tilgjengelig',
  },
  {
    icon: '🖥️',
    name: 'Skjermer og docking',
    description:
      'Skjermer, dockingstasjoner og periferiutstyr for fleksible arbeidsplasser hjemme og på kontor.',
    status: 'Tilgjengelig',
  },
  {
    icon: '📡',
    name: 'Nettverksutstyr',
    description:
      'Switcher, aksesspunkt og rutere som settes opp med riktig konfigurasjon for ditt nettverk.',
    status: 'For bedrifter',
  },
  {
    icon: '🗄️',
    name: 'Serverressurser',
    description:
      'Virtuelle og fysiske servere for fil, web, database og interne tjenester. Drift kan inkluderes.',
    status: 'For bedrifter',
  },
  {
    icon: '🛡️',
    name: 'Sikkerhetsløsninger',
    description:
      'Brannmur, VPN og endepunktsbeskyttelse satt opp etter beste praksis for små og mellomstore bedrifter.',
    status: 'Populær',
  },
]

const PERSONAS: Persona[] = [
  {
    icon: '🛠️',
    title: 'Administrator',
    needs:
      'Administrerer brukere, nettverk, servere og tilgang. Trenger oversikt, klare rutiner og pålitelig dokumentasjon.',
  },
  {
    icon: '👩‍💻',
    title: 'Utvikler',
    needs:
      'Tester webapplikasjon lokalt og kjører løsningen i Docker. Trenger rask oppstart og forutsigbart miljø.',
  },
  {
    icon: '👤',
    title: 'Ansatt',
    needs:
      'Finner informasjon om tjenester, produkter og interne ressurser. Ønsker en tydelig og enkel side å navigere.',
  },
  {
    icon: '🤝',
    title: 'Kunde',
    needs:
      'Leser om tjenester og kontakter Nordic Devices. Vil raskt forstå hva selskapet leverer og hvordan ta kontakt.',
  },
]

const SECURITY_ITEMS: SecurityItem[] = [
  {
    icon: '🔑',
    title: 'SSH for sikker servertilkobling',
    description:
      'All ekstern administrasjon av serverne skjer over SSH med nøkkelbasert pålogging i stedet for passord.',
  },
  {
    icon: '🧱',
    title: 'Brannmur og begrensede porter',
    description:
      'Kun nødvendige porter er åpne ut mot nettet. Resten blokkeres for å redusere angrepsflaten.',
  },
  {
    icon: '🔒',
    title: 'Sterke passord og MFA',
    description:
      'Vi krever lange, unike passord og anbefaler tofaktorautentisering for kritiske kontoer.',
  },
  {
    icon: '🪪',
    title: 'Tilgangsstyring',
    description:
      'Brukere får kun de rettighetene de trenger for sin rolle. Tilganger fjernes når roller endres.',
  },
  {
    icon: '🌍',
    title: 'HTTPS / TLS i produksjon',
    description:
      'I produksjon anbefales HTTPS med gyldig sertifikat slik at trafikken er kryptert ende til ende.',
  },
  {
    icon: '🐳',
    title: 'Docker for kontrollert drift',
    description:
      'Applikasjoner pakkes i containere, slik at løsningen kan flyttes og startes likt mellom miljøer.',
  },
  {
    icon: '📶',
    title: 'DHCP-scope skiller adresser',
    description:
      'DHCP gir adresser til klienter i et avgrenset område, mens servere har faste adresser utenfor scopet.',
  },
]

const TECH_INFO: { label: string; value: string }[] = [
  { label: 'Windows Server', value: '10.10.10.10' },
  { label: 'Ubuntu Server', value: '10.10.10.20' },
  { label: 'Nettverk', value: '10.10.10.0/26' },
  { label: 'DHCP-område', value: '10.10.10.30 – 10.10.10.60' },
  { label: 'Lease time', value: '6 timer' },
  { label: 'Webapplikasjon', value: 'React + Vite' },
  { label: 'Container', value: 'Docker' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('hjem')

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY + 120
      let current = 'hjem'
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id)
        if (el && el.offsetTop <= offset) {
          current = item.id
        }
      }
      setActiveSection(current)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMenuOpen(false)
  }

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    alert('Takk for henvendelsen! Vi tar kontakt så snart som mulig.')
    event.currentTarget.reset()
  }

  return (
    <div className="app">
      <header className="site-header">
        <div className="container header-inner">
          <a
            href="#hjem"
            className="logo"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('hjem')
            }}
          >
            <span className="logo-mark" aria-hidden="true">
              ND
            </span>
            <span className="logo-text">
              Nordic <strong>Devices</strong> AS
            </span>
          </a>

          <button
            className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
            aria-label="Åpne meny"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? 'is-active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.id)
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section id="hjem" className="hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="grid-overlay" />
          </div>
          <div className="container hero-inner">
            <div className="hero-text">
              <span className="eyebrow">IT-utvikling · Drift · Sikkerhet</span>
              <h1>
                Moderne IT-løsninger for små og mellomstore bedrifter
              </h1>
              <p>
                Nordic Devices AS leverer IT-utstyr, driftstjenester, sikkerhet
                og digitale løsninger som er enkle å administrere og videreutvikle.
              </p>
              <div className="hero-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleNavClick('tjenester')}
                >
                  Se tjenester
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => handleNavClick('kontakt')}
                >
                  Kontakt oss
                </button>
              </div>
              <ul className="hero-stats">
                <li>
                  <strong>100%</strong>
                  <span>Norsk drift</span>
                </li>
                <li>
                  <strong>24/7</strong>
                  <span>Overvåkning</span>
                </li>
                <li>
                  <strong>SMB</strong>
                  <span>Vår spesialitet</span>
                </li>
              </ul>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="visual-card card-server">
                <div className="card-head">
                  <span className="dot dot-green" />
                  <span>Ubuntu Server</span>
                </div>
                <div className="card-body">
                  <code>10.10.10.20</code>
                  <code>SSH · Docker · Nginx</code>
                </div>
              </div>
              <div className="visual-card card-network">
                <div className="card-head">
                  <span className="dot dot-blue" />
                  <span>Nettverk</span>
                </div>
                <div className="card-body">
                  <code>10.10.10.0/26</code>
                  <code>DHCP 30–60</code>
                </div>
              </div>
              <div className="visual-card card-cloud">
                <div className="card-head">
                  <span className="dot dot-cyan" />
                  <span>Webapp</span>
                </div>
                <div className="card-body">
                  <code>React + Vite</code>
                  <code>kjører i container</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="om-oss" className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Om oss</span>
              <h2>En nordisk IT-partner du kan stole på</h2>
              <p className="lead">
                Nordic Devices AS er et nytt norsk IT-selskap som hjelper små og
                mellomstore bedrifter med å bygge moderne, trygge og fleksible
                IT-miljøer. Vi kombinerer solid håndverk med moderne teknologi.
              </p>
            </div>

            <div className="about-grid">
              <div className="about-card">
                <h3>Hva vi leverer</h3>
                <ul className="check-list">
                  <li>IT-utstyr og arbeidsplassløsninger</li>
                  <li>Digitale tjenester og webapplikasjoner</li>
                  <li>Virtualisering av servere og tjenester</li>
                  <li>Containerteknologi med Docker</li>
                  <li>Sikre nettverksløsninger</li>
                  <li>Brukeradministrasjon og tilgangsstyring</li>
                </ul>
              </div>
              <div className="about-card about-card-accent">
                <h3>Vår tilnærming</h3>
                <p>
                  Vi tror på enkle, dokumenterte løsninger som kunden selv kan
                  forstå og videreutvikle. Vi unngår unødvendig kompleksitet og
                  velger teknologi som er moden, åpen og veldokumentert.
                </p>
                <p>
                  Sikkerhet er ikke et tilleggsprodukt, men en del av hvordan vi
                  designer og drifter systemene fra dag én.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="ansatte" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Ansatte</span>
              <h2>Menneskene bak Nordic Devices</h2>
              <p className="lead">
                Et lite, men erfarent team som dekker drift, utvikling, nettverk
                og sikkerhet.
              </p>
            </div>

            <div className="grid grid-cards">
              {EMPLOYEES.map((employee) => (
                <article key={employee.email} className="employee-card">
                  <div className="avatar" aria-hidden="true">
                    {employee.initials}
                  </div>
                  <h3>{employee.name}</h3>
                  <p className="role">{employee.role}</p>
                  <p className="description">{employee.description}</p>
                  <a className="email-link" href={`mailto:${employee.email}`}>
                    {employee.email}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="tjenester" className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Tjenester</span>
              <h2>Tjenester som dekker hele IT-hverdagen</h2>
              <p className="lead">
                Fra dag-til-dag drift til moderne containerplattformer — vi
                hjelper deg å sette opp og holde systemene i gang.
              </p>
            </div>

            <div className="grid grid-cards">
              {SERVICES.map((service) => (
                <article key={service.title} className="service-card">
                  <div className="service-icon" aria-hidden="true">
                    {service.icon}
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="produkter" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Produkter</span>
              <h2>Utstyr og ressurser for bedrifter</h2>
              <p className="lead">
                Vi leverer og administrerer utstyret bedriften din trenger,
                ferdig konfigurert og klart til bruk.
              </p>
            </div>

            <div className="grid grid-cards">
              {PRODUCTS.map((product) => (
                <article key={product.name} className="product-card">
                  <div className="product-top">
                    <span className="product-icon" aria-hidden="true">
                      {product.icon}
                    </span>
                    <span
                      className={`badge badge-${product.status
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace('æ', 'a')
                        .replace('ø', 'o')
                        .replace('å', 'a')}`}
                    >
                      {product.status}
                    </span>
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="brukere" className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Brukere av systemet</span>
              <h2>Hvem bruker løsningen?</h2>
              <p className="lead">
                Webapplikasjonen og infrastrukturen brukes av flere ulike roller.
                Her er de fire viktigste persona-ene.
              </p>
            </div>

            <div className="grid grid-cards grid-personas">
              {PERSONAS.map((persona, index) => (
                <article key={persona.title} className="persona-card">
                  <div className="persona-step">0{index + 1}</div>
                  <div className="persona-icon" aria-hidden="true">
                    {persona.icon}
                  </div>
                  <h3>{persona.title}</h3>
                  <p>{persona.needs}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="sikkerhet" className="section section-dark">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow eyebrow-light">Sikkerhet</span>
              <h2>Sikkerhet er bygget inn fra start</h2>
              <p className="lead lead-light">
                Vi følger anerkjente prinsipper for sikker drift og legger til
                rette for at kundene enkelt kan etterleve dem.
              </p>
            </div>

            <div className="grid grid-cards">
              {SECURITY_ITEMS.map((item) => (
                <article key={item.title} className="security-card">
                  <div className="security-icon" aria-hidden="true">
                    {item.icon}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="teknisk" className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Teknisk oversikt</span>
              <h2>Testmiljø og infrastruktur</h2>
              <p className="lead">
                En forenklet oversikt over miljøet løsningen er bygget og testet i.
              </p>
            </div>

            <div className="tech-dashboard">
              <div className="tech-panel">
                <header>
                  <span className="dot dot-green" />
                  <h3>Servere</h3>
                </header>
                <div className="tech-row">
                  <span>Windows Server</span>
                  <code>10.10.10.10</code>
                </div>
                <div className="tech-row">
                  <span>Ubuntu Server</span>
                  <code>10.10.10.20</code>
                </div>
              </div>

              <div className="tech-panel">
                <header>
                  <span className="dot dot-blue" />
                  <h3>Nettverk</h3>
                </header>
                <div className="tech-row">
                  <span>Subnett</span>
                  <code>10.10.10.0/26</code>
                </div>
                <div className="tech-row">
                  <span>DHCP-område</span>
                  <code>10.10.10.30 – 10.10.10.60</code>
                </div>
                <div className="tech-row">
                  <span>Lease time</span>
                  <code>6 timer</code>
                </div>
              </div>

              <div className="tech-panel">
                <header>
                  <span className="dot dot-cyan" />
                  <h3>Applikasjon</h3>
                </header>
                <div className="tech-row">
                  <span>Frontend</span>
                  <code>React + Vite</code>
                </div>
                <div className="tech-row">
                  <span>Språk</span>
                  <code>TypeScript</code>
                </div>
                <div className="tech-row">
                  <span>Container</span>
                  <code>Docker</code>
                </div>
              </div>
            </div>

            <div className="tech-summary">
              <h3>Komplett oppsummering</h3>
              <ul>
                {TECH_INFO.map((item) => (
                  <li key={item.label}>
                    <span>{item.label}</span>
                    <code>{item.value}</code>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="kontakt" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Kontakt</span>
              <h2>Ta kontakt med Nordic Devices</h2>
              <p className="lead">
                Vi svarer raskt på henvendelser og setter gjerne opp et
                uforpliktende møte.
              </p>
            </div>

            <div className="contact-grid">
              <div className="contact-info">
                <div className="info-card">
                  <span className="info-icon" aria-hidden="true">📧</span>
                  <div>
                    <p className="info-label">E-post</p>
                    <a href="mailto:kontakt@nordicdevices.no">
                      kontakt@nordicdevices.no
                    </a>
                  </div>
                </div>
                <div className="info-card">
                  <span className="info-icon" aria-hidden="true">📞</span>
                  <div>
                    <p className="info-label">Telefon</p>
                    <a href="tel:+4722000000">+47 22 00 00 00</a>
                  </div>
                </div>
                <div className="info-card">
                  <span className="info-icon" aria-hidden="true">📍</span>
                  <div>
                    <p className="info-label">Adresse</p>
                    <p className="info-value">Hamar, Norge</p>
                  </div>
                </div>
                <div className="info-card">
                  <span className="info-icon" aria-hidden="true">🕒</span>
                  <div>
                    <p className="info-label">Åpningstid</p>
                    <p className="info-value">Man – Fre · 08:00 – 16:00</p>
                  </div>
                </div>
              </div>

              <form className="contact-form" onSubmit={handleContactSubmit}>
                <h3>Send en henvendelse</h3>
                <label>
                  <span>Navn</span>
                  <input type="text" name="navn" placeholder="Ditt fulle navn" required />
                </label>
                <label>
                  <span>E-post</span>
                  <input type="email" name="epost" placeholder="navn@bedrift.no" required />
                </label>
                <label>
                  <span>Melding</span>
                  <textarea
                    name="melding"
                    placeholder="Fortell oss kort hva du trenger hjelp med..."
                    rows={5}
                    required
                  />
                </label>
                <button className="btn btn-primary" type="submit">
                  Send forespørsel
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <span className="logo-mark" aria-hidden="true">ND</span>
            <div>
              <p className="footer-title">Nordic Devices AS</p>
              <p className="footer-sub">Moderne IT for nordiske bedrifter</p>
            </div>
          </div>
          <p className="footer-copy">
            © 2026 Nordic Devices AS. Utviklet som del av ITK2004 prøveeksamen.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
