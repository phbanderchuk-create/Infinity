import { useState } from 'react'
import { LanguageSelector } from './components/LanguageSelector'
import { useLanguage } from './i18n/LanguageContext'
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  ChartColumn,
  ChevronDown,
  CircleCheckBig,
  Cpu,
  ExternalLink,
  Globe,
  LogIn,
  Menu,
  MessageCircle,
  Palette,
  PanelsTopLeft,
  Play,
  RefreshCw,
  Search,
  Server,
  Shield,
  ShoppingBag,
  Smartphone,
  Star,
  X,
  Zap,
} from 'lucide-react'
import logoImg from './assets/logo.png'

const portfolioUrls = ['exemplo.com.br', 'portfolio.dev', 'grupo.gg']
const portfolioGradients = [
  'from-purple-900/50 to-purple-950/80',
  'from-violet-900/50 to-purple-950/80',
  'from-fuchsia-900/40 to-purple-950/80',
]

const featureIcons = [Zap, Shield, RefreshCw, ChartColumn, Server, Bot]

const plansData = [
  {
    name: 'BOT Store V2',
    oldPrice: 'R$ 32,99',
    price: '25',
    cents: ',99',
    icon: ShoppingBag,
    popular: false,
    key: 'store' as const,
  },
  {
    name: 'BOT Cfx V2',
    oldPrice: 'R$ 48,99',
    price: '35',
    cents: ',99',
    icon: Cpu,
    popular: true,
    key: 'cfx' as const,
  },
]

function Logo() {
  return (
    <a href="/" className="group flex items-center gap-3">
      <img
        src={logoImg}
        alt="Infinity Bots"
        className="h-10 w-auto transition-opacity group-hover:opacity-90"
      />
      <span className="font-display hidden text-sm font-extrabold tracking-widest text-white sm:inline">
        INFINITY BOTS
      </span>
    </a>
  )
}

function Header() {
  const { t } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  const navLinks = [
    { href: '#recursos', label: t.nav.features },
    { href: '#planos', label: t.nav.plans },
  ]

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-brand-gray-border bg-brand-black/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            <div className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-brand-muted transition-all duration-200 hover:bg-white/5 hover:text-white"
              >
                {t.nav.services}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 rounded-xl border border-brand-gray-border bg-brand-gray-mid py-1 shadow-lg shadow-black/50">
                  <a
                    href="#sites"
                    className="block px-4 py-2 text-sm text-brand-muted hover:bg-white/5 hover:text-brand-accent-light"
                  >
                    {t.nav.sitesLanding}
                  </a>
                  <a
                    href="#planos"
                    className="block px-4 py-2 text-sm text-brand-muted hover:bg-white/5 hover:text-brand-accent-light"
                  >
                    {t.nav.botsDiscord}
                  </a>
                </div>
              )}
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-brand-muted transition-all duration-200 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <LanguageSelector />
            <div className="ml-2 flex items-center gap-2">
              <a href="#login" className="btn-ghost flex items-center gap-1.5 text-sm">
                <LogIn size={14} />
                {t.nav.signIn}
              </a>
              <a href="#register" className="btn-primary px-4 py-2 text-sm">
                {t.nav.getStarted}
              </a>
            </div>
          </nav>

          <button
            className="rounded-lg p-1 text-white transition-colors hover:bg-white/5 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-brand-gray-border py-4 md:hidden">
            <div className="flex flex-col gap-1">
              <a href="#sites" className="rounded-lg px-3 py-2 text-sm text-brand-muted hover:bg-white/5">
                {t.nav.services}
              </a>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm text-brand-muted hover:bg-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="px-3 py-2">
                <LanguageSelector />
              </div>
              <div className="mt-2 flex flex-col gap-2 px-3">
                <a href="#login" className="btn-ghost text-sm">
                  {t.nav.signIn}
                </a>
                <a href="#register" className="btn-primary text-center text-sm">
                  {t.nav.getStarted}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

