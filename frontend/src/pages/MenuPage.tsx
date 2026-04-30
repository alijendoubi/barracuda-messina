import { CustomCursor } from '../components/CustomCursor'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { useLang } from '../i18n'
import { useReveal } from '../hooks/useReveal'
import type { MenuSection, Lang } from '../types'

const MENU_DATA: Record<Lang, MenuSection[]> = {
  it: [
    {
      cat: 'Aperitivi', desc: 'Per cominciare. Ghiaccio, sale, sole.',
      items: [
        { n: 'Acqua di mare', d: 'Spritz al gelsomino, sale di Trapani, scorza di limone.', p: '12' },
        { n: 'Negroni mediterraneo', d: 'Gin al rosmarino, vermouth siciliano, bitter al carciofo.', p: '14' },
        { n: 'Granita di pomodoro', d: 'Pomodoro datterino, basilico, olio EVO.', p: '10' },
      ],
    },
    {
      cat: 'Crudi & antipasti', desc: 'Il pescato del giorno, lavorato in mattinata.',
      items: [
        { n: 'Tartare di tonno rosso', d: 'Cipollotto, lime, alga nori, fior di sale.', p: '22' },
        { n: 'Gambero viola di Mazara', d: 'Ostriche fini de claire, scorza di bergamotto.', p: '26' },
        { n: 'Caponata al fumo', d: 'Melanzane, capperi, mandorle tostate, ricotta affumicata.', p: '16' },
      ],
    },
    {
      cat: "Pizze d'autore", desc: 'Lievitazione 72 ore. Forno a legna di ulivo.',
      items: [
        { n: 'Stretto', d: 'Pomodoro giallo del Vesuvio, alici di Cetara, capperi di Salina, origano selvatico.', p: '18' },
        { n: 'Tramonto', d: 'Burrata di Andria, mortadella al pistacchio di Bronte, scorza di limone interdonato.', p: '19' },
        { n: 'Scirocco', d: 'Crema di melanzane, ricotta salata, pomodorini confit, basilico, mandorle.', p: '18' },
        { n: 'Mare nostro', d: 'Crudo di gambero rosso, stracciatella, polvere di pomodoro, lime.', p: '22' },
        { n: 'Etna', d: 'Salsiccia di maialino nero, scamorza, friarielli, peperoncino di Sciacca.', p: '19' },
        { n: 'Bianca', d: 'Fior di latte, pecorino di fossa, pepe nero di Sarawak, miele di castagno.', p: '17' },
      ],
    },
    {
      cat: 'Dolci', desc: 'Tradizione siciliana, mano leggera.',
      items: [
        { n: 'Cassata bianca', d: 'Ricotta di pecora, cedro, cioccolato fondente, pasta reale.', p: '10' },
        { n: 'Granita al gelsomino', d: 'Servita con brioche col tuppo tiepida.', p: '9' },
        { n: 'Cannolo scomposto', d: 'Crema di ricotta, scorze candite, pistacchio di Bronte.', p: '10' },
      ],
    },
    {
      cat: 'Cantina', desc: 'Vini siciliani naturali, in via di scoperta.',
      items: [
        { n: "Frappato dell'Etna", d: 'Calice — Tenuta delle Terre Nere', p: '8' },
        { n: 'Carricante 2023', d: 'Bottiglia — Pietradolce', p: '48' },
        { n: 'Nerello mascalese', d: 'Bottiglia — Graci', p: '52' },
      ],
    },
  ],
  en: [
    {
      cat: 'Aperitifs', desc: 'To begin. Ice, salt, sun.',
      items: [
        { n: 'Acqua di mare', d: 'Jasmine spritz, Trapani salt, lemon zest.', p: '12' },
        { n: 'Mediterranean negroni', d: 'Rosemary gin, Sicilian vermouth, artichoke bitter.', p: '14' },
        { n: 'Tomato granita', d: 'Datterino tomato, basil, EVO olive oil.', p: '10' },
      ],
    },
    {
      cat: 'Crudo & antipasti', desc: 'The catch of the day, prepared each morning.',
      items: [
        { n: 'Bluefin tuna tartare', d: 'Spring onion, lime, nori, sea salt flakes.', p: '22' },
        { n: 'Mazara red prawn', d: 'Fines de claire oysters, bergamot zest.', p: '26' },
        { n: 'Smoked caponata', d: 'Aubergine, capers, toasted almonds, smoked ricotta.', p: '16' },
      ],
    },
    {
      cat: 'Signature pizzas', desc: '72-hour rise. Olive-wood fired.',
      items: [
        { n: 'Stretto', d: 'Yellow Vesuvio tomato, Cetara anchovies, Salina capers, wild oregano.', p: '18' },
        { n: 'Tramonto', d: 'Burrata from Andria, Bronte pistachio mortadella, Interdonato lemon zest.', p: '19' },
        { n: 'Scirocco', d: 'Aubergine cream, salted ricotta, confit cherry tomatoes, basil, almonds.', p: '18' },
        { n: 'Mare nostro', d: 'Raw red prawn, stracciatella, tomato powder, lime.', p: '22' },
        { n: 'Etna', d: 'Black pork sausage, scamorza, friarielli, Sciacca chili.', p: '19' },
        { n: 'Bianca', d: 'Fior di latte, pit-aged pecorino, Sarawak black pepper, chestnut honey.', p: '17' },
      ],
    },
    {
      cat: 'Desserts', desc: 'Sicilian tradition, a light hand.',
      items: [
        { n: 'White cassata', d: "Sheep's ricotta, citron, dark chocolate, marzipan.", p: '10' },
        { n: 'Jasmine granita', d: 'Served with warm tuppo brioche.', p: '9' },
        { n: 'Deconstructed cannolo', d: 'Ricotta cream, candied peel, Bronte pistachio.', p: '10' },
      ],
    },
    {
      cat: 'Cellar', desc: 'Natural Sicilian wines, in the act of discovery.',
      items: [
        { n: 'Etna Frappato', d: 'Glass — Tenuta delle Terre Nere', p: '8' },
        { n: 'Carricante 2023', d: 'Bottle — Pietradolce', p: '48' },
        { n: 'Nerello mascalese', d: 'Bottle — Graci', p: '52' },
      ],
    },
  ],
}

