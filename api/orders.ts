import { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'
import type { Order } from '../src/types'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

function generateReceiptHtml(order: Order, orderNumber: string): string {
  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.navn}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${item.antall}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${(item.pris / 100).toFixed(2)} kr</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${((item.pris * item.antall) / 100).toFixed(2)} kr</td>
    </tr>
  `
    )
    .join('')

  const total = (order.items.reduce((sum, item) => sum + item.pris * item.antall, 0) / 100).toFixed(2)

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0b1d3a; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; }
    .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
    .total { font-size: 18px; font-weight: bold; text-align: right; padding: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nordic Devices AS</h1>
      <p>Ordre Kvittering</p>
    </div>
    <div class="content">
      <p><strong>Ordrenummer:</strong> ${orderNumber}</p>
      <p><strong>Bedrift:</strong> ${order.bedriftsnavn}</p>
      <p><strong>Kontaktperson:</strong> ${order.kontaktperson}</p>
      <p><strong>E-post:</strong> ${order.epost}</p>
      ${order.telefon ? `<p><strong>Telefon:</strong> ${order.telefon}</p>` : ''}
      <p><strong>Adresse:</strong> ${order.adresse}</p>

      <table class="table">
        <thead>
          <tr style="background: #e8e8e8;">
            <th style="padding: 8px; text-align: left;">Produkt/Tjeneste</th>
            <th style="padding: 8px; text-align: right;">Antall</th>
            <th style="padding: 8px; text-align: right;">Pris</th>
            <th style="padding: 8px; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <div class="total">
        Totalbeløp: ${total} kr
      </div>

      ${order.kommentar ? `<p><strong>Kommentar:</strong><br>${order.kommentar}</p>` : ''}

      <p style="color: #666; font-size: 14px; margin-top: 20px;">
        Takk for din forespørsel! Vi vil kontakte deg snarest.
      </p>
    </div>
    <div class="footer">
      <p>Nordic Devices AS | Tlf: +47 22 00 00 00</p>
      <p>Dette er en automatisk generert kvittering.</p>
    </div>
  </div>
</body>
</html>
  `
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const order: Order = req.body
    const orderNumber = `ND-${Date.now()}`

    // Send email
    const html = generateReceiptHtml(order, orderNumber)
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: order.epost,
      subject: `Ordrekvittering fra Nordic Devices AS - ${orderNumber}`,
      html,
    })

    // Also send copy to company
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_USER!,
      subject: `Ny ordre - ${orderNumber}`,
      html,
    })

    res.status(200).json({
      ok: true,
      orderNumber,
      transport: 'email',
      previewUrl: null,
    })
  } catch (error) {
    console.error('Order error:', error)
    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
