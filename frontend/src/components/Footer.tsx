import type { Lang } from '../types'

interface FooterProps {
  lang: Lang
  t: (key: string) => string
}

export function Footer({ lang, t }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-display">
            Pizza.<br />
            <span style={{ fontStyle: 'italic' }}>Mare.</span><br />
            Esperienza.
          </div>
          <div style={{ marginTop: 32, opacity: 0.7, maxWidth: 320, fontSize: 14, lineHeight: 1.6 }}>
            {lang === 'it'
              ? 'Una pizzeria d\'autore affacciata sullo Stretto di Messina.'
              : 'A signature pizzeria on the Strait of Messina.'}
          </div>
        </div>
        <div>
          <h4>{t('foot_visit')}</h4>
          <div style={{ whiteSpace: 'pre-line', fontSize: 14, lineHeight: 1.7 }}>{t('foot_address')}</div>
        </div>
        <div>
          <h4>{t('foot_hours')}</h4>
          <div style={{ whiteSpace: 'pre-line', fontSize: 14, lineHeight: 1.7 }}>{t('foot_hours_v')}</div>
        </div>
        <div>
          <h4>{t('foot_follow')}</h4>
          <ul>
            <li><a href="#" className="hoverable">Instagram ↗</a></li>
            <li><a href="#" className="hoverable">TikTok ↗</a></li>
            <li><a href="#" className="hoverable">Spotify ↗</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Barrracuda Messina</span>
        <span>Lat 38.1938°N · Lon 15.5540°E</span>
        <span>{lang === 'it' ? 'Sito · MMXXVI' : 'Site · MMXXVI'}</span>
      </div>
    </footer>
  )
}
