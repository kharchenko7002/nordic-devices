import type { TechInfoItem } from '../types'

export const TECH_INFO: TechInfoItem[] = [
  { label: 'Windows Server', value: '10.10.10.10' },
  { label: 'Ubuntu Server', value: '10.10.10.20' },
  { label: 'Nettverk', value: '10.10.10.0/26' },
  { label: 'Subnettmaske', value: '255.255.255.192' },
  { label: 'Gateway', value: '10.10.10.1' },
  { label: 'DHCP-område', value: '10.10.10.30 – 10.10.10.60' },
  { label: 'Lease time', value: '6 timer' },
  { label: 'Webapplikasjon', value: 'React + Vite' },
  { label: 'Container', value: 'Docker + Nginx' },
]

export const SERVER_INFO: TechInfoItem[] = [
  { label: 'Windows Server', value: '10.10.10.10' },
  { label: 'Ubuntu Server', value: '10.10.10.20' },
]

export const NETWORK_INFO: TechInfoItem[] = [
  { label: 'Subnett', value: '10.10.10.0/26' },
  { label: 'Gateway', value: '10.10.10.1' },
  { label: 'DHCP-område', value: '10.10.10.30 – 10.10.10.60' },
  { label: 'Lease time', value: '6 timer' },
]

export const APP_INFO: TechInfoItem[] = [
  { label: 'Frontend', value: 'React + Vite' },
  { label: 'Språk', value: 'TypeScript' },
  { label: 'Webserver', value: 'Nginx (Docker)' },
  { label: 'HTTPS', value: 'Self-signed (test)' },
]
