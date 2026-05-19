import type { ProductStatus } from '../../types'

type Props = {
  status: ProductStatus
}

const STATUS_CLASS: Record<ProductStatus, string> = {
  Tilgjengelig: 'badge badge-tilgjengelig',
  Populær: 'badge badge-populær',
  Anbefalt: 'badge badge-anbefalt',
}

export function Badge({ status }: Props) {
  return <span className={STATUS_CLASS[status]}>{status}</span>
}