function Hero() {
  const { t } = useLanguage()
  const stats = [
    { value: '100+', label: t.hero.stats.clients },
    { value: '99.9%', label: t.hero.stats.uptime },
    { value: '24/7', label: t.hero.stats.support },
    { value: '5+', label: t.hero.stats.products },
  ]

  return (
    <section className="relative overflow-hidden pt-32 pb-24">
      <div className="pointer-events-none absolute top-[-100px] left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-brand-accent/10 blur-[140px] animate-glow-pulse" />
      <div className="pointer-events-none absolute top-40 left-[10%] h-72 w-72 rounded-full bg-brand-accent/5 blur-[80px] animate-float" />
      <div className="pointer-events-none absolute top-20 right-[8%] h-56 w-56 rounded-full bg-brand-accent/8 blur-[70px] animate-float-delay" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(168, 85, 247) 1px, transparent 1px), linear-gradient(90deg, rgb(168, 85, 247) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-brand-accent/25 bg-brand-accent/10 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
            </span>
            <span className="text-sm font-medium text-brand-accent-light">
              {t.hero.badge}
            </span>
          </div>

          <h1 className="animate-slide-up mb-6 text-5xl leading-tight font-black text-white md:text-7xl">
            {t.hero.title1}{' '}
            <span className="gradient-text">{t.hero.titleDiscord}</span> {t.hero.title2}{' '}
            <span className="gradient-text">{t.hero.titleDigital}</span>
          </h1>

          <p className="animate-slide-up stagger-2 mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-brand-muted">
            {t.hero.subtitle}
          </p>

          <div className="animate-slide-up stagger-3 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#planos"
              className="btn-primary flex items-center gap-2 px-8 py-4 text-base shadow-lg transition-shadow hover:shadow-xl"
            >
              {t.hero.ctaProducts}
              <ArrowRight size={18} />
            </a>
            <a
              href="#login"
              className="btn-secondary flex items-center gap-2 px-8 py-4 text-base"
            >
              <Play size={15} className="fill-white" />
              {t.hero.ctaPanel}
            </a>
          </div>
        </div>

        <div className="animate-slide-up stagger-4 mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-brand-gray-border bg-brand-gray-mid/50 p-5 text-center transition-all duration-300 hover:border-brand-accent/30 hover:bg-brand-accent/5"
            >
              <div className="mb-1 text-4xl font-black text-brand-accent">{stat.value}</div>
              <div className="text-sm text-brand-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SitesSection() {
  const { t } = useLanguage()
  const siteFeatures = [
    { icon: PanelsTopLeft, ...t.sites.features.design },
    { icon: Smartphone, ...t.sites.features.responsive },
    { icon: Search, ...t.sites.features.seo },
    { icon: Palette, ...t.sites.features.custom },
  ]

  return (
    <section id="sites" className="relative overflow-hidden bg-brand-off-white py-24">
      <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[500px] rounded-full bg-brand-accent/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1">
            <Globe size={13} className="text-green-400" />
            <span className="text-xs font-semibold tracking-wide text-green-400 uppercase">
              {t.sites.badge}
            </span>
          </div>
          <h2 className="section-title mb-4">
            {t.sites.title}{' '}
            <span className="gradient-text">{t.sites.titleHighlight}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-brand-muted">
            {t.sites.subtitle}
          </p>
        </div>

        <div className="mb-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          {siteFeatures.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-brand-gray-border bg-brand-gray-mid/60 p-6 text-center transition-all duration-300 hover:border-brand-accent/30 hover:bg-brand-accent/5"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent/10 transition-colors group-hover:bg-brand-accent/20">
                <item.icon size={22} className="text-brand-accent" />
              </div>
              <h4 className="mb-1 text-sm font-semibold text-white">{item.title}</h4>
              <p className="text-xs text-brand-muted">{item.desc}</p>
            </div>
          ))}
        </div>

        <div>
          <div className="mb-10 text-center">
            <h3 className="mb-1.5 text-2xl font-bold text-white">
              {t.sites.portfolio} <span className="gradient-text">{t.sites.portfolioHighlight}</span>
            </h3>
            <p className="text-sm text-brand-muted">
              {t.sites.portfolioSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {t.sites.items.map((item, i) => (
              <div key={item.title} className="browser-frame group">
                <div className="flex items-center gap-2 border-b border-brand-gray-border bg-brand-gray-dark px-3 py-2.5">
                  <div className="flex items-center gap-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <div className="mx-2 flex-1 truncate rounded-full bg-brand-gray-light px-3 py-1 font-mono text-[10px] text-brand-muted">
                    {portfolioUrls[i]}
                  </div>
                  <a href="#" className="text-brand-muted transition-colors hover:text-brand-accent">
                    <ArrowUpRight size={13} />
                  </a>
                </div>
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <div
                    className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${portfolioGradients[i]}`}
                  >
                    <Globe size={40} className="text-brand-accent/40" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/65 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <a
                      href="#"
                      className="flex items-center gap-2 rounded-xl bg-brand-accent px-5 py-2.5 text-xs font-semibold text-white shadow-xl transition-colors hover:bg-brand-purple-dark"
                    >
                      <ExternalLink size={14} />
                      {t.sites.visitSite}
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 px-4 py-3">
                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-semibold text-white">{item.title}</h4>
                    <p className="truncate text-[11px] text-brand-muted">{item.description}</p>
                  </div>
                  <div className="flex flex-shrink-0 flex-col items-end gap-1">
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-green-500" />
                      <span className="text-[10px] font-medium text-green-400">{t.sites.online}</span>
                    </div>
                    <div className="flex gap-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-brand-gray-light px-1.5 py-0.5 text-[9px] text-brand-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const { t } = useLanguage()

  return (
    <section id="recursos" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="section-title mb-4">
            {t.features.title} <span className="gradient-text">{t.features.titleHighlight}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-brand-muted">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((feature, i) => {
            const Icon = featureIcons[i]
            return (
            <div
              key={feature.title}
              className="glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]"
              style={{ animationDelay: `${(i + 1) * 0.1}s` }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent/10">
                <Icon size={22} className="text-brand-accent" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-brand-muted">{feature.description}</p>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function InfrastructureSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-brand-off-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-brand-accent/20 bg-gradient-to-br from-brand-accent/5 via-transparent to-brand-accent/3 p-8 md:p-12">
          <div className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-brand-accent/8 blur-[100px]" />
          <div className="relative flex flex-col items-center gap-10 md:flex-row">
            <div className="flex-1">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3 py-1">
                <Server size={12} className="text-brand-accent" />
                <span className="text-xs font-semibold text-brand-accent">
                  {t.infrastructure.badge}
                </span>
              </div>
              <h2 className="mb-4 text-3xl font-bold text-white">
                {t.infrastructure.title}
              </h2>
              <p className="mb-8 leading-relaxed text-brand-muted">
                {t.infrastructure.description}
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: '99.9%', label: t.infrastructure.uptime },
                  { value: '<50ms', label: t.infrastructure.latency },
                  { value: '24/7', label: t.infrastructure.monitoring },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-brand-gray-border bg-brand-gray-mid/60 p-4 text-center"
                  >
                    <div className="text-2xl font-bold text-brand-accent">{stat.value}</div>
                    <div className="mt-0.5 text-xs text-brand-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="relative h-44 w-44">
                <div className="absolute inset-0 animate-glow-pulse rounded-3xl bg-brand-accent/10" />
                <div className="relative flex h-full w-full items-center justify-center rounded-3xl border border-brand-accent/20 bg-brand-accent/5">
                  <Server size={56} className="animate-float text-brand-accent/70" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PlansSection() {
  const { t } = useLanguage()

  return (
    <section id="planos" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="section-title mb-4">
            {t.plans.title} <span className="gradient-text">{t.plans.titleHighlight}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-brand-muted">
            {t.plans.subtitle}
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
          {plansData.map((plan) => {
            const planContent = t.plans[plan.key]
            return (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                plan.popular
                  ? 'border-brand-accent bg-gradient-to-b from-brand-accent/10 to-brand-gray-mid shadow-lg shadow-brand-accent/10'
                  : 'border-brand-gray-border bg-brand-gray-mid hover:border-brand-accent/40'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-brand-accent px-4 py-1 text-xs font-bold tracking-wider text-white uppercase">
                    {t.plans.popular}
                  </span>
                </div>
              )}

              <div className="mb-6 flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    plan.popular ? 'bg-brand-accent' : 'bg-brand-gray-light'
                  }`}
                >
                  <plan.icon
                    size={24}
                    className={plan.popular ? 'text-white' : 'text-brand-accent'}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="mt-0.5 text-xs text-brand-muted">{t.plans.botSubtitle}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-brand-muted line-through">{plan.oldPrice}</span>
                  <span className="rounded-full bg-green-400/10 px-2 py-0.5 text-xs font-medium text-green-400">
                    {t.plans.promotion}
                  </span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">R$ {plan.price}</span>
                  <span className="text-xl font-bold text-white">{plan.cents}</span>
                  <span className="text-sm text-brand-muted">{t.plans.perMonth}</span>
                </div>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-brand-muted">{planContent.description}</p>

              <ul className="mb-8 flex-1 space-y-3">
                {planContent.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <CircleCheckBig size={16} className="flex-shrink-0 text-brand-accent" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full rounded-xl py-3 text-sm font-semibold transition-all duration-200 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:outline-none ${
                  plan.popular
                    ? 'bg-brand-accent text-white hover:bg-brand-accent-light'
                    : 'border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white'
                }`}
              >
                {t.plans.subscribe}
              </button>

              <div className="mt-3 text-center">
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-xs text-brand-muted transition-colors hover:text-brand-accent"
                >
                  {t.plans.moreDetails}
                  <ArrowRight size={11} />
                </a>
              </div>

              <p className="mt-3 text-center text-xs text-brand-muted">
                <a href="#login" className="text-brand-accent hover:underline">
                  {t.plans.loginToBuy}
                </a>{' '}
                {t.plans.or}{' '}
                <a href="#register" className="text-brand-accent hover:underline">
                  {t.plans.createAccount}
                </a>{' '}
                {t.plans.toBuy}
              </p>
            </div>
            )
          })}
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="relative flex flex-col items-center justify-between gap-4 overflow-hidden rounded-2xl border border-green-500/20 bg-gradient-to-r from-green-500/5 to-transparent p-6 md:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                <Globe size={22} className="text-green-400" />
              </div>
              <div>
                <div className="mb-0.5 flex items-center gap-2">
                  <h4 className="font-semibold text-white">{t.plans.websites.title}</h4>
                  <span className="rounded-full bg-green-500/15 px-1.5 py-0.5 text-[10px] font-bold text-green-400">
                    {t.plans.websites.badge}
                  </span>
                </div>
                <p className="text-sm text-brand-muted">
                  {t.plans.websites.description}
                </p>
              </div>
            </div>
            <a
              href="#"
              className="flex flex-shrink-0 items-center gap-2 rounded-xl border border-green-500/25 bg-green-500/15 px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-green-400 transition-colors hover:bg-green-500/25"
            >
              {t.plans.websites.cta}
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-brand-off-white py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 animate-glow-pulse rounded-full bg-brand-accent/5 blur-3xl" />
          <div className="relative">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-4 py-1.5">
              <Star size={14} className="fill-brand-accent text-brand-accent" />
              <span className="text-sm font-medium text-brand-accent">{t.cta.badge}</span>
            </div>
            <h2 className="mb-6 text-4xl leading-tight font-black text-white md:text-5xl">
              {t.cta.title}{' '}
              <span className="gradient-text">{t.cta.titleHighlight}</span>
            </h2>
            <p className="mb-10 text-xl text-brand-muted">
              {t.cta.subtitle}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="#planos"
                className="btn-primary flex items-center justify-center gap-2 px-10 py-4 text-lg shadow-lg transition-shadow hover:shadow-xl"
              >
                {t.cta.start}
                <ArrowRight size={20} />
              </a>
              <a
                href="#login"
                className="btn-secondary flex items-center justify-center gap-2 px-10 py-4 text-lg"
              >
                {t.cta.hasAccount}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-brand-gray-border bg-brand-off-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <a
              href="#"
              className="mt-4 mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400 transition-colors hover:bg-green-500/20"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              {t.footer.systemStatus}
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-brand-muted">
              {t.footer.description}
            </p>
            <div className="mt-4 flex items-center gap-4">
              <a
                href="#"
                className="text-brand-muted transition-colors hover:text-brand-accent"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">{t.footer.products}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#planos"
                  className="text-sm text-brand-muted transition-colors hover:text-white"
                >
                  BOT Store V2
                </a>
              </li>
              <li>
                <a
                  href="#planos"
                  className="text-sm text-brand-muted transition-colors hover:text-white"
                >
                  BOT Cfx V2
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">{t.footer.account}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#login"
                  className="text-sm text-brand-muted transition-colors hover:text-white"
                >
                  {t.footer.signIn}
                </a>
              </li>
              <li>
                <a
                  href="#register"
                  className="text-sm text-brand-muted transition-colors hover:text-white"
                >
                  {t.footer.createAccount}
                </a>
              </li>
              <li>
                <a
                  href="#dashboard"
                  className="text-sm text-brand-muted transition-colors hover:text-white"
                >
                  {t.footer.dashboard}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-brand-gray-border pt-8 sm:flex-row">
          <p className="text-sm text-brand-muted">
            © {new Date().getFullYear()} Infinity Bots. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-black">
      <Header />
      <Hero />
      <SitesSection />
      <FeaturesSection />
      <InfrastructureSection />
      <PlansSection />
      <CtaSection />
      <Footer />
    </div>
  )
}
