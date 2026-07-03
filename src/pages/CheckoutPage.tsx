import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Check,
  CircleCheckBig,
  Copy,
  Cpu,
  Mail,
  ShoppingBag,
} from 'lucide-react'
import { useAuth } from '../auth/AuthContext'

const products = {
  store: {
    name: 'BOT Store V2',
    icon: ShoppingBag,
    oldPrice: 32.99,
    monthly: 25.99,
    install: 15,
  },
  cfx: {
    name: 'BOT Cfx V2',
    icon: Cpu,
    oldPrice: 48.99,
    monthly: 35.99,
    install: 15,
  },
} as const

type Period = 'monthly' | 'quarterly' | 'annual'
type Addon = 'standard' | 'plus' | 'best'
type PaymentMethod = 'pix' | 'mercadopago'

const periodMultipliers: Record<Period, { months: number; discount: number; label: string }> = {
  monthly: { months: 1, discount: 0, label: 'Mensal' },
  quarterly: { months: 3, discount: 0.05, label: 'Trimestral' },
  annual: { months: 12, discount: 0.1, label: 'Anual' },
}

const addons = [
  {
    id: 'standard' as const,
    title: '1 Mês transcript + 2 Dias DB',
    desc: 'Pacote padrão: 1 mês de transcript e 2 dias de database',
    price: 0,
    badge: 'Incluído',
  },
  {
    id: 'plus' as const,
    title: '6 Meses transcript + 15 Dias DB',
    desc: 'Mais armazenamento para logs e database',
    price: 17.99,
  },
  {
    id: 'best' as const,
    title: '12 Meses transcript + 30 Dias DB',
    desc: 'Máximo armazenamento incluído',
    price: 32.99,
    tag: 'Melhor custo',
  },
]

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function CheckoutPage() {
  const { planId } = useParams()
  const { user } = useAuth()
  const product = products[planId as keyof typeof products]

  const [period, setPeriod] = useState<Period>('monthly')
  const [addon, setAddon] = useState<Addon>('standard')
  const [payment, setPayment] = useState<PaymentMethod>('pix')
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [fullName, setFullName] = useState(user?.name ?? '')
  const [cpf, setCpf] = useState('')
  const [copied, setCopied] = useState(false)

  const totals = useMemo(() => {
    if (!product) return null
    const periodInfo = periodMultipliers[period]
    const monthlyAfterPeriod = product.monthly * (1 - periodInfo.discount)
    const addonPrice = addons.find((a) => a.id === addon)?.price ?? 0
    const monthlyTotal = monthlyAfterPeriod + addonPrice
    const periodSubtotal = monthlyTotal * periodInfo.months
    const discountAmount = product.oldPrice - product.monthly
    const couponDiscount = couponApplied ? 5 : 0
    const totalToday = periodSubtotal + product.install - couponDiscount
    return {
      monthlyAfterPeriod,
      addonPrice,
      monthlyTotal,
      discountAmount,
      couponDiscount,
      totalToday,
      renewal: monthlyTotal,
      periodInfo,
    }
  }, [product, period, addon, couponApplied])

  if (!user) return <Navigate to="/login" replace />
  if (!product || !totals) return <Navigate to="/#planos" replace />

  const Icon = product.icon
  const pixCode =
    '00020126580014BR.GOV.BCB.PIX0136infinitybots@email.com520400005303986540' +
    totals.totalToday.toFixed(2).replace('.', '') +
    '5802BR5925INFINITY BOTS6009SAO PAULO62070503***6304ABCD'

  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm text-brand-muted transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Voltar
        </Link>

        <h1 className="text-3xl font-bold text-white">Finalize seu pedido</h1>
        <p className="mt-1 text-brand-muted">Confirme o pedido e escolha como pagar.</p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[340px_1fr]">
          <aside className="space-y-4 lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-2xl border border-brand-gray-border bg-brand-gray-mid p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-accent">
                  <Icon size={22} className="text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">{product.name}</h2>
                  <p className="text-xs text-brand-muted">Licença mensal — Discord BOT</p>
                </div>
              </div>

              <div className="space-y-2 border-t border-brand-gray-border pt-4 text-sm">
                <Row label="Preço original" value={formatBRL(product.oldPrice)} strike />
                <Row
                  label="Desconto"
                  value={`-${formatBRL(totals.discountAmount)}`}
                  valueClass="text-green-400"
                />
                <Row
                  label="Mensalidade"
                  value={`${formatBRL(totals.monthlyAfterPeriod)}/mês`}
                />
                {totals.addonPrice > 0 && (
                  <Row label="Add-on" value={`+${formatBRL(totals.addonPrice)}/mês`} />
                )}
                <div className="flex items-center justify-between">
                  <span className="text-brand-muted">Taxa de instalação</span>
                  <span className="flex items-center gap-2 text-white">
                    {formatBRL(product.install)}
                    <span className="rounded-full bg-brand-accent/15 px-2 py-0.5 text-[10px] font-bold text-brand-accent-light">
                      1ª vez
                    </span>
                  </span>
                </div>
                {couponApplied && (
                  <Row label="Cupom" value={`-${formatBRL(totals.couponDiscount)}`} valueClass="text-green-400" />
                )}
              </div>

              <div className="mt-4 border-t border-brand-gray-border pt-4">
                <div className="flex items-end justify-between">
                  <span className="text-sm text-brand-muted">Total hoje</span>
                  <span className="text-2xl font-bold text-white">{formatBRL(totals.totalToday)}</span>
                </div>
                <p className="mt-1 text-right text-xs text-brand-muted">
                  Renovação: {formatBRL(totals.renewal)}/mês
                </p>
              </div>
            </div>

            <ul className="space-y-2 px-1 text-sm text-brand-muted">
              {['Ativação em até 24h', 'Suporte dedicado incluso', 'Cancele quando quiser'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CircleCheckBig size={16} className="text-brand-accent" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </aside>

          <div className="space-y-5">
            <section className="rounded-2xl border border-brand-gray-border bg-brand-gray-mid p-6">
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-wide text-brand-muted uppercase">
                <Calendar size={14} />
                Período de cobrança
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {(Object.keys(periodMultipliers) as Period[]).map((key) => {
                  const info = periodMultipliers[key]
                  const selected = period === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setPeriod(key)}
                      className={`rounded-xl border p-4 text-left transition-all ${
                        selected
                          ? 'border-brand-accent bg-brand-accent/10'
                          : 'border-brand-gray-border hover:border-brand-accent/40'
                      }`}
                    >
                      <div className="font-semibold text-white">{info.label}</div>
                      {info.discount > 0 && (
                        <span className="mt-2 inline-block rounded-full bg-brand-accent/15 px-2 py-0.5 text-[10px] font-bold text-brand-accent-light">
                          {info.discount * 100}% off
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </section>

            <section className="rounded-2xl border border-brand-gray-border bg-brand-gray-mid p-6">
              <div className="mb-4 text-xs font-semibold tracking-wide text-brand-muted uppercase">
                Dados de contato
              </div>
              <div className="relative">
                <Mail size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-brand-muted" />
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full rounded-xl border border-brand-gray-border bg-brand-black py-3 pr-24 pl-10 text-sm text-white focus:outline-none"
                />
                <span className="absolute top-1/2 right-2 -translate-y-1/2 rounded-lg bg-brand-accent/15 px-2.5 py-1 text-xs font-semibold text-brand-accent-light">
                  Conta
                </span>
              </div>
            </section>

            <section className="rounded-2xl border border-brand-gray-border bg-brand-gray-mid p-6">
              <div className="mb-1 text-xs font-semibold tracking-wide text-brand-muted uppercase">
                + Add-ons disponíveis
              </div>
              <p className="mb-4 text-sm text-brand-muted">Transcript e armazenamento de database</p>
              <div className="space-y-3">
                {addons.map((item) => {
                  const selected = addon === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAddon(item.id)}
                      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                        selected
                          ? 'border-brand-accent bg-brand-accent/10'
                          : 'border-brand-gray-border hover:border-brand-accent/40'
                      }`}
                    >
                      <div
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          selected ? 'border-brand-accent bg-brand-accent' : 'border-brand-muted'
                        }`}
                      >
                        {selected && <Check size={12} className="text-white" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-white">{item.title}</span>
                          {'tag' in item && item.tag && (
                            <span className="rounded-full bg-brand-accent/15 px-2 py-0.5 text-[10px] font-bold text-brand-accent-light">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-brand-muted">{item.desc}</p>
                      </div>
                      <span
                        className={`shrink-0 text-sm font-medium ${
                          item.price === 0 ? 'text-green-400' : 'text-white'
                        }`}
                      >
                        {item.price === 0 ? 'Grátis incluso' : `+${formatBRL(item.price)}/mês`}
                      </span>
                    </button>
                  )
                })}
              </div>
              <p className="mt-4 text-xs text-brand-muted">
                Outros prazos?{' '}
                <a href="#" className="text-brand-accent hover:underline">
                  Fale conosco
                </a>
              </p>
            </section>

            <section className="rounded-2xl border border-brand-gray-border bg-brand-gray-mid p-6">
              <div className="mb-4 text-xs font-semibold tracking-wide text-brand-muted uppercase">
                Cupom de desconto
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Digite o código do cupom"
                  className="flex-1 rounded-xl border border-brand-gray-border bg-brand-black px-4 py-3 text-sm text-white placeholder:text-brand-muted focus:border-brand-accent focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setCouponApplied(coupon.trim().length > 0)}
                  className="rounded-xl border border-brand-accent px-5 py-3 text-sm font-semibold text-brand-accent transition-colors hover:bg-brand-accent hover:text-white"
                >
                  Aplicar
                </button>
              </div>
              {couponApplied && (
                <p className="mt-2 text-xs text-green-400">Cupom aplicado: -R$ 5,00</p>
              )}
            </section>

            <section className="rounded-2xl border border-brand-gray-border bg-brand-gray-mid p-6">
              <div className="mb-4 text-xs font-semibold tracking-wide text-brand-muted uppercase">
                Pagamento
              </div>
              <div className="mb-5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPayment('pix')}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                    payment === 'pix'
                      ? 'border-brand-accent bg-brand-accent/10 text-brand-accent-light'
                      : 'border-brand-gray-border text-brand-muted hover:border-brand-accent/40'
                  }`}
                >
                  PIX Direto
                </button>
                <button
                  type="button"
                  onClick={() => setPayment('mercadopago')}
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                    payment === 'mercadopago'
                      ? 'border-brand-accent bg-brand-accent/10 text-brand-accent-light'
                      : 'border-brand-gray-border text-brand-muted hover:border-brand-accent/40'
                  }`}
                >
                  Mercado Pago
                </button>
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-white">Nome completo *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-brand-gray-border bg-brand-black px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-white">CPF *</label>
                  <input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="000.000.000-00"
                    className="w-full rounded-xl border border-brand-gray-border bg-brand-black px-4 py-3 text-sm text-white placeholder:text-brand-muted focus:border-brand-accent focus:outline-none"
                  />
                </div>
              </div>

              {payment === 'pix' ? (
                <div className="rounded-xl border border-brand-gray-border bg-brand-black p-5 text-center">
                  <div className="mx-auto mb-4 flex h-44 w-44 items-center justify-center rounded-lg bg-white p-3">
                    <div
                      className="h-full w-full"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(0deg,#111 0 2px,transparent 2px 4px),repeating-linear-gradient(90deg,#111 0 2px,transparent 2px 4px)',
                      }}
                      aria-label="QR Code PIX (demonstração)"
                    />
                  </div>
                  <p className="text-sm font-medium text-white">Escaneie ou copie o código Pix</p>
                  <p className="mt-1 text-xs text-brand-muted">
                    App do banco → PIX → Pagar → Colar código
                  </p>
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-brand-gray-border bg-brand-gray-mid px-3 py-2.5">
                    <code className="flex-1 truncate text-left text-xs text-brand-muted">
                      {pixCode}
                    </code>
                    <button
                      type="button"
                      onClick={copyPix}
                      className="shrink-0 text-brand-accent hover:text-brand-accent-light"
                      title="Copiar"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                  {copied && <p className="mt-2 text-xs text-green-400">Código copiado!</p>}
                  <p className="mt-3 text-xs text-brand-muted">
                    Chave PIX: <span className="text-white">financeiro@infinitybots.app</span>
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-brand-muted">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-brand-accent" />
                    Aguardando confirmação do pagamento...
                  </div>
                  <p className="mt-2 text-xs text-brand-muted">
                    O admin confirma após verificar o recebimento. O site atualiza automaticamente.
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-brand-gray-border bg-brand-black p-8 text-center">
                  <p className="text-sm text-white">Pagamento via Mercado Pago</p>
                  <p className="mt-2 text-xs text-brand-muted">
                    Integração de demonstração. Em produção, o checkout do Mercado Pago abre aqui.
                  </p>
                  <button type="button" className="btn-primary mt-5 px-6 py-2.5 text-sm">
                    Pagar com Mercado Pago
                  </button>
                </div>
              )}
            </section>

            <p className="pb-8 text-center text-xs text-brand-muted">
              Pagamento seguro · Dados protegidos · Infinity Bots © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({
  label,
  value,
  strike,
  valueClass = 'text-white',
}: {
  label: string
  value: string
  strike?: boolean
  valueClass?: string
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-brand-muted">{label}</span>
      <span className={`${valueClass} ${strike ? 'line-through opacity-60' : ''}`}>{value}</span>
    </div>
  )
}
