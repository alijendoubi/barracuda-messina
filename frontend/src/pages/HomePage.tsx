import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CustomCursor } from '../components/CustomCursor'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { useLang } from '../i18n'
import { useReveal } from '../hooks/useReveal'

const PHOTOS = {
  hero: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=2000&q=80&auto=format&fit=crop',
  signature1: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1200&q=80&auto=format&fit=crop',
  signature2: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=1200&q=80&auto=format&fit=crop',
  signature3: 'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?w=1200&q=80&auto=format&fit=crop',
  sea1: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1600&q=80&auto=format&fit=crop',
  sea2: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80&auto=format&fit=crop',
  table: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80&auto=format&fit=crop',
  ig1: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80&auto=format&fit=crop',
  ig2: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80&auto=format&fit=crop',
  ig3: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80&auto=format&fit=crop',
  ig4: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80&auto=format&fit=crop',
  ig5: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?w=800&q=80&auto=format&fit=crop',
  ig6: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=800&q=80&auto=format&fit=crop',
  ig7: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80&auto=format&fit=crop',
  ig8: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&q=80&auto=format&fit=crop',
}

function Hero({ t }: { t: (k: string) => string }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (ref.current) {
        ref.current.style.setProperty('--py', `${y * 0.4}px`)
        ref.current.style.setProperty('--pop', `${Math.max(0, 1 - y / 600)}`)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={ref} className="hero" style={{
      position: 'relative', minHeight: '100vh', overflow: 'hidden',
      color: 'var(--cream)', display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', padding: '120px var(--gutter) 8vh',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        transform: 'translateY(var(--py, 0))', willChange: 'transform',
      }}>
        <img src={PHOTOS.hero} alt="" style={{ width: '100%', height: '120%', objectFit: 'cover' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(14,58,79,0.35) 0%, rgba(14,58,79,0.15) 35%, rgba(26,22,18,0.7) 100%)',
        }} />
      </div>

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.85,
      }}>
        <span>N° 001 — Sicilia</span>
        <span>{t('hero_eyebrow')}</span>
        <span>Est. 2019</span>
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1300 }}>
        <div className="display" style={{ fontSize: 'clamp(80px, 18vw, 280px)', lineHeight: 0.86 }}>
          <div style={{ overflow: 'hidden' }}>
            <div className="hero-line" style={{ animation: 'rise 1.1s var(--ease-out) 0.1s both' }}>
              {t('hero_line1')}
            </div>
          </div>
          <div style={{ overflow: 'hidden', marginLeft: 'clamp(40px, 12vw, 200px)' }}>
            <div className="hero-line italic" style={{ fontStyle: 'italic', animation: 'rise 1.1s var(--ease-out) 0.25s both' }}>
              {t('hero_line2')}
            </div>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div className="hero-line" style={{ animation: 'rise 1.1s var(--ease-out) 0.4s both' }}>
              {t('hero_line3')}
            </div>
          </div>
        </div>
        <div style={{
          marginTop: 40, display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', gap: 40, flexWrap: 'wrap',
        }}>
          <p style={{ maxWidth: 420, fontSize: 17, lineHeight: 1.5, opacity: 0.9 }}>{t('hero_sub')}</p>
          <Link to="/prenota" className="btn hoverable" style={{ borderColor: 'var(--cream)', color: 'var(--cream)' }}>
            {t('hero_cta')} <span className="arrow">→</span>
          </Link>
        </div>
      </div>

      <div style={{
        position: 'absolute', right: 'var(--gutter)', bottom: '8vh',
        display: 'flex', alignItems: 'center', gap: 12,
        fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
        writingMode: 'vertical-rl', transform: 'rotate(180deg)',
      }}>
        <span style={{ opacity: 0.6 }}>{t('hero_scroll')}</span>
        <div style={{ width: 1, height: 60, background: 'var(--cream)', opacity: 0.6, animation: 'scrollDown 2.4s ease-in-out infinite' }} />
      </div>

      <style>{`
        @keyframes rise { from { transform: translateY(110%); } to { transform: translateY(0); } }
        @keyframes scrollDown {
          0%, 100% { transform: scaleY(0.3); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
        }
      `}</style>
    </section>
  )
}

