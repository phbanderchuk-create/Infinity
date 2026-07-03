import crypto from 'node:crypto'

export default function handler(req, res) {
  const sessionSecret =
    process.env.SESSION_SECRET || process.env.DISCORD_CLIENT_SECRET

  if (!sessionSecret) {
    return res.status(500).json({ ok: false, error: 'SESSION_SECRET ausente' })
  }

  const payload = req.query?.payload
  const sig = req.query?.sig

  if (!payload || !sig) {
    return res.status(400).json({ ok: false, error: 'Parâmetros inválidos' })
  }

  const expected = crypto
    .createHmac('sha256', sessionSecret)
    .update(String(payload))
    .digest('base64url')

  const a = Buffer.from(String(sig))
  const b = Buffer.from(expected)
  const valid = a.length === b.length && crypto.timingSafeEqual(a, b)

  if (!valid) {
    return res.status(401).json({ ok: false, error: 'Assinatura inválida' })
  }

  try {
    const user = JSON.parse(Buffer.from(String(payload), 'base64url').toString('utf8'))
    return res.status(200).json({ ok: true, user })
  } catch {
    return res.status(400).json({ ok: false, error: 'Payload inválido' })
  }
}
