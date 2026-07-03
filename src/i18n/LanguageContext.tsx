import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { translations, type TranslationKeys } from './translations'
import type { Language } from './types'

type LanguageContextValue = {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationKeys
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'site-language'

function getInitialLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'pt' || stored === 'en' || stored === 'es') return stored
  return 'pt'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang
  }

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : language
  }, [language])

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