function Marquee({ t }: { t: (k: string) => string }) {
  const text = t('marquee')
  return (
    <div className="marquee">
      <div className="marquee-track">
        <span>{text} <span className="dot" /></span>
        <span>{text} <span className="dot" /></span>
        <span>{text} <span className="dot" /></span>
      </div>
    </div>
  )
}

function Signature({ t }: { t: (k: string) => string }) {
  const pizzas = [
    { key: '1', img: PHOTOS.signature1, num: '01' },
    { key: '2', img: PHOTOS.signature2, num: '02' },
    { key: '3', img: PHOTOS.signature3, num: '03' },
  ]
  return (
    <section className="section" id="signature">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="eyebrow reveal" style={{ color: 'var(--terra)', marginBottom: 18 }}>— {t('sig_eyebrow')}</div>
            <h2 className="display reveal" style={{ fontSize: 'clamp(48px, 7vw, 110px)' }}>
              {t('sig_title')}<br />
              <span style={{ fontStyle: 'italic' }}>{t('sig_title_it')}</span>
            </h2>
          </div>
          <p className="reveal" style={{ maxWidth: 380, fontSize: 16, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
            {t('sig_body')}
          </p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(20px, 3vw, 40px)', marginTop: 60,
        }} className="sig-grid">
          {pizzas.map((p, i) => (
            <article key={p.key} className="reveal hoverable" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="photo" style={{ aspectRatio: '4 / 5' }}>
                <img src={p.img} alt="" />
                <div className="caption">N° {p.num} · {t(`pizza_${p.key}_name`)}</div>
              </div>
              <div style={{ paddingTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
                <h3 className="display" style={{ fontSize: 36, letterSpacing: '-0.01em' }}>
                  <span style={{ fontStyle: 'italic' }}>{t(`pizza_${p.key}_name`)}</span>
                </h3>
                <span className="mono" style={{ color: 'var(--terra)' }}>€18</span>
              </div>
              <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: 360 }}>
                {t(`pizza_${p.key}_desc`)}
              </p>
            </article>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 800px) { .sig-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}

function Experience({ t }: { t: (k: string) => string }) {
  const wrap = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (!wrap.current) return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = wrap.current!.getBoundingClientRect()
        const vh = window.innerHeight
        const total = r.height - vh
        const passed = -r.top
        setProgress(Math.max(0, Math.min(1, passed / total)))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  const reveal = Math.min(1, progress / 0.55)
  const maskInset = (1 - reveal) * 50
  const imgScale = 1.15 - reveal * 0.15

  return (
    <section ref={wrap} id="experience" style={{ position: 'relative', background: 'var(--sea-deep)', color: 'var(--cream)' }}>
      <div style={{ height: '260vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0,
            clipPath: `inset(0% ${maskInset}% 0% ${maskInset}%)`,
            transition: 'clip-path 0.05s linear', willChange: 'clip-path',
          }}>
            <img src={PHOTOS.sea1} alt="" style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: `scale(${imgScale})`, transition: 'transform 0.05s linear',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(5,15,31,0.2) 0%, rgba(5,15,31,0.4) 50%, rgba(5,15,31,0.85) 100%)',
            }} />
          </div>

          <div aria-hidden style={{
            position: 'absolute', inset: 0, background: 'var(--ink)',
            clipPath: `polygon(0 0, ${50 - (1 - reveal) * 50}% 0, ${50 - (1 - reveal) * 50}% 100%, 0 100%)`,
            transition: 'clip-path 0.05s linear',
          }} />
          <div aria-hidden style={{
            position: 'absolute', inset: 0, background: 'var(--ink)',
            clipPath: `polygon(${50 + (1 - reveal) * 50}% 0, 100% 0, 100% 100%, ${50 + (1 - reveal) * 50}% 100%)`,
            transition: 'clip-path 0.05s linear',
          }} />

          <div style={{
            position: 'absolute', top: 'calc(var(--gutter) + 80px)', left: 'var(--gutter)',
            fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
            opacity: 0.7, display: 'flex', gap: 16, alignItems: 'center',
          }}>
            <span style={{ display: 'inline-block', width: 24, height: 1, background: 'var(--terra)' }} />
            <span>— {t('exp_eyebrow')}</span>
          </div>

          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
            justifyContent: 'center', pointerEvents: 'none', padding: '0 var(--gutter)',
          }}>
            <h2 className="display" style={{
              fontSize: 'clamp(44px, 7.5vw, 120px)', textAlign: 'center',
              lineHeight: 0.96, maxWidth: 1100,
              opacity: Math.min(1, reveal * 1.4),
              transform: `translateY(${(1 - reveal) * 30}px)`,
              transition: 'opacity 0.1s linear, transform 0.1s linear',
            }}>
              {t('exp_title')}<br />
              <span style={{ fontStyle: 'italic', color: 'var(--terra)' }}>{t('exp_title2')}</span>
            </h2>
          </div>

          <div style={{
            position: 'absolute', left: 'var(--gutter)', right: 'var(--gutter)', bottom: 40,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--cream)', opacity: 0.7,
          }}>
            <span>Messina · 38°N</span>
            <div style={{ flex: 1, margin: '0 24px', height: 1, background: 'rgba(232,217,204,0.2)', position: 'relative' }}>
              <div style={{
                position: 'absolute', left: 0, top: -1, height: 3,
                width: `${progress * 100}%`, background: 'var(--terra)', transition: 'width 0.05s linear',
              }} />
            </div>
            <span>{Math.round(progress * 100).toString().padStart(2, '0')} / 100</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '140px var(--gutter)', borderTop: '1px solid rgba(232,217,204,0.1)' }}>
        <div className="container exp-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          <div className="reveal">
            <div className="eyebrow" style={{ color: 'var(--terra)', marginBottom: 24 }}>— {t('exp_eyebrow')} · §02</div>
            <p className="display" style={{ fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 1.18 }}>
              {t('exp_body')}
            </p>
            <div style={{ marginTop: 40 }}>
              <Link to="/prenota" className="btn hoverable" style={{ color: 'var(--cream)', borderColor: 'var(--cream)' }}>
                {t('exp_cta')} <span className="arrow">→</span>
              </Link>
            </div>
          </div>
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="photo" style={{ aspectRatio: '4 / 3' }}>
              <img src={PHOTOS.table} alt="" />
              <div className="caption">Patio · 21:42</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="photo" style={{ aspectRatio: '1 / 1' }}>
                <img src={PHOTOS.sea2} alt="" />
                <div className="caption">Stretto · alba</div>
              </div>
              <div className="photo" style={{ aspectRatio: '1 / 1' }}>
                <img src={PHOTOS.signature1} alt="" />
                <div className="caption">Forno · 480°</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 800px) { .exp-body { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </section>
  )
}

