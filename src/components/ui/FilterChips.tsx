type Props<T extends string> = {
  label: string
  options: T[]
  value: T
  onChange: (next: T) => void
}

export function FilterChips<T extends string>({
  label,
  options,
  value,
  onChange,
}: Props<T>) {
  return (
    <div className="filter-chips" role="tablist" aria-label={label}>
      {options.map((option) => {
        const isActive = option === value
        return (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`chip ${isActive ? 'is-active' : ''}`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
