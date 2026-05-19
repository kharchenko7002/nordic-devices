import { useEffect, useState } from 'react'
import { CartDrawer } from './components/cart/CartDrawer'
import { CookieBanner } from './components/cookie/CookieBanner'
import { CookieSettings } from './components/cookie/CookieSettings'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { SkipLink } from './components/layout/SkipLink'
import { AboutSection } from './components/sections/AboutSection'
import { ContactSection } from './components/sections/ContactSection'
import { EmployeesSection } from './components/sections/EmployeesSection'
import { HeroSection } from './components/sections/HeroSection'
import { OrderSection } from './components/sections/OrderSection'
import { ProductsSection } from './components/sections/ProductsSection'
import { SecuritySection } from './components/sections/SecuritySection'
import { ServicesSection } from './components/sections/ServicesSection'
import { TechnicalSection } from './components/sections/TechnicalSection'
import { UsersSection } from './components/sections/UsersSection'
import { NAV_ITEMS } from './data/navigation'
import { useActiveSection, scrollToSection } from './hooks/useActiveSection'
import { useCart } from './hooks/useCart'
import { useCookieConsent } from './hooks/useCookieConsent'
import type { CatalogItem } from './types'

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false)
  const [toast, setToast] = useState('')

  const cart = useCart()
  const consent = useCookieConsent()
  const activeSection = useActiveSection(NAV_ITEMS)

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 3000)
    return () => window.clearTimeout(timer)
  }, [toast])

  const handleNavigate = (id: string) => {
    scrollToSection(id)
  }

  const handleAdd = (item: CatalogItem) => {
    cart.add(item)
    setToast(`${item.name} lagt i handlekurven.`)
  }

  return (
    <div className="app">
      <SkipLink />

      <Header
        activeSection={activeSection}
        cartCount={cart.count}
        cartTotal={cart.total}
        onNavigate={handleNavigate}
        onOpenCart={() => setCartOpen(true)}
      />

      <main id="hovedinnhold">
        <HeroSection onNavigate={handleNavigate} />
        <AboutSection />
        <EmployeesSection />
        <ServicesSection onAdd={handleAdd} />
        <ProductsSection onAdd={handleAdd} />
        <OrderSection
          cartCount={cart.count}
          onOpenCart={() => setCartOpen(true)}
          onNavigate={handleNavigate}
        />
        <UsersSection />
        <SecuritySection />
        <TechnicalSection />
        <ContactSection />
      </main>

      <Footer onOpenCookieSettings={() => setCookieSettingsOpen(true)} />

      <div
        className="toast-region"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {toast}
      </div>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
      />

      <CookieBanner
        open={!consent.hasDecided && !cookieSettingsOpen}
        onAcceptAll={consent.acceptAll}
        onAcceptNecessary={consent.acceptNecessary}
        onOpenSettings={() => setCookieSettingsOpen(true)}
      />

      <CookieSettings
        open={cookieSettingsOpen}
        preferences={consent.preferences}
        onSave={consent.savePreferences}
        onAcceptAll={() => {
          consent.acceptAll()
          setCookieSettingsOpen(false)
        }}
        onClose={() => setCookieSettingsOpen(false)}
      />
    </div>
  )
}

export default App
