import { Router } from 'express'
import { rateLimit } from '../middleware/rateLimit.js'
import { validateOrderPayload } from '../middleware/validateOrder.js'
import { sendOrderMail } from '../services/mailer.js'
import { buildHtml, buildPlainText } from '../services/orderTemplate.js'

export const ordersRouter = Router()

ordersRouter.post('/', rateLimit, async (req, res) => {
  const { errors, order } = validateOrderPayload(req.body)
  if (errors.length > 0) {
    return res.status(400).json({ ok: false, errors })
  }

  try {
    const result = await sendOrderMail({
      to: order.form.epost,
      subject: `Ordrebekreftelse ${order.ordreNummer}`,
      text: buildPlainText(order),
      html: buildHtml(order),
    })
    console.log(
      `[orders] sent ${order.ordreNummer} to ${order.form.epost} via ${result.transport}`,
    )
    return res.status(200).json({
      ok: true,
      orderNumber: order.ordreNummer,
      messageId: result.messageId,
      transport: result.transport,
      previewUrl: result.previewUrl,
    })
  } catch (err) {
    console.error(`[orders] failed to send: ${err.message}`)
    return res.status(502).json({
      ok: false,
      error:
        'Kunne ikke sende bekreftelse på e-post. Bestillingen er registrert lokalt.',
    })
  }
})
