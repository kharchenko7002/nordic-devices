import { useCallback, useState } from 'react'
import type { OrderForm, OrderFormErrors } from '../types'
import { validateOrderForm } from '../utils/validation'

export const EMPTY_ORDER_FORM: OrderForm = {
  bedriftsnavn: '',
  kontaktperson: '',
  epost: '',
  telefon: '',
  adresse: '',
  kommentar: '',
  samtykke: false,
}

export function useOrderForm() {
  const [form, setForm] = useState<OrderForm>(EMPTY_ORDER_FORM)
  const [errors, setErrors] = useState<OrderFormErrors>({})

  const setField = useCallback(
    <K extends keyof OrderForm>(field: K, value: OrderForm[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }))
      setErrors((prev) => {
        if (!(field in prev)) return prev
        const next = { ...prev }
        delete next[field]
        return next
      })
    },
    [],
  )

  const validate = useCallback((): OrderFormErrors => {
    const result = validateOrderForm(form)
    setErrors(result)
    return result
  }, [form])

  const reset = useCallback(() => {
    setForm(EMPTY_ORDER_FORM)
    setErrors({})
  }, [])

  return { form, errors, setField, validate, reset }
}
