import { useEffect } from 'react'
import { NAV_ITEMS } from '../../data/navigation'

type Props = {
  open: boolean
  activeSection: string
  onNavigate: (id: string) => void
  onClose: () => void
}

export function MobileMenu({ open, activeSection, onNavigate, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  return (
    <nav
      id="mobil-meny"
      className={`mobile-nav ${open ? 'is-open' : ''}`}
      aria-label="Hovedmeny (mobil)"
      aria-hidden={!open}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.id
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={isActive ? 'is-active' : ''}
            aria-current={isActive ? 'true' : undefined}
            onClick={(e) => {
              e.preventDefault()
              onNavigate(item.id)
            }}
            tabIndex={open ? 0 : -1}
          >
            {item.label}
          </a>
        )
      })}
    </nav>
  )
}
