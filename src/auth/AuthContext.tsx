import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

export type User = {
  name: string
  email: string
  avatar?: string
  provider: 'email' | 'discord'
}

type AuthContextValue = {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const STORAGE_KEY = 'infinity-bots-user'

const AuthContext = createContext<AuthContextValue | null>(null)

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadUser)

  const value = useMemo(
    () => ({
      user,
      login: (next: User) => {
        setUser(next)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      },
      logout: () => {
        setUser(null)
        localStorage.removeItem(STORAGE_KEY)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
