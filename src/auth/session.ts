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

type DiscordPayload = {
  id?: string
  name?: string
  username?: string
  email?: string
  avatar?: string
  ts?: number
}

/** Lê ?u=JSON da URL hash do callback Discord */
export function readDiscordUserFromUrl(): User | null {
  const hash = window.location.hash || ''
  const q = hash.indexOf('?')
  const query = q >= 0 ? hash.slice(q + 1) : window.location.search.replace(/^\?/, '')
  if (!query) return null

  const params = new URLSearchParams(query)
  const raw = params.get('u')
  if (!raw) return null

  let data: DiscordPayload
  try {
    data = JSON.parse(decodeURIComponent(raw)) as DiscordPayload
  } catch {
    try {
      data = JSON.parse(raw) as DiscordPayload
    } catch {
      return null
    }
  }

  if (data.ts && Date.now() - Number(data.ts) > 15 * 60 * 1000) {
    throw new Error('Login expirado. Tente novamente.')
  }

  const name = (data.name || data.username || '').trim()
  if (!name && !data.id) return null

  return {
    name: name || 'Usuario',
    username: data.username || undefined,
    email: data.email || '',
    avatar: data.avatar || undefined,
    provider: 'discord',
    discordId: data.id || undefined,
  }
}
