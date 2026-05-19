import { useMemo, useState } from 'react'
import type { CatalogCategory, CatalogItem } from '../../types'
import { formatCurrency } from '../../utils/formatCurrency'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { EmptyState } from '../ui/EmptyState'
import { FilterChips } from '../ui/FilterChips'

type Props = {
  items: CatalogItem[]
  categories: CatalogCategory[]
  searchLabel: string
  searchPlaceholder: string
  ariaLabel: string
  addLabel: string
  onAdd: (item: CatalogItem) => void
}

export function CatalogGrid({
  items,
  categories,
  searchLabel,
  searchPlaceholder,
  ariaLabel,
  addLabel,
  onAdd,
}: Props) {
  const filterOptions = useMemo<(CatalogCategory | 'Alle')[]>(
    () => ['Alle', ...categories],
    [categories],
  )
  const [filter, setFilter] = useState<CatalogCategory | 'Alle'>('Alle')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return items.filter((item) => {
      const matchesCategory = filter === 'Alle' || item.category === filter
      const matchesQuery =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.features.some((feature) =>
          feature.toLowerCase().includes(term),
        )
      return matchesCategory && matchesQuery
    })
  }, [items, filter, query])

  return (
    <>
      <div className="filter-bar" role="group" aria-label={ariaLabel}>
        <label className="filter-search">
          <span className="visually-hidden">{searchLabel}</span>
          <input
            type="search"
            placeholder={searchPlaceholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <FilterChips
          label={ariaLabel}
          options={filterOptions}
          value={filter}
          onChange={setFilter}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Ingen treff"
          description="Juster filteret eller søkeordet og prøv igjen."
        />
      ) : (
        <div className="grid grid-cards">
          {filtered.map((item) => (
            <article key={item.id} className="catalog-card">
              <div className="catalog-top">
                <div className="catalog-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <Badge status={item.status} />
              </div>
              <span className="catalog-cat">{item.category}</span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <ul className="catalog-features" aria-label="Inkludert">
                {item.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="catalog-footer">
                <span className="price">
                  Fra <strong>{formatCurrency(item.priceFrom)}</strong>
                  <span className="price-unit">{item.unit}</span>
                </span>
                <Button variant="small" onClick={() => onAdd(item)}>
                  {addLabel}
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  )
}
