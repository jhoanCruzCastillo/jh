import { useAppState } from '@/app/AppContext'
import { PLANS, ADDONS } from '@/core/data/plans'
import { Reveal } from '../components/Reveal'

export function Plans() {
  const { perfil } = useAppState()

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      {/* Header */}
      <Reveal style={{ textAlign: 'center', marginBottom: 26 }}>
        <div className="heading-font" style={{ fontWeight: 800, fontSize: 26, color: '#1f2d33' }}>
          Elige el nivel de acompañamiento que necesitas
        </div>
        <div style={{ fontSize: 14.5, color: '#6c7b83', marginTop: 8, maxWidth: 620, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5 }}>
          Evoluciona desde un entorno de entrenamiento hasta un esquema profesional o corporativo. Pagas por la capacidad y el respaldo que requieres.
        </div>
      </Reveal>

      {/* Plans grid */}
      <Reveal delay={0.1} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, alignItems: 'start' }}>
        {PLANS.map(pl => {
          const rec = pl.key === perfil
          return (
            <div
              key={pl.key}
              style={{
                position: 'relative',
                background: rec ? 'linear-gradient(165deg,#0f5d78,#16708f)' : '#fff',
                border: `1.5px solid ${rec ? '#16708f' : '#e3e8eb'}`,
                borderRadius: 16, padding: '26px 24px',
                boxShadow: rec ? '0 14px 30px rgba(15,93,120,.28)' : '0 1px 3px rgba(0,0,0,.04)',
                transform: rec ? 'scale(1.02)' : 'none',
              }}
            >
              {rec && (
                <div style={{
                  position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%,-50%)',
                  background: '#36ad46', color: '#fff', fontSize: 11, fontWeight: 700,
                  padding: '5px 14px', borderRadius: 20, whiteSpace: 'nowrap', letterSpacing: '.3px',
                }}>
                  RECOMENDADO PARA TI
                </div>
              )}
              <div className="heading-font" style={{ fontWeight: 700, fontSize: 18, color: rec ? '#fff' : '#1f2d33' }}>{pl.name}</div>
              <div style={{ fontSize: 12.5, color: rec ? '#a7d8e3' : '#8a979e', marginTop: 3, marginBottom: 16 }}>{pl.tagline}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 18 }}>
                <span className="heading-font" style={{ fontWeight: 800, fontSize: 32, color: rec ? '#fff' : '#16708f' }}>{pl.price}</span>
                <span style={{ fontSize: 13, color: rec ? '#a7d8e3' : '#8a979e' }}>{pl.period}</span>
              </div>
              <button style={{
                width: '100%', border: 'none', borderRadius: 10, padding: 12,
                fontWeight: 700, fontSize: 14, cursor: 'pointer',
                background: rec ? '#36ad46' : '#e3f1f5',
                color: rec ? '#fff' : '#0f5d78',
              }}>
                {pl.cta}
              </button>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 20 }}>
                {pl.features.map(ft => (
                  <div key={ft} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: rec ? '#e2f1f5' : '#46555c', lineHeight: 1.4 }}>
                    <i className="fa-solid fa-circle-check" style={{ color: rec ? '#7fe0a0' : '#36ad46', fontSize: 14, marginTop: 1, flex: 'none' }} />
                    <span>{ft}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </Reveal>

      {/* Addons */}
      <Reveal delay={0.2} style={{ marginTop: 30 }}>
        <div className="heading-font" style={{ fontWeight: 700, fontSize: 17, marginBottom: 14 }}>Servicios complementarios</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {ADDONS.map(a => (
            <div key={a.t} style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 12, padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10, background: '#fff4e6',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
              }}>
                <i className={`fa-solid ${a.icon}`} style={{ color: '#e0922f', fontSize: 18 }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 14.5, color: '#1f2d33', marginBottom: 5 }}>{a.t}</div>
              <div style={{ fontSize: 12.5, color: '#6c7b83', lineHeight: 1.45 }}>{a.d}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  )
}
