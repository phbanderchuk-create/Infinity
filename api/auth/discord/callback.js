import crypto from 'crypto'

/**
 * Callback OAuth2 do Discord.
 * Troca o code por token, busca o usuário, avisa no canal (webhook) e redireciona ao site.
 * GET /api/auth/discord/callback?code=...
 */
export default async function handler(req, res) {
  const siteUrl = process.env.SITE_URL || `https://${req.headers.host}`
  const clientId = process.env.DISCORD_CLIENT_ID
  const clientSecret = process.env.DISCORD_CLIENT_SECRET
  const redirectUri =
    process.env.DISCORD_REDIRECT_URI || `${siteUrl}/api/auth/discord/callback`
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  const sessionSecret = process.env.SESSION_SECRET || clientSecret

  const fail = (message) => {
    res.statusCode = 302
    res.setHeader(
      'Location',
      `${siteUrl}/login?error=${encodeURIComponent(message)}`,
    )
    res.end()
  }

  if (req.method !== 'GET') {
    res.statusCode = 405
    res.end('Method not allowed')
    return
  }

  const url = new URL(req.url, `https://${req.headers.host}`)
  const code = url.searchParams.get('code')
  const oauthError = url.searchParams.get('error')

  if (oauthError) {
    fail('Login com Discord cancelado.')
    return
  }

  if (!code || !clientId || !clientSecret) {
    fail('Configuração Discord incompleta ou código ausente.')
    return
  }

  try {
    const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    })

    if (!tokenRes.ok) {
      fail('Não foi possível validar o login no Discord.')
      return
    }

    const tokenData = await tokenRes.json()
    const userRes = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    })

    if (!userRes.ok) {
      fail('Não foi possível obter seus dados do Discord.')
      return
    }

    const discordUser = await userRes.json()
    const avatar = discordUser.avatar
      ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=128`
      : `https://cdn.discordapp.com/embed/avatars/${Number(discordUser.discriminator || 0) % 5}.png`

    const userPayload = {
      id: discordUser.id,
      name: discordUser.global_name || discordUser.username,
      username: discordUser.username,
      email: discordUser.email || '',
      avatar,
      provider: 'discord',
    }

    if (webhookUrl) {
      await sendLoginWebhook(webhookUrl, userPayload).catch(() => {})
    }

    const payload = Buffer.from(JSON.stringify(userPayload)).toString('base64url')
    const sig = crypto
      .createHmac('sha256', sessionSecret)
      .update(payload)
      .digest('base64url')

    res.statusCode = 302
    res.setHeader('Location', `${siteUrl}/auth/callback?payload=${payload}&sig=${sig}`)
    res.end()
  } catch {
    fail('Erro inesperado no login com Discord.')
  }
}

async function sendLoginWebhook(webhookUrl, user) {
  const now = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'Infinity Bots',
      embeds: [
        {
          title: 'Novo login no site',
          color: 0xa855f7,
          thumbnail: user.avatar ? { url: user.avatar } : undefined,
          fields: [
            { name: 'Nome', value: user.name || '—', inline: true },
            { name: 'Username', value: `\`${user.username}\``, inline: true },
            { name: 'Discord ID', value: `\`${user.id}\``, inline: false },
            { name: 'Email', value: user.email || 'Não informado', inline: false },
            { name: 'Quando', value: now, inline: false },
          ],
          footer: { text: 'Infinity Bots · Login Discord' },
        },
      ],
    }),
  })
}
