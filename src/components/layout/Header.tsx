import { useState } from 'react'
import { NAV_ITEMS } from '../../data/navigation'
import { CartButton } from '../cart/CartButton'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

type Props = {
  activeSection: string
  cartCount: number
  cartTotal: number
  onNavigate: (id: string) => void
  onOpenCart: () => void
}

export function Header({
  activeSection,
  cartCount,
  cartTotal,
  onNavigate,
  onOpenCart,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavClick = (id: string) => {
    onNavigate(id)
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo onClick={() => handleNavClick('hjem')} />

        <nav className="main-nav-desktop" aria-label="Hovedmeny">
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
                  handleNavClick(item.id)
                }}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="header-actions">
          <CartButton
            count={cartCount}
            total={cartTotal}
            onClick={onOpenCart}
          />
          <button
            type="button"
            className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
            aria-label={menuOpen ? 'Lukk meny' : 'Åpne meny'}
            aria-expanded={menuOpen}
            aria-controls="mobil-meny"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <MobileMenu
        open={menuOpen}
        activeSection={activeSection}
        onNavigate={handleNavClick}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  )
}
