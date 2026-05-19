import { useEffect, useState } from 'react'
import type { NavItem } from '../types'

export function useActiveSection(items: NavItem[], offset = 140): string {
  const [active, setActive] = useState<string>(items[0]?.id ?? '')

  useEffect(() => {
    const handleScroll = () => {
      const probe = window.scrollY + offset
      let current = items[0]?.id ?? ''
      for (const item of items) {
        const el = document.getElementById(item.id)
        if (el && el.offsetTop <= probe) {
          current = item.id
        }
      }
      setActive(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [items, offset])

  return active
}

export function scrollToSection(id: string): void {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
