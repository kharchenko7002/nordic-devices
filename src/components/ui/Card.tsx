import type { HTMLAttributes, ReactNode } from 'react'

type Props = HTMLAttributes<HTMLElement> & {
  as?: 'article' | 'div' | 'section'
  children: ReactNode
}

export function Card({
  as: Tag = 'article',
  className = '',
  children,
  ...rest
}: Props) {
  return (
    <Tag className={`card ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}
