import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CartItem, CatalogItem } from '../types'

const STORAGE_KEY = 'nd-cart-v2'

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => loadCart())

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* ignore quota errors */
    }
  }, [items])

  const add = useCallback((source: CatalogItem) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.id === source.id)
      if (existing) {
        return prev.map((it) =>
          it.id === source.id ? { ...it, quantity: it.quantity + 1 } : it,
        )
      }
      return [
        ...prev,
        {
          id: source.id,
          name: source.name,
          type: source.type,
          category: source.category,
          priceFrom: source.priceFrom,
          unit: source.unit,
          quantity: 1,
        },
      ]
    })
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, quantity } : it))
        .filter((it) => it.quantity > 0),
    )
  }, [])

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const total = useMemo(
    () => items.reduce((sum, it) => sum + it.priceFrom * it.quantity, 0),
    [items],
  )
  const count = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity, 0),
    [items],
  )

  return { items, add, updateQuantity, remove, clear, total, count }
}

export type UseCartReturn = ReturnType<typeof useCart>
