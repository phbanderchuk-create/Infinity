import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import {
  Bell,
  Bot,
  ChevronDown,
  FileText,
  LayoutGrid,
  LogOut,
  Mail,
  Search,
  ShoppingCart,
  Signal,
  TrendingUp,
  TriangleAlert,
  UserPlus,
  Users,
  Zap,
} from 'lucide-react'
import logoImg from '../assets/logo.png'
import { LanguageSelector } from '../components/LanguageSelector'
import { useAuth } from '../auth/AuthContext'

type Tab = 'overview' | 'applications' | 'billing' | 'team'

const tabs: { id: Tab; label: string; icon: typeof LayoutGrid }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'applications', label: 'Applications', icon: Bot },
  { id: 'billing', label: 'Billing', icon: FileText },
  { id: 'team', label: 'Team', icon: Users },
]

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab') as Tab | null
  const [tab, setTab] = useState<Tab>(tabParam && tabs.some((t) => t.id === tabParam) ? tabParam : 'overview')
  const [menuOpen, setMenuOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')

  useEffect(() => {
    if (tabParam && tabs.some((t) => t.id === tabParam)) setTab(tabParam)
  }, [tabParam])

  if (!user) return <Navigate to="/login" replace />

  const changeTab = (next: Tab) => {
    setTab(next)
    setSearchParams(next === 'overview' ? {} : { tab: next })
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-brand-black text-white">
      <header className="border-b border-brand-gray-border bg-brand-black/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="Infinity Bots" className="h-9 w-auto" />
            <span className="font-display hidden text-xs font-extrabold tracking-widest sm:inline">
              INFINITY BOTS
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSelector />
            <button className="rounded-lg p-2 text-brand-muted transition-colors hover:bg-white/5 hover:text-white">
              <Bell size={18} />
            </button>
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 rounded-xl border border-brand-gray-border bg-brand-gray-mid px-2.5 py-1.5 text-sm transition-colors hover:border-brand-accent/40"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-accent/20 text-xs font-bold text-brand-accent-light">
                    {user.name.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <span className="hidden max-w-[100px] truncate sm:inline">{user.name}</span>
                <ChevronDown size={14} className="text-brand-muted" />
              </button>
              {menuOpen && (
                <div className="absolute top-full right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-brand-gray-border bg-brand-gray-mid py-1 shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-brand-muted hover:bg-white/5 hover:text-white"
                  >
                    <LogOut size={14} />
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Olá, {user.name}</h1>
          <p className="mt-1 text-brand-muted">
            Gerencie seus BOTs, faturas e equipe em um só lugar.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={Bot} iconClass="text-brand-accent" value="0" label="BOTs" />
          <StatCard icon={Signal} iconClass="text-green-400" value="0" label="Online" />
          <StatCard icon={TriangleAlert} iconClass="text-yellow-400" value="0" label="Faturas abertas" />
          <StatCard icon={TrendingUp} iconClass="text-blue-400" value="R$0,00" label="Plano mensal" />
        </div>

        <nav className="mb-8 flex flex-wrap gap-1 rounded-2xl border border-brand-gray-border bg-brand-gray-mid p-1.5">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => changeTab(item.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                tab === item.id
                  ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/20'
                  : 'text-brand-muted hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        {tab === 'overview' && <OverviewTab onGoApps={() => changeTab('applications')} />}
        {tab === 'applications' && <ApplicationsTab />}
        {tab === 'billing' && <BillingTab />}
        {tab === 'team' && (
          <TeamTab inviteEmail={inviteEmail} setInviteEmail={setInviteEmail} />
        )}
      </main>
    </div>
  )
}

function StatCard({
  icon: Icon,
  iconClass,
  value,
  label,
}: {
  icon: typeof Bot
  iconClass: string
  value: string
  label: string
}) {
  return (
    <div className="rounded-2xl border border-brand-gray-border bg-brand-gray-mid p-5">
      <Icon size={20} className={`mb-3 ${iconClass}`} />
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="mt-1 text-sm text-brand-muted">{label}</div>
    </div>
  )
}

function OverviewTab({ onGoApps }: { onGoApps: () => void }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-brand-gray-border bg-brand-gray-mid p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Meus BOTs</h2>
            <button onClick={onGoApps} className="text-sm text-brand-accent hover:underline">
              Ver todos →
            </button>
          </div>
          <div className="flex flex-col items-center py-10 text-center">
            <Bot size={40} className="mb-3 text-brand-muted/50" />
            <p className="font-medium text-white">Nenhum BOT ainda</p>
            <Link to="/checkout/cfx" className="mt-3 text-sm text-brand-accent hover:underline">
              Ver planos
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-brand-gray-border bg-brand-gray-mid p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Faturas recentes</h2>
            <span className="text-sm text-brand-accent">Ver todas →</span>
          </div>
          <div className="flex flex-col items-center py-10 text-center">
            <FileText size={40} className="mb-3 text-brand-muted/50" />
            <p className="text-brand-muted">Nenhuma fatura</p>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center gap-2">
          <Zap size={18} className="text-brand-accent" />
          <h2 className="text-lg font-semibold text-white">Acesso rápido</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <QuickLink icon={Bot} label="Meus BOTs" onClick={onGoApps} />
          <QuickLink icon={FileText} label="Billing" to="/dashboard?tab=billing" />
          <QuickLink icon={Users} label="Team" to="/dashboard?tab=team" />
          <QuickLink icon={ShoppingCart} label="Assinar BOT" to="/checkout/cfx" />
        </div>
      </div>
    </div>
  )
}

function QuickLink({
  icon: Icon,
  label,
  to,
  onClick,
}: {
  icon: typeof Bot
  label: string
  to?: string
  onClick?: () => void
}) {
  const className =
    'flex items-center gap-3 rounded-2xl border border-brand-gray-border bg-brand-gray-mid p-4 transition-all hover:border-brand-accent/40 hover:bg-brand-accent/5'

  if (to) {
    return (
      <Link to={to} className={className}>
        <Icon size={20} className="text-brand-accent" />
        <span className="text-sm font-medium text-white">{label}</span>
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={`${className} text-left`}>
      <Icon size={20} className="text-brand-accent" />
      <span className="text-sm font-medium text-white">{label}</span>
    </button>
  )
}

function ApplicationsTab() {
  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Meus BOTs</h2>
          <p className="mt-1 text-sm text-brand-muted">0 aplicações — 0 online</p>
        </div>
        <Link to="/checkout/cfx" className="btn-primary inline-flex items-center gap-2 px-4 py-2.5 text-sm">
          + Novo BOT
        </Link>
      </div>

      <div className="flex flex-col items-center rounded-2xl border border-brand-gray-border bg-brand-gray-mid px-6 py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gray-light">
          <Bot size={32} className="text-brand-muted" />
        </div>
        <p className="text-lg font-semibold text-white">Nenhum BOT ainda</p>
        <p className="mt-2 text-sm text-brand-muted">
          Assine um plano para começar a usar nossos BOTs
        </p>
        <Link to="/checkout/cfx" className="btn-primary mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm">
          <ShoppingCart size={16} />
          Ver planos
        </Link>
      </div>
    </div>
  )
}

function BillingTab() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Billing</h2>
        <p className="mt-1 text-sm text-brand-muted">0 faturas</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-green-500/40 px-3 py-1 text-xs font-medium text-green-400">
            Pagas: 0
          </span>
          <span className="rounded-full border border-yellow-500/40 px-3 py-1 text-xs font-medium text-yellow-400">
            Pendentes: 0
          </span>
          <span className="rounded-full border border-red-400/40 px-3 py-1 text-xs font-medium text-red-400">
            Atrasadas: 0
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center rounded-2xl border border-brand-gray-border bg-brand-gray-mid px-6 py-20 text-center">
        <FileText size={40} className="mb-3 text-brand-muted/50" />
        <p className="text-brand-muted">Nenhuma fatura encontrada.</p>
      </div>
    </div>
  )
}

function TeamTab({
  inviteEmail,
  setInviteEmail,
}: {
  inviteEmail: string
  setInviteEmail: (v: string) => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Gerenciar equipe</h2>
        <p className="mt-1 text-sm text-brand-muted">
          Convide membros com acesso limitado. O convidado precisa ter uma conta registrada.
        </p>
      </div>

      <div className="rounded-2xl border border-brand-gray-border bg-brand-gray-mid p-6">
        <div className="mb-4 flex items-center gap-2">
          <UserPlus size={18} className="text-brand-accent" />
          <h3 className="font-semibold text-white">Enviar convite</h3>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Mail size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-brand-muted" />
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Email do membro para convidar"
              className="w-full rounded-xl border border-brand-gray-border bg-brand-black py-3 pr-4 pl-10 text-sm text-white placeholder:text-brand-muted focus:border-brand-accent focus:outline-none"
            />
          </div>
          <button className="btn-primary inline-flex items-center justify-center gap-2 px-5 py-3 text-sm">
            <Search size={16} />
            Verificar
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-brand-gray-border bg-brand-gray-mid p-6">
        <div className="mb-4 flex items-center gap-2">
          <Users size={18} className="text-brand-accent" />
          <h3 className="font-semibold text-white">Membros ativos</h3>
        </div>
        <div className="flex flex-col items-center py-12 text-center">
          <Users size={40} className="mb-3 text-brand-muted/50" />
          <p className="font-medium text-white">Nenhum membro ativo ainda.</p>
          <p className="mt-1 text-sm text-brand-muted">Convide alguém usando o formulário acima.</p>
        </div>
      </div>
    </div>
  )
}
