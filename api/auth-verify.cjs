const crypto = require('crypto')

module.exports = function handler(req, res) {
  const sessionSecret =
    process.env.SESSION_SECRET || process.env.DISCORD_CLIENT_SECRET

  res.setHeader('Content-Type', 'application/json')

  if (!sessionSecret) {
    res.statusCode = 500
    res.end(JSON.stringify({ ok: false, error: 'SESSION_SECRET ausente' }))
    return
  }

  const payload = req.query && req.query.payload
  const sig = req.query && req.query.sig

  if (!payload || !sig) {
    res.statusCode = 400
    res.end(JSON.stringify({ ok: false, error: 'Parametros invalidos' }))
    return
  }

  const expected = crypto
    .createHmac('sha256', sessionSecret)
    .update(String(payload))
    .digest('base64url')

  const a = Buffer.from(String(sig))
  const b = Buffer.from(expected)

  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    res.statusCode = 401
    res.end(JSON.stringify({ ok: false, error: 'Assinatura invalida' }))
    return
  }

  try {
    const user = JSON.parse(Buffer.from(String(payload), 'base64url').toString('utf8'))
    res.statusCode = 200
    res.end(JSON.stringify({ ok: true, user: user }))
  } catch (e) {
    res.statusCode = 400
    res.end(JSON.stringify({ ok: false, error: 'Payload invalido' }))
  }
}
