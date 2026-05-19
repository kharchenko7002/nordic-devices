import { Button } from '../ui/Button'

type Props = {
  onNavigate: (id: string) => void
}

export function HeroSection({ onNavigate }: Props) {
  return (
    <section id="hjem" className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="grid-overlay" />
      </div>
      <div className="container hero-inner">
        <div className="hero-text">
          <span className="eyebrow">IT-utvikling · Drift · Sikkerhet</span>
          <h1 id="hero-title">
            Moderne IT-løsninger for små og mellomstore bedrifter
          </h1>
          <p>
            Nordic Devices AS leverer IT-utstyr, driftstjenester, sikkerhet
            og digitale løsninger som er enkle å administrere og videreutvikle.
          </p>
          <div className="hero-actions">
            <Button variant="primary" onClick={() => onNavigate('tjenester')}>
              Se tjenester
            </Button>
            <Button variant="ghost" onClick={() => onNavigate('kontakt')}>
              Kontakt oss
            </Button>
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
  )
}
