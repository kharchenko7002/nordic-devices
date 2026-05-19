import type { CatalogCategory, CatalogItem } from '../types'

export const PRODUCT_CATEGORIES: CatalogCategory[] = [
  'IT-utstyr',
  'Nettverk',
  'Sikkerhet',
  'Virtualisering',
]

export const PRODUCTS: CatalogItem[] = [
  {
    id: 'prod-baerbar-pakke',
    type: 'produkt',
    name: 'Bærbar PC-pakke',
    category: 'IT-utstyr',
    description:
      'Forhåndskonfigurert bærbar PC med kontorprogramvare, antivirus og tilgang til bedriftens nettverk.',
    priceFrom: 12990,
    unit: 'per enhet',
    status: 'Populær',
    icon: '💻',
    features: [
      '15" skjerm, SSD og 16 GB RAM',
      'Forhåndsoppsatt Microsoft 365',
      'Endepunktsbeskyttelse aktivert',
    ],
  },
  {
    id: 'prod-arbeidsstasjon-pro',
    type: 'produkt',
    name: 'Arbeidsstasjon Pro',
    category: 'IT-utstyr',
    description:
      'Stasjonær maskin for utvikling og tyngre arbeidsoppgaver. Levert med oppsett, support og garanti.',
    priceFrom: 18990,
    unit: 'per enhet',
    status: 'Tilgjengelig',
    icon: '🖱️',
    features: [
      'CPU/GPU for utvikling og design',
      '3 års garanti og support',
      'Klar til Active Directory',
    ],
  },
  {
    id: 'prod-skjerm-dock',
    type: 'produkt',
    name: 'Skjerm og dockingpakke',
    category: 'IT-utstyr',
    description:
      'Skjerm, dockingstasjon, tastatur og mus for fleksible arbeidsplasser hjemme og på kontor.',
    priceFrom: 6490,
    unit: 'per pakke',
    status: 'Tilgjengelig',
    icon: '🖥️',
    features: [
      '27" QHD-skjerm',
      'USB-C-docking med lading',
      'Ergonomisk tastatur og mus',
    ],
  },
  {
    id: 'prod-nett-smb',
    type: 'produkt',
    name: 'Nettverkspakke SMB',
    category: 'Nettverk',
    description:
      'Switch, aksesspunkt og ruter for opp til 25 brukere. Settes opp med VLAN og DHCP klart til bruk.',
    priceFrom: 15990,
    unit: 'per pakke',
    status: 'Anbefalt',
    icon: '📡',
    features: [
      'Klar til 25 brukere',
      'VLAN og gjestenett',
      'Sentral administrasjon',
    ],
  },
  {
    id: 'prod-sikkerhetspakke',
    type: 'produkt',
    name: 'Sikkerhetspakke',
    category: 'Sikkerhet',
    description:
      'Brannmur, VPN og endepunktsbeskyttelse satt opp etter beste praksis for små og mellomstore bedrifter.',
    priceFrom: 9990,
    unit: 'per bedrift',
    status: 'Populær',
    icon: '🛡️',
    features: [
      'Brannmur og VPN-konsentrator',
      'Endepunktsbeskyttelse',
      'Logging og varsling',
    ],
  },
  {
    id: 'prod-server-basic',
    type: 'produkt',
    name: 'Serverressurs Basic',
    category: 'Virtualisering',
    description:
      'Virtuell server for fil, web eller intern tjeneste. Inkluderer overvåkning og månedlig backup.',
    priceFrom: 1490,
    unit: 'per måned',
    status: 'Tilgjengelig',
    icon: '🗄️',
    features: [
      '2 vCPU og 4 GB RAM',
      'Overvåkning 24/7',
      'Daglig snapshot, månedlig backup',
    ],
  },
]
