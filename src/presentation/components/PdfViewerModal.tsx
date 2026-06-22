import { motion, AnimatePresence } from 'motion/react'

interface Props {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  pdfUrl: string
  downloadName?: string
}

export function PdfViewerModal({ open, onClose, title, subtitle, pdfUrl, downloadName }: Props) {
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
            background: 'rgba(0,0,0,.5)',
            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2.5vh 15vw',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 16, width: '100%', height: '95vh',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
              boxShadow: '0 24px 48px rgba(0,0,0,.25)',
            }}
          >
            <div style={{
              flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 20px', borderBottom: '1px solid #eef1f3',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: '#fbe9e7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#c0392b' }}>PDF</span>
                </div>
                <div>
                  <div className="heading-font" style={{ fontWeight: 700, fontSize: 16, color: '#1f2d33' }}>{title}</div>
                  {subtitle && <div style={{ fontSize: 11.5, color: '#9aa7ad' }}>{subtitle}</div>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <a href={pdfUrl} download={downloadName ?? `${title}.pdf`} style={{
                  background: '#16708f', color: '#fff', border: 'none', borderRadius: 8,
                  padding: '8px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <i className="fa-solid fa-download" style={{ fontSize: 11 }} /> Descargar
                </a>
                <button onClick={onClose} style={{
                  width: 34, height: 34, borderRadius: 9, border: '1px solid #e3e8eb',
                  background: '#f4f7f8', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <i className="fa-solid fa-xmark" style={{ color: '#6c7b83', fontSize: 14 }} />
                </button>
              </div>
            </div>
            <div style={{ flex: 1, background: '#e8e8e8' }}>
              <iframe src={pdfUrl} style={{ width: '100%', height: '100%', border: 'none' }} title={title} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
