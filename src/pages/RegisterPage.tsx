import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import logoImg from '../assets/logo.png'
import { useAuth } from '../auth/AuthContext'

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515.07.07 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.3 18.3 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.08.08 0 0 0-.079-.037A19.7 19.7 0 0 0 3.677 4.37a.09.09 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.08.08 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.08.08 0 0 0 .084-.028 14 14 0 0 0 1.226-1.994.07.07 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.08.08 0 0 1-.008-.128c.126-.094.252-.192.372-.292a.07.07 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.07.07 0 0 1 .079.01c.12.098.246.198.373.292a.08.08 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.07.07 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.08.08 0 0 0 .084.028 19.8 19.8 0 0 0 6.002-3.03.08.08 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

export default function RegisterPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    login({
      name: name || email.split('@')[0] || 'user',
      email: email || 'user@email.com',
      provider: 'email',
    })
    navigate('/dashboard')
  }

  const handleDiscord = () => {
    login({
      name: 'Discord User',
      email: 'discord@infinitybots.app',
      provider: 'discord',
    })
    navigate('/dashboard')
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-black px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.12),transparent_60%)]" />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="mb-6 inline-flex items-center justify-center gap-2">
            <img src={logoImg} alt="Infinity Bots" className="h-12 w-auto" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Crie sua conta</h1>
          <p className="mt-2 text-sm text-brand-muted">Comece a gerenciar seus BOTs hoje</p>
        </div>

        <div className="rounded-2xl border border-brand-gray-border bg-brand-gray-mid p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-white">Nome</label>
              <div className="relative">
                <User size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-brand-muted" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full rounded-xl border border-brand-gray-border bg-brand-black py-3 pr-4 pl-10 text-sm text-white placeholder:text-brand-muted focus:border-brand-accent focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-brand-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full rounded-xl border border-brand-gray-border bg-brand-black py-3 pr-4 pl-10 text-sm text-white placeholder:text-brand-muted focus:border-brand-accent focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">Senha</label>
              <div className="relative">
                <Lock size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-brand-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-brand-gray-border bg-brand-black py-3 pr-10 pl-10 text-sm text-white placeholder:text-brand-muted focus:border-brand-accent focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-brand-muted hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary flex w-full items-center justify-center gap-2 py-3">
              Criar conta
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-brand-gray-border" />
            <span className="text-xs text-brand-muted">ou</span>
            <div className="h-px flex-1 bg-brand-gray-border" />
          </div>

          <button
            type="button"
            onClick={handleDiscord}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5865F2] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4752C4]"
          >
            <DiscordIcon className="h-5 w-5" />
            Criar conta com Discord
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-brand-muted">
          Já tem uma conta?{' '}
          <Link to="/login" className="font-medium text-brand-accent hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}
