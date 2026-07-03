import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { decodeDiscordPayload, readPayloadFromUrl, saveUser } from '../auth/session'
import logoImg from '../assets/logo.png'

export default function AuthCallbackPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const payload = readPayloadFromUrl()

      if (!payload) {
        setError('Dados de login inválidos. Tente entrar novamente.')
        return
      }

      const data = decodeDiscordPayload(payload)

      if (data.ts && Date.now() - data.ts > 15 * 60 * 1000) {
        setError('Login expirado. Tente novamente.')
        return
      }

      const user = {
        name: data.name || data.username || 'Discord User',
        username: data.username,
        email: data.email || '',
        avatar: data.avatar,
        provider: 'discord' as const,
        discordId: data.id,
      }

      // salva direto + no contexto
      saveUser(user)
      login(user)

      // limpa o payload da URL e vai pro painel
      window.location.hash = '#/dashboard'
    } catch {
      setError('Não foi possível concluir o login com Discord.')
    }
  }, [login, navigate])

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-brand-black px-4 text-center">
        <img src={logoImg} alt="Infinity Bots" className="mb-6 h-12 w-auto" />
        <p className="mb-4 text-red-400">{error}</p>
        <Link to="/login" className="btn-primary px-5 py-2.5 text-sm">
          Voltar ao login
        </Link>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-black px-4 text-center">
      <img src={logoImg} alt="Infinity Bots" className="mb-6 h-12 w-auto" />
      <p className="text-brand-muted">Conectando com Discord...</p>
    </div>
  )
}
