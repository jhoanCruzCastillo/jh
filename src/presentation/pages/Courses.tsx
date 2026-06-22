import { useState } from 'react'
import { COURSES, CERTIFICATES, DIGITAL_BOOKS, COURSE_TABS, INSTRUCTOR_AVATARS, INSTRUCTOR_BIOS, DIPLOMA_LINKS } from '@/core/data/courses'
import { ResourceModals } from '../components/ResourceModals'
import { AccordionBody } from '../components/Accordion'
import { TALLERES } from '@/core/data/plans'
import { ProgressBar } from '../components/ProgressBar'
import { Reveal } from '../components/Reveal'
import { SliderTabs } from '../components/SliderTabs'
import type { CourseDef, CourseModule } from '@/core/types'

const STATUS_STYLES: Record<string, [string, string]> = {
  en_curso: ['#2e9a3d', '#e6f5e9'],
  completado: ['#16708f', '#e3f1f5'],
  por_iniciar: ['#e0922f', '#fff4e6'],
}

const TYPE_ICONS: Record<string, [string, string]> = {
  video: ['fa-play-circle', '#16708f'],
  live: ['fa-video', '#e0922f'],
  taller: ['fa-pen-ruler', '#2c93a8'],
  examen: ['fa-clipboard-check', '#c0392b'],
}

const FILE_COLORS: Record<string, [string, string]> = {
  PDF: ['#fbe9e7', '#c0392b'],
  XLSX: ['#e6f5e9', '#2e9a3d'],
  DOCX: ['#e3f1f5', '#16708f'],
}

export function Courses() {
  const [tab, setTab] = useState('cursos')
  const [selectedCourse, setSelectedCourse] = useState<CourseDef | null>(null)

  if (selectedCourse) {
    return <CourseDetail course={selectedCourse} onBack={() => setSelectedCourse(null)} />
  }

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      <Reveal style={{ marginBottom: 22, width: 'fit-content' }}>
        <SliderTabs
          tabs={COURSE_TABS.map(t => ({ key: t.key, label: t.label, icon: t.icon }))}
          active={tab}
          onSelect={setTab}
          layoutId="course-tabs"
        />
      </Reveal>

      {tab === 'cursos' && <CourseGrid onSelect={setSelectedCourse} />}
      {tab === 'calendario' && <CalendarView />}
      {tab === 'certificados' && <CertificatesView />}
      {tab === 'libros' && <BooksView />}
    </div>
  )
}

