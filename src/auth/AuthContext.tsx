import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { clearUser, consumeDiscordLoginFromUrl, loadUser, saveUser } from './session'

export type User = {
  name: string
  email: string
  username?: string
  avatar?: string
  provider: 'email' | 'discord'
  discordId?: string
}

type AuthContextValue = {
  user: User | null
  login: (user: User) => void
  logout: () => void
  authError: string | null
  clearAuthError: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function initialUser(): { user: User | null; error: string | null; justLoggedIn: boolean } {
  try {
    const fromDiscord = consumeDiscordLoginFromUrl()
    if (fromDiscord) {
      return { user: fromDiscord, error: null, justLoggedIn: true }
    }
  } catch (e) {
    return {
      user: loadUser(),
      error: e instanceof Error ? e.message : 'Erro no login Discord',
      justLoggedIn: false,
    }
  }
  return { user: loadUser(), error: null, justLoggedIn: false }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const initial = initialUser()
  const [user, setUser] = useState<User | null>(initial.user)
  const [authError, setAuthError] = useState<string | null>(initial.error)

  // se acabou de logar pelo Discord, vai pro painel
  useEffect(() => {
    if (initial.justLoggedIn) {
      window.location.hash = '#/dashboard'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = useCallback((next: User) => {
    saveUser(next)
    setUser(next)
    setAuthError(null)
  }, [])

  const logout = useCallback(() => {
    clearUser()
    setUser(null)
  }, [])

  const clearAuthError = useCallback(() => setAuthError(null), [])

  useEffect(() => {
    const sync = () => setUser(loadUser())
    window.addEventListener('storage', sync)
    window.addEventListener('focus', sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener('focus', sync)
    }
  }, [])

  const value = useMemo(
    () => ({ user, login, logout, authError, clearAuthError }),
    [user, login, logout, authError, clearAuthError],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
