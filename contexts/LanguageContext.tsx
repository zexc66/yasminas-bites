'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Lang, translations, TranslationKey } from '@/lib/i18n'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: TranslationKey) => string
  dir: 'ltr' | 'rtl'
}

const Ctx = createContext<LangCtx | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  const handleSetLang = (l: Lang) => {
    setLang(l)
    // Update HTML dir and lang attributes for RTL support
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = l
    localStorage.setItem('yasminas-lang', l)
  }

  useEffect(() => {
    const saved = localStorage.getItem('yasminas-lang') as Lang | null
    if (saved === 'ar' || saved === 'en') handleSetLang(saved)
  }, [])

  const t = (key: TranslationKey): string => translations[lang][key]
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  return <Ctx.Provider value={{ lang, setLang: handleSetLang, t, dir }}>{children}</Ctx.Provider>
}

export function useLang() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
