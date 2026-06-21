import { useAppDispatch } from '@/app/AppContext'
import { TALLERES, QUICK_PROMPTS } from '@/core/data/plans'
import { KPICard } from '../components/KPICard'
import { ProgressBar } from '../components/ProgressBar'
import { Reveal } from '../components/Reveal'
import type { KPI } from '@/core/types'

const KPIS: KPI[] = [
  { icon: 'fa-file-pen', label: 'Documentos en progreso', value: '3', color: '#16708f', bg: '#e3f1f5' },
  { icon: 'fa-circle-check', label: 'Completados', value: '8', color: '#36ad46', bg: '#e6f5e9' },
  { icon: 'fa-robot', label: 'Consultas al mentor', value: '42', color: '#2c93a8', bg: '#e4f2f5' },
  { icon: 'fa-triangle-exclamation', label: 'Observaciones por resolver', value: '2', color: '#e0922f', bg: '#fff4e6' },
]

export function Dashboard() {
  const dispatch = useAppDispatch()
  const go = (view: 'workspace' | 'asistente') => dispatch({ type: 'SET_VIEW', payload: view })

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      {/* Hero */}
      <Reveal style={{
        position: 'relative', overflow: 'hidden', borderRadius: 16,
        background: 'linear-gradient(120deg,#0f5d78,#1a7fa0 55%,#2b9a6b)',
        padding: '26px 28px', color: '#fff', boxShadow: '0 10px 24px rgba(15,93,120,.22)',
      }}>
        <div style={{ position: 'absolute', right: -30, top: -30, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,.06)' }} />
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ maxWidth: 620 }}>
            <div style={{ fontSize: 13, color: '#bfe6d4', fontWeight: 600, marginBottom: 6 }}>Bienvenida de vuelta, Perla 👋</div>
            <div className="heading-font" style={{ fontWeight: 800, fontSize: 26, lineHeight: 1.18, marginBottom: 10 }}>
              No estás sola frente a un formato complejo.
            </div>
            <div style={{ fontSize: 14.5, color: '#e2f1f5', lineHeight: 1.5 }}>
              Tu mentor de inversión pública te acompaña paso a paso para aprender, comprender y completar tu documentación técnica con confianza.
            </div>
          </div>
          <button
            onClick={() => go('workspace')}
            style={{
              flex: 'none', background: '#fff', color: '#0f5d78', border: 'none',
              borderRadius: 10, padding: '13px 20px', fontWeight: 700, fontSize: 14,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 9,
              boxShadow: '0 6px 16px rgba(0,0,0,.18)',
            }}
          >
            <i className="fa-solid fa-play" /> Continuar documentación
          </button>
        </div>
      </Reveal>

      {/* KPIs */}
      <Reveal delay={0.05} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginTop: 20 }}>
        {KPIS.map(k => <KPICard key={k.label} {...k} />)}
      </Reveal>

      {/* Continue + Mentor */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 18, marginTop: 20, alignItems: 'start' }}>
        {/* Continue card */}
        <Reveal delay={0.1} style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14, padding: '20px 22px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div className="heading-font" style={{ fontWeight: 700, fontSize: 16, color: '#1f2d33' }}>Continúa donde lo dejaste</div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#0f5d78', background: '#e3f1f5', padding: '4px 10px', borderRadius: 20 }}>EN PROGRESO</span>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{
              flex: 'none', width: 62, height: 62, borderRadius: 12,
              background: 'linear-gradient(140deg,#0f5d78,#16708f)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <i className="fa-solid fa-file-pen" style={{ color: '#fff', fontSize: 24 }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#1f2d33', marginBottom: 3 }}>
                Mejoramiento del servicio de agua potable — C.P. San Juan
              </div>
              <div style={{ fontSize: 12.5, color: '#6c7b83', marginBottom: 9 }}>
                <i className="fa-solid fa-screwdriver-wrench" style={{ marginRight: 6, color: '#36ad46' }} />
                Ficha Técnica IOARR · Sección 4 de 7
              </div>
              <ProgressBar percent={60} />
            </div>
          </div>
          <button
            onClick={() => go('workspace')}
            style={{
              marginTop: 16, width: '100%', background: '#0f5d78', color: '#fff',
              border: 'none', borderRadius: 9, padding: 11, fontWeight: 700,
              fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 8,
            }}
          >
            Retomar elaboración <i className="fa-solid fa-arrow-right" />
          </button>
        </Reveal>

        {/* Mentor card */}
        <Reveal delay={0.15} style={{
          background: 'linear-gradient(160deg,#13283010,#fff)',
          border: '1px solid #e3e8eb', borderRadius: 14, padding: '20px 22px',
          boxShadow: '0 1px 3px rgba(0,0,0,.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'linear-gradient(140deg,#1a7fa0,#36ad46)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <i className="fa-solid fa-robot" style={{ color: '#fff' }} />
            </div>
            <div>
              <div className="heading-font" style={{ fontWeight: 700, fontSize: 15 }}>Tu mentor IA</div>
              <div style={{ fontSize: 11, color: '#36ad46', fontWeight: 600 }}>
                <i className="fa-solid fa-circle" style={{ fontSize: 7, verticalAlign: 'middle' }} /> Disponible 24/7
              </div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: '#6c7b83', lineHeight: 1.45, margin: '6px 0 12px' }}>
            Pregúntale lo que necesites para avanzar:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {QUICK_PROMPTS.map(text => (
              <button
                key={text}
                onClick={() => go('asistente')}
                style={{
                  textAlign: 'left', background: '#f4f7f8', border: '1px solid #e3e8eb',
                  borderRadius: 9, padding: '9px 12px', fontSize: 12.5, color: '#37474f',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 9,
                }}
              >
                <i className="fa-solid fa-wand-magic-sparkles" style={{ color: '#2c93a8', fontSize: 11 }} />
                {text}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Talleres */}
      <Reveal delay={0.2} style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14, padding: '20px 22px', marginTop: 18, boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
          <i className="fa-solid fa-chalkboard-user" style={{ color: '#16708f' }} />
          <div className="heading-font" style={{ fontWeight: 700, fontSize: 16 }}>Próximos talleres en vivo</div>
        </div>
        {TALLERES.map(t => (
          <div key={t.title} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', borderTop: '1px solid #eef1f3' }}>
            <div style={{ flex: 'none', textAlign: 'center', width: 50 }}>
              <div className="heading-font" style={{ fontWeight: 800, fontSize: 20, color: '#16708f', lineHeight: 1 }}>{t.day}</div>
              <div style={{ fontSize: 11, color: '#9aa7ad', textTransform: 'uppercase' }}>{t.mon}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#1f2d33' }}>{t.title}</div>
              <div style={{ fontSize: 12, color: '#6c7b83' }}>
                <i className="fa-regular fa-clock" style={{ marginRight: 5 }} />{t.time} · {t.docente}
              </div>
            </div>
            <span style={{ flex: 'none', fontSize: 11, fontWeight: 700, color: t.stColor, background: t.stBg, padding: '5px 11px', borderRadius: 20 }}>
              {t.status}
            </span>
          </div>
        ))}
      </Reveal>
    </div>
  )
}
