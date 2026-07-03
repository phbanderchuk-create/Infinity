import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { readDiscordUserFromUrl, saveUser } from '../auth/session'
import logoImg from '../assets/logo.png'

export default function AuthCallbackPage() {
  const { login } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const done = useRef(false)

  useEffect(() => {
    if (done.current) return
    done.current = true

    try {
      const user = readDiscordUserFromUrl()

      if (!user) {
        setError('Dados de login inválidos. Tente entrar novamente.')
        return
      }

      saveUser(user)
      login(user)

      // full reload no painel para o header ler a sessao
      window.location.href = '/#/dashboard'
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível concluir o login com Discord.')
    }
  }, [login])

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-brand-black px-4 text-center">
        <img src={logoImg} alt="Infinity Bots" className="mb-6 h-12 w-auto" />
        <p className="mb-4 max-w-md text-red-400">{error}</p>
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
