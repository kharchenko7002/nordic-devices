import type { CatalogItem } from '../../types'
import { SERVICES, SERVICE_CATEGORIES } from '../../data/services'
import { SectionHeader } from '../ui/SectionHeader'
import { CatalogGrid } from './CatalogGrid'

type Props = {
  onAdd: (item: CatalogItem) => void
}

export function ServicesSection({ onAdd }: Props) {
  return (
    <section id="tjenester" className="section" aria-labelledby="tjenester-title">
      <div className="container">
        <SectionHeader
          id="tjenester-title"
          eyebrow="Tjenester"
          title="Tjenester som dekker hele IT-hverdagen"
          lead="Fra dag-til-dag drift til moderne containerplattformer — vi hjelper deg å sette opp og holde systemene i gang."
        />

        <CatalogGrid
          items={SERVICES}
          categories={SERVICE_CATEGORIES}
          searchLabel="Søk tjenester"
          searchPlaceholder="Søk på tjeneste, kompetanse eller område"
          ariaLabel="Filtrer tjenester"
          addLabel="Bestill tjeneste"
          onAdd={onAdd}
        />
      </div>
    </section>
  )
}
