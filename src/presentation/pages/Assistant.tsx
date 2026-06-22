import { useRef, useEffect, useState } from 'react'
import { useAppState, useAppDispatch } from '@/app/AppContext'
import { QUICK_PROMPTS } from '@/core/data/plans'
import { generateResponse } from '@/infrastructure/ai/mentorAI'
import { Reveal } from '../components/Reveal'
import { MentorBot } from '../components/MentorBot'
import type { ChatMessage } from '@/core/types'

export function Assistant() {
  const { chat, thinking } = useAppState()
  const dispatch = useAppDispatch()
  const chatRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [chat, thinking])

  const send = (text: string) => {
    if (!text.trim()) return

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      from: 'user',
      text: text.trim(),
      timestamp: Date.now(),
    }
    dispatch({ type: 'ADD_MESSAGE', payload: userMsg })
    dispatch({ type: 'SET_THINKING', payload: true })
    setDraft('')
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.style.height = 'auto'
    }

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: crypto.randomUUID(),
        from: 'bot',
        text: generateResponse(text),
        timestamp: Date.now(),
      }
      dispatch({ type: 'ADD_MESSAGE', payload: botMsg })
      dispatch({ type: 'SET_THINKING', payload: false })
    }, 850)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(draft)
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', height: '100%' }}>
      <Reveal style={{
        background: '#fff', border: '1px solid #e3e8eb', borderRadius: 16,
        boxShadow: '0 1px 3px rgba(0,0,0,.04)', display: 'flex', flexDirection: 'column',
        height: 'calc(100vh - 138px)', overflow: 'hidden',
      }}>
        {/* Chat header */}
        <div style={{ flex: 'none', padding: '16px 20px', borderBottom: '1px solid #eef1f3', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div className="heading-font" style={{ fontWeight: 700, fontSize: 16 }}>Mentor de Inversión Pública</div>
            <div style={{ fontSize: 12, color: '#36ad46', fontWeight: 600 }}>
              <i className="fa-solid fa-circle" style={{ fontSize: 7, verticalAlign: 'middle', marginRight: 4 }} />
              En línea · Responde al instante
            </div>
          </div>
          <i className="fa-solid fa-shield-halved" style={{ color: '#9aa7ad' }} title="Basado en lineamientos Invierte.pe" />
        </div>

        {/* Messages wrapper */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <div ref={chatRef} style={{ height: '100%', overflowY: 'auto', padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {chat.map(m => (
            <div key={m.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-end', justifyContent: m.from === 'bot' ? 'flex-start' : 'flex-end' }}>
              {m.from === 'bot' && (
                <div style={{
                  flex: 'none', width: 44, height: 44, borderRadius: '50%',
                  background: 'linear-gradient(140deg,#1a7fa0,#36ad46)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  alignSelf: 'flex-end',
                }}>
                  <span style={{ color: '#fff', display: 'flex' }}><MentorBot size={28} animation="blink" loop loopDelay={5000} /></span>
                </div>
              )}
              <div style={{
                maxWidth: '75%',
                background: m.from === 'bot' ? '#fff' : '#16708f',
                border: m.from === 'bot' ? '1px solid #e3e8eb' : 'none',
                borderRadius: m.from === 'bot' ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
                padding: '12px 15px', fontSize: 13.5,
                color: m.from === 'bot' ? '#1f2d33' : '#fff',
                lineHeight: 1.5,
                boxShadow: m.from === 'bot' ? '0 1px 2px rgba(0,0,0,.03)' : 'none',
              }}>
                {m.text}
              </div>
            </div>
          ))}
          {thinking && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
              <div style={{
                flex: 'none', width: 44, height: 44, borderRadius: '50%',
                background: 'linear-gradient(140deg,#1a7fa0,#36ad46)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#fff', display: 'flex' }}><MentorBot size={28} animation="default" loop loopDelay={1500} /></span>
              </div>
              <div style={{
                background: '#fff', border: '1px solid #e3e8eb',
                borderRadius: '14px 14px 14px 4px', padding: '14px 16px',
              }}>
                <div className="dotpulse"><span /><span /><span /></div>
              </div>
            </div>
          )}
          </div>
        </div>

        {/* Input area */}
        <div style={{ flex: 'none', padding: '14px 18px', borderTop: '1px solid #eef1f3', background: '#fff' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 11 }}>
            {QUICK_PROMPTS.map(text => (
              <button
                key={text}
                onClick={() => send(text)}
                style={{
                  background: '#f4f7f8', border: '1px solid #e3e8eb', borderRadius: 18,
                  padding: '6px 13px', fontSize: 12, color: '#46555c', cursor: 'pointer',
                }}
              >
                <i className="fa-solid fa-wand-magic-sparkles" style={{ color: '#2c93a8', marginRight: 6, fontSize: 10 }} />
                {text}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
            <textarea
              ref={inputRef}
              rows={1}
              placeholder="Escribe tu pregunta sobre la documentación…"
              value={draft}
              onChange={e => {
                setDraft(e.target.value)
                e.target.style.height = 'auto'
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
              }}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1, padding: '12px 14px', border: '1px solid #d7dee2',
                borderRadius: 11, fontSize: 14, resize: 'none', outline: 'none',
                maxHeight: 120, lineHeight: 1.4,
              }}
            />
            <button
              onClick={() => send(draft)}
              style={{
                flex: 'none', width: 46, height: 46, borderRadius: 11,
                background: '#16708f', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 16,
              }}
            >
              <i className="fa-solid fa-paper-plane" />
            </button>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