/* ─── Course Grid ─── */
function CourseGrid({ onSelect }: { onSelect: (c: CourseDef) => void }) {
  return (
    <Reveal delay={0.05} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
      {COURSES.map(course => {
        const [stColor, stBg] = STATUS_STYLES[course.status] ?? ['#6c7b83', '#eef1f3']
        const allClasses = course.modules.flatMap(m => m.sessions.flatMap(s => s.classes))
        const done = allClasses.filter(c => c.completed).length

        return (
          <div
            key={course.id}
            onClick={() => onSelect(course)}
            style={{
              background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14,
              overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,.04)', cursor: 'pointer',
              transition: 'transform .15s, box-shadow .15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,.1)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,.04)' }}
          >
            <div style={{
              height: 150,
              backgroundImage: `linear-gradient(180deg, rgba(15,93,120,.25) 0%, rgba(15,93,120,.85) 100%), url(${course.image})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              padding: '14px 16px', position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: 12, right: 12, background: stBg, color: stColor, fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 14 }}>{course.statusLabel}</div>
              <div style={{ position: 'absolute', top: 12, left: 16, display: 'flex', alignItems: 'center', gap: 5 }}>
                <i className="fa-solid fa-users" style={{ color: 'rgba(255,255,255,.7)', fontSize: 10 }} />
                <span style={{ color: 'rgba(255,255,255,.8)', fontSize: 11, fontWeight: 600 }}>{course.students}</span>
              </div>
              <div style={{ fontSize: 9, color: '#bfe6d4', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.8px' }}>Diploma de Especialización</div>
              <div style={{ fontSize: 13, color: '#fff', fontWeight: 700, lineHeight: 1.25, marginTop: 4 }}>
                {course.title.length > 70 ? course.title.slice(0, 70) + '…' : course.title}
              </div>
            </div>

            <div style={{ padding: '16px 16px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <img src={INSTRUCTOR_AVATARS[course.instructor] ?? ''} alt={course.instructor} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: '#1f2d33' }}>{course.instructor}</div>
                  <div style={{ fontSize: 10.5, color: '#9aa7ad' }}>{course.instructorEmail}</div>
                </div>
              </div>
              <div style={{ fontSize: 11.5, color: '#6c7b83', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <i className="fa-regular fa-calendar" style={{ color: '#e0922f', fontSize: 11 }} />{course.duration}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                <div style={{ flex: 1 }}><ProgressBar percent={course.progress} height={7} gradient={course.progress === 100 ? '#36ad46' : 'linear-gradient(90deg,#16708f,#36ad46)'} /></div>
                <span className="heading-font" style={{ fontSize: 14, fontWeight: 800, color: '#16708f' }}>{course.progress}%</span>
              </div>
              <div style={{ fontSize: 11, color: '#9aa7ad' }}>{done} de {allClasses.length} clases · {course.modules.length} módulos</div>
            </div>

            <div style={{ padding: '10px 16px', borderTop: '1px solid #eef1f3', background: '#f8fafb', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: '#16708f' }}>
              <i className="fa-solid fa-arrow-right" style={{ fontSize: 10 }} />
              {course.status === 'en_curso' ? 'Continuar curso' : course.status === 'completado' ? 'Ver contenido' : 'Ver programa'}
            </div>
          </div>
        )
      })}
    </Reveal>
  )
}

/* ─── Course Detail (accordion) ─── */
function CourseDetail({ course, onBack }: { course: CourseDef; onBack: () => void }) {
  const [stColor, stBg] = STATUS_STYLES[course.status] ?? ['#6c7b83', '#eef1f3']
  const [openModuleId, setOpenModuleId] = useState<string | null>(null)
  const [sessionIdx, setSessionIdx] = useState(0)
  const [activeResource, setActiveResource] = useState<string | null>(null)
  const [expandedModule, setExpandedModule] = useState<CourseModule | null>(null)
  const [expandedSessionIdx, setExpandedSessionIdx] = useState(0)
  const bio = INSTRUCTOR_BIOS[course.instructor]

  const totalClasses = course.modules.flatMap(m => m.sessions.flatMap(s => s.classes)).length
  const doneClasses = course.modules.flatMap(m => m.sessions.flatMap(s => s.classes.filter(c => c.completed))).length

  const getModuleProgress = (mod: CourseModule) => {
    const all = mod.sessions.flatMap(s => s.classes)
    if (all.length === 0) return 0
    return Math.round(all.filter(c => c.completed).length / all.length * 100)
  }

  if (expandedModule) {
    const modIdx = course.modules.findIndex(m => m.id === expandedModule.id)
    const modPct = getModuleProgress(expandedModule)
    const modDone = expandedModule.sessions.flatMap(s => s.classes.filter(c => c.completed)).length
    const modTotal = expandedModule.sessions.flatMap(s => s.classes).length
    const session = expandedModule.sessions[expandedSessionIdx] ?? expandedModule.sessions[0]

    return (
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <Reveal>
          <button onClick={() => setExpandedModule(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#16708f', marginBottom: 16, padding: 0 }}>
            <i className="fa-solid fa-arrow-left" style={{ fontSize: 11 }} /> Volver al curso
          </button>
        </Reveal>

        {/* Module header */}
        <Reveal style={{
          background: 'linear-gradient(120deg, #0f5d78, #16708f)', borderRadius: 14,
          padding: '24px 28px', color: '#fff', marginBottom: 22,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: '#bfe6d4', fontWeight: 700, letterSpacing: '.5px', marginBottom: 6 }}>MÓDULO {String(modIdx + 1).padStart(2, '0')}</div>
              <div className="heading-font" style={{ fontWeight: 800, fontSize: 20, lineHeight: 1.25, marginBottom: 8 }}>{expandedModule.title}</div>
              <div style={{ display: 'flex', gap: 16, fontSize: 12.5, color: '#bfe6d4' }}>
                <span><i className="fa-solid fa-bookmark" style={{ marginRight: 5 }} />{expandedModule.sessions.length} sesiones</span>
                <span><i className="fa-solid fa-play-circle" style={{ marginRight: 5 }} />{modDone}/{modTotal} clases</span>
              </div>
            </div>
            <div style={{ flex: 'none', textAlign: 'center' }}>
              <div className="heading-font" style={{ fontWeight: 800, fontSize: 28, lineHeight: 1 }}>{modPct}%</div>
              <div style={{ width: 80, marginTop: 6 }}><ProgressBar percent={modPct} height={6} gradient={modPct === 100 ? '#7fe0a0' : 'linear-gradient(90deg,#7fe0a0,#36ad46)'} /></div>
            </div>
          </div>
        </Reveal>

        {/* Session tabs */}
        <Reveal delay={0.05} style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 6, background: '#fff', border: '1px solid #e3e8eb', padding: 5, borderRadius: 11, width: 'fit-content' }}>
            {expandedModule.sessions.map((s, si) => (
              <button key={s.id} onClick={() => setExpandedSessionIdx(si)} style={{
                border: 'none', cursor: 'pointer', borderRadius: 8,
                padding: '9px 18px', fontSize: 13, fontWeight: 600,
                background: expandedSessionIdx === si ? '#16708f' : 'transparent',
                color: expandedSessionIdx === si ? '#fff' : '#6c7b83',
                transition: 'all .15s',
              }}>
                Sesión {si + 1}: {s.title.length > 30 ? s.title.slice(0, 30) + '…' : s.title}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Session content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, alignItems: 'start' }}>
          <div>
            {/* Session info */}
            <Reveal delay={0.08} style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14, padding: '20px 24px', marginBottom: 18, boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#1f2d33', marginBottom: 4 }}>{session.title}</div>
              <div style={{ fontSize: 13, color: '#6c7b83' }}>
                <i className="fa-solid fa-user" style={{ marginRight: 6, color: '#16708f' }} />Docente: {session.docente}
              </div>
            </Reveal>

            {/* Classes */}
            <Reveal delay={0.1}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#9aa7ad', letterSpacing: '.4px', marginBottom: 10 }}>
                <i className="fa-solid fa-play-circle" style={{ marginRight: 6, color: '#16708f' }} />CLASES ({session.classes.length})
              </div>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12, marginBottom: 24 }}>
              {session.classes.map((cls, ci) => {
                const [icon, color] = TYPE_ICONS[cls.type] ?? ['fa-circle', '#999']
                return (
                  <Reveal key={ci} delay={0.1 + ci * 0.04}>
                    <div style={{
                      background: cls.completed ? '#f8fcf9' : '#fff',
                      border: `1px solid ${cls.completed ? '#d4edda' : '#e3e8eb'}`,
                      borderRadius: 12, padding: '18px 20px', cursor: 'pointer', transition: 'all .15s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,.06)' }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <i className={`fa-solid ${icon}`} style={{ color, fontSize: 16 }} />
                          <span style={{ fontSize: 12, fontWeight: 600, color, textTransform: 'capitalize' }}>{cls.type === 'live' ? 'Clase en vivo' : cls.type}</span>
                        </div>
                        {cls.completed && <i className="fa-solid fa-circle-check" style={{ color: '#36ad46', fontSize: 16 }} />}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#1f2d33', lineHeight: 1.3, marginBottom: 12 }}>{cls.title}</div>
                      <button style={{
                        width: '100%', background: cls.completed ? '#e6f5e9' : '#16708f',
                        color: cls.completed ? '#2e9a3d' : '#fff',
                        border: 'none', borderRadius: 9, padding: '9px', fontSize: 12.5, fontWeight: 700, cursor: 'pointer',
                      }}>
                        {cls.completed ? 'Revisar' : cls.type === 'live' ? 'Unirse a la clase' : cls.type === 'examen' ? 'Rendir examen' : 'Ver contenido'}
                      </button>
                    </div>
                  </Reveal>
                )
              })}
            </div>

            {/* Readings */}
            {session.readings.length > 0 && (
              <>
                <Reveal delay={0.15}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#9aa7ad', letterSpacing: '.4px', marginBottom: 10 }}>
                    <i className="fa-solid fa-book-open" style={{ marginRight: 6, color: '#e0922f' }} />LECTURAS OBLIGATORIAS ({session.readings.length})
                  </div>
                </Reveal>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {session.readings.map((r, ri) => {
                    const [fileBg, fileColor] = FILE_COLORS[r.file] ?? ['#eef1f3', '#6c7b83']
                    return (
                      <Reveal key={ri} delay={0.15 + ri * 0.03}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: '#fff', border: '1px solid #e3e8eb', borderRadius: 11 }}>
                          <div style={{ width: 40, height: 40, borderRadius: 10, background: fileBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 11, fontWeight: 800, color: fileColor }}>
                            {r.file}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: '#1f2d33' }}>{r.title}</div>
                            <div style={{ fontSize: 12, color: '#9aa7ad', marginTop: 2 }}>Documento {r.file}</div>
                          </div>
                          <button style={{ background: '#36ad46', color: '#fff', border: 'none', borderRadius: 9, padding: '9px 18px', fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>
                            <i className="fa-solid fa-download" style={{ marginRight: 6 }} />Descargar
                          </button>
                        </div>
                      </Reveal>
                    )
                  })}
                </div>
              </>
            )}
          </div>

          {/* Sidebar: module navigation */}
          <div style={{ position: 'sticky', top: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Reveal delay={0.1} style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14, padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#16708f', letterSpacing: '.3px', marginBottom: 10 }}>
                <i className="fa-solid fa-list" style={{ marginRight: 6 }} />SESIONES
              </div>
              {expandedModule.sessions.map((s, si) => {
                const sDone = s.classes.filter(c => c.completed).length
                const sTotal = s.classes.length
                const active = si === expandedSessionIdx
                return (
                  <button key={s.id} onClick={() => setExpandedSessionIdx(si)} style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                    background: active ? '#f0f9ff' : 'transparent', border: `1px solid ${active ? '#16708f' : 'transparent'}`,
                    borderRadius: 9, cursor: 'pointer', textAlign: 'left', marginBottom: 4, transition: 'all .15s',
                  }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: 7, flex: 'none', fontSize: 11, fontWeight: 700,
                      background: sDone === sTotal ? '#e6f5e9' : active ? '#e3f1f5' : '#f4f7f8',
                      color: sDone === sTotal ? '#2e9a3d' : active ? '#16708f' : '#9aa7ad',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {sDone === sTotal ? <i className="fa-solid fa-check" style={{ fontSize: 10 }} /> : si + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: active ? '#16708f' : '#46555c', lineHeight: 1.2 }}>{s.title}</div>
                      <div style={{ fontSize: 10.5, color: '#9aa7ad', marginTop: 1 }}>{sDone}/{sTotal} clases</div>
                    </div>
                  </button>
                )
              })}
            </Reveal>

            {bio && (
              <Reveal delay={0.15} style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14, padding: '14px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img src={bio.photo} alt="" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#1f2d33' }}>{session.docente}</div>
                    <div style={{ fontSize: 11, color: '#16708f' }}>Docente</div>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>

        <ResourceModals activeResource={activeResource} onClose={() => setActiveResource(null)} />
      </div>
    )
  }

  const toggleModule = (id: string) => {
    if (openModuleId === id) { setOpenModuleId(null) } else { setOpenModuleId(id); setSessionIdx(0) }
  }

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      {/* Back */}
      <Reveal>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#16708f', marginBottom: 18, padding: 0 }}>
          <i className="fa-solid fa-arrow-left" style={{ fontSize: 11 }} /> Volver a Mis Cursos
        </button>
      </Reveal>

      {/* Hero */}
      <Reveal style={{
        borderRadius: 16, overflow: 'hidden', marginBottom: 22,
        backgroundImage: `linear-gradient(120deg, rgba(15,93,120,.92), rgba(26,127,160,.82) 60%, rgba(43,154,107,.75)), url(${course.image})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        padding: '26px 30px', color: '#fff',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ background: stBg, color: stColor, fontSize: 10, fontWeight: 700, padding: '4px 11px', borderRadius: 14 }}>{course.statusLabel}</span>
              <span style={{ fontSize: 12, color: '#bfe6d4' }}><i className="fa-solid fa-users" style={{ marginRight: 5 }} />{course.students} alumnos</span>
            </div>
            <div className="heading-font" style={{ fontWeight: 800, fontSize: 20, lineHeight: 1.25, marginBottom: 10 }}>{course.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src={INSTRUCTOR_AVATARS[course.instructor] ?? ''} alt="" style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,.25)' }} />
              <span style={{ fontSize: 13 }}>{course.instructor}</span>
              <span style={{ fontSize: 12, color: '#bfe6d4' }}>· {course.duration}</span>
            </div>
          </div>
          <div style={{ flex: 'none', width: 90, textAlign: 'center' }}>
            <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto' }}>
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="6" />
                <circle cx="40" cy="40" r="34" fill="none" stroke="#7fe0a0" strokeWidth="6" strokeDasharray={`${2 * Math.PI * 34}`} strokeDashoffset={`${2 * Math.PI * 34 * (1 - course.progress / 100)}`} strokeLinecap="round" transform="rotate(-90 40 40)" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="heading-font" style={{ fontWeight: 800, fontSize: 18 }}>{course.progress}%</span>
              </div>
            </div>
            <div style={{ fontSize: 10, color: '#bfe6d4', marginTop: 4 }}>{doneClasses}/{totalClasses} clases</div>
          </div>
        </div>
      </Reveal>

      {/* 2 columns: accordion + sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, alignItems: 'start' }}>

        {/* Left: video + accordion */}
        <div>
          {/* Video */}
          <Reveal style={{
            background: '#111827', borderRadius: 14, display: 'flex', alignItems: 'center',
            justifyContent: 'center', minHeight: 200, cursor: 'pointer', marginBottom: 22,
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', border: '2px solid rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                <i className="fa-solid fa-play" style={{ fontSize: 18, color: '#7fe0a0', marginLeft: 3 }} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Video de Bienvenida</div>
              <div style={{ fontSize: 12, color: '#7fb9c7', marginTop: 2 }}>2:16 min</div>
            </div>
          </Reveal>

          {/* Modules heading */}
          <Reveal delay={0.05}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div className="heading-font" style={{ fontWeight: 700, fontSize: 17, color: '#1f2d33' }}>
                <i className="fa-solid fa-layer-group" style={{ color: '#16708f', marginRight: 8 }} />{course.modules.length} Módulos
              </div>
              <span style={{ fontSize: 12, color: '#9aa7ad' }}>{doneClasses}/{totalClasses} clases completadas</span>
            </div>
          </Reveal>

          {/* Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {course.modules.map((mod, i) => {
              const pct = getModuleProgress(mod)
              const isOpen = openModuleId === mod.id
              const classCount = mod.sessions.flatMap(s => s.classes).length
              const doneCount = mod.sessions.flatMap(s => s.classes.filter(c => c.completed)).length
              const session = mod.sessions[sessionIdx] ?? mod.sessions[0]

              return (
                <Reveal key={mod.id} delay={i * 0.03}>
                  <div style={{ background: '#fff', border: `1.5px solid ${isOpen ? '#16708f' : '#e3e8eb'}`, borderRadius: 14, overflow: 'hidden', transition: 'border-color .2s', boxShadow: isOpen ? '0 4px 16px rgba(22,112,143,.1)' : '0 1px 3px rgba(0,0,0,.04)' }}>
                    {/* Module header (clickable) */}
                    <button
                      onClick={() => toggleModule(mod.id)}
                      style={{
                        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', textAlign: 'left',
                      }}
                    >
                      <div style={{
                        width: 38, height: 38, borderRadius: 10, flex: 'none',
                        background: pct === 100 ? '#36ad46' : '#e3f1f5',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {pct === 100
                          ? <i className="fa-solid fa-check" style={{ color: '#fff', fontSize: 15 }} />
                          : <span style={{ fontSize: 13, fontWeight: 800, color: '#16708f' }}>{String(i + 1).padStart(2, '0')}</span>
                        }
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#1f2d33', lineHeight: 1.25 }}>
                          <span style={{ fontWeight: 800, color: '#16708f', marginRight: 6 }}>Módulo {String(i + 1).padStart(2, '0')}</span>
                          {mod.title}
                        </div>
                        <div style={{ display: 'flex', gap: 12, fontSize: 11.5, color: '#9aa7ad', marginTop: 4 }}>
                          <span>{mod.sessions.length} sesiones</span>
                          <span>{doneCount}/{classCount} clases</span>
                          <span style={{ fontWeight: 600, color: pct === 100 ? '#36ad46' : '#16708f' }}>{pct}%</span>
                        </div>
                      </div>
                      <div style={{ flex: 'none', width: 50 }}>
                        <ProgressBar percent={pct} height={5} gradient={pct === 100 ? '#36ad46' : 'linear-gradient(90deg,#16708f,#36ad46)'} />
                      </div>
                      <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`} style={{ color: '#9aa7ad', fontSize: 12, flex: 'none' }} />
                    </button>

                    {/* Expanded content */}
                    <AccordionBody open={isOpen}>
                      <div style={{ borderTop: '1px solid #eef1f3' }}>
                        {/* Session tabs */}
                        {mod.sessions.length > 1 && (
                          <div style={{ padding: '12px 20px 0', overflowX: 'auto' }}>
                            <div style={{ display: 'flex', gap: 6 }}>
                              {mod.sessions.map((s, si) => (
                                <button
                                  key={s.id}
                                  onClick={() => setSessionIdx(si)}
                                  style={{
                                    border: 'none', cursor: 'pointer', borderRadius: 8,
                                    padding: '7px 14px', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
                                    background: sessionIdx === si ? '#16708f' : '#f4f7f8',
                                    color: sessionIdx === si ? '#fff' : '#6c7b83',
                                    transition: 'all .15s',
                                  }}
                                >
                                  Sesión {si + 1}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Session header */}
                        <div style={{ padding: '14px 20px 0' }}>
                          <div style={{ background: '#f4f7f8', borderRadius: 10, padding: '12px 16px', marginBottom: 14 }}>
                            <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1f2d33' }}>{session.title}</div>
                            <div style={{ fontSize: 12, color: '#6c7b83', marginTop: 2 }}>
                              <i className="fa-solid fa-user" style={{ marginRight: 5, color: '#16708f' }} />{session.docente}
                            </div>
                          </div>
                        </div>

                        {/* Classes */}
                        <div style={{ padding: '0 20px' }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: '#9aa7ad', letterSpacing: '.4px', marginBottom: 8 }}>
                            CLASES
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {session.classes.map((cls, ci) => {
                              const [icon, color] = TYPE_ICONS[cls.type] ?? ['fa-circle', '#999']
                              return (
                                <div key={ci} style={{
                                  display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                                  background: cls.completed ? '#f0faf2' : '#fff',
                                  border: `1px solid ${cls.completed ? '#d4edda' : '#eef1f3'}`,
                                  borderRadius: 10, cursor: 'pointer', transition: 'background .15s',
                                }}>
                                  <div style={{
                                    width: 30, height: 30, borderRadius: 8, flex: 'none',
                                    background: cls.completed ? '#36ad46' : '#f4f7f8',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  }}>
                                    {cls.completed
                                      ? <i className="fa-solid fa-check" style={{ color: '#fff', fontSize: 12 }} />
                                      : <i className={`fa-solid ${icon}`} style={{ color, fontSize: 13 }} />
                                    }
                                  </div>
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 13, fontWeight: 500, color: '#1f2d33' }}>{cls.title}</div>
                                    <div style={{ fontSize: 11, color: '#9aa7ad', marginTop: 1, textTransform: 'capitalize' }}>
                                      {cls.type === 'live' ? 'Clase en vivo' : cls.type}
                                    </div>
                                  </div>
                                  {cls.completed
                                    ? <span style={{ fontSize: 11, color: '#36ad46', fontWeight: 600, flex: 'none' }}>Visto</span>
                                    : <button style={{ background: '#16708f', color: '#fff', border: 'none', borderRadius: 7, padding: '5px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer', flex: 'none' }}>
                                      {cls.type === 'live' ? 'Unirse' : cls.type === 'examen' ? 'Rendir' : 'Ver'}
                                    </button>
                                  }
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        {/* Readings */}
                        {session.readings.length > 0 && (
                          <div style={{ padding: '14px 20px 0' }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: '#9aa7ad', letterSpacing: '.4px', marginBottom: 8 }}>
                              LECTURAS OBLIGATORIAS
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                              {session.readings.map((r, ri) => {
                                const [fileBg, fileColor] = FILE_COLORS[r.file] ?? ['#eef1f3', '#6c7b83']
                                return (
                                  <div key={ri} style={{
                                    display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                                    background: '#fff', border: '1px solid #eef1f3', borderRadius: 10,
                                  }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 7, background: fileBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 9, fontWeight: 800, color: fileColor }}>
                                      {r.file}
                                    </div>
                                    <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: '#1f2d33' }}>{r.title}</div>
                                    <button style={{ background: '#36ad46', color: '#fff', border: 'none', borderRadius: 7, padding: '5px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer', flex: 'none' }}>
                                      Ver Detalle
                                    </button>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        <div style={{ height: 18 }} />
                      </div>
                    </AccordionBody>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 0 }}>
          <Reveal delay={0.1} style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14, padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
            <div className="heading-font" style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, color: '#1f2d33' }}>
              <i className="fa-solid fa-bookmark" style={{ color: '#16708f', marginRight: 8 }} />Recursos del diploma
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {DIPLOMA_LINKS.map(link => (
                <button key={link.label} onClick={() => setActiveResource(link.label)} style={{ width: '100%', background: '#f4f7f8', border: '1px solid #e3e8eb', borderRadius: 9, padding: '10px 12px', fontSize: 12.5, fontWeight: 500, color: '#1f2d33', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left' }}>
                  <i className={`fa-solid ${link.icon}`} style={{ fontSize: 12, color: '#16708f' }} />{link.label}
                </button>
              ))}
            </div>
          </Reveal>

          {bio && (
            <Reveal delay={0.15} style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
              <img src={bio.photo} alt="" style={{ width: '100%', height: 160, objectFit: 'cover' }} />
              <div style={{ padding: '14px 16px' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1f2d33' }}>{course.instructor}</div>
                <div style={{ fontSize: 12, color: '#16708f', fontWeight: 600, marginTop: 2, marginBottom: 8 }}>Docente principal</div>
                <div style={{ fontSize: 12, color: '#6c7b83', lineHeight: 1.5 }}>{bio.bio.length > 150 ? bio.bio.slice(0, 150) + '…' : bio.bio}</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                  <i className="fa-brands fa-facebook" style={{ fontSize: 15, color: '#9aa7ad', cursor: 'pointer' }} />
                  <i className="fa-brands fa-youtube" style={{ fontSize: 15, color: '#9aa7ad', cursor: 'pointer' }} />
                  <i className="fa-brands fa-instagram" style={{ fontSize: 15, color: '#9aa7ad', cursor: 'pointer' }} />
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>

      <ResourceModals activeResource={activeResource} onClose={() => setActiveResource(null)} />
    </div>
  )
}

/* ─── Calendar ─── */
function CalendarView() {
  return (
    <Reveal>
      <div style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14, padding: '22px 24px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
        <div className="heading-font" style={{ fontWeight: 700, fontSize: 22, color: '#1f2d33', marginBottom: 6 }}>junio 2026</div>
        <div style={{ display: 'flex', gap: 14, marginBottom: 16, fontSize: 12 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#e0922f', display: 'inline-block' }} /> Taller ILPIIE gratis
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#36ad46', display: 'inline-block' }} /> Clases prácticas en vivo
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'].map(d => (
            <div key={d} style={{ padding: '8px 4px', textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#16708f', borderBottom: '2px solid #e3e8eb' }}>{d}</div>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const num = i >= 1 && i <= 30 ? i : null
            const hasEvent = num === 14 || num === 24 || num === 28
            return (
              <div key={i} style={{ padding: '8px 4px', minHeight: 70, borderBottom: '1px solid #eef1f3', borderRight: (i + 1) % 7 !== 0 ? '1px solid #eef1f3' : 'none', background: num === 21 ? '#e3f1f5' : 'transparent' }}>
                {num && (
                  <>
                    <div style={{ fontSize: 13, color: '#1f2d33', fontWeight: num === 21 ? 700 : 400, marginBottom: 4 }}>{num}</div>
                    {num === 14 && <div style={{ background: '#36ad46', color: '#fff', fontSize: 9, padding: '3px 5px', borderRadius: 4, lineHeight: 1.2 }}>Clase IOARR<br /><span style={{ opacity: 0.8 }}>REALIZADO</span></div>}
                    {num === 24 && <div style={{ background: '#36ad46', color: '#fff', fontSize: 9, padding: '3px 5px', borderRadius: 4, lineHeight: 1.2 }}>IOARR Taller<br /><span style={{ opacity: 0.8 }}>8:00 PM</span></div>}
                    {num === 28 && <div style={{ background: '#36ad46', color: '#fff', fontSize: 9, padding: '3px 5px', borderRadius: 4, lineHeight: 1.2 }}>Fichas Técnicas<br /><span style={{ opacity: 0.8 }}>7:00 PM</span></div>}
                  </>
                )}
              </div>
            )
          })}
        </div>
        <div style={{ marginTop: 20 }}>
          <div className="heading-font" style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>
            <i className="fa-solid fa-calendar-check" style={{ color: '#16708f', marginRight: 8 }} />Próximas clases
          </div>
          {TALLERES.map(t => (
            <div key={t.title} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', borderTop: '1px solid #eef1f3' }}>
              <div style={{ flex: 'none', textAlign: 'center', width: 50 }}>
                <div className="heading-font" style={{ fontWeight: 800, fontSize: 20, color: '#16708f', lineHeight: 1 }}>{t.day}</div>
                <div style={{ fontSize: 11, color: '#9aa7ad', textTransform: 'uppercase' }}>{t.mon}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#1f2d33' }}>{t.title}</div>
                <div style={{ fontSize: 12, color: '#6c7b83' }}><i className="fa-regular fa-clock" style={{ marginRight: 5 }} />{t.time} · {t.docente}</div>
              </div>
              <span style={{ flex: 'none', fontSize: 11, fontWeight: 700, color: t.stColor, background: t.stBg, padding: '5px 11px', borderRadius: 20 }}>{t.status}</span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

/* ─── Certificates ─── */
function CertificatesView() {
  return (
    <Reveal>
      <div style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14, padding: '22px 24px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <i className="fa-solid fa-certificate" style={{ color: '#16708f', fontSize: 18 }} />
          <div className="heading-font" style={{ fontWeight: 700, fontSize: 17 }}>Mis Certificados</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 150px 100px', padding: '10px 14px', background: '#f4f7f8', borderRadius: '8px 8px 0 0', fontSize: 12, fontWeight: 700, color: '#16708f' }}>
          <span>#</span><span>NOMBRE</span><span>FECHA</span><span style={{ textAlign: 'right' }}>DOCUMENTO</span>
        </div>
        {CERTIFICATES.length > 0 ? CERTIFICATES.map((cert, i) => (
          <div key={cert.id} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 150px 100px', padding: '14px', borderBottom: '1px solid #eef1f3', alignItems: 'center', fontSize: 13 }}>
            <span style={{ color: '#9aa7ad' }}>{i + 1}</span>
            <span style={{ fontWeight: 600, color: '#1f2d33' }}>{cert.name}</span>
            <span style={{ color: '#6c7b83' }}>{cert.date}</span>
            <span style={{ textAlign: 'right' }}>
              <button style={{ background: '#e3f1f5', color: '#16708f', border: 'none', borderRadius: 7, padding: '6px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                <i className="fa-solid fa-download" style={{ marginRight: 5 }} />PDF
              </button>
            </span>
          </div>
        )) : (
          <div style={{ padding: '30px 14px', textAlign: 'center', color: '#9aa7ad', fontSize: 14, background: '#f8fafb', borderRadius: '0 0 8px 8px' }}>No hay certificados disponibles aún</div>
        )}
      </div>
    </Reveal>
  )
}

/* ─── Books ─── */
function BooksView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Reveal>
        <div style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14, padding: '22px 24px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <i className="fa-solid fa-book" style={{ color: '#e0922f', fontSize: 16 }} />
            <div className="heading-font" style={{ fontWeight: 700, fontSize: 16 }}>Libros Digitales por Activar</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 120px 100px', padding: '10px 14px', background: '#f4f7f8', borderRadius: '8px 8px 0 0', fontSize: 12, fontWeight: 700, color: '#16708f' }}>
            <span>#</span><span>NOMBRE LIBRO</span><span>ESTADO</span><span style={{ textAlign: 'right' }}>ACTIVAR</span>
          </div>
          {DIGITAL_BOOKS.filter(b => !b.activated).length > 0
            ? DIGITAL_BOOKS.filter(b => !b.activated).map((book, i) => (
              <div key={book.id} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 120px 100px', padding: '14px', borderBottom: '1px solid #eef1f3', alignItems: 'center', fontSize: 13 }}>
                <span style={{ color: '#9aa7ad' }}>{i + 1}</span>
                <div><div style={{ fontWeight: 600, color: '#1f2d33' }}>{book.title}</div><div style={{ fontSize: 11, color: '#9aa7ad' }}>{book.author}</div></div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#e0922f' }}>Pendiente</span>
                <span style={{ textAlign: 'right' }}><button style={{ background: '#36ad46', color: '#fff', border: 'none', borderRadius: 7, padding: '6px 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Activar</button></span>
              </div>
            ))
            : <div style={{ padding: '20px 14px', textAlign: 'center', color: '#9aa7ad', fontSize: 13 }}>No hay libros por activar</div>
          }
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14, padding: '22px 24px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <i className="fa-solid fa-book-open" style={{ color: '#36ad46', fontSize: 16 }} />
            <div className="heading-font" style={{ fontWeight: 700, fontSize: 16 }}>Libros Digitales Activados</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 120px 100px', padding: '10px 14px', background: '#f4f7f8', borderRadius: '8px 8px 0 0', fontSize: 12, fontWeight: 700, color: '#16708f' }}>
            <span>#</span><span>NOMBRE LIBRO</span><span>ESTADO</span><span style={{ textAlign: 'right' }}>DOCUMENTO</span>
          </div>
          {DIGITAL_BOOKS.filter(b => b.activated).map((book, i) => (
            <div key={book.id} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 120px 100px', padding: '14px', borderBottom: '1px solid #eef1f3', alignItems: 'center', fontSize: 13 }}>
              <span style={{ color: '#9aa7ad' }}>{i + 1}</span>
              <div><div style={{ fontWeight: 600, color: '#1f2d33' }}>{book.title}</div><div style={{ fontSize: 11, color: '#9aa7ad' }}>{book.author}</div></div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#2e9a3d' }}><i className="fa-solid fa-circle-check" style={{ marginRight: 4 }} />Activo</span>
              <span style={{ textAlign: 'right' }}><button style={{ background: '#e3f1f5', color: '#16708f', border: 'none', borderRadius: 7, padding: '6px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}><i className="fa-solid fa-download" style={{ marginRight: 5 }} />{book.format}</button></span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  )
}
