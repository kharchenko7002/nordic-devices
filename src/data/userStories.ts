import type { Actor, ServiceComponent, UserStory } from '../types'

export const USER_STORIES: UserStory[] = [
  {
    id: 'us-01',
    role: 'kunde',
    goal: 'se hvilke IT-tjenester Nordic Devices tilbyr',
    benefit: 'jeg kan vurdere om de passer min bedrift',
  },
  {
    id: 'us-02',
    role: 'kunde',
    goal: 'legge produkter i en handlekurv',
    benefit: 'jeg kan sende en samlet bestilling',
  },
  {
    id: 'us-03',
    role: 'kunde',
    goal: 'se tydelige priser',
    benefit: 'jeg kan sammenligne ulike løsninger',
  },
  {
    id: 'us-04',
    role: 'kunde',
    goal: 'motta en ordrebekreftelse på e-post',
    benefit: 'jeg har dokumentasjon på det jeg har bestilt',
  },
  {
    id: 'us-05',
    role: 'administrator',
    goal: 'administrere produkter og tjenester',
    benefit: 'informasjonen på nettsiden holdes oppdatert',
  },
  {
    id: 'us-06',
    role: 'utvikler',
    goal: 'kjøre prosjektet lokalt med Docker',
    benefit: 'miljøet blir likt på flere maskiner',
  },
  {
    id: 'us-07',
    role: 'IT-ansvarlig',
    goal: 'ha sikker SSH-tilgang med nøkler',
    benefit: 'serveradministrasjon blir tryggere',
  },
  {
    id: 'us-08',
    role: 'bruker',
    goal: 'kunne godta eller avvise informasjonskapsler',
    benefit: 'jeg har kontroll over personvernet mitt',
  },
  {
    id: 'us-09',
    role: 'kunde',
    goal: 'ha god kontrast og kunne navigere med tastatur',
    benefit: 'nettsiden er tilgjengelig for flere brukere',
  },
  {
    id: 'us-10',
    role: 'driftsansvarlig',
    goal: 'kjøre nettstedet over HTTPS',
    benefit: 'trafikken er kryptert mellom klient og server',
  },
]

export const ACTORS: Actor[] = [
  {
    name: 'Kunde',
    icon: '🤝',
    description:
      'Surfer på nettstedet, leser om produkter og tjenester, og legger inn bestilling via handlekurven.',
  },
  {
    name: 'Ansatt',
    icon: '👤',
    description:
      'Bruker interne tjenester og bidrar med kompetanse innen drift, utvikling, sikkerhet eller support.',
  },
  {
    name: 'Administrator',
    icon: '🛠️',
    description:
      'Administrerer brukere, nettverk, servere og tilgang. Vedlikeholder produkt- og tjenestekatalogen.',
  },
  {
    name: 'Utvikler',
    icon: '👩‍💻',
    description:
      'Bygger og videreutvikler webapplikasjonen. Kjører prosjektet lokalt med Vite og i Docker.',
  },
  {
    name: 'Betalingsleverandør',
    icon: '💳',
    description:
      'Fremtidig komponent: Stripe, Vipps eller Nets håndterer selve betalingen utenfor Nordic Devices.',
  },
  {
    name: 'Webserver',
    icon: '🌐',
    description:
      'Ubuntu Server 10.10.10.20 kjører Nginx i Docker og leverer den statiske React-applikasjonen.',
  },
  {
    name: 'Database',
    icon: '🗃️',
    description:
      'Fremtidig komponent: lagrer ordrer, kunder og produktkatalog når backend kommer på plass.',
  },
]

export const SERVICE_COMPONENTS: ServiceComponent[] = [
  { name: 'React frontend', status: 'Nå', description: 'SPA bygget med Vite og TypeScript.' },
  { name: 'Nginx container', status: 'Nå', description: 'Serverer den statiske bygde frontenden.' },
  { name: 'Docker runtime', status: 'Nå', description: 'Pakker og kjører applikasjonen likt.' },
  { name: 'Ubuntu Server', status: 'Nå', description: 'Vert for Docker og webapplikasjon.' },
  { name: 'Windows Server / DHCP', status: 'Nå', description: 'Deler ut IP-adresser til klientene.' },
  { name: 'GitHub repository', status: 'Nå', description: 'Versjonering og leveranse av kildekoden.' },
  { name: 'Backend API', status: 'Fremtidig', description: 'Validerer ordre og snakker med betalingsleverandør.' },
  { name: 'Betalingsleverandør', status: 'Fremtidig', description: 'Stripe, Vipps eller Nets håndterer betalingen.' },
  { name: 'Database', status: 'Fremtidig', description: 'Lagrer ordrer, kunder og katalog sikkert.' },
]
