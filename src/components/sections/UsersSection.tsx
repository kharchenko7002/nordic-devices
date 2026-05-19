import { ACTORS, SERVICE_COMPONENTS, USER_STORIES } from '../../data/userStories'
import { SectionHeader } from '../ui/SectionHeader'

export function UsersSection() {
  return (
    <section
      id="brukere"
      className="section section-alt"
      aria-labelledby="brukere-title"
    >
      <div className="container">
        <SectionHeader
          id="brukere-title"
          eyebrow="Brukere og aktører"
          title="Hvem bruker løsningen?"
          lead="Brukerhistoriene viser hvilke behov løsningen dekker for ulike roller, mens aktørdiagrammet forklarer hvem som snakker med hvem."
        />

        <h3 className="subsection-title">Brukerhistorier</h3>
        <ul className="story-grid">
          {USER_STORIES.map((story, index) => (
            <li key={story.id} className="story-card">
              <span className="story-num">
                US-{String(index + 1).padStart(2, '0')}
              </span>
              <p>
                <strong>Som {story.role}</strong> ønsker jeg å {story.goal},{' '}
                <em>slik at {story.benefit}</em>.
              </p>
            </li>
          ))}
        </ul>

        <h3 className="subsection-title">Aktører</h3>
        <div className="actor-grid">
          {ACTORS.map((actor) => (
            <article key={actor.name} className="actor-card">
              <div className="actor-icon" aria-hidden="true">{actor.icon}</div>
              <h4>{actor.name}</h4>
              <p>{actor.description}</p>
            </article>
          ))}
        </div>

        <h3 className="subsection-title">Dataflyt</h3>
        <div className="flow-diagram" aria-label="Dataflyt mellom aktører">
          <div className="flow-node">Kunde</div>
          <div className="flow-arrow" aria-hidden="true">↓</div>
          <div className="flow-node">React webapplikasjon</div>
          <div className="flow-arrow" aria-hidden="true">↓</div>
          <div className="flow-node">Bestillingsskjema / handlekurv</div>
          <div className="flow-arrow" aria-hidden="true">↓</div>
          <div className="flow-node flow-node-future">
            Backend API (fremtidig)
          </div>
          <div className="flow-arrow" aria-hidden="true">↓</div>
          <div className="flow-node flow-node-future">
            Betalingsleverandør (fremtidig)
          </div>
          <div className="flow-arrow" aria-hidden="true">↓</div>
          <div className="flow-node flow-node-future">
            Database / ordrehåndtering (fremtidig)
          </div>
        </div>

        <div className="service-components">
          <h3>Tjenestekomponenter</h3>
          <ul>
            {SERVICE_COMPONENTS.map((component) => (
              <li key={component.name}>
                <span
                  className={`status-pill ${
                    component.status === 'Nå' ? 'is-now' : 'is-future'
                  }`}
                >
                  {component.status}
                </span>
                <div>
                  <strong>{component.name}</strong>
                  <p>{component.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
