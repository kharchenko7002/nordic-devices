import { useMemo, useState } from 'react'
import type { EmployeeCategory } from '../../types'
import { EMPLOYEES, EMPLOYEE_DEPARTMENTS } from '../../data/employees'
import { EmptyState } from '../ui/EmptyState'
import { FilterChips } from '../ui/FilterChips'
import { SectionHeader } from '../ui/SectionHeader'

type Filter = EmployeeCategory | 'Alle'

const FILTERS: Filter[] = ['Alle', ...EMPLOYEE_DEPARTMENTS]

export function EmployeesSection() {
  const [filter, setFilter] = useState<Filter>('Alle')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return EMPLOYEES.filter((employee) => {
      const matchesDept = filter === 'Alle' || employee.category === filter
      const matchesQuery =
        !term ||
        employee.name.toLowerCase().includes(term) ||
        employee.role.toLowerCase().includes(term) ||
        employee.skills.some((skill) => skill.toLowerCase().includes(term))
      return matchesDept && matchesQuery
    })
  }, [filter, query])

  return (
    <section
      id="ansatte"
      className="section section-alt"
      aria-labelledby="ansatte-title"
    >
      <div className="container">
        <SectionHeader
          id="ansatte-title"
          eyebrow="Ansatte"
          title="Menneskene bak Nordic Devices"
          lead="Et lite, men erfarent team som dekker ledelse, drift, utvikling, sikkerhet og support."
        />

        <div className="filter-bar" role="group" aria-label="Filtrer ansatte">
          <label className="filter-search">
            <span className="visually-hidden">Søk ansatte</span>
            <input
              type="search"
              placeholder="Søk på navn, rolle eller kompetanse"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <FilterChips
            label="Avdeling"
            options={FILTERS}
            value={filter}
            onChange={setFilter}
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="Ingen ansatte matcher søket"
            description="Prøv et annet søkeord eller velg en annen avdeling."
          />
        ) : (
          <div className="grid grid-cards">
            {filtered.map((employee) => (
              <article key={employee.id} className="employee-card">
                <div className="employee-top">
                  <div className="avatar" aria-hidden="true">
                    {employee.initials}
                  </div>
                  <span className={`tag tag-${employee.category.toLowerCase()}`}>
                    {employee.category}
                  </span>
                </div>
                <h3>{employee.name}</h3>
                <p className="role">{employee.role}</p>
                <p className="description">{employee.description}</p>
                <ul className="skills" aria-label="Kompetanseområder">
                  {employee.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
                <a className="email-link" href={`mailto:${employee.email}`}>
                  {employee.email}
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
