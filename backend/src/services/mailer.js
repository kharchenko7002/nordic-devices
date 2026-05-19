import nodemailer from 'nodemailer'
import { config, hasSmtpConfig } from '../config.js'

let cachedTransport = null
let cachedKind = null

async function createTransport() {
  if (hasSmtpConfig()) {
    const transport = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: { user: config.smtp.user, pass: config.smtp.pass },
    })
    await transport.verify()
    return { transport, kind: 'smtp', from: config.smtp.from }
  }

  // Fallback: Ethereal — auto-generated inbox, preview URL printed to logs.
  const account = await nodemailer.createTestAccount()
  const transport = nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: { user: account.user, pass: account.pass },
  })
  return {
    transport,
    kind: 'ethereal',
    from: `Nordic Devices AS <${account.user}>`,
  }
}

async function getTransport() {
  if (cachedTransport) return { transport: cachedTransport, kind: cachedKind }
  const created = await createTransport()
  cachedTransport = created.transport
  cachedKind = created.kind
  cachedTransport.__from = created.from
  console.log(`[mailer] ready via ${created.kind} (from: ${created.from})`)
  return { transport: cachedTransport, kind: cachedKind }
}

export async function sendOrderMail({ to, subject, text, html }) {
  const { transport, kind } = await getTransport()
  const info = await transport.sendMail({
    from: transport.__from,
    to,
    bcc: config.smtp.bcc || undefined,
    subject,
    text,
    html,
  })
  const previewUrl = kind === 'ethereal' ? nodemailer.getTestMessageUrl(info) : null
  if (previewUrl) {
    console.log(`[mailer] preview: ${previewUrl}`)
  }
  return {
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
    previewUrl,
    transport: kind,
  }
}

export async function mailerStatus() {
  if (!hasSmtpConfig()) {
    return { configured: false, mode: 'ethereal' }
  }
  try {
    const { kind } = await getTransport()
    return { configured: true, mode: kind, host: config.smtp.host }
  } catch (err) {
    return { configured: true, mode: 'error', error: err.message }
  }
}
