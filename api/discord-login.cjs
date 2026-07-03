module.exports = function handler(req, res) {
  const clientId = process.env.DISCORD_CLIENT_ID
  const siteUrl = process.env.SITE_URL || 'https://' + req.headers.host
  const redirectUri =
    process.env.DISCORD_REDIRECT_URI || siteUrl + '/api/discord-callback'

  if (!clientId) {
    res.statusCode = 302
    res.setHeader(
      'Location',
      siteUrl +
        '/login?error=' +
        encodeURIComponent('Discord nao configurado na Vercel.'),
    )
    res.end()
    return
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'identify email',
    prompt: 'consent',
  })

  res.statusCode = 302
  res.setHeader('Location', 'https://discord.com/oauth2/authorize?' + params.toString())
  res.end()
}
