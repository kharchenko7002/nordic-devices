function int(value, fallback) {
  const parsed = parseInt(value ?? '', 10)
  return Number.isFinite(parsed) ? parsed : fallback
}

function bool(value, fallback) {
  if (value === undefined) return fallback
  return value === 'true' || value === '1'
}

export const config = {
  port: int(process.env.PORT, 4000),
  trustProxy: bool(process.env.TRUST_PROXY, true),

  smtp: {
    host: process.env.SMTP_HOST || '',
    port: int(process.env.SMTP_PORT, 587),
    secure: bool(process.env.SMTP_SECURE, false),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@nordicdevices.local',
    bcc: process.env.CONFIRMATION_BCC || '',
  },

  rateLimit: {
    windowMs: int(process.env.RATE_LIMIT_WINDOW_MS, 60_000),
    max: int(process.env.RATE_LIMIT_MAX, 20),
  },
}

export function hasSmtpConfig() {
  return Boolean(config.smtp.host && config.smtp.user && config.smtp.pass)
}
