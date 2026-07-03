export type Language = 'pt' | 'en' | 'es'

export type LanguageOption = {
  code: Language
  label: string
  flag: string
}

export const languages: LanguageOption[] = [
  { code: 'pt', label: 'Português', flag: 'https://flagcdn.com/24x18/br.png' },
  { code: 'en', label: 'English', flag: 'https://flagcdn.com/24x18/us.png' },
  { code: 'es', label: 'Español', flag: 'https://flagcdn.com/24x18/es.png' },
]
