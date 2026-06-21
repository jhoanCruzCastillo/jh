import { useState } from 'react'
import { COURSES, CERTIFICATES, DIGITAL_BOOKS, COURSE_TABS, INSTRUCTOR_AVATARS } from '@/core/data/courses'
import { TALLERES } from '@/core/data/plans'
import { ProgressBar } from '../components/ProgressBar'
import { Reveal } from '../components/Reveal'
import { SliderTabs } from '../components/SliderTabs'

const STATUS_STYLES: Record<string, [string, string]> = {
  en_curso: ['#2e9a3d', '#e6f5e9'],
  completado: ['#16708f', '#e3f1f5'],
  por_iniciar: ['#e0922f', '#fff4e6'],
}

const MODULE_ICONS: Record<string, string> = {
  video: 'fa-play-circle',
  live: 'fa-video',
  exercise: 'fa-pen-ruler',
  exam: 'fa-clipboard-check',
}

export function Courses() {
  const [tab, setTab] = useState('cursos')
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      {/* Tabs */}
      <Reveal style={{ marginBottom: 22, width: 'fit-content' }}>
        <SliderTabs
          tabs={COURSE_TABS.map(t => ({ key: t.key, label: t.label, icon: t.icon }))}
          active={tab}
          onSelect={setTab}
          layoutId="course-tabs"
        />
      </Reveal>

      {/* Mis Cursos */}
      {tab === 'cursos' && (
        <>
          <Reveal delay={0.05} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {COURSES.map(course => {
              const [stColor, stBg] = STATUS_STYLES[course.status] ?? ['#6c7b83', '#eef1f3']
              const completedModules = course.modules.filter(m => m.completed).length

              return (
                <div
                  key={course.id}
                  onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                  style={{
                    background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14,
                    overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,.04)', cursor: 'pointer',
                    transition: 'transform .15s, box-shadow .15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,.04)' }}
                >
                  {/* Card image */}
                  <div style={{
                    height: 150,
                    backgroundImage: `linear-gradient(180deg, rgba(15,93,120,.25) 0%, rgba(15,93,120,.85) 100%), url(${course.image})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                    padding: '14px 16px', position: 'relative',
                  }}>
                    <div style={{ position: 'absolute', top: 12, right: 12, background: stBg, color: stColor, fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 14, letterSpacing: '.3px' }}>
                      {course.statusLabel}
                    </div>
                    <div style={{ position: 'absolute', top: 12, left: 16, display: 'flex', alignItems: 'center', gap: 5 }}>
                      <i className="fa-solid fa-users" style={{ color: 'rgba(255,255,255,.7)', fontSize: 10 }} />
                      <span style={{ color: 'rgba(255,255,255,.8)', fontSize: 11, fontWeight: 600 }}>{course.students}</span>
                    </div>
                    <div style={{ fontSize: 9, color: '#bfe6d4', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.8px' }}>
                      Diploma de Especialización
                    </div>
                    <div style={{ fontSize: 13, color: '#fff', fontWeight: 700, lineHeight: 1.25, marginTop: 4 }}>
                      {course.title.length > 70 ? course.title.slice(0, 70) + '…' : course.title}
                    </div>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '16px 16px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <img
                        src={INSTRUCTOR_AVATARS[course.instructor] ?? ''}
                        alt={course.instructor}
                        style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: '#1f2d33' }}>{course.instructor}</div>
                        <div style={{ fontSize: 10.5, color: '#9aa7ad' }}>{course.instructorEmail}</div>
                      </div>
                    </div>

                    <div style={{ fontSize: 11.5, color: '#6c7b83', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <i className="fa-regular fa-calendar" style={{ color: '#e0922f', fontSize: 11 }} />
                      {course.duration}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                      <div style={{ flex: 1 }}>
                        <ProgressBar
                          percent={course.progress}
                          height={7}
                          gradient={course.progress === 100 ? '#36ad46' : 'linear-gradient(90deg,#16708f,#36ad46)'}
                        />
                      </div>
                      <span className="heading-font" style={{ fontSize: 14, fontWeight: 800, color: '#16708f' }}>{course.progress}%</span>
                    </div>
                    <div style={{ fontSize: 11, color: '#9aa7ad' }}>
                      {completedModules} de {course.modules.length} módulos
                    </div>
                  </div>

                  {/* Card footer */}
                  <div style={{
                    padding: '10px 16px', borderTop: '1px solid #eef1f3', background: '#f8fafb',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6,
                    fontSize: 12, fontWeight: 600, color: '#16708f',
                  }}>
                    <i className={`fa-solid ${expandedCourse === course.id ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ fontSize: 9 }} />
                    {course.status === 'en_curso' ? 'Continuar curso' : course.status === 'completado' ? 'Ver contenido' : 'Ver programa'}
                  </div>
                </div>
              )
            })}
          </Reveal>

          {/* Expanded course detail */}
          {expandedCourse && (() => {
            const course = COURSES.find(c => c.id === expandedCourse)
            if (!course) return null
            return (
              <Reveal key={expandedCourse} style={{ marginTop: 18 }}>
                <div style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14, padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div>
                      <div className="heading-font" style={{ fontWeight: 700, fontSize: 16, color: '#1f2d33' }}>{course.title}</div>
                      <div style={{ fontSize: 12, color: '#6c7b83', marginTop: 2 }}>
                        <i className="fa-solid fa-user-tie" style={{ marginRight: 6, color: '#16708f' }} />
                        {course.instructor} · {course.modules.length} módulos
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedCourse(null)}
                      style={{ background: '#f4f7f8', border: '1px solid #e3e8eb', borderRadius: 8, width: 34, height: 34, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <i className="fa-solid fa-xmark" style={{ color: '#6c7b83' }} />
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {course.modules.map((mod, mi) => (
                      <div
                        key={mi}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 11, padding: '11px 14px',
                          background: mod.completed ? '#f0faf2' : '#f8fafb', borderRadius: 10,
                          border: `1px solid ${mod.completed ? '#d4edda' : '#e3e8eb'}`,
                        }}
                      >
                        <div style={{
                          width: 32, height: 32, borderRadius: 9,
                          background: mod.completed ? '#e6f5e9' : '#eef1f3',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none',
                        }}>
                          {mod.completed
                            ? <i className="fa-solid fa-circle-check" style={{ color: '#36ad46', fontSize: 15 }} />
                            : <i className={`fa-solid ${MODULE_ICONS[mod.type]}`} style={{ color: '#9aa7ad', fontSize: 14 }} />
                          }
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#1f2d33', lineHeight: 1.2 }}>{mod.title}</div>
                          <div style={{ fontSize: 11, color: '#9aa7ad', marginTop: 2 }}>
                            {mod.type === 'live' ? 'Clase en vivo' : mod.type === 'video' ? 'Video' : mod.type === 'exercise' ? 'Ejercicio práctico' : 'Evaluación'} · {mod.duration}
                          </div>
                        </div>
                        {!mod.completed && mod.type !== 'exam' && (
                          <button style={{
                            background: '#16708f', color: '#fff', border: 'none', flex: 'none',
                            borderRadius: 7, padding: '6px 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                          }}>
                            {mod.type === 'live' ? 'Unirse' : 'Iniciar'}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })()}
        </>
      )}

      {/* Calendario */}
      {tab === 'calendario' && (
        <Reveal>
          <div style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14, padding: '22px 24px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
              <div className="heading-font" style={{ fontWeight: 700, fontSize: 22, color: '#1f2d33' }}>junio 2026</div>
            </div>
            <div style={{ display: 'flex', gap: 14, marginBottom: 16, fontSize: 12 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#e0922f', display: 'inline-block' }} /> Taller ILPIIE gratis (Complemento)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#36ad46', display: 'inline-block' }} /> Clases prácticas en vivo
              </span>
            </div>

            {/* Calendar grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0 }}>
              {['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'].map(d => (
                <div key={d} style={{ padding: '8px 4px', textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#16708f', borderBottom: '2px solid #e3e8eb' }}>
                  {d}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 0
                const num = day >= 1 && day <= 30 ? day : null
                const hasEvent = num === 14 || num === 24 || num === 28
                return (
                  <div
                    key={i}
                    style={{
                      padding: '8px 4px', minHeight: 70, borderBottom: '1px solid #eef1f3',
                      borderRight: (i + 1) % 7 !== 0 ? '1px solid #eef1f3' : 'none',
                      background: num === 21 ? '#e3f1f5' : 'transparent',
                    }}
                  >
                    {num && (
                      <>
                        <div style={{ fontSize: 13, color: '#1f2d33', fontWeight: num === 21 ? 700 : 400, marginBottom: 4 }}>{num}</div>
                        {num === 14 && (
                          <div style={{ background: '#36ad46', color: '#fff', fontSize: 9, padding: '3px 5px', borderRadius: 4, lineHeight: 1.2 }}>
                            Clase en vivo 4 — IOARR
                            <br /><span style={{ opacity: 0.8 }}>REALIZADO</span>
                          </div>
                        )}
                        {num === 24 && (
                          <div style={{ background: '#36ad46', color: '#fff', fontSize: 9, padding: '3px 5px', borderRadius: 4, lineHeight: 1.2 }}>
                            Clase IOARR — Taller
                            <br /><span style={{ opacity: 0.8 }}>8:00 PM</span>
                          </div>
                        )}
                        {num === 28 && (
                          <div style={{ background: '#36ad46', color: '#fff', fontSize: 9, padding: '3px 5px', borderRadius: 4, lineHeight: 1.2 }}>
                            Fichas Técnicas
                            <br /><span style={{ opacity: 0.8 }}>7:00 PM</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Upcoming events */}
            <div style={{ marginTop: 20 }}>
              <div className="heading-font" style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>
                <i className="fa-solid fa-calendar-check" style={{ color: '#16708f', marginRight: 8 }} />
                Próximas clases
              </div>
              {TALLERES.map(t => (
                <div key={t.title} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', borderTop: '1px solid #eef1f3' }}>
                  <div style={{ flex: 'none', textAlign: 'center', width: 50 }}>
                    <div className="heading-font" style={{ fontWeight: 800, fontSize: 20, color: '#16708f', lineHeight: 1 }}>{t.day}</div>
                    <div style={{ fontSize: 11, color: '#9aa7ad', textTransform: 'uppercase' }}>{t.mon}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#1f2d33' }}>{t.title}</div>
                    <div style={{ fontSize: 12, color: '#6c7b83' }}>
                      <i className="fa-regular fa-clock" style={{ marginRight: 5 }} />{t.time} · {t.docente}
                    </div>
                  </div>
                  <span style={{ flex: 'none', fontSize: 11, fontWeight: 700, color: t.stColor, background: t.stBg, padding: '5px 11px', borderRadius: 20 }}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* Certificados */}
      {tab === 'certificados' && (
        <Reveal>
          <div style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14, padding: '22px 24px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <i className="fa-solid fa-certificate" style={{ color: '#16708f', fontSize: 18 }} />
              <div className="heading-font" style={{ fontWeight: 700, fontSize: 17 }}>Mis Certificados</div>
            </div>

            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 150px 100px', padding: '10px 14px', background: '#f4f7f8', borderRadius: '8px 8px 0 0', fontSize: 12, fontWeight: 700, color: '#16708f' }}>
              <span>#</span>
              <span>NOMBRE</span>
              <span>FECHA</span>
              <span style={{ textAlign: 'right' }}>DOCUMENTO</span>
            </div>

            {CERTIFICATES.length > 0 ? CERTIFICATES.map((cert, i) => (
              <div key={cert.id} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 150px 100px', padding: '14px', borderBottom: '1px solid #eef1f3', alignItems: 'center', fontSize: 13 }}>
                <span style={{ color: '#9aa7ad' }}>{i + 1}</span>
                <span style={{ fontWeight: 600, color: '#1f2d33' }}>{cert.name}</span>
                <span style={{ color: '#6c7b83' }}>{cert.date}</span>
                <span style={{ textAlign: 'right' }}>
                  <button style={{
                    background: '#e3f1f5', color: '#16708f', border: 'none', borderRadius: 7,
                    padding: '6px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                  }}>
                    <i className="fa-solid fa-download" style={{ marginRight: 5 }} />PDF
                  </button>
                </span>
              </div>
            )) : (
              <div style={{ padding: '30px 14px', textAlign: 'center', color: '#9aa7ad', fontSize: 14, background: '#f8fafb', borderRadius: '0 0 8px 8px' }}>
                No hay certificados disponibles aún
              </div>
            )}
          </div>
        </Reveal>
      )}

      {/* Libros Digitales */}
      {tab === 'libros' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Por activar */}
          <Reveal>
            <div style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14, padding: '22px 24px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <i className="fa-solid fa-book" style={{ color: '#e0922f', fontSize: 16 }} />
                <div className="heading-font" style={{ fontWeight: 700, fontSize: 16 }}>Libros Digitales por Activar</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 120px 100px', padding: '10px 14px', background: '#f4f7f8', borderRadius: '8px 8px 0 0', fontSize: 12, fontWeight: 700, color: '#16708f' }}>
                <span>#</span>
                <span>NOMBRE LIBRO</span>
                <span>ESTADO</span>
                <span style={{ textAlign: 'right' }}>ACTIVAR</span>
              </div>
              {DIGITAL_BOOKS.filter(b => !b.activated).length > 0
                ? DIGITAL_BOOKS.filter(b => !b.activated).map((book, i) => (
                  <div key={book.id} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 120px 100px', padding: '14px', borderBottom: '1px solid #eef1f3', alignItems: 'center', fontSize: 13 }}>
                    <span style={{ color: '#9aa7ad' }}>{i + 1}</span>
                    <div>
                      <div style={{ fontWeight: 600, color: '#1f2d33' }}>{book.title}</div>
                      <div style={{ fontSize: 11, color: '#9aa7ad' }}>{book.author}</div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#e0922f' }}>Pendiente</span>
                    <span style={{ textAlign: 'right' }}>
                      <button style={{
                        background: '#36ad46', color: '#fff', border: 'none', borderRadius: 7,
                        padding: '6px 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                      }}>
                        Activar
                      </button>
                    </span>
                  </div>
                ))
                : <div style={{ padding: '20px 14px', textAlign: 'center', color: '#9aa7ad', fontSize: 13 }}>No hay libros por activar</div>
              }
            </div>
          </Reveal>

          {/* Activados */}
          <Reveal delay={0.1}>
            <div style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14, padding: '22px 24px', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <i className="fa-solid fa-book-open" style={{ color: '#36ad46', fontSize: 16 }} />
                <div className="heading-font" style={{ fontWeight: 700, fontSize: 16 }}>Libros Digitales Activados</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 120px 100px', padding: '10px 14px', background: '#f4f7f8', borderRadius: '8px 8px 0 0', fontSize: 12, fontWeight: 700, color: '#16708f' }}>
                <span>#</span>
                <span>NOMBRE LIBRO</span>
                <span>ESTADO</span>
                <span style={{ textAlign: 'right' }}>DOCUMENTO</span>
              </div>
              {DIGITAL_BOOKS.filter(b => b.activated).map((book, i) => (
                <div key={book.id} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 120px 100px', padding: '14px', borderBottom: '1px solid #eef1f3', alignItems: 'center', fontSize: 13 }}>
                  <span style={{ color: '#9aa7ad' }}>{i + 1}</span>
                  <div>
                    <div style={{ fontWeight: 600, color: '#1f2d33' }}>{book.title}</div>
                    <div style={{ fontSize: 11, color: '#9aa7ad' }}>{book.author}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#2e9a3d' }}>
                    <i className="fa-solid fa-circle-check" style={{ marginRight: 4 }} />Activo
                  </span>
                  <span style={{ textAlign: 'right' }}>
                    <button style={{
                      background: '#e3f1f5', color: '#16708f', border: 'none', borderRadius: 7,
                      padding: '6px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                    }}>
                      <i className="fa-solid fa-download" style={{ marginRight: 5 }} />{book.format}
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      )}
    </div>
  )
}
