import { useState } from 'react'
import { TRAINING_EXERCISES, DIFFICULTY_STYLES, type TrainingExercise } from '@/core/data/training'
import { SECTIONS } from '@/core/data/sections'
import { ProgressBar } from '../components/ProgressBar'
import { Reveal } from '../components/Reveal'
import { SliderTabs } from '../components/SliderTabs'
import { MentorBot } from '../components/MentorBot'
import { FieldHelper } from '../components/FieldHelper'

const TABS = [
  { key: 'todos', label: 'Todos' },
  { key: 'disponible', label: 'Disponibles' },
  { key: 'en_progreso', label: 'En progreso' },
  { key: 'completado', label: 'Completados' },
]

export function Training() {
  const [tab, setTab] = useState('todos')
  const [activeExercise, setActiveExercise] = useState<TrainingExercise | null>(null)
  const [practiceStep, setPracticeStep] = useState(0)

  if (activeExercise) {
    return <PracticeView exercise={activeExercise} step={practiceStep} setStep={setPracticeStep} onBack={() => { setActiveExercise(null); setPracticeStep(0) }} />
  }

  const filtered = TRAINING_EXERCISES.filter(e => {
    if (tab === 'todos') return true
    return e.status === tab
  })

  const completedCount = TRAINING_EXERCISES.filter(e => e.status === 'completado').length
  const avgScore = TRAINING_EXERCISES.filter(e => e.score !== null).reduce((s, e) => s + (e.score ?? 0), 0) / (TRAINING_EXERCISES.filter(e => e.score !== null).length || 1)

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      {/* Header */}
      <Reveal style={{
        borderRadius: 16, overflow: 'hidden', marginBottom: 22,
        background: 'linear-gradient(120deg, #1a5f78, #2c93a8 60%, #36ad46)',
        padding: '26px 30px', color: '#fff', position: 'relative',
      }}>
        <div style={{ position: 'absolute', right: 20, top: 16, opacity: 0.12 }}>
          <MentorBot size={120} animation="blink" loop loopDelay={4000} />
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 12, color: '#bfe6d4', fontWeight: 600, marginBottom: 6, letterSpacing: '.5px' }}>
            <i className="fa-solid fa-dumbbell" style={{ marginRight: 6 }} />MODO ENTRENAMIENTO
          </div>
          <div className="heading-font" style={{ fontWeight: 800, fontSize: 22, lineHeight: 1.2, marginBottom: 8, maxWidth: 600 }}>
            Practica llenando formatos reales con datos de ejemplo
          </div>
          <div style={{ fontSize: 13.5, color: '#cfe6ee', lineHeight: 1.5, maxWidth: 550 }}>
            Aquí puedes equivocarte sin consecuencias. El mentor IA te guía campo por campo, valida tu trabajo y te da una puntuación al final.
          </div>
          <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
            <div style={{ background: 'rgba(255,255,255,.12)', borderRadius: 10, padding: '10px 16px', textAlign: 'center' }}>
              <div className="heading-font" style={{ fontWeight: 800, fontSize: 22, lineHeight: 1 }}>{completedCount}/{TRAINING_EXERCISES.length}</div>
              <div style={{ fontSize: 11, color: '#bfe6d4', marginTop: 2 }}>Ejercicios</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,.12)', borderRadius: 10, padding: '10px 16px', textAlign: 'center' }}>
              <div className="heading-font" style={{ fontWeight: 800, fontSize: 22, lineHeight: 1 }}>{Math.round(avgScore)}%</div>
              <div style={{ fontSize: 11, color: '#bfe6d4', marginTop: 2 }}>Promedio</div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Tabs */}
      <Reveal delay={0.05} style={{ marginBottom: 18 }}>
        <SliderTabs tabs={TABS} active={tab} onSelect={setTab} layoutId="training-tabs" padding="8px 15px" />
      </Reveal>

      {/* Exercise grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {filtered.map((ex, i) => {
          const [dColor, dBg] = DIFFICULTY_STYLES[ex.difficulty] ?? ['#6c7b83', '#eef1f3']
          const statusLabel = ex.status === 'completado' ? 'Completado' : ex.status === 'en_progreso' ? 'En progreso' : 'Disponible'
          const statusColor = ex.status === 'completado' ? '#2e9a3d' : ex.status === 'en_progreso' ? '#16708f' : '#9aa7ad'

          return (
            <Reveal key={ex.id} delay={i * 0.04}>
              <div style={{
                background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14,
                overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,.04)',
                transition: 'all .15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,.07)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,.04)' }}
              >
                {/* Top bar */}
                <div style={{ background: 'linear-gradient(135deg, #0f5d78, #16708f)', padding: '14px 18px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <i className={`fa-solid ${ex.icon}`} style={{ fontSize: 16 }} />
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{ex.format}</span>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, background: dBg, color: dColor, padding: '3px 10px', borderRadius: 10 }}>{ex.difficulty}</span>
                </div>

                {/* Body */}
                <div style={{ padding: '18px 20px' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1f2d33', lineHeight: 1.3, marginBottom: 8 }}>{ex.title}</div>
                  <div style={{ fontSize: 12.5, color: '#6c7b83', lineHeight: 1.5, marginBottom: 14 }}>{ex.description}</div>

                  {/* Scenario preview */}
                  <div style={{ background: '#f8fafb', border: '1px solid #eef1f3', borderRadius: 10, padding: '12px 14px', marginBottom: 14 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#16708f', marginBottom: 4 }}>
                      <i className="fa-solid fa-scroll" style={{ marginRight: 5 }} />CASO PRÁCTICO
                    </div>
                    <div style={{ fontSize: 12, color: '#46555c', lineHeight: 1.45 }}>
                      {ex.scenario.length > 120 ? ex.scenario.slice(0, 120) + '…' : ex.scenario}
                    </div>
                  </div>

                  {/* Stats */}
                  <div style={{ display: 'flex', gap: 14, fontSize: 12, color: '#9aa7ad', marginBottom: 14 }}>
                    <span><i className="fa-solid fa-layer-group" style={{ marginRight: 4 }} />{ex.sections} secciones</span>
                    <span><i className="fa-regular fa-clock" style={{ marginRight: 4 }} />{ex.estimatedTime}</span>
                    {ex.score !== null && <span><i className="fa-solid fa-star" style={{ marginRight: 4, color: '#e0922f' }} />{ex.score}%</span>}
                  </div>

                  {/* Status + Action */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: statusColor }}>{statusLabel}</span>
                    <button onClick={() => setActiveExercise(ex)} style={{
                      background: ex.status === 'completado' ? '#e3f1f5' : '#16708f',
                      color: ex.status === 'completado' ? '#16708f' : '#fff',
                      border: 'none', borderRadius: 9, padding: '9px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 7,
                    }}>
                      <i className={`fa-solid ${ex.status === 'completado' ? 'fa-rotate-right' : ex.status === 'en_progreso' ? 'fa-play' : 'fa-rocket'}`} style={{ fontSize: 12 }} />
                      {ex.status === 'completado' ? 'Repetir' : ex.status === 'en_progreso' ? 'Continuar' : 'Comenzar'}
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Practice View ─── */
function PracticeView({ exercise, step, setStep, onBack }: { exercise: TrainingExercise; step: number; setStep: (s: number) => void; onBack: () => void }) {
  const totalSteps = Math.min(exercise.sections, SECTIONS.length)
  const sec = SECTIONS[step] ?? SECTIONS[0]
  const progressPct = Math.round(((step + 1) / totalSteps) * 100)

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto' }}>
      {/* Back */}
      <Reveal>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#16708f', marginBottom: 14, padding: 0 }}>
          <i className="fa-solid fa-arrow-left" style={{ fontSize: 11 }} /> Volver a ejercicios
        </button>
      </Reveal>

      {/* Training banner */}
      <Reveal style={{
        background: 'linear-gradient(120deg, #1a5f78, #2c93a8)', borderRadius: 14,
        padding: '16px 22px', marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ background: 'rgba(255,255,255,.12)', borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <i className="fa-solid fa-dumbbell" style={{ fontSize: 14 }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.3px' }}>ENTRENAMIENTO</span>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.2 }}>{exercise.title}</div>
            <div style={{ fontSize: 12, color: '#bfe6d4', marginTop: 2 }}>{exercise.format} · {exercise.difficulty}</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="heading-font" style={{ fontWeight: 800, fontSize: 20, lineHeight: 1 }}>{progressPct}%</div>
          <div style={{ fontSize: 11, color: '#bfe6d4' }}>Sección {step + 1}/{totalSteps}</div>
        </div>
      </Reveal>

      {/* Scenario card */}
      <Reveal delay={0.05} style={{ background: '#fffcf5', border: '1px solid #f5e6c8', borderRadius: 12, padding: '14px 18px', marginBottom: 18, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <i className="fa-solid fa-scroll" style={{ color: '#e0922f', fontSize: 16, marginTop: 2 }} />
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#e0922f', marginBottom: 3 }}>CASO PRÁCTICO</div>
          <div style={{ fontSize: 13, color: '#46555c', lineHeight: 1.5 }}>{exercise.scenario}</div>
        </div>
      </Reveal>

      {/* Progress */}
      <Reveal delay={0.08} style={{ marginBottom: 18 }}>
        <ProgressBar percent={progressPct} height={8} />
      </Reveal>

      {/* 3-column layout like Workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 280px', gap: 18, alignItems: 'start' }}>
        {/* Stepper */}
        <Reveal delay={0.1} style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 13, padding: 10, boxShadow: '0 1px 3px rgba(0,0,0,.04)', position: 'sticky', top: 0 }}>
          {SECTIONS.slice(0, totalSteps).map((s, i) => {
            const done = i < step
            const current = i === step
            return (
              <button key={s.key} onClick={() => setStep(i)} style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%', border: 'none', cursor: 'pointer',
                borderRadius: 9, padding: '10px 11px', textAlign: 'left',
                background: current ? '#e3f1f5' : 'transparent',
                color: current ? '#0f5d78' : done ? '#46555c' : '#8a979e',
                fontWeight: current ? 700 : 500,
              }}>
                <span style={{
                  flex: 'none', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700,
                  background: current ? '#16708f' : done ? '#e6f5e9' : '#fff',
                  color: current ? '#fff' : done ? '#2e9a3d' : '#9aa7ad',
                  border: `1.5px solid ${current ? '#16708f' : done ? '#bfe6c9' : '#d7dee2'}`,
                }}>
                  {done ? <i className="fa-solid fa-check" style={{ fontSize: 10 }} /> : i + 1}
                </span>
                <span style={{ fontSize: 12.5, lineHeight: 1.2 }}>{s.title}</span>
              </button>
            )
          })}
        </Reveal>

        {/* Form */}
        <Reveal delay={0.12} style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 13, padding: '22px 24px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: '#e3f1f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className={`fa-solid ${sec.icon}`} style={{ color: '#16708f' }} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#2c93a8', fontWeight: 700, letterSpacing: '.3px' }}>SECCIÓN {step + 1} / {totalSteps}</div>
              <div className="heading-font" style={{ fontWeight: 700, fontSize: 17, color: '#1f2d33' }}>{sec.title}</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: '#6c7b83', margin: '6px 0 20px', lineHeight: 1.45 }}>{sec.desc}</div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {sec.fields.map(f => (
              <div key={f.label} style={{ width: f.full ? '100%' : 'calc(50% - 8px)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: '#46555c', marginBottom: 7 }}>
                  {f.label}
                  <FieldHelper label={f.label} hint={f.hint} />
                </label>
                {f.isText && !f.area && !f.isSelect && (
                  <input type="text" placeholder={f.ph ?? `Ingresa ${f.label.toLowerCase()}`} style={{ width: '100%', padding: '10px 12px', border: '1px solid #d7dee2', borderRadius: 8, fontSize: 14, color: '#1f2d33', background: '#fff', outline: 'none' }} />
                )}
                {f.area && (
                  <textarea rows={3} placeholder={f.ph ?? f.label} style={{ width: '100%', padding: '10px 12px', border: '1px solid #d7dee2', borderRadius: 8, fontSize: 14, color: '#1f2d33', background: '#fff', outline: 'none', resize: 'vertical', lineHeight: 1.45 }} />
                )}
                {f.isSelect && (
                  <select defaultValue="" style={{ width: '100%', padding: '10px 12px', border: '1px solid #d7dee2', borderRadius: 8, fontSize: 14, color: '#1f2d33', background: '#fff', outline: 'none', cursor: 'pointer' }}>
                    <option value="" disabled>Selecciona…</option>
                    {f.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                )}
                {f.hint && <div style={{ fontSize: 12, color: '#8a979e', marginTop: 6, lineHeight: 1.35 }}>{f.hint}</div>}
              </div>
            ))}
          </div>

          {/* Nav */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, paddingTop: 16, borderTop: '1px solid #eef1f3' }}>
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{
              background: '#fff', color: step === 0 ? '#c2cace' : '#46555c', border: '1px solid #d7dee2', borderRadius: 9,
              padding: '10px 16px', fontWeight: 600, fontSize: 13, cursor: step === 0 ? 'default' : 'pointer', opacity: step === 0 ? 0.5 : 1,
            }}>
              <i className="fa-solid fa-arrow-left" style={{ marginRight: 7 }} />Anterior
            </button>
            <button onClick={() => setStep(Math.min(totalSteps - 1, step + 1))} style={{
              background: step === totalSteps - 1 ? '#36ad46' : '#16708f', color: '#fff', border: 'none', borderRadius: 9,
              padding: '10px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer',
            }}>
              {step === totalSteps - 1 ? 'Enviar para evaluación' : 'Siguiente sección'}
              <i className="fa-solid fa-arrow-right" style={{ marginLeft: 7 }} />
            </button>
          </div>
        </Reveal>

        {/* Right sidebar: Mentor + tips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'sticky', top: 0 }}>
          {/* Mentor panel */}
          <Reveal delay={0.15} style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 13, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
            <div style={{ background: 'linear-gradient(135deg,#1a5f78,#2c93a8)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', display: 'flex' }}><MentorBot size={20} animation="blink" loop loopDelay={3000} /></span>
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>Mentor de práctica</div>
                <div style={{ color: '#a7d8e3', fontSize: 11 }}>Te acompaña en este ejercicio</div>
              </div>
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#16708f', letterSpacing: '.3px', marginBottom: 8 }}>
                <i className="fa-solid fa-lightbulb" style={{ marginRight: 5, color: '#e0922f' }} />SUGERENCIAS
              </div>
              {sec.tips.map(tip => (
                <div key={tip} style={{ background: '#f4f7f8', borderLeft: '3px solid #2c93a8', borderRadius: '0 8px 8px 0', padding: '8px 10px', fontSize: 12, color: '#46555c', lineHeight: 1.42, marginBottom: 8 }}>
                  {tip}
                </div>
              ))}
              <div style={{ fontSize: 11, fontWeight: 700, color: '#16708f', letterSpacing: '.3px', marginTop: 10, marginBottom: 8 }}>
                <i className="fa-solid fa-list-check" style={{ marginRight: 5, color: '#36ad46' }} />VALIDACIONES
              </div>
              {sec.checks.map(c => (
                <div key={c.t} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: '#46555c', lineHeight: 1.35, marginBottom: 6 }}>
                  <i className={`fa-solid ${c.ok ? 'fa-circle-check' : 'fa-circle-dot'}`} style={{ color: c.ok ? '#36ad46' : '#e0922f', fontSize: 12, marginTop: 1, flex: 'none' }} />
                  <span>{c.t}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Score hint */}
          <Reveal delay={0.2} style={{ background: '#fffcf5', border: '1px solid #f5e6c8', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#e0922f', marginBottom: 4 }}>
              <i className="fa-solid fa-star" style={{ marginRight: 5 }} />PUNTUACIÓN
            </div>
            <div style={{ fontSize: 12, color: '#6c7b83', lineHeight: 1.5 }}>
              Al completar todas las secciones, el mentor evaluará tu trabajo y te dará una puntuación con retroalimentación detallada.
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
