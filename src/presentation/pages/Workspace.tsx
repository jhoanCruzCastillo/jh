import { useState } from 'react'
import { useAppState, useAppDispatch } from '@/app/AppContext'
import { SECTIONS } from '@/core/data/sections'
import { ProgressBar } from '../components/ProgressBar'
import { Reveal } from '../components/Reveal'
import { MentorBot } from '../components/MentorBot'
import { FieldHelper } from '../components/FieldHelper'
import { PdfViewerModal } from '../components/PdfViewerModal'
import { generateFichaPreviewUrl } from '@/infrastructure/pdf/fichaPreview'

export function Workspace() {
  const { step, doneSteps } = useAppState()
  const dispatch = useAppDispatch()
  const [showPreview, setShowPreview] = useState(false)

  const totalSteps = SECTIONS.length
  const doneCount = doneSteps.length
  const progressPct = Math.round((doneCount / totalSteps) * 100)
  const sec = SECTIONS[step]

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto' }}>
      {/* Header card */}
      <Reveal style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14, padding: '18px 22px', boxShadow: '0 1px 3px rgba(0,0,0,.04)', marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 13 }}>
          <div>
            <div className="heading-font" style={{ fontWeight: 700, fontSize: 17, color: '#1f2d33' }}>
              Mejoramiento del servicio de agua potable — C.P. San Juan
            </div>
            <div style={{ fontSize: 12.5, color: '#6c7b83', marginTop: 2 }}>
              <i className="fa-solid fa-screwdriver-wrench" style={{ color: '#36ad46', marginRight: 6 }} />
              Ficha Técnica IOARR · CUI 2654891
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setShowPreview(true)} style={{
              background: '#fff', border: '1px solid #e3e8eb', borderRadius: 9,
              padding: '8px 14px', fontSize: 12.5, fontWeight: 600, color: '#16708f',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7,
            }}>
              <i className="fa-solid fa-file-pdf" style={{ color: '#c0392b', fontSize: 13 }} /> Previsualizar PDF
            </button>
            <div style={{ textAlign: 'right' }}>
              <div className="heading-font" style={{ fontWeight: 800, fontSize: 22, color: '#16708f', lineHeight: 1 }}>{progressPct}%</div>
              <div style={{ fontSize: 11.5, color: '#8a979e' }}>{doneCount} de {totalSteps} secciones</div>
            </div>
          </div>
        </div>
        <ProgressBar percent={progressPct} height={9} />
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: '248px 1fr 300px', gap: 18, alignItems: 'start' }}>
        {/* Stepper */}
        <Reveal delay={0.05} style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 13, padding: 10, boxShadow: '0 1px 3px rgba(0,0,0,.04)', position: 'sticky', top: 0 }}>
          {SECTIONS.map((s, i) => {
            const done = doneSteps.includes(i)
            const current = i === step
            let numBg: string, numColor: string, numBorder: string
            if (current) { numBg = '#16708f'; numColor = '#fff'; numBorder = '#16708f' }
            else if (done) { numBg = '#e6f5e9'; numColor = '#2e9a3d'; numBorder = '#bfe6c9' }
            else { numBg = '#fff'; numColor = '#9aa7ad'; numBorder = '#d7dee2' }

            return (
              <button
                key={s.key}
                onClick={() => dispatch({ type: 'SET_STEP', payload: i })}
                style={{
                  display: 'flex', alignItems: 'center', gap: 11, width: '100%',
                  border: 'none', cursor: 'pointer', borderRadius: 9, padding: '11px 12px',
                  textAlign: 'left',
                  background: current ? '#e3f1f5' : 'transparent',
                  color: current ? '#0f5d78' : done ? '#46555c' : '#8a979e',
                  fontWeight: current ? 700 : 500,
                }}
              >
                <span style={{
                  flex: 'none', width: 26, height: 26, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12.5, fontWeight: 700, background: numBg, color: numColor,
                  border: `1.5px solid ${numBorder}`,
                }}>
                  {done ? <i className="fa-solid fa-check" style={{ fontSize: 11 }} /> : i + 1}
                </span>
                <span style={{ flex: 1, textAlign: 'left', fontSize: 13, lineHeight: 1.2 }}>{s.title}</span>
              </button>
            )
          })}
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1} style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 13, padding: '24px 26px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 4 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: '#e3f1f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className={`fa-solid ${sec.icon}`} style={{ color: '#16708f' }} />
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: '#36ad46', fontWeight: 700, letterSpacing: '.4px' }}>SECCIÓN {step + 1} / {totalSteps}</div>
              <div className="heading-font" style={{ fontWeight: 700, fontSize: 18, color: '#1f2d33' }}>{sec.title}</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: '#6c7b83', margin: '6px 0 22px', lineHeight: 1.45 }}>{sec.desc}</div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
            {sec.fields.map(f => (
              <div key={f.label} style={{ width: f.full ? '100%' : 'calc(50% - 9px)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: '#46555c', marginBottom: 7 }}>
                  {f.label}
                  {f.ok && <i className="fa-solid fa-circle-check" style={{ color: '#36ad46', fontSize: 12 }} />}
                  {f.warn && <i className="fa-solid fa-triangle-exclamation" style={{ color: '#e0922f', fontSize: 12 }} />}
                  <FieldHelper label={f.label} hint={f.hint} />
                </label>
                {f.isText && !f.area && !f.isSelect && (
                  <input
                    type="text"
                    placeholder={f.ph ?? f.label}
                    defaultValue={f.value}
                    style={{
                      width: '100%', padding: '10px 12px', border: '1px solid #d7dee2',
                      borderRadius: 8, fontSize: 14, color: '#1f2d33', background: '#fff', outline: 'none',
                    }}
                  />
                )}
                {f.area && (
                  <textarea
                    rows={3}
                    placeholder={f.ph ?? f.label}
                    defaultValue={f.value}
                    style={{
                      width: '100%', padding: '10px 12px', border: '1px solid #d7dee2',
                      borderRadius: 8, fontSize: 14, color: '#1f2d33', background: '#fff',
                      outline: 'none', resize: 'vertical', lineHeight: 1.45,
                    }}
                  />
                )}
                {f.isSelect && (
                  <select
                    defaultValue={f.value}
                    style={{
                      width: '100%', padding: '10px 12px', border: '1px solid #d7dee2',
                      borderRadius: 8, fontSize: 14, color: '#1f2d33', background: '#fff',
                      outline: 'none', cursor: 'pointer',
                    }}
                  >
                    {f.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                )}
                {f.hint && <div style={{ fontSize: 12, color: '#8a979e', marginTop: 6, lineHeight: 1.35 }}>{f.hint}</div>}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 26, paddingTop: 18, borderTop: '1px solid #eef1f3' }}>
            <button
              onClick={() => dispatch({ type: 'PREV_STEP' })}
              disabled={step === 0}
              style={{
                background: '#fff', color: step === 0 ? '#c2cace' : '#46555c',
                border: '1px solid #d7dee2', borderRadius: 9, padding: '11px 16px',
                fontWeight: 600, fontSize: 13.5, cursor: step === 0 ? 'default' : 'pointer',
                opacity: step === 0 ? 0.55 : 1,
              }}
            >
              <i className="fa-solid fa-arrow-left" style={{ marginRight: 8 }} />Anterior
            </button>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{
                background: '#fff', color: '#46555c', border: '1px solid #d7dee2',
                borderRadius: 9, padding: '11px 16px', fontWeight: 600, fontSize: 13.5, cursor: 'pointer',
              }}>
                <i className="fa-regular fa-floppy-disk" style={{ marginRight: 7 }} />Guardar borrador
              </button>
              <button
                onClick={() => dispatch({ type: 'NEXT_STEP', totalSteps })}
                style={{
                  background: '#16708f', color: '#fff', border: 'none', borderRadius: 9,
                  padding: '11px 20px', fontWeight: 700, fontSize: 13.5, cursor: 'pointer',
                }}
              >
                {step === totalSteps - 1 ? 'Finalizar y revisar' : 'Siguiente sección'}
                <i className="fa-solid fa-arrow-right" style={{ marginLeft: 7 }} />
              </button>
            </div>
          </div>
        </Reveal>

        {/* AI Panel */}
        <Reveal delay={0.15} style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 13, boxShadow: '0 1px 3px rgba(0,0,0,.04)', overflow: 'hidden', position: 'sticky', top: 0 }}>
          <div style={{
            background: 'linear-gradient(135deg,#0f5d78,#16708f)', padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(255,255,255,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#fff', display: 'flex' }}><MentorBot size={24} animation="blink" loop loopDelay={3000} /></span>
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>Mentor IA</div>
              <div style={{ color: '#a7d8e3', fontSize: 11 }}>Asistencia en esta sección</div>
            </div>
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: '#16708f', letterSpacing: '.4px', marginBottom: 9 }}>
              <i className="fa-solid fa-lightbulb" style={{ marginRight: 6, color: '#e0922f' }} />SUGERENCIAS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 18 }}>
              {sec.tips.map(tip => (
                <div key={tip} style={{
                  background: '#f4f7f8', borderLeft: '3px solid #2c93a8',
                  borderRadius: '0 8px 8px 0', padding: '9px 11px',
                  fontSize: 12.5, color: '#46555c', lineHeight: 1.42,
                }}>
                  {tip}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: '#16708f', letterSpacing: '.4px', marginBottom: 9 }}>
              <i className="fa-solid fa-list-check" style={{ marginRight: 6, color: '#36ad46' }} />VALIDACIONES
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {sec.checks.map(c => (
                <div key={c.t} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 12.5, color: '#46555c', lineHeight: 1.35 }}>
                  <i className={`fa-solid ${c.ok ? 'fa-circle-check' : 'fa-circle-dot'}`} style={{ color: c.ok ? '#36ad46' : '#e0922f', fontSize: 13, marginTop: 1, flex: 'none' }} />
                  <span>{c.t}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'asistente' })}
              style={{
                marginTop: 18, width: '100%', background: '#e3f1f5', color: '#0f5d78',
                border: 'none', borderRadius: 9, padding: 10, fontWeight: 700, fontSize: 13,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              <i className="fa-solid fa-comments" /> Preguntar al mentor
            </button>
          </div>
        </Reveal>
      </div>

      <PdfViewerModal
        open={showPreview}
        onClose={() => setShowPreview(false)}
        title="Previsualización — Ficha Técnica IOARR"
        subtitle={`CUI 2654891 · ${doneCount} de ${totalSteps} secciones completadas`}
        pdfUrl={showPreview ? generateFichaPreviewUrl(step) : ''}
        downloadName="Ficha_IOARR_CUI_2654891_borrador.pdf"
      />
    </div>
  )
}
