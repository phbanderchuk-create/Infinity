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

/** Decodifica payload base64url vindo do Worker */
export function decodeDiscordPayload(payload: string) {
  let b64 = payload.replace(/-/g, '+').replace(/_/g, '/')
  while (b64.length % 4 !== 0) b64 += '='

  const binary = atob(b64)
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
  const json = new TextDecoder().decode(bytes)

  return JSON.parse(json) as {
    id: string
    name?: string
    username?: string
    email?: string
    avatar?: string
    ts?: number
  }
}

/** Lê ?payload= da query ou do hash (#/auth/callback?payload=) */
export function readPayloadFromUrl(): string | null {
  const search = new URLSearchParams(window.location.search)
  const fromSearch = search.get('payload')
  if (fromSearch) return fromSearch

  const hash = window.location.hash
  const q = hash.indexOf('?')
  if (q === -1) return null
  return new URLSearchParams(hash.slice(q + 1)).get('payload')
}
