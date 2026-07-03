import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { languages } from '../i18n/types'

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = languages.find((l) => l.code === language) ?? languages[0]

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex select-none items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-sm font-medium text-brand-muted transition-all duration-200 hover:bg-white/5 hover:text-white"
        aria-label="Selecionar idioma"
        aria-expanded={open}
      >
        <img src={current.flag} alt={current.label} className="h-auto w-5 rounded-sm" />
        <span className="hidden text-xs sm:inline">{current.label}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="currentColor"
          className={`opacity-60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path
            d="M1 3l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-brand-gray-border bg-brand-gray-mid py-1 shadow-lg shadow-black/50">
          {languages.map((lang) => {
            const isActive = lang.code === language
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLanguage(lang.code)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-brand-accent/15 font-semibold text-brand-accent-light'
                    : 'text-brand-muted hover:bg-white/5 hover:text-white'
                }`}
              >
                <img src={lang.flag} alt={lang.label} className="h-auto w-5 rounded-sm" />
                <span className="flex-1 text-left">{lang.label}</span>
                {isActive && <Check size={14} className="text-brand-accent" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
