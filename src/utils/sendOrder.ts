import type { Order } from '../types'

export type SendOrderResponse =
  | { ok: true; orderNumber: string; transport: string; previewUrl: string | null }
  | { ok: false; error: string }

const API_ENDPOINT = '/api/orders'

export async function sendOrderToApi(order: Order): Promise<SendOrderResponse> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    })

    let payload: Record<string, unknown> = {}
    try {
      payload = (await response.json()) as Record<string, unknown>
    } catch {
      /* ignore parse error */
    }

    if (!response.ok) {
      const error =
        (typeof payload.error === 'string' && payload.error) ||
        (Array.isArray(payload.errors) && payload.errors.join(' ')) ||
        `Serverfeil (HTTP ${response.status}).`
      return { ok: false, error }
    }

    return {
      ok: true,
      orderNumber: String(payload.orderNumber ?? order.ordreNummer),
      transport: String(payload.transport ?? 'unknown'),
      previewUrl:
        typeof payload.previewUrl === 'string' ? payload.previewUrl : null,
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Ukjent nettverksfeil.'
    return { ok: false, error: `Kunne ikke kontakte serveren: ${message}` }
  }
}
