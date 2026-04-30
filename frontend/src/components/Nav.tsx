import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BrandMark } from './BrandMark'
import type { Lang } from '../types'

interface NavProps {
  lang: Lang
  setLang: (l: Lang) => void
  current?: 'home' | 'menu' | 'booking'
}

export function Nav({ lang, setLang, current = 'home' }: NavProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const labels: Record<string, Record<Lang, string>> = {
    menu: { it: 'Menu', en: 'Menu' },
    book: { it: 'Prenota', en: 'Book' },
  }

  return (
    <nav className={'nav' + (scrolled ? ' scrolled' : '')}>
      <Link to="/" className="brand hoverable" style={{ justifySelf: 'start' }}>
        <span className="mark"><BrandMark color="currentColor" /></span>
        <span>Barrracuda<span className="italic" style={{ fontStyle: 'italic', marginLeft: 6 }}>Messina</span></span>
      </Link>
      <div className="links">
        <Link to="/" className={current === 'home' ? 'active' : ''}>Home</Link>
        <Link to="/menu" className={current === 'menu' ? 'active' : ''}>{labels.menu[lang]}</Link>
        <Link to="/prenota" className={current === 'booking' ? 'active' : ''}>{labels.book[lang]}</Link>
      </div>
      <div className="lang">
        <button className={lang === 'it' ? 'on hoverable' : 'hoverable'} onClick={() => setLang('it')}>IT</button>
        <span style={{ opacity: 0.4 }}>/</span>
        <button className={lang === 'en' ? 'on hoverable' : 'hoverable'} onClick={() => setLang('en')}>EN</button>
      </div>
    </nav>
  )
}
