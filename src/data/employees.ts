import type { Employee, EmployeeCategory } from '../types'

export const EMPLOYEE_DEPARTMENTS: EmployeeCategory[] = [
  'Ledelse',
  'Utvikling',
  'Drift',
  'Sikkerhet',
  'Support',
]

export const EMPLOYEES: Employee[] = [
  {
    id: 'emma-larsen',
    name: 'Emma Larsen',
    role: 'Daglig leder',
    category: 'Ledelse',
    email: 'emma.larsen@nordicdevices.no',
    initials: 'EL',
    description:
      'Leder selskapets strategi og kundedialog. Har lang erfaring fra IT-bransjen og bygger Nordic Devices som en pålitelig partner.',
    skills: ['Strategi', 'Kundedialog', 'Forretningsutvikling'],
  },
  {
    id: 'jonas-berg',
    name: 'Jonas Berg',
    role: 'IT-konsulent',
    category: 'Drift',
    email: 'jonas.berg@nordicdevices.no',
    initials: 'JB',
    description:
      'Rådgir kundene om drift, lisenser og infrastruktur. Hjelper bedrifter å velge løsninger som passer behov og budsjett.',
    skills: ['Windows Server', 'Lisensiering', 'Rådgivning'],
  },
  {
    id: 'sara-nguyen',
    name: 'Sara Nguyen',
    role: 'Systemutvikler',
    category: 'Utvikling',
    email: 'sara.nguyen@nordicdevices.no',
    initials: 'SN',
    description:
      'Utvikler interne verktøy og webapplikasjoner. Jobber med React, TypeScript og containerbaserte miljøer.',
    skills: ['React', 'TypeScript', 'Docker'],
  },
  {
    id: 'markus-holm',
    name: 'Markus Holm',
    role: 'Nettverksadministrator',
    category: 'Drift',
    email: 'markus.holm@nordicdevices.no',
    initials: 'MH',
    description:
      'Setter opp og vedlikeholder nettverk, DHCP, brannmur og rutere. Sørger for at infrastrukturen er stabil og sikker.',
    skills: ['DHCP', 'Brannmur', 'Ruting'],
  },
  {
    id: 'ingrid-solheim',
    name: 'Ingrid Solheim',
    role: 'Sikkerhetsrådgiver',
    category: 'Sikkerhet',
    email: 'ingrid.solheim@nordicdevices.no',
    initials: 'IS',
    description:
      'Følger opp tilgangsstyring, passordpolicy og rutiner for sikker drift. Gjennomfører risikovurderinger for kunder.',
    skills: ['Risikovurdering', 'GDPR', 'Tilgangsstyring'],
  },
  {
    id: 'amina-ali',
    name: 'Amina Ali',
    role: 'Supportansvarlig',
    category: 'Support',
    email: 'amina.ali@nordicdevices.no',
    initials: 'AA',
    description:
      'Tar imot brukerhenvendelser og koordinerer feilretting. Holder kundedialogen ryddig og tydelig.',
    skills: ['Brukerstøtte', 'Ticketing', 'Dokumentasjon'],
  },
  {
    id: 'anders-vik',
    name: 'Anders Vik',
    role: 'DevOps-ingeniør',
    category: 'Utvikling',
    email: 'anders.vik@nordicdevices.no',
    initials: 'AV',
    description:
      'Automatiserer leveranser med Docker og CI/CD. Sørger for at applikasjoner kan startes og flyttes kontrollert.',
    skills: ['Docker', 'CI/CD', 'Nginx'],
  },
]
