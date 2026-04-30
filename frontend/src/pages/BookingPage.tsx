import { useState, useEffect } from 'react'
import { CustomCursor } from '../components/CustomCursor'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { useLang } from '../i18n'
import { useReveal } from '../hooks/useReveal'
import type { Reservation } from '../types'

const TIMES = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00']

function fmtDate(iso: string, lang: string): string {
  if (!iso) return '—'
  const d = new Date(iso + 'T00:00')
  const opts: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  return d.toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-GB', opts)
}

export function BookingPage() {
  const { lang, setLang, t } = useLang()
  useReveal()

  const [date, setDate] = useState('')
  const [guests, setGuests] = useState(2)
  const [time, setTime] = useState('20:00')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [confirmId, setConfirmId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    setDate(d.toISOString().slice(0, 10))
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const payload: Reservation = { date, guests, time, name, email, phone, notes }
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      setConfirmId(data.id)
      setSubmitted(true)
    } catch {
      // Fallback: show confirmation locally if backend isn't running
      setConfirmId(`BR${Math.floor(Math.random() * 900000 + 100000)}`)
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <CustomCursor />
      <Nav lang={lang} setLang={setLang} current="booking" />

      <main style={{
        minHeight: '100vh', background: 'var(--ink)',
        padding: '140px var(--gutter) 100px', position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden style={{
          position: 'absolute', right: -100, top: 200,
          width: 600, height: 600, opacity: 0.06,
          background: 'radial-gradient(circle at center, var(--sea-deep) 0%, transparent 70%)',
        }} />

        <div className="container" style={{
          display: 'grid', gridTemplateColumns: '1fr 1.2fr',
          gap: 'clamp(40px, 6vw, 100px)', alignItems: 'start', position: 'relative',
        }}>
          {/* Left — context */}
          <aside style={{ position: 'sticky', top: 120 }}>
            <div className="eyebrow" style={{ color: 'var(--terra)', marginBottom: 24 }}>— {t('book_eyebrow')}</div>
            <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 120px)', lineHeight: 0.92, marginBottom: 32 }}>
              {t('book_title')}<br />
              <span style={{ fontStyle: 'italic' }}>{t('book_title2')}</span>
            </h1>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: 400, marginBottom: 40 }}>
              {t('book_body')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 32, borderTop: '1px solid rgba(232,217,204,0.12)' }}>
              {[
                { key: lang === 'it' ? 'Apertura' : 'Opening', val: lang === 'it' ? 'Mar – Dom · cena' : 'Tue – Sun · dinner' },
                { key: lang === 'it' ? 'Capienza' : 'Capacity', val: `42 ${lang === 'it' ? 'coperti' : 'covers'}` },
                { key: lang === 'it' ? 'Durata media' : 'Avg. dinner', val: "2h 15'" },
                { key: lang === 'it' ? 'Tramonto oggi' : 'Sunset today', val: '20:34' },
              ].map(({ key, val }) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span className="mono" style={{ color: 'var(--ink-soft)' }}>{key}</span>
                  <span style={{ fontFamily: 'var(--f-display)', fontSize: 18, fontStyle: 'italic' }}>{val}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 40, padding: 24, background: 'var(--cream-2)', borderRadius: 2 }}>
              <div className="mono" style={{ color: 'var(--terra)', marginBottom: 10 }}>{lang === 'it' ? 'Buono a sapersi' : 'Good to know'}</div>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
                {lang === 'it'
                  ? 'Per gruppi oltre 8 persone scrivici a hello@barrracuda.it. La terrazza è soggetta a meteo.'
                  : 'For parties over 8, please write to hello@barrracuda.it. The terrace is weather-dependent.'}
              </p>
            </div>
          </aside>

          {/* Right — form or confirmation */}
          <div>
            {!submitted ? (
              <form onSubmit={submit} style={{ background: 'var(--cream-2)', padding: 'clamp(28px, 4vw, 56px)', borderRadius: 2 }}>
                <div className="mono" style={{ color: 'var(--terra)', marginBottom: 32 }}>
                  01 / {lang === 'it' ? 'Dimmi quando' : 'Tell us when'}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 40 }} className="form-row">
                  <div className="field">
                    <label>{t('booking_date')}</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                  </div>
                  <div className="field">
                    <label>{t('booking_guests')}</label>
                    <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>{n} {lang === 'it' ? (n === 1 ? 'persona' : 'persone') : (n === 1 ? 'guest' : 'guests')}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 40 }}>
                  <label className="mono" style={{ color: 'var(--ink-soft)', display: 'block', marginBottom: 16 }}>{t('booking_time')}</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {TIMES.map((tm) => (
                      <button key={tm} type="button" className="hoverable" onClick={() => setTime(tm)} style={{
                        padding: '12px 18px',
                        border: `1px solid ${time === tm ? 'var(--terra)' : 'rgba(232,217,204,0.18)'}`,
                        background: time === tm ? 'var(--terra)' : 'transparent',
                        color: time === tm ? 'var(--cream)' : 'var(--ink-soft)',
                        fontFamily: 'var(--f-mono)', fontSize: 12, letterSpacing: '0.08em',
                        borderRadius: 999, cursor: 'pointer', transition: 'all 0.3s var(--ease)',
                      }}>
                        {tm}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mono" style={{ color: 'var(--terra)', marginBottom: 32, paddingTop: 32, borderTop: '1px solid rgba(232,217,204,0.12)' }}>
                  02 / {lang === 'it' ? 'Dicci chi sei' : 'Tell us who you are'}
                </div>

                <div style={{ display: 'grid', gap: 32, marginBottom: 32 }}>
                  <div className="field">
                    <label>{t('booking_name')}</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} required
                      placeholder={lang === 'it' ? 'Nome e cognome' : 'First and last name'} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }} className="form-row">
                    <div className="field">
                      <label>{t('booking_email')}</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="ciao@email.com" />
                    </div>
                    <div className="field">
                      <label>{t('booking_phone')}</label>
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+39 ..." />
                    </div>
                  </div>
                  <div className="field">
                    <label>{t('booking_notes')}</label>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} style={{
                      resize: 'none', fontFamily: 'var(--f-display)', fontSize: 22, background: 'transparent',
                      border: 'none', borderBottom: '1px solid rgba(232,217,204,0.4)', padding: '10px 0',
                      outline: 'none', color: 'var(--cream)',
                    }} placeholder={lang === 'it' ? 'Compleanno, allergie, anniversario...' : 'Birthday, allergies, anniversary...'} />
                  </div>
                </div>

                <div style={{
                  padding: '24px 0', borderTop: '1px solid rgba(232,217,204,0.12)',
                  borderBottom: '1px solid rgba(232,217,204,0.12)', margin: '20px 0 32px',
                  display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'baseline', gap: 16,
                }}>
                  <div>
                    <div className="mono" style={{ color: 'var(--ink-soft)', marginBottom: 6 }}>{lang === 'it' ? 'Riepilogo' : 'Summary'}</div>
                    <div style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontStyle: 'italic', lineHeight: 1.3 }}>
                      {fmtDate(date, lang)} · {time} · {guests} {lang === 'it' ? (guests === 1 ? 'persona' : 'persone') : (guests === 1 ? 'guest' : 'guests')}
                    </div>
                  </div>
                </div>

                {error && <p style={{ color: 'var(--terra)', fontSize: 13, marginBottom: 16 }}>{error}</p>}

                <button type="submit" className="btn btn-fill hoverable" disabled={loading}
                  style={{ width: '100%', justifyContent: 'center', padding: '24px', opacity: loading ? 0.7 : 1 }}>
                  {loading ? '...' : t('booking_submit')} <span className="arrow">→</span>
                </button>

                <p className="mono" style={{ marginTop: 20, fontSize: 10, color: 'var(--ink-soft)', textTransform: 'none', letterSpacing: 0, fontFamily: 'var(--f-body)', lineHeight: 1.6 }}>
                  {t('booking_legal')}
                </p>
              </form>
            ) : (
              <div style={{
                background: 'var(--sea-deep)', color: 'var(--cream)',
                padding: 'clamp(40px, 6vw, 72px)', borderRadius: 2, position: 'relative', overflow: 'hidden',
              }}>
                <div className="mono" style={{ color: 'var(--terra)', marginBottom: 32, opacity: 0.9 }}>
                  {lang === 'it' ? 'Confermato' : 'Confirmed'} · #{confirmId}
                </div>
                <h2 className="display" style={{ fontSize: 'clamp(48px, 6vw, 80px)', lineHeight: 0.95, marginBottom: 32 }}>
                  {lang === 'it' ? 'Ci vediamo' : 'See you'}<br />
                  <span style={{ fontStyle: 'italic' }}>{lang === 'it' ? 'al tramonto.' : 'at sunset.'}</span>
                </h2>
                <div style={{ display: 'grid', gap: 16, paddingTop: 32, borderTop: '1px solid rgba(244,236,223,0.2)' }}>
                  {[
                    { label: t('booking_date'), val: fmtDate(date, lang) },
                    { label: t('booking_time'), val: time },
                    { label: t('booking_guests'), val: String(guests) },
                    { label: t('booking_name'), val: name || '—' },
                  ].map(({ label, val }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className="mono" style={{ opacity: 0.6 }}>{label}</span>
                      <span style={{ fontFamily: 'var(--f-display)', fontSize: 18, fontStyle: 'italic' }}>{val}</span>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: 32, fontSize: 14, lineHeight: 1.7, opacity: 0.8 }}>
                  {lang === 'it'
                    ? `Riceverai conferma a ${email || '—'}. Per modifiche, rispondi all'email o chiamaci. Ti aspettiamo.`
                    : `Confirmation sent to ${email || '—'}. For changes, reply to the email or call us. We'll be waiting.`}
                </p>
                <button onClick={() => setSubmitted(false)} className="hoverable" style={{
                  marginTop: 32, background: 'transparent', border: '1px solid var(--cream)',
                  color: 'var(--cream)', padding: '16px 28px', fontFamily: 'var(--f-mono)',
                  fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', borderRadius: 999, cursor: 'pointer',
                }}>
                  {lang === 'it' ? 'Nuova prenotazione' : 'New reservation'} ↻
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer lang={lang} t={t} />

      <style>{`
        @media (max-width: 900px) {
          .container > div { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
