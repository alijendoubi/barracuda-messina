import { useState, useCallback, useEffect } from 'react'
import type { Lang } from '../types'
import { COPY } from './copy'

export function useLang() {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem('bm_lang') as Lang) || 'it'
  })

  useEffect(() => {
    localStorage.setItem('bm_lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((l: Lang) => setLangState(l), [])

  const t = useCallback(
    (key: string): string => {
      return COPY[lang][key] ?? key
    },
    [lang],
  )

  return { lang, setLang, t }
}
