import { FORMATOS } from '@/core/data/plans'
import { Reveal } from '../components/Reveal'

const EXT_COLORS: Record<string, [string, string]> = {
  XLSX: ['#e6f5e9', '#2e9a3d'],
  PDF: ['#fbe9e7', '#c0392b'],
  DOCX: ['#e3f1f5', '#16708f'],
  ZIP: ['#fff4e6', '#e0922f'],
}

export function Formats() {
  return (
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      {/* Search */}
      <Reveal style={{
        display: 'flex', alignItems: 'center', gap: 12, background: '#fff',
        border: '1px solid #e3e8eb', borderRadius: 11, padding: '11px 16px',
        marginBottom: 20, maxWidth: 440, boxShadow: '0 1px 3px rgba(0,0,0,.04)',
      }}>
        <i className="fa-solid fa-magnifying-glass" style={{ color: '#9aa7ad' }} />
        <input
          type="text"
          placeholder="Buscar formatos y plantillas…"
          style={{ border: 'none', outline: 'none', fontSize: 14, flex: 1, color: '#1f2d33' }}
        />
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {FORMATOS.map((g, gi) => (
          <Reveal key={g.cat} delay={gi * 0.08}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9, background: '#e3f1f5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className={`fa-solid ${g.icon}`} style={{ color: '#16708f', fontSize: 15 }} />
              </div>
              <div className="heading-font" style={{ fontWeight: 700, fontSize: 16 }}>{g.cat}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
              {g.items.map(it => {
                const [bg, color] = EXT_COLORS[it.ext] ?? ['#eef1f3', '#6c7b83']
                return (
                  <div
                    key={it.n}
                    style={{
                      background: '#fff', border: '1px solid #e3e8eb', borderRadius: 11,
                      padding: '15px 17px', display: 'flex', alignItems: 'center', gap: 14,
                      boxShadow: '0 1px 3px rgba(0,0,0,.04)',
                    }}
                  >
                    <div style={{
                      flex: 'none', width: 42, height: 42, borderRadius: 9,
                      background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 800, color,
                    }}>
                      {it.ext}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 13.5, color: '#1f2d33', lineHeight: 1.25 }}>{it.n}</div>
                      <div style={{ fontSize: 11.5, color: '#8a979e', marginTop: 2 }}>Formato oficial · {it.ext}</div>
                    </div>
                    <button style={{
                      flex: 'none', width: 38, height: 38, borderRadius: 9,
                      background: '#e3f1f5', color: '#16708f', border: 'none', cursor: 'pointer',
                    }}>
                      <i className="fa-solid fa-download" />
                    </button>
                  </div>
                )
              })}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
