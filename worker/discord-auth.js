/**
 * Cloudflare Worker - Login Discord + aviso no canal
 * URL: https://infinity-bots-auth.phbanderchuk.workers.dev
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const siteUrl = (env.SITE_URL || '').replace(/\/$/, '')

    if (url.pathname === '/' || url.pathname === '/login') {
      return startLogin(env, url.origin)
    }

    if (url.pathname === '/callback') {
      return handleCallback(url, env, siteUrl)
    }

    return new Response('Infinity Bots Auth OK', { status: 200 })
  },
}

function startLogin(env, workerOrigin) {
  const clientId = env.DISCORD_CLIENT_ID
  if (!clientId) {
    return new Response('DISCORD_CLIENT_ID nao configurado no Worker', { status: 500 })
  }

  const redirectUri = `${workerOrigin}/callback`
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'identify email',
    prompt: 'consent',
  })

  return Response.redirect(`https://discord.com/oauth2/authorize?${params}`, 302)
}

async function handleCallback(url, env, siteUrl) {
  const code = url.searchParams.get('code')
  const oauthError = url.searchParams.get('error')
  const workerOrigin = url.origin
  const redirectUri = `${workerOrigin}/callback`

  if (!siteUrl) {
    return new Response('SITE_URL nao configurado no Worker', { status: 500 })
  }

  if (oauthError) {
    return Response.redirect(
      `${siteUrl}/#/login?error=${encodeURIComponent('Login com Discord cancelado.')}`,
      302,
    )
  }

  if (!code || !env.DISCORD_CLIENT_ID || !env.DISCORD_CLIENT_SECRET) {
    return Response.redirect(
      `${siteUrl}/#/login?error=${encodeURIComponent('Configuracao Discord incompleta no Worker.')}`,
      302,
    )
  }

  try {
    const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: env.DISCORD_CLIENT_ID,
        client_secret: env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    })

    if (!tokenRes.ok) {
      return Response.redirect(
        `${siteUrl}/#/login?error=${encodeURIComponent('Nao foi possivel validar o login no Discord.')}`,
        302,
      )
    }

    const tokenData = await tokenRes.json()
    const userRes = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    })

    if (!userRes.ok) {
      return Response.redirect(
        `${siteUrl}/#/login?error=${encodeURIComponent('Nao foi possivel obter seus dados do Discord.')}`,
        302,
      )
    }

    const discordUser = await userRes.json()
    const name = discordUser.global_name || discordUser.username || 'Discord User'
    const username = discordUser.username || ''
    const email = discordUser.email || ''
    const avatar = discordUser.avatar
      ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=128`
      : ''

    if (env.DISCORD_WEBHOOK_URL) {
      try {
        await sendLoginWebhook(env.DISCORD_WEBHOOK_URL, {
          id: discordUser.id,
          name,
          username,
          email,
          avatar,
        })
      } catch {
        // nao bloqueia login
      }
    }

    // Passa os dados em query params simples (mais confiavel que base64)
    const params = new URLSearchParams({
      id: String(discordUser.id || ''),
      name,
      username,
      email,
      avatar,
      ts: String(Date.now()),
    })

    return Response.redirect(`${siteUrl}/#/auth/callback?${params.toString()}`, 302)
  } catch {
    return Response.redirect(
      `${siteUrl}/#/login?error=${encodeURIComponent('Erro inesperado no login com Discord.')}`,
      302,
    )
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
            { name: 'Nome', value: user.name || '-', inline: true },
            { name: 'Username', value: `\`${user.username}\``, inline: true },
            { name: 'Discord ID', value: `\`${user.id}\``, inline: false },
            { name: 'Email', value: user.email || 'Nao informado', inline: false },
            { name: 'Quando', value: now, inline: false },
          ],
          footer: { text: 'Infinity Bots - Login Discord' },
        },
      ],
    }),
  })
}
