import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import logoImg from '../assets/logo.png'

function decodePayload(payload: string) {
  const padded = payload.replace(/-/g, '+').replace(/_/g, '/')
  const json = decodeURIComponent(escape(atob(padded)))
  return JSON.parse(json) as {
    id: string
    name?: string
    username?: string
    email?: string
    avatar?: string
    ts?: number
  }
}

function readPayload(searchParams: URLSearchParams) {
  const fromParams = searchParams.get('payload')
  if (fromParams) return fromParams

  // fallback para #/auth/callback?payload=...
  const hash = window.location.hash
  const queryIndex = hash.indexOf('?')
  if (queryIndex === -1) return null
  return new URLSearchParams(hash.slice(queryIndex + 1)).get('payload')
}

export default function AuthCallbackPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const payload = readPayload(params)

    if (!payload) {
      setError('Dados de login inválidos.')
      return
    }

    try {
      const user = decodePayload(payload)

      if (user.ts && Date.now() - user.ts > 10 * 60 * 1000) {
        setError('Login expirado. Tente novamente.')
        return
      }

      const displayName = user.name || user.username || 'Discord User'

      login({
        name: displayName,
        username: user.username,
        email: user.email || '',
        avatar: user.avatar,
        provider: 'discord',
        discordId: user.id,
      })

      navigate('/dashboard', { replace: true })
    } catch {
      setError('Não foi possível concluir o login com Discord.')
    }
  }, [params, login, navigate])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-black px-4 text-center">
      <img src={logoImg} alt="Infinity Bots" className="mb-6 h-12 w-auto" />
      {error ? (
        <>
          <p className="mb-4 text-red-400">{error}</p>
          <Link to="/login" className="btn-primary px-5 py-2.5 text-sm">
            Voltar ao login
          </Link>
        </>
      ) : (
        <p className="text-brand-muted">Conectando com Discord...</p>
      )}
    </div>
  )
}
