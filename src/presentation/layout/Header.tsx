import { useState, useRef, useEffect } from 'react'
import { useAppState, useAppDispatch } from '@/app/AppContext'
import { VIEW_TITLES } from '@/core/data/navigation'
import { motion, AnimatePresence } from 'motion/react'

const NOTIFICATIONS = [
  { id: '1', icon: 'fa-video', color: '#36ad46', title: 'Clase en vivo programada', desc: 'IOARR — Taller práctico · Hoy 8:00 PM', time: 'Hace 10 min', unread: true },
  { id: '2', icon: 'fa-circle-check', color: '#16708f', title: 'Documento aprobado', desc: 'Ficha IOARR — C.P. San Juan pasó validación', time: 'Hace 2 horas', unread: true },
  { id: '3', icon: 'fa-comment', color: '#e0922f', title: 'Nuevo comentario del mentor', desc: 'José Herrera respondió tu consulta sobre costos', time: 'Hace 5 horas', unread: true },
  { id: '4', icon: 'fa-trophy', color: '#36ad46', title: 'Ejercicio completado', desc: 'Obtuviste 85% en Ficha IOARR — Reposición', time: 'Ayer', unread: false },
  { id: '5', icon: 'fa-bell', color: '#9aa7ad', title: 'Recordatorio', desc: 'Tienes 2 secciones pendientes en tu documentación', time: 'Hace 2 días', unread: false },
]

export function Header() {
  const { view, collapsed } = useAppState()
  const dispatch = useAppDispatch()
  const [showNotifs, setShowNotifs] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)

  const [pageTitle, pageIcon, breadcrumb] = VIEW_TITLES[view] ?? VIEW_TITLES.inicio
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length

  useEffect(() => {
    if (!showNotifs) return
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifs(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showNotifs])

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
        {/* Notifications */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            style={{
              position: 'relative', width: 40, height: 40, borderRadius: '50%',
              border: 'none', background: showNotifs ? 'rgba(255,255,255,.25)' : 'rgba(255,255,255,.10)',
              color: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <i className="fa-regular fa-bell" />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute', top: 6, right: 6, minWidth: 16, height: 16,
                background: '#ef4444', borderRadius: 8, border: '2px solid #0f5d78',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 700, color: '#fff', padding: '0 3px',
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifs && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute', top: 50, right: 0, width: 380,
                  background: '#fff', borderRadius: 14, boxShadow: '0 12px 36px rgba(0,0,0,.18)',
                  border: '1px solid #e3e8eb', overflow: 'hidden', zIndex: 10,
                }}
              >
                {/* Header */}
                <div style={{ padding: '14px 18px', borderBottom: '1px solid #eef1f3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1f2d33' }}>
                    Notificaciones
                    {unreadCount > 0 && <span style={{ fontSize: 11, fontWeight: 600, color: '#16708f', marginLeft: 8 }}>{unreadCount} nuevas</span>}
                  </div>
                  <button style={{ background: 'none', border: 'none', fontSize: 12, color: '#16708f', fontWeight: 600, cursor: 'pointer' }}>
                    Marcar leídas
                  </button>
                </div>

                {/* List */}
                <div style={{ maxHeight: 380, overflowY: 'auto' }}>
                  {NOTIFICATIONS.map(n => (
                    <div
                      key={n.id}
                      style={{
                        display: 'flex', gap: 12, padding: '14px 18px',
                        background: n.unread ? '#f8fcff' : '#fff',
                        borderBottom: '1px solid #f4f7f8', cursor: 'pointer',
                        transition: 'background .1s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#f0f5f8' }}
                      onMouseLeave={e => { e.currentTarget.style.background = n.unread ? '#f8fcff' : '#fff' }}
                    >
                      <div style={{
                        width: 36, height: 36, borderRadius: 10, flex: 'none',
                        background: `${n.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <i className={`fa-solid ${n.icon}`} style={{ color: n.color, fontSize: 14 }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: '#1f2d33' }}>{n.title}</span>
                          {n.unread && <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#16708f', flex: 'none' }} />}
                        </div>
                        <div style={{ fontSize: 12, color: '#6c7b83', marginTop: 2, lineHeight: 1.35 }}>{n.desc}</div>
                        <div style={{ fontSize: 11, color: '#9aa7ad', marginTop: 4 }}>{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div style={{ padding: '12px 18px', borderTop: '1px solid #eef1f3', textAlign: 'center' }}>
                  <button style={{ background: 'none', border: 'none', fontSize: 13, color: '#16708f', fontWeight: 600, cursor: 'pointer' }}>
                    Ver todas las notificaciones
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Logout */}
        <button
          style={{
            width: 40, height: 40, borderRadius: '50%', border: 'none',
            background: 'rgba(255,255,255,.10)', color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <i className="fa-solid fa-power-off" />
        </button>
      </div>
    </header>
  )
}
