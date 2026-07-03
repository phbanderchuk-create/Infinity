import type { User } from './AuthContext'

const STORAGE_KEY = 'infinity-bots-user'

export function saveUser(user: User) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export function clearUser() {
  localStorage.removeItem(STORAGE_KEY)
}

/**
 * Se a URL tiver ?discord_login=..., salva o usuario e limpa a URL.
 * Isso roda na entrada do site, sem depender de rota /auth/callback.
 */
export function consumeDiscordLoginFromUrl(): User | null {
  try {
    const params = new URLSearchParams(window.location.search)

    const err = params.get('discord_error')
    if (err) {
      // limpa o erro da URL
      const url = new URL(window.location.href)
      url.searchParams.delete('discord_error')
      window.history.replaceState({}, '', url.pathname + url.hash)
      throw new Error(err)
    }

    const raw = params.get('discord_login')
    if (!raw) return null

    const data = JSON.parse(decodeURIComponent(raw)) as {
      id?: string
      name?: string
      username?: string
      email?: string
      avatar?: string
    }

    const name = (data.name || data.username || '').trim()
    if (!name) return null

    const user: User = {
      name,
      username: data.username || undefined,
      email: data.email || '',
      avatar: data.avatar || undefined,
      provider: 'discord',
      discordId: data.id || undefined,
    }

    saveUser(user)

    // limpa ?discord_login= da URL
    const url = new URL(window.location.href)
    url.searchParams.delete('discord_login')
    const clean = url.pathname + (url.hash || '#/')
    window.history.replaceState({}, '', clean)

    return user
  } catch (e) {
    if (e instanceof Error && e.message && !e.message.includes('JSON')) {
      throw e
    }
    return null
  }
}
