export const config = {
  matcher: [
    '/api/ping',
    '/api/discord-login',
    '/api/discord-callback',
    '/api/auth-verify',
  ],
}

export default async function middleware(request) {
  const url = new URL(request.url)
  const path = url.pathname
  const siteUrl = process.env.SITE_URL || url.origin

  if (path === '/api/ping') {
    return json({ ok: true, message: 'api funcionando' })
  }

  if (path === '/api/discord-login') {
    return handleDiscordLogin(siteUrl)
  }

  if (path === '/api/discord-callback') {
    return handleDiscordCallback(url, siteUrl)
  }

  if (path === '/api/auth-verify') {
    return handleAuthVerify(url)
  }

  return new Response('Not found', { status: 404 })
}

function handleDiscordLogin(siteUrl) {
  const clientId = process.env.DISCORD_CLIENT_ID
  const redirectUri =
    process.env.DISCORD_REDIRECT_URI || `${siteUrl}/api/discord-callback`

  if (!clientId) {
    return redirect(
      `${siteUrl}/login?error=${encodeURIComponent('Discord nao configurado na Vercel.')}`,
    )
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'identify email',
    prompt: 'consent',
  })

  return redirect(`https://discord.com/oauth2/authorize?${params}`)
}

async function handleDiscordCallback(url, siteUrl) {
  const clientId = process.env.DISCORD_CLIENT_ID
  const clientSecret = process.env.DISCORD_CLIENT_SECRET
  const redirectUri =
    process.env.DISCORD_REDIRECT_URI || `${siteUrl}/api/discord-callback`
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  const sessionSecret = process.env.SESSION_SECRET || clientSecret

  const code = url.searchParams.get('code')
  const oauthError = url.searchParams.get('error')

  if (oauthError) {
    return redirect(
      `${siteUrl}/login?error=${encodeURIComponent('Login com Discord cancelado.')}`,
    )
  }

  if (!code || !clientId || !clientSecret || !sessionSecret) {
    return redirect(
      `${siteUrl}/login?error=${encodeURIComponent('Configuracao Discord incompleta.')}`,
    )
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
      return redirect(
        `${siteUrl}/login?error=${encodeURIComponent('Nao foi possivel validar o login no Discord.')}`,
      )
    }

    const tokenData = await tokenRes.json()
    const userRes = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    })

    if (!userRes.ok) {
      return redirect(
        `${siteUrl}/login?error=${encodeURIComponent('Nao foi possivel obter seus dados do Discord.')}`,
      )
    }

    const discordUser = await userRes.json()
    const avatar = discordUser.avatar
      ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=128`
      : 'https://cdn.discordapp.com/embed/avatars/0.png'

    const userPayload = {
      id: discordUser.id,
      name: discordUser.global_name || discordUser.username,
      username: discordUser.username,
      email: discordUser.email || '',
      avatar,
      provider: 'discord',
    }

    if (webhookUrl) {
      try {
        await sendLoginWebhook(webhookUrl, userPayload)
      } catch {
        // nao bloqueia o login
      }
    }

    const payload = base64UrlEncode(JSON.stringify(userPayload))
    const sig = await hmacSign(sessionSecret, payload)

    return redirect(`${siteUrl}/auth/callback?payload=${payload}&sig=${sig}`)
  } catch {
    return redirect(
      `${siteUrl}/login?error=${encodeURIComponent('Erro inesperado no login com Discord.')}`,
    )
  }
}

async function handleAuthVerify(url) {
  const sessionSecret =
    process.env.SESSION_SECRET || process.env.DISCORD_CLIENT_SECRET
  const payload = url.searchParams.get('payload')
  const sig = url.searchParams.get('sig')

  if (!sessionSecret) {
    return json({ ok: false, error: 'SESSION_SECRET ausente' }, 500)
  }

  if (!payload || !sig) {
    return json({ ok: false, error: 'Parametros invalidos' }, 400)
  }

  const expected = await hmacSign(sessionSecret, payload)
  if (expected !== sig) {
    return json({ ok: false, error: 'Assinatura invalida' }, 401)
  }

  try {
    const user = JSON.parse(base64UrlDecode(payload))
    return json({ ok: true, user })
  } catch {
    return json({ ok: false, error: 'Payload invalido' }, 400)
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

function redirect(location) {
  return new Response(null, {
    status: 302,
    headers: { Location: location },
  })
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function base64UrlEncode(text) {
  const bytes = new TextEncoder().encode(text)
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function base64UrlDecode(value) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/')
  const binary = atob(padded)
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

async function hmacSign(secret, message) {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(message))
  const bytes = new Uint8Array(signature)
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}
