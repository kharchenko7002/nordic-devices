import express from 'express'
import { config } from './config.js'
import { ordersRouter } from './routes/orders.js'
import { mailerStatus } from './services/mailer.js'

const app = express()

if (config.trustProxy) {
  app.set('trust proxy', 1)
}

app.disable('x-powered-by')
app.use(express.json({ limit: '64kb' }))

app.use((req, _res, next) => {
  console.log(`[${req.method}] ${req.url}`)
  next()
})

app.get('/api/health', async (_req, res) => {
  const mailer = await mailerStatus()
  res.json({ ok: true, mailer })
})

app.use('/api/orders', ordersRouter)

app.use((_req, res) => {
  res.status(404).json({ ok: false, error: 'Not found' })
})

app.use((err, _req, res, _next) => {
  console.error('[server] unhandled', err)
  res.status(500).json({ ok: false, error: 'Intern feil' })
})

app.listen(config.port, '0.0.0.0', () => {
  console.log(`[server] Nordic Devices API listening on :${config.port}`)
})
