import crypto from 'crypto'

/**
 * Valida o payload assinado do callback Discord (opcional no client).
 * GET /api/auth/verify?payload=...&sig=...
 */
export default function handler(req, res) {
  const sessionSecret =
    process.env.SESSION_SECRET || process.env.DISCORD_CLIENT_SECRET

  if (!sessionSecret) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ ok: false, error: 'SESSION_SECRET ausente' }))
    return
  }

  const url = new URL(req.url, `https://${req.headers.host}`)
  const payload = url.searchParams.get('payload')
  const sig = url.searchParams.get('sig')

  if (!payload || !sig) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ ok: false, error: 'Parâmetros inválidos' }))
    return
  }

  const expected = crypto
    .createHmac('sha256', sessionSecret)
    .update(payload)
    .digest('base64url')

  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  const valid = a.length === b.length && crypto.timingSafeEqual(a, b)

  if (!valid) {
    res.statusCode = 401
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ ok: false, error: 'Assinatura inválida' }))
    return
  }

  try {
    const user = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ ok: true, user }))
  } catch {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ ok: false, error: 'Payload inválido' }))
  }
}
