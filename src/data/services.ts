import type { CatalogCategory, CatalogItem } from '../types'

export const SERVICE_CATEGORIES: CatalogCategory[] = [
  'Drift',
  'Nettverk',
  'Sikkerhet',
  'Utvikling',
  'Virtualisering',
]

export const SERVICES: CatalogItem[] = [
  {
    id: 'tj-it-drift',
    type: 'tjeneste',
    name: 'IT-drift og support',
    category: 'Drift',
    description:
      'Daglig drift, overvåkning og brukerstøtte. Vi sørger for at systemer er tilgjengelige og brukere får hjelp.',
    priceFrom: 690,
    unit: 'per bruker / mnd',
    status: 'Populær',
    icon: '⚙️',
    features: [
      'Helpdesk og brukerstøtte',
      'Overvåkning av tjenester',
      'Patching og oppdateringer',
    ],
  },
  {
    id: 'tj-nettverksoppsett',
    type: 'tjeneste',
    name: 'Nettverksoppsett',
    category: 'Nettverk',
    description:
      'Konfigurasjon av rutere, switcher, DHCP og VLAN. Trygt, oversiktlig og enkelt å skalere.',
    priceFrom: 3990,
    unit: 'per oppdrag',
    status: 'Tilgjengelig',
    icon: '🌐',
    features: [
      'Strukturert kabling og VLAN',
      'DHCP, DNS og gatewayer',
      'Dokumentasjon av oppsett',
    ],
  },
  {
    id: 'tj-brukeradmin',
    type: 'tjeneste',
    name: 'Brukeradministrasjon',
    category: 'Drift',
    description:
      'Oppretting, vedlikehold og deaktivering av brukerkontoer. Tydelig kontroll på roller og tilganger.',
    priceFrom: 990,
    unit: 'per måned',
    status: 'Tilgjengelig',
    icon: '👥',
    features: [
      'Onboarding og offboarding',
      'Rolle- og gruppestyring',
      'Logg og sporbarhet',
    ],
  },
  {
    id: 'tj-docker',
    type: 'tjeneste',
    name: 'Docker og containerdrift',
    category: 'Virtualisering',
    description:
      'Containerisering av applikasjoner, oppsett av Docker Compose og hjelp med portabel drift.',
    priceFrom: 2490,
    unit: 'per oppdrag',
    status: 'Anbefalt',
    icon: '📦',
    features: [
      'Dockerfile og Compose',
      'CI/CD-integrasjon',
      'Sikker containerdrift',
    ],
  },
  {
    id: 'tj-webapp',
    type: 'tjeneste',
    name: 'Webapplikasjon og hosting',
    category: 'Utvikling',
    description:
      'Utvikling, hosting og drift av interne og eksterne webapplikasjoner. Stabil leveranse og oppdateringer.',
    priceFrom: 5990,
    unit: 'per måned',
    status: 'Populær',
    icon: '🚀',
    features: [
      'React, Vite og TypeScript',
      'Nginx og HTTPS',
      'Drift og oppdateringer',
    ],
  },
  {
    id: 'tj-sikkerhetsvurdering',
    type: 'tjeneste',
    name: 'Sikkerhetsvurdering',
    category: 'Sikkerhet',
    description:
      'Gjennomgang av tilganger, passordpolicy, brannmur og logging. Du får rapport med konkrete tiltak.',
    priceFrom: 7490,
    unit: 'per gjennomgang',
    status: 'Anbefalt',
    icon: '🔐',
    features: [
      'Risikovurdering',
      'Sjekkliste mot beste praksis',
      'Rapport med tiltak',
    ],
  },
  {
    id: 'tj-backup-dok',
    type: 'tjeneste',
    name: 'Backup og dokumentasjon',
    category: 'Drift',
    description:
      'Sikkerhetskopier, gjenoppretting og oppdatert dokumentasjon. Forutsigbar drift ved uventede hendelser.',
    priceFrom: 1990,
    unit: 'per måned',
    status: 'Tilgjengelig',
    icon: '💾',
    features: [
      'Plan for backup og restore',
      'Testet gjenoppretting',
      'Driftsdokumentasjon',
    ],
  },
]
