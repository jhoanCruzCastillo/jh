import { useAppState, useAppDispatch } from '@/app/AppContext'
import { PERFILES, VIEW_TITLES } from '@/core/data/navigation'
import { SliderTabs } from '@/presentation/components/SliderTabs'
import type { PerfilKey } from '@/core/types'

export function Header() {
  const { view, perfil, collapsed } = useAppState()
  const dispatch = useAppDispatch()

  const [pageTitle, pageIcon, breadcrumb] = VIEW_TITLES[view] ?? VIEW_TITLES.inicio

  return (
    <header
      style={{
        flex: 'none', height: 62,
        background: 'linear-gradient(90deg,#0f5d78,#16708f)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 22px',
        boxShadow: '0 2px 8px rgba(0,0,0,.12)',
        zIndex: 5,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0 }}>
        <button
          onClick={() => dispatch({ type: 'TOGGLE_COLLAPSE' })}
          style={{
            width: 38, height: 38, borderRadius: 9, border: 'none',
            background: 'rgba(255,255,255,.12)', color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <i className="fa-solid fa-bars" />
        </button>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 11, color: '#9fd0dd', fontWeight: 600, letterSpacing: '.3px' }}>{breadcrumb}</div>
          <div className="heading-font" style={{ fontWeight: 700, fontSize: 18, color: '#fff', display: 'flex', alignItems: 'center', gap: 9, lineHeight: 1.1 }}>
            <i className={`fa-solid ${pageIcon}`} style={{ fontSize: 15, color: '#7fe0a0' }} />
            {pageTitle}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {/* Profile switcher */}
        <SliderTabs
          tabs={PERFILES.map(p => ({ key: p.key, label: collapsed ? '' : p.label, icon: p.icon }))}
          active={perfil}
          onSelect={key => dispatch({ type: 'SET_PERFIL', payload: key as PerfilKey })}
          layoutId="perfil-tabs"
          activeBg="#fff"
          activeColor="#0f5d78"
          inactiveColor="#cfe6ee"
          fontSize={12.5}
          padding="7px 12px"
          containerBg="rgba(255,255,255,.10)"
          containerBorder="none"
        />

        {/* Notifications */}
        <button
          style={{
            position: 'relative', width: 40, height: 40, borderRadius: '50%',
            border: 'none', background: 'rgba(255,255,255,.10)', color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <i className="fa-regular fa-bell" />
          <span
            style={{
              position: 'absolute', top: 8, right: 9, width: 8, height: 8,
              background: '#36ad46', borderRadius: '50%', border: '2px solid #14617f',
            }}
          />
        </button>

        {/* Logout */}
        <button
          style={{
            width: 40, height: 40, borderRadius: '50%', border: 'none',
            background: 'rgba(255,255,255,.10)', color: '#fff', cursor: 'pointer',
          }}
        >
          <i className="fa-solid fa-power-off" />
        </button>
      </div>
    </header>
  )
}
