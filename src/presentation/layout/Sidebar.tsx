import { useRef } from 'react'
import { useAppState, useAppDispatch } from '@/app/AppContext'
import { NAV_ITEMS, PERFILES } from '@/core/data/navigation'
import { MentorBot, type MentorBotHandle } from '@/presentation/components/MentorBot'
import type { ViewKey } from '@/core/types'

export function Sidebar() {
  const { view, perfil, collapsed } = useAppState()
  const dispatch = useAppDispatch()
  const perfilObj = PERFILES.find(p => p.key === perfil) ?? PERFILES[0]

  const botRef = useRef<MentorBotHandle>(null)
  const go = (key: ViewKey) => dispatch({ type: 'SET_VIEW', payload: key })

  return (
    <aside
      style={{
        flex: 'none',
        width: collapsed ? 76 : 248,
        background: '#0c3a45',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        transition: 'width .2s',
        boxShadow: '2px 0 10px rgba(0,0,0,.08)',
        zIndex: 6,
      }}
    >
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '20px 18px 18px' }}>
        <div
          style={{
            flex: 'none', width: 40, height: 40, borderRadius: 11,
            background: 'linear-gradient(140deg,#1a7fa0,#36ad46)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,.25)',
          }}
        >
          <i className="fa-solid fa-water" style={{ color: '#fff', fontSize: 18 }} />
        </div>
        {!collapsed && (
          <div>
            <div className="heading-font" style={{ fontWeight: 800, fontSize: 15, color: '#fff', lineHeight: 1.05, letterSpacing: '.2px' }}>
              INVIERTE Mentor
            </div>
            <div style={{ fontSize: 10.5, color: '#7fb9c7', letterSpacing: '1.2px', fontWeight: 600 }}>
              DOCUMENTACIÓN TÉCNICA
            </div>
          </div>
        )}
      </div>

      {/* Profile */}
      {!collapsed && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '6px 16px 16px', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=108&h=108&fit=crop&q=80"
            alt="Camila Torres"
            style={{
              width: 54, height: 54, borderRadius: '50%', objectFit: 'cover',
              border: '2px solid rgba(255,255,255,.18)',
            }}
          />
          <div style={{ marginTop: 9, fontWeight: 700, color: '#fff', fontSize: 14.5 }}>Camila Torres</div>
          <div style={{ fontSize: 11.5, color: '#7fb9c7' }}>{perfilObj.long}</div>
        </div>
      )}

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '6px 12px', marginTop: 4 }}>
        {NAV_ITEMS.map(n => {
          const active = view === n.key
          return (
            <button
              key={n.key}
              onClick={() => { if (n.key === 'asistente') botRef.current?.trigger('wink'); go(n.key) }}
              style={{
                display: 'flex', alignItems: 'center', gap: 13, width: '100%',
                border: 'none', cursor: 'pointer', borderRadius: 9,
                padding: collapsed ? '11px 0' : '11px 13px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                background: active ? 'rgba(54,173,70,.16)' : 'transparent',
                color: active ? '#fff' : '#b9d4dc',
                boxShadow: active ? 'inset 3px 0 0 #36ad46' : 'none',
              }}
            >
              {n.key === 'asistente' ? (
                <span style={{ width: 20, display: 'flex', justifyContent: 'center', color: active ? '#36ad46' : '#7fb9c7' }}>
                  <MentorBot ref={botRef} size={18} randomize />
                </span>
              ) : (
                <i className={`fa-solid ${n.icon}`} style={{ fontSize: 16, width: 20, textAlign: 'center', color: active ? '#36ad46' : '#7fb9c7' }} />
              )}
              {!collapsed && <span style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>{n.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Upgrade box */}
      {!collapsed && (
        <div style={{ marginTop: 'auto', padding: '14px 16px', borderTop: '1px solid rgba(255,255,255,.08)' }}>
          <div style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 11, padding: 13 }}>
            <div style={{ fontSize: 12, color: '#cfe6ee', fontWeight: 600, marginBottom: 3 }}>
              <i className="fa-solid fa-bolt" style={{ color: '#36ad46', marginRight: 6 }} />Plan Entrenamiento
            </div>
            <div style={{ fontSize: 11, color: '#8fc0cd', lineHeight: 1.35, marginBottom: 9 }}>
              Mejora a Profesional para mentor IA ilimitado.
            </div>
            <button
              onClick={() => go('planes')}
              style={{
                width: '100%', background: '#36ad46', color: '#fff', border: 'none',
                borderRadius: 7, padding: 7, fontSize: 12, fontWeight: 700, cursor: 'pointer',
              }}
            >
              Ver planes
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}