function MenuPreview({ t }: { t: (k: string) => string }) {
  const items = [
    { name: 'Acqua di mare', cat: 'Aperitivi', price: '€12' },
    { name: 'Stretto', cat: "Pizze d'autore", price: '€18' },
    { name: 'Tramonto', cat: "Pizze d'autore", price: '€19' },
    { name: 'Scirocco', cat: "Pizze d'autore", price: '€18' },
    { name: 'Mare nostro', cat: 'Pizze del mare', price: '€22' },
    { name: 'Cassata bianca', cat: 'Dolci', price: '€10' },
  ]
  return (
    <section className="section" id="menu-preview" style={{ background: 'var(--ink)' }}>
      <div className="container">
        <div className="section-header">
          <div>
            <div className="eyebrow reveal" style={{ color: 'var(--terra)', marginBottom: 18 }}>— {t('menu_eyebrow')}</div>
            <h2 className="display reveal" style={{ fontSize: 'clamp(48px, 7vw, 110px)' }}>
              {t('menu_title')}<br />
              <span style={{ fontStyle: 'italic' }}>{t('menu_title2')}</span>
            </h2>
          </div>
          <Link to="/menu" className="btn hoverable reveal">{t('menu_cta')} <span className="arrow">→</span></Link>
        </div>
        <div style={{ marginTop: 40 }}>
          {items.map((item, i) => (
            <div key={i} className="reveal hoverable menu-row" style={{
              display: 'grid', gridTemplateColumns: '60px 1fr auto auto',
              gap: 28, alignItems: 'baseline', padding: '28px 0',
              borderTop: '1px solid rgba(232,217,204,0.15)',
              borderBottom: i === items.length - 1 ? '1px solid rgba(232,217,204,0.15)' : 'none',
              transitionDelay: `${i * 40}ms`,
            }}>
              <span className="mono" style={{ color: 'var(--terra)' }}>{(i + 1).toString().padStart(2, '0')}</span>
              <span className="display" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontStyle: i % 2 === 0 ? 'normal' : 'italic' }}>
                {item.name}
              </span>
              <span className="mono" style={{ color: 'var(--ink-soft)' }}>{item.cat}</span>
              <span className="mono" style={{ color: 'var(--terra)' }}>{item.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function InstagramWall({ t }: { t: (k: string) => string }) {
  const tiles = [
    { img: PHOTOS.ig1, span: 'tall' }, { img: PHOTOS.ig2, span: 'wide' },
    { img: PHOTOS.ig3, span: '' }, { img: PHOTOS.ig4, span: '' },
    { img: PHOTOS.ig5, span: 'tall' }, { img: PHOTOS.ig6, span: '' },
    { img: PHOTOS.ig7, span: 'wide' }, { img: PHOTOS.ig8, span: '' },
  ]
  return (
    <section className="section" style={{ background: 'var(--cream-2)' }}>
      <div className="container">
        <div className="section-header">
          <div className="eyebrow reveal" style={{ color: 'var(--terra)' }}>— {t('ig_eyebrow')}</div>
          <h2 className="display reveal" style={{ fontSize: 'clamp(40px, 6vw, 90px)', textAlign: 'right', maxWidth: 700, color: 'var(--cream)' }}>
            <span style={{ fontStyle: 'italic' }}>{t('ig_title')}</span>
          </h2>
        </div>
        <div className="ig-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '180px', gap: 16, marginTop: 40,
        }}>
          {tiles.map((tile, i) => (
            <a key={i} href="#" className="photo hoverable reveal" style={{
              gridRow: tile.span === 'tall' ? 'span 2' : 'span 1',
              gridColumn: tile.span === 'wide' ? 'span 2' : 'span 1',
              transitionDelay: `${i * 40}ms`,
            }}>
              <img src={tile.img} alt="" />
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}>
          <a href="#" className="btn hoverable">@barrracuda_ <span className="arrow">↗</span></a>
        </div>
      </div>
      <style>{`@media (max-width: 800px) { .ig-grid { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: 140px !important; } }`}</style>
    </section>
  )
}

function BookingCTA({ t }: { t: (k: string) => string }) {
  return (
    <section className="section" style={{
      background: 'var(--terra)', color: 'var(--cream)',
      padding: 'clamp(120px, 18vw, 220px) var(--gutter)',
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="eyebrow reveal" style={{ marginBottom: 32, opacity: 0.7 }}>— {t('book_eyebrow')}</div>
        <h2 className="display reveal" style={{ fontSize: 'clamp(64px, 11vw, 200px)' }}>
          {t('book_title')}<br />
          <span style={{ fontStyle: 'italic' }}>{t('book_title2')}</span>
        </h2>
        <p className="reveal" style={{ maxWidth: 520, margin: '40px auto 56px', fontSize: 17, lineHeight: 1.6, opacity: 0.9 }}>
          {t('book_body')}
        </p>
        <Link to="/prenota" className="btn hoverable reveal" style={{
          background: 'var(--cream)', color: 'var(--terra)', borderColor: 'var(--cream)',
          padding: '22px 36px', fontSize: 12,
        }}>
          {t('hero_cta')} <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  )
}

export function HomePage() {
  const { lang, setLang, t } = useLang()
  useReveal()

  return (
    <>
      <CustomCursor />
      <Nav lang={lang} setLang={setLang} current="home" />
      <Hero t={t} />
      <Marquee t={t} />
      <Signature t={t} />
      <Experience t={t} />
      <MenuPreview t={t} />
      <InstagramWall t={t} />
      <BookingCTA t={t} />
      <Footer lang={lang} t={t} />
    </>
  )
}
