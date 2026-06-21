import { useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface Props {
  open: boolean
  onClose: () => void
  title: string
  icon?: string
  children: ReactNode
  width?: number
}

export function Modal({ open, onClose, title, icon, children, width = 560 }: Props) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(15,30,40,.45)',
            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 18, width: '100%', maxWidth: width,
              maxHeight: 'calc(100vh - 48px)', overflow: 'auto',
              boxShadow: '0 24px 48px rgba(0,0,0,.18)',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 24px', borderBottom: '1px solid #eef1f3',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {icon && (
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, background: '#e3f1f5',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <i className={`fa-solid ${icon}`} style={{ color: '#16708f', fontSize: 15 }} />
                  </div>
                )}
                <div className="heading-font" style={{ fontWeight: 700, fontSize: 17, color: '#1f2d33' }}>{title}</div>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: 34, height: 34, borderRadius: 9, border: '1px solid #e3e8eb',
                  background: '#f4f7f8', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}
              >
                <i className="fa-solid fa-xmark" style={{ color: '#6c7b83', fontSize: 14 }} />
              </button>
            </div>
            {/* Body */}
            <div style={{ padding: '20px 24px 24px' }}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
