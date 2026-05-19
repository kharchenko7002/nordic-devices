import {
  APP_INFO,
  NETWORK_INFO,
  SERVER_INFO,
  TECH_INFO,
} from '../../data/technicalInfo'
import { SectionHeader } from '../ui/SectionHeader'

type Panel = {
  title: string
  dotClass: string
  rows: { label: string; value: string }[]
}

const PANELS: Panel[] = [
  { title: 'Servere', dotClass: 'dot dot-green', rows: SERVER_INFO },
  { title: 'Nettverk', dotClass: 'dot dot-blue', rows: NETWORK_INFO },
  { title: 'Applikasjon', dotClass: 'dot dot-cyan', rows: APP_INFO },
]

export function TechnicalSection() {
  return (
    <section id="teknisk" className="section" aria-labelledby="teknisk-title">
      <div className="container">
        <SectionHeader
          id="teknisk-title"
          eyebrow="Teknisk oversikt"
          title="Testmiljø og infrastruktur"
          lead="En forenklet oversikt over miljøet løsningen er bygget og testet i."
        />

        <div className="tech-dashboard">
          {PANELS.map((panel) => (
            <div key={panel.title} className="tech-panel">
              <header>
                <span className={panel.dotClass} />
                <h3>{panel.title}</h3>
              </header>
              {panel.rows.map((row) => (
                <div key={row.label} className="tech-row">
                  <span>{row.label}</span>
                  <code>{row.value}</code>
                </div>
              ))}
            </div>
          ))}
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
  )
}
