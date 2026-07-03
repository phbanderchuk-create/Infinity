import type { User } from './AuthContext'

const STORAGE_KEY = 'infinity-bots-user'

export function saveUser(user: User) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

export function clearUser() {
  localStorage.removeItem(STORAGE_KEY)
}

/** Lê os dados do Discord da URL (#/auth/callback?name=...&username=...) */
export function readDiscordUserFromUrl(): User | null {
  const hash = window.location.hash
  const queryIndex = hash.indexOf('?')
  const queryString =
    queryIndex >= 0 ? hash.slice(queryIndex + 1) : window.location.search.replace(/^\?/, '')

  if (!queryString) return null

  const params = new URLSearchParams(queryString)
  const id = params.get('id')
  const name = params.get('name')
  const username = params.get('username')
  const email = params.get('email') || ''
  const avatar = params.get('avatar') || undefined
  const ts = Number(params.get('ts') || '0')

  if (!id && !name && !username) return null

  if (ts && Date.now() - ts > 15 * 60 * 1000) {
    throw new Error('Login expirado. Tente novamente.')
  }

  const displayName = (name && name.trim()) || (username && username.trim()) || 'Discord User'

  return {
    name: displayName,
    username: username || undefined,
    email,
    avatar: avatar || undefined,
    provider: 'discord',
    discordId: id || undefined,
  }
}
