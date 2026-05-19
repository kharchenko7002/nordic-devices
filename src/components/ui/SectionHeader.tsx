import type { ReactNode } from 'react'

type Props = {
  id: string
  eyebrow: string
  title: string
  lead?: ReactNode
  variant?: 'default' | 'light'
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  lead,
  variant = 'default',
}: Props) {
  const eyebrowClass = variant === 'light' ? 'eyebrow eyebrow-light' : 'eyebrow'
  const leadClass = variant === 'light' ? 'lead lead-light' : 'lead'

  return (
    <div className="section-head">
      <span className={eyebrowClass}>{eyebrow}</span>
      <h2 id={id}>{title}</h2>
      {lead && <p className={leadClass}>{lead}</p>}
    </div>
  )
}
