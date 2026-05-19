import { config } from '../config.js'

const buckets = new Map()

export function rateLimit(req, res, next) {
  const key = req.ip || req.headers['x-forwarded-for'] || 'unknown'
  const now = Date.now()
  const bucket = buckets.get(key) || { count: 0, resetAt: now + config.rateLimit.windowMs }

  if (now > bucket.resetAt) {
    bucket.count = 0
    bucket.resetAt = now + config.rateLimit.windowMs
  }

  bucket.count += 1
  buckets.set(key, bucket)

  if (bucket.count > config.rateLimit.max) {
    const retryAfter = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000))
    res.set('Retry-After', String(retryAfter))
    return res.status(429).json({
      ok: false,
      error: 'For mange forespørsler. Prøv igjen om litt.',
    })
  }

  next()
}
