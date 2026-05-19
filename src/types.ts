export type EmployeeCategory =
  | 'Ledelse'
  | 'Utvikling'
  | 'Drift'
  | 'Sikkerhet'
  | 'Support'

export type Employee = {
  id: string
  name: string
  role: string
  category: EmployeeCategory
  email: string
  initials: string
  description: string
  skills: string[]
}

export type CatalogCategory =
  | 'IT-utstyr'
  | 'Drift'
  | 'Sikkerhet'
  | 'Utvikling'
  | 'Nettverk'
  | 'Virtualisering'

export type ProductStatus = 'Tilgjengelig' | 'Populær' | 'Anbefalt'

export type CatalogType = 'produkt' | 'tjeneste'

export type CatalogItem = {
  id: string
  type: CatalogType
  name: string
  category: CatalogCategory
  description: string
  priceFrom: number
  unit: string
  status: ProductStatus
  icon: string
  features: string[]
}

export type CartItem = {
  id: string
  name: string
  type: CatalogType
  category: CatalogCategory
  priceFrom: number
  unit: string
  quantity: number
}

export type OrderForm = {
  bedriftsnavn: string
  kontaktperson: string
  epost: string
  telefon: string
  adresse: string
  kommentar: string
  samtykke: boolean
}

export type OrderFormErrors = Partial<Record<keyof OrderForm, string>>

export type OrderStatus = 'Bestilling registrert'

export type Order = {
  ordreNummer: string
  opprettet: string
  items: CartItem[]
  total: number
  form: OrderForm
  status: OrderStatus
}

export type ConsentChoice = 'all' | 'necessary' | null

export type CookiePreferences = {
  necessary: true
  analytics: boolean
  marketing: boolean
}

export type UserStory = {
  id: string
  role: string
  goal: string
  benefit: string
}

export type Actor = {
  name: string
  description: string
  icon: string
}

export type ServiceComponent = {
  name: string
  description: string
  status: 'Nå' | 'Fremtidig'
}

export type NavItem = {
  id: string
  label: string
}

export type TechInfoItem = {
  label: string
  value: string
}
