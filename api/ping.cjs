module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ ok: true, message: 'api funcionando' }))
}
