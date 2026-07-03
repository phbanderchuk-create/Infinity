import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { readDiscordUserFromUrl, saveUser } from '../auth/session'
import logoImg from '../assets/logo.png'

export default function AuthCallbackPage() {
  const { login } = useAuth()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const user = readDiscordUserFromUrl()

      if (!user) {
        setError('Dados de login inválidos. Tente entrar novamente.')
        return
      }

      saveUser(user)
      login(user)

      // redireciona pro painel (full reload garante que o header leia a sessao)
      window.location.replace(`${window.location.origin}${window.location.pathname}#/dashboard`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível concluir o login com Discord.')
    }
  }, [login])

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
