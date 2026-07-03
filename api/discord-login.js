export default function handler(req, res) {
  const clientId = process.env.DISCORD_CLIENT_ID
  const siteUrl = process.env.SITE_URL || `https://${req.headers.host}`
  const redirectUri =
    process.env.DISCORD_REDIRECT_URI || `${siteUrl}/api/discord-callback`

  if (!clientId) {
    return res.redirect(
      302,
      `${siteUrl}/login?error=${encodeURIComponent(
        'Discord não configurado. Defina DISCORD_CLIENT_ID na Vercel.',
      )}`,
    )
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'identify email',
    prompt: 'consent',
  })

  return res.redirect(302, `https://discord.com/oauth2/authorize?${params}`)
}
