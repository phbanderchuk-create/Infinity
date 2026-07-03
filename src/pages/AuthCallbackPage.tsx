import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import logoImg from '../assets/logo.png'

export default function AuthCallbackPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const payload = params.get('payload')
    const sig = params.get('sig')

    if (!payload || !sig) {
      setError('Dados de login inválidos.')
      return
    }

    let cancelled = false

    ;(async () => {
      try {
        const res = await fetch(
          `/api/auth-verify?payload=${encodeURIComponent(payload)}&sig=${encodeURIComponent(sig)}`,
        )
        const data = await res.json()

        if (!res.ok || !data.ok || !data.user) {
          throw new Error(data.error || 'Falha ao validar login')
        }

        if (cancelled) return

        login({
          name: data.user.name || data.user.username,
          email: data.user.email || '',
          avatar: data.user.avatar,
          provider: 'discord',
          discordId: data.user.id,
        })
        navigate('/dashboard', { replace: true })
      } catch {
        if (!cancelled) setError('Não foi possível concluir o login com Discord.')
      }
    })()

    return () => {
      cancelled = true
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