export function MenuPage() {
  const { lang, setLang, t } = useLang()
  useReveal()
  const data = MENU_DATA[lang]

  return (
    <>
      <CustomCursor />
      <Nav lang={lang} setLang={setLang} current="menu" />

      <header style={{
        padding: '180px var(--gutter) 80px', background: 'var(--ink)',
        borderBottom: '1px solid rgba(232,217,204,0.12)',
      }}>
        <div className="container">
          <div className="eyebrow" style={{ color: 'var(--terra)', marginBottom: 24 }}>
            — {lang === 'it' ? 'Carta' : 'The menu'} · {lang === 'it' ? 'Stagione MMXXVI' : 'Season MMXXVI'}
          </div>
          <h1 className="display" style={{ fontSize: 'clamp(60px, 11vw, 200px)', lineHeight: 0.88 }}>
            {lang === 'it' ? 'Diario' : 'Diary'}<br />
            <span style={{ fontStyle: 'italic' }}>{lang === 'it' ? 'delle stagioni.' : 'of seasons.'}</span>
          </h1>
          <div style={{
            marginTop: 60, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40,
            paddingTop: 40, borderTop: '1px solid rgba(232,217,204,0.12)',
          }} className="menu-meta-grid">
            <div>
              <div className="mono" style={{ color: 'var(--ink-soft)', marginBottom: 8 }}>{lang === 'it' ? 'Cucina' : 'Kitchen'}</div>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontStyle: 'italic' }}>
                {lang === 'it' ? 'Siciliana contemporanea' : 'Contemporary Sicilian'}
              </div>
            </div>
            <div>
              <div className="mono" style={{ color: 'var(--ink-soft)', marginBottom: 8 }}>{lang === 'it' ? 'Forno' : 'Oven'}</div>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontStyle: 'italic' }}>
                {lang === 'it' ? 'Legno d\'ulivo · 480°C' : 'Olive wood · 480°C'}
              </div>
            </div>
            <div>
              <div className="mono" style={{ color: 'var(--ink-soft)', marginBottom: 8 }}>{lang === 'it' ? 'Lievitazione' : 'Rise'}</div>
              <div style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontStyle: 'italic' }}>72 ore · 72 hrs</div>
            </div>
          </div>
        </div>
      </header>

      <main style={{ background: 'var(--ink)', paddingBottom: 120 }}>
        <div className="container">
          {data.map((section, si) => (
            <section key={si} style={{ padding: '100px 0', borderTop: si > 0 ? '1px solid rgba(232,217,204,0.12)' : 'none' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 80 }} className="menu-section-grid">
                <div className="reveal" style={{ position: 'sticky', top: 100, height: 'fit-content' }}>
                  <div className="mono" style={{ color: 'var(--terra)', marginBottom: 20 }}>{`§ ${(si + 1).toString().padStart(2, '0')}`}</div>
                  <h2 className="display" style={{ fontSize: 56, lineHeight: 0.95, marginBottom: 16 }}>
                    <span style={{ fontStyle: 'italic' }}>{section.cat}</span>
                  </h2>
                  <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: 260 }}>{section.desc}</p>
                </div>
                <div>
                  {section.items.map((item, i) => (
                    <div key={i} className="reveal hoverable" style={{
                      display: 'grid', gridTemplateColumns: '1fr auto', gap: 40,
                      padding: '28px 0', borderBottom: '1px solid rgba(232,217,204,0.08)',
                      alignItems: 'baseline', transitionDelay: `${i * 40}ms`,
                    }}>
                      <div>
                        <h3 className="display" style={{
                          fontSize: 32, fontStyle: i % 2 === 0 ? 'normal' : 'italic', marginBottom: 8,
                        }}>{item.n}</h3>
                        <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: 540 }}>{item.d}</p>
                      </div>
                      <div className="mono" style={{ fontSize: 14, color: 'var(--terra)', whiteSpace: 'nowrap' }}>€ {item.p}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="container" style={{ marginTop: 80, paddingTop: 40, borderTop: '1px solid rgba(232,217,204,0.12)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40 }} className="menu-meta-grid">
            <div>
              <div className="eyebrow" style={{ color: 'var(--terra)', marginBottom: 12 }}>{lang === 'it' ? 'Allergeni' : 'Allergens'}</div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
                {lang === 'it'
                  ? 'Informa il personale di sala. Disponiamo di alternative senza glutine e vegetariane.'
                  : 'Please inform our staff. Gluten-free and vegetarian alternatives are available.'}
              </p>
            </div>
            <div>
              <div className="eyebrow" style={{ color: 'var(--terra)', marginBottom: 12 }}>{lang === 'it' ? 'Coperto' : 'Cover'}</div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
                €3 · {lang === 'it' ? 'pane di farine antiche siciliane, olio di Trapani.' : 'ancient Sicilian grain bread, Trapani olive oil.'}
              </p>
            </div>
            <div>
              <div className="eyebrow" style={{ color: 'var(--terra)', marginBottom: 12 }}>{lang === 'it' ? 'Pesce surgelato' : 'Frozen fish'}</div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
                {lang === 'it'
                  ? 'Quando non disponibile fresco, parte del pescato è abbattuto come da normativa.'
                  : 'When not available fresh, some fish is blast-frozen per regulations.'}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} t={t} />

      <style>{`
        @media (max-width: 800px) {
          .menu-section-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .menu-meta-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
