import { useState, useRef } from 'react'
import { Modal } from './Modal'
import { MentorBot } from './MentorBot'
import { generateResponse } from '@/infrastructure/ai/mentorAI'

const EXAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop&q=80',
]

interface Props {
  label: string
  hint?: string
}

export function FieldHelper({ label, hint }: Props) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<'info' | 'chat'>('info')
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([])
  const [draft, setDraft] = useState('')
  const [thinking, setThinking] = useState(false)
  const [slideIdx, setSlideIdx] = useState(0)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const send = (text: string) => {
    if (!text.trim()) return
    const q = `${label}: ${text.trim()}`
    setMessages(prev => [...prev, { from: 'user', text: text.trim() }])
    setDraft('')
    setThinking(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: generateResponse(q) }])
      setThinking(false)
    }, 700)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          width: 20, height: 20, borderRadius: '50%', border: '1.5px solid #d7dee2',
          background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', padding: 0, flexShrink: 0,
          transition: 'all .15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#16708f'; e.currentTarget.style.background = '#e3f1f5' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#d7dee2'; e.currentTarget.style.background = '#fff' }}
        title={`Ayuda: ${label}`}
      >
        <i className="fa-solid fa-question" style={{ fontSize: 9, color: '#16708f' }} />
      </button>

      <Modal
        open={open}
        onClose={() => { setOpen(false); setTab('info') }}
        title={label}
        icon="fa-circle-question"
        width={560}
      >
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, background: '#f4f7f8', padding: 3, borderRadius: 10, marginBottom: 18 }}>
          <button onClick={() => setTab('info')} style={{
            flex: 1, border: 'none', cursor: 'pointer', borderRadius: 8, padding: '9px',
            fontSize: 13, fontWeight: 600,
            background: tab === 'info' ? '#16708f' : 'transparent',
            color: tab === 'info' ? '#fff' : '#6c7b83',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
          }}>
            <i className="fa-solid fa-book-open" style={{ fontSize: 12 }} /> Explicación
          </button>
          <button onClick={() => setTab('chat')} style={{
            flex: 1, border: 'none', cursor: 'pointer', borderRadius: 8, padding: '9px',
            fontSize: 13, fontWeight: 600,
            background: tab === 'chat' ? '#16708f' : 'transparent',
            color: tab === 'chat' ? '#fff' : '#6c7b83',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
          }}>
            <span style={{ display: 'flex' }}><MentorBot size={14} animation="blink" loop loopDelay={4000} /></span> Preguntar al mentor
          </button>
        </div>

        {tab === 'info' && (
          <div>
            <div style={{ background: '#f8fafb', border: '1px solid #eef1f3', borderRadius: 12, padding: '18px 20px', marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1f2d33', marginBottom: 8 }}>
                <i className="fa-solid fa-lightbulb" style={{ color: '#e0922f', marginRight: 8 }} />¿Qué es este campo?
              </div>
              <div style={{ fontSize: 13.5, color: '#46555c', lineHeight: 1.6 }}>
                {hint || `Este campo corresponde a "${label}" dentro del formato de documentación técnica según los lineamientos de Invierte.pe.`}
              </div>
            </div>

            {/* Image slider */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#16708f', marginBottom: 8 }}>
                <i className="fa-solid fa-images" style={{ marginRight: 6 }} />Ejemplos de llenado
              </div>
              <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '1px solid #e3e8eb' }}>
                <img
                  src={EXAMPLE_IMAGES[slideIdx]}
                  alt={`Ejemplo ${slideIdx + 1}`}
                  style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }}
                />
                {/* Overlay info */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,.6))',
                  padding: '20px 16px 12px', color: '#fff',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>
                    Ejemplo {slideIdx + 1} de {EXAMPLE_IMAGES.length}
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={() => setSlideIdx(i => Math.max(0, i - 1))}
                      disabled={slideIdx === 0}
                      style={{
                        width: 32, height: 32, borderRadius: 8, border: 'none', cursor: slideIdx === 0 ? 'default' : 'pointer',
                        background: 'rgba(255,255,255,.2)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        opacity: slideIdx === 0 ? 0.4 : 1,
                      }}
                    >
                      <i className="fa-solid fa-chevron-left" style={{ fontSize: 12 }} />
                    </button>
                    <button
                      onClick={() => setSlideIdx(i => Math.min(EXAMPLE_IMAGES.length - 1, i + 1))}
                      disabled={slideIdx === EXAMPLE_IMAGES.length - 1}
                      style={{
                        width: 32, height: 32, borderRadius: 8, border: 'none', cursor: slideIdx === EXAMPLE_IMAGES.length - 1 ? 'default' : 'pointer',
                        background: 'rgba(255,255,255,.2)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        opacity: slideIdx === EXAMPLE_IMAGES.length - 1 ? 0.4 : 1,
                      }}
                    >
                      <i className="fa-solid fa-chevron-right" style={{ fontSize: 12 }} />
                    </button>
                  </div>
                </div>
                {/* Dots */}
                <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 5 }}>
                  {EXAMPLE_IMAGES.map((_, i) => (
                    <button key={i} onClick={() => setSlideIdx(i)} style={{
                      width: i === slideIdx ? 18 : 7, height: 7, borderRadius: 4, border: 'none', cursor: 'pointer', padding: 0,
                      background: i === slideIdx ? '#fff' : 'rgba(255,255,255,.4)', transition: 'all .2s',
                    }} />
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background: '#f0f9ff', border: '1px solid #bfe0ea', borderRadius: 12, padding: '16px 18px', marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#16708f', marginBottom: 6 }}>
                <i className="fa-solid fa-circle-info" style={{ marginRight: 6 }} />Recomendaciones
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#46555c', lineHeight: 1.7 }}>
                <li>Completa este campo siguiendo la estructura indicada en el formato oficial.</li>
                <li>Verifica que la información sea consistente con las demás secciones del documento.</li>
                <li>Si tienes dudas, consulta al mentor IA en la pestaña "Preguntar al mentor".</li>
              </ul>
            </div>

            <button onClick={() => setTab('chat')} style={{
              width: '100%', background: '#e3f1f5', color: '#0f5d78', border: 'none',
              borderRadius: 10, padding: '12px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <span style={{ display: 'flex' }}><MentorBot size={16} animation="wink" /></span>
              ¿Necesitas más ayuda? Pregúntale al mentor
            </button>
          </div>
        )}

        {tab === 'chat' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: 380 }}>
            {/* Chat messages */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12, padding: '4px 0' }}>
              {/* Welcome */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(140deg,#1a7fa0,#36ad46)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  <span style={{ color: '#fff', display: 'flex' }}><MentorBot size={18} animation="blink" loop loopDelay={5000} /></span>
                </div>
                <div style={{ background: '#f4f7f8', borderRadius: '12px 12px 12px 4px', padding: '10px 14px', fontSize: 13, color: '#1f2d33', lineHeight: 1.5, maxWidth: '80%' }}>
                  Pregúntame lo que necesites sobre <strong>{label}</strong>. Te ayudo a completar este campo correctamente según Invierte.pe.
                </div>
              </div>

              {messages.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-end', justifyContent: m.from === 'bot' ? 'flex-start' : 'flex-end' }}>
                  {m.from === 'bot' && (
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(140deg,#1a7fa0,#36ad46)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                      <span style={{ color: '#fff', display: 'flex' }}><MentorBot size={18} animation="default" /></span>
                    </div>
                  )}
                  <div style={{
                    background: m.from === 'bot' ? '#f4f7f8' : '#16708f',
                    borderRadius: m.from === 'bot' ? '12px 12px 12px 4px' : '12px 12px 4px 12px',
                    padding: '10px 14px', fontSize: 13,
                    color: m.from === 'bot' ? '#1f2d33' : '#fff',
                    lineHeight: 1.5, maxWidth: '80%',
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}

              {thinking && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(140deg,#1a7fa0,#36ad46)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                    <span style={{ color: '#fff', display: 'flex' }}><MentorBot size={18} animation="default" loop loopDelay={1000} /></span>
                  </div>
                  <div style={{ background: '#f4f7f8', borderRadius: '12px 12px 12px 4px', padding: '12px 16px' }}>
                    <div className="dotpulse"><span /><span /><span /></div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick questions */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
              {[`¿Cómo lleno "${label}"?`, '¿Puedes darme un ejemplo?', '¿Es obligatorio?'].map(q => (
                <button key={q} onClick={() => send(q)} style={{
                  background: '#f4f7f8', border: '1px solid #e3e8eb', borderRadius: 14,
                  padding: '5px 11px', fontSize: 11.5, color: '#46555c', cursor: 'pointer',
                }}>
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') send(draft) }}
                placeholder={`Pregunta sobre ${label}…`}
                style={{ flex: 1, padding: '10px 14px', border: '1px solid #d7dee2', borderRadius: 10, fontSize: 13, outline: 'none', color: '#1f2d33' }}
              />
              <button onClick={() => send(draft)} style={{
                width: 40, height: 40, borderRadius: 10, background: '#16708f', color: '#fff',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className="fa-solid fa-paper-plane" style={{ fontSize: 14 }} />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
