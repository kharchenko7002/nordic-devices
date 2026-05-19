import { SectionHeader } from '../ui/SectionHeader'

export function AboutSection() {
  return (
    <section id="om-oss" className="section" aria-labelledby="om-oss-title">
      <div className="container">
        <SectionHeader
          id="om-oss-title"
          eyebrow="Om oss"
          title="En nordisk IT-partner du kan stole på"
          lead={
            <>
              Nordic Devices AS er et norsk IT-selskap som hjelper små og
              mellomstore bedrifter med å bygge moderne, trygge og fleksible
              IT-miljøer. Vi kombinerer solid håndverk med moderne teknologi.
            </>
          }
        />

        <div className="about-grid">
          <article className="about-card">
            <h3>Hva vi leverer</h3>
            <ul className="check-list">
              <li>IT-utstyr og arbeidsplassløsninger</li>
              <li>Digitale tjenester og webapplikasjoner</li>
              <li>Virtualisering av servere og tjenester</li>
              <li>Containerteknologi med Docker</li>
              <li>Sikre nettverksløsninger</li>
              <li>Brukeradministrasjon og tilgangsstyring</li>
            </ul>
          </article>
          <article className="about-card about-card-accent">
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
          </article>
        </div>
      </div>
    </section>
  )
}
