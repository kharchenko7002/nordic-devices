import type { CatalogItem } from '../../types'
import { PRODUCTS, PRODUCT_CATEGORIES } from '../../data/products'
import { SectionHeader } from '../ui/SectionHeader'
import { CatalogGrid } from './CatalogGrid'

type Props = {
  onAdd: (item: CatalogItem) => void
}

export function ProductsSection({ onAdd }: Props) {
  return (
    <section
      id="produkter"
      className="section section-alt"
      aria-labelledby="produkter-title"
    >
      <div className="container">
        <SectionHeader
          id="produkter-title"
          eyebrow="Produkter"
          title="Utstyr og ressurser for bedrifter"
          lead="Vi leverer og administrerer utstyret bedriften din trenger, ferdig konfigurert og klart til bruk."
        />

        <CatalogGrid
          items={PRODUCTS}
          categories={PRODUCT_CATEGORIES}
          searchLabel="Søk produkter"
          searchPlaceholder="Søk på produkt, kategori eller funksjon"
          ariaLabel="Filtrer produkter"
          addLabel="Legg i handlekurv"
          onAdd={onAdd}
        />
      </div>
    </section>
  )
}
