import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'ghost' | 'ghost-dark' | 'ghost-light' | 'small'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  block?: boolean
}

const VARIANT_CLASS: Record<Variant, string> = {
  primary: 'btn btn-primary',
  ghost: 'btn btn-ghost',
  'ghost-dark': 'btn btn-ghost-dark',
  'ghost-light': 'btn btn-ghost-light',
  small: 'btn btn-small',
}

export function Button({
  variant = 'primary',
  block = false,
  className = '',
  type = 'button',
  ...rest
}: Props) {
  const composed = [VARIANT_CLASS[variant], block ? 'btn-block' : '', className]
    .filter(Boolean)
    .join(' ')
  return <button type={type} className={composed} {...rest} />
}
