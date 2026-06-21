import { useAppState, useAppDispatch } from '@/app/AppContext'
import { loadProjects } from '@/infrastructure/storage/projectRepository'
import { ProgressBar } from '../components/ProgressBar'
import { Reveal } from '../components/Reveal'
import type { ProjectStatus } from '@/core/types'

const STATUS_COLORS: Record<ProjectStatus, [string, string]> = {
  'En progreso': ['#0f5d78', '#e3f1f5'],
  'Con observaciones': ['#c0392b', '#fbe9e7'],
  'Completado': ['#2e9a3d', '#e6f5e9'],
  'Borrador': ['#6c7b83', '#eef1f3'],
}

const TABS = [
  { key: 'todos', label: 'Todos' },
  { key: 'progreso', label: 'En progreso' },
  { key: 'observaciones', label: 'Con observaciones' },
  { key: 'completado', label: 'Completados' },
]

export function Projects() {
  const { proyTab } = useAppState()
  const dispatch = useAppDispatch()
  const projects = loadProjects()

  const filtered = projects.filter(p => {
    if (proyTab === 'todos') return true
    if (proyTab === 'progreso') return p.status === 'En progreso'
    if (proyTab === 'observaciones') return p.status === 'Con observaciones'
    if (proyTab === 'completado') return p.status === 'Completado'
    return true
  })

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      {/* Toolbar */}
      <Reveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
        <div style={{ display: 'flex', gap: 6, background: '#fff', border: '1px solid #e3e8eb', padding: 5, borderRadius: 11 }}>
          {TABS.map(tb => (
            <button
              key={tb.key}
              onClick={() => dispatch({ type: 'SET_PROY_TAB', payload: tb.key })}
              style={{
                border: 'none', cursor: 'pointer', borderRadius: 8,
                padding: '8px 15px', fontSize: 13, fontWeight: 600,
                background: proyTab === tb.key ? '#16708f' : 'transparent',
                color: proyTab === tb.key ? '#fff' : '#6c7b83',
              }}
            >
              {tb.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => dispatch({ type: 'SET_VIEW', payload: 'workspace' })}
          style={{
            background: '#36ad46', color: '#fff', border: 'none', borderRadius: 9,
            padding: '11px 18px', fontWeight: 700, fontSize: 14, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          <i className="fa-solid fa-plus" /> Nuevo documento
        </button>
      </Reveal>

      {/* Grid */}
      <Reveal delay={0.1} style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
        {filtered.map(p => {
          const [stColor, stBg] = STATUS_COLORS[p.status] ?? ['#6c7b83', '#eef1f3']
          const barGradient = p.status === 'Con observaciones'
            ? '#e0922f'
            : p.progress === 100 ? '#36ad46' : 'linear-gradient(90deg,#16708f,#36ad46)'

          return (
            <div
              key={p.id}
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'workspace' })}
              style={{
                background: '#fff', border: '1px solid #e3e8eb', borderRadius: 13,
                padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,.04)', cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 12, minWidth: 0 }}>
                  <div style={{
                    flex: 'none', width: 44, height: 44, borderRadius: 10,
                    background: '#e3f1f5', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <i className={`fa-solid ${p.icon}`} style={{ color: '#16708f', fontSize: 18 }} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14.5, color: '#1f2d33', lineHeight: 1.25 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: '#6c7b83', marginTop: 3 }}>{p.type}</div>
                  </div>
                </div>
                <span style={{
                  flex: 'none', fontSize: 10.5, fontWeight: 700, color: stColor,
                  background: stBg, padding: '4px 9px', borderRadius: 20, whiteSpace: 'nowrap',
                }}>
                  {p.status}
                </span>
              </div>
              <ProgressBar percent={p.progress} height={7} gradient={barGradient} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#8a979e', marginTop: 8 }}>
                <span>{p.progress}% completado</span>
                <span><i className="fa-regular fa-clock" style={{ marginRight: 5 }} />{p.date}</span>
              </div>
            </div>
          )
        })}
      </Reveal>
    </div>
  )
}
