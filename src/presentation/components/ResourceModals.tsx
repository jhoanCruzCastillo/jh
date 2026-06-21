import { useState } from 'react'
import { Modal } from './Modal'
import { AccordionBody } from './Accordion'

interface Props {
  activeResource: string | null
  onClose: () => void
}

const SOCIAL_GROUPS = [
  {
    name: 'YouTube',
    icon: 'fa-youtube',
    brand: true,
    color: '#FF0000',
    bg: '#FFF0F0',
    desc: 'Canal oficial con clases grabadas, tutoriales y material complementario.',
    cta: 'Suscribirse',
    members: '12.4K suscriptores',
  },
  {
    name: 'Facebook',
    icon: 'fa-facebook',
    brand: true,
    color: '#1877F2',
    bg: '#EFF4FF',
    desc: 'Grupo privado para compartir experiencias, consultas y networking entre alumnos.',
    cta: 'Unirse al grupo',
    members: '3.8K miembros',
  },
  {
    name: 'LinkedIn',
    icon: 'fa-linkedin',
    brand: true,
    color: '#0A66C2',
    bg: '#EEF5FF',
    desc: 'Red profesional para conectar con egresados, docentes y oportunidades laborales.',
    cta: 'Conectar',
    members: '1.2K profesionales',
  },
  {
    name: 'WhatsApp',
    icon: 'fa-whatsapp',
    brand: true,
    color: '#25D366',
    bg: '#EEFBF3',
    desc: 'Grupo de coordinación para avisos, clases en vivo y soporte directo.',
    cta: 'Unirse al chat',
    members: '99 participantes',
  },
]

const REGLAMENTO_ITEMS = [
  { icon: 'fa-calendar-check', title: 'Asistencia', desc: 'Se requiere un mínimo de 80% de asistencia a las sesiones en vivo para obtener el certificado.' },
  { icon: 'fa-clipboard-check', title: 'Evaluaciones', desc: 'Las evaluaciones parciales y finales son obligatorias. La nota mínima aprobatoria es 14/20.' },
  { icon: 'fa-clock', title: 'Horarios', desc: 'Las clases en vivo se realizan de Lunes a Viernes de 8:00 PM a 10:00 PM (hora Perú).' },
  { icon: 'fa-certificate', title: 'Certificación', desc: 'Al aprobar todos los módulos se otorga un certificado digital avalado por Growth Corporation e ILPIIE.' },
  { icon: 'fa-triangle-exclamation', title: 'Conducta', desc: 'Se espera respeto y profesionalismo en las interacciones. El plagio es motivo de expulsión.' },
]

interface CronoSession {
  title: string
  modalidad: string
  tipo: 'grabada' | 'vivo' | 'examen' | 'taller'
  docente?: string
  fecha?: string
  estado?: string
}

interface CronoModule {
  num: string
  title: string
  inicio: string
  fin: string
  estado: string
  sessions: CronoSession[]
}

const CRONOGRAMA: CronoModule[] = [
  {
    num: '01', title: 'Normativa del Invierte.pe', inicio: '19/04/2026', fin: '10/05/2026', estado: 'Completado',
    sessions: [
      { title: 'Examen de conocimientos', modalidad: 'Plataforma Virtual', tipo: 'examen' },
      { title: 'Sesión 01: Normativa del Invierte.pe', modalidad: 'Plataforma Virtual', tipo: 'grabada' },
      { title: 'Sesión 02: Directiva 01 2019-EF/63.01', modalidad: 'Plataforma Virtual', tipo: 'grabada' },
      { title: 'Clase en vivo 1 — Normativa', modalidad: 'Clase Grabada', tipo: 'vivo', docente: 'Herrera Jara José Audar', fecha: 'Domingo 17-05-2026 / 20:00 a 22:00', estado: 'CONFIRMADO' },
    ],
  },
  {
    num: '02', title: 'TDR para Consultoría en General y de Obras', inicio: '12/05/2026', fin: '31/05/2026', estado: 'Completado',
    sessions: [
      { title: 'Casos Prácticos', modalidad: 'Plataforma Virtual', tipo: 'grabada' },
      { title: 'Examen', modalidad: 'Plataforma Virtual', tipo: 'examen' },
      { title: 'Sesión 03: TDR según Ley de Contrataciones', modalidad: 'Plataforma Virtual', tipo: 'grabada' },
      { title: 'Clase en vivo 2 — TDR', modalidad: 'Clase Grabada', tipo: 'vivo', docente: 'Herrera Jara José Audar', fecha: 'Domingo 31-05-2026 / 20:00 a 22:00', estado: 'CONFIRMADO' },
    ],
  },
  {
    num: '03', title: 'Preparación de la Cartera de Inversiones para el PMI', inicio: '02/06/2026', fin: '21/06/2026', estado: 'En curso',
    sessions: [
      { title: 'Sesión 06: Fase de Programación Multianual', modalidad: 'Plataforma Virtual', tipo: 'grabada' },
      { title: 'Video 1: Marco Normativo de la PMI', modalidad: 'Plataforma Virtual', tipo: 'grabada' },
      { title: 'Video 2: Etapas de la Programación', modalidad: 'Plataforma Virtual', tipo: 'grabada' },
      { title: 'Video 3: Criterios para la PMI', modalidad: 'Plataforma Virtual', tipo: 'grabada' },
      { title: 'Clase en vivo 3 — PMI', modalidad: 'Virtual', tipo: 'vivo', docente: 'Herrera Jara José Audar', fecha: 'Domingo 21-06-2026 / 20:00 a 22:00', estado: 'POR REALIZAR' },
    ],
  },
  {
    num: '04', title: 'Identificación de Activos Estratégicos', inicio: '23/06/2026', fin: '05/07/2026', estado: 'Pendiente',
    sessions: [
      { title: 'Sesión 07: Clasificación de activos', modalidad: 'Plataforma Virtual', tipo: 'grabada' },
      { title: 'Clase en vivo 4 — IOARR Taller práctico', modalidad: 'Virtual', tipo: 'vivo', docente: 'Herrera Jara José Audar', fecha: 'Domingo 05-07-2026 / 20:00 a 22:00', estado: 'POR REALIZAR' },
    ],
  },
  {
    num: '05', title: 'Inversiones IOARR', inicio: '07/07/2026', fin: '19/07/2026', estado: 'Pendiente',
    sessions: [
      { title: 'Sesión 08: Conceptos IOARR', modalidad: 'Plataforma Virtual', tipo: 'grabada' },
      { title: 'Taller IOARR', modalidad: 'Plataforma Virtual', tipo: 'taller' },
    ],
  },
  {
    num: '06', title: 'Elaboración de Fichas Técnicas', inicio: '21/07/2026', fin: '02/08/2026', estado: 'Pendiente',
    sessions: [
      { title: 'Sesión 09: Ficha Técnica Estándar', modalidad: 'Plataforma Virtual', tipo: 'grabada' },
      { title: 'Clase en vivo 5 — Fichas Técnicas', modalidad: 'Virtual', tipo: 'vivo', docente: 'Rivas Warthon Eduardo', fecha: 'Domingo 02-08-2026 / 20:00 a 22:00', estado: 'POR REALIZAR' },
    ],
  },
  {
    num: '07', title: 'Perfiles de Inversión', inicio: '04/08/2026', fin: '16/08/2026', estado: 'Pendiente',
    sessions: [
      { title: 'Sesión 10: Estructura del perfil', modalidad: 'Plataforma Virtual', tipo: 'grabada' },
    ],
  },
  {
    num: '08', title: 'Formatos y Registros', inicio: '18/08/2026', fin: '23/08/2026', estado: 'Pendiente',
    sessions: [
      { title: 'Sesión 11: Registros en el Banco de Inversiones', modalidad: 'Plataforma Virtual', tipo: 'grabada' },
    ],
  },
  {
    num: '09', title: 'Expedientes Técnicos', inicio: '25/08/2026', fin: '30/08/2026', estado: 'Pendiente',
    sessions: [
      { title: 'Sesión 12: Estructura del expediente', modalidad: 'Plataforma Virtual', tipo: 'grabada' },
      { title: 'Taller: Expediente completo', modalidad: 'Plataforma Virtual', tipo: 'taller' },
      { title: 'Examen final', modalidad: 'Plataforma Virtual', tipo: 'examen' },
    ],
  },
]

const ESTADO_COLORS: Record<string, [string, string]> = {
  Completado: ['#2e9a3d', '#e6f5e9'],
  'En curso': ['#16708f', '#e3f1f5'],
  Pendiente: ['#9aa7ad', '#f4f7f8'],
  CONFIRMADO: ['#2e9a3d', '#e6f5e9'],
  'POR REALIZAR': ['#0f5d78', '#e3f1f5'],
}

const TIPO_ICONS: Record<string, [string, string]> = {
  grabada: ['fa-play-circle', '#16708f'],
  vivo: ['fa-video', '#e0922f'],
  examen: ['fa-clipboard-check', '#c0392b'],
  taller: ['fa-pen-ruler', '#2c93a8'],
}

export function ResourceModals({ activeResource, onClose }: Props) {
  const [openCronoModule, setOpenCronoModule] = useState<string | null>(null)
  const [cronoFilter, setCronoFilter] = useState<string>('Todos')

  return (
    <>
      {/* Grupos Privados */}
      <Modal open={activeResource === 'Grupos Privados: NET'} onClose={onClose} title="Grupos Privados" icon="fa-users" width={640}>
        <div style={{ fontSize: 13.5, color: '#6c7b83', marginBottom: 18, lineHeight: 1.5 }}>
          Únete a nuestras comunidades para estar conectado con docentes y compañeros.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {SOCIAL_GROUPS.map(g => (
            <div
              key={g.name}
              style={{
                background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14,
                padding: '20px 18px', transition: 'all .15s', cursor: 'pointer',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,.07)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: g.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <i className={`fa-brands ${g.icon}`} style={{ color: g.color, fontSize: 22 }} />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1f2d33' }}>{g.name}</div>
                  <div style={{ fontSize: 11, color: '#9aa7ad' }}>{g.members}</div>
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: '#6c7b83', lineHeight: 1.45, marginBottom: 14 }}>
                {g.desc}
              </div>
              <button style={{
                width: '100%', background: g.color, color: '#fff', border: 'none',
                borderRadius: 10, padding: '10px', fontSize: 13, fontWeight: 700,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <i className={`fa-brands ${g.icon}`} style={{ fontSize: 14 }} />
                {g.cta}
              </button>
            </div>
          ))}
        </div>
      </Modal>

      {/* Reglamento Académico */}
      <Modal open={activeResource === 'Reglamento Académico'} onClose={onClose} title="Reglamento Académico" icon="fa-file-shield">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {REGLAMENTO_ITEMS.map(r => (
            <div key={r.title} style={{ display: 'flex', gap: 14, padding: '14px 16px', background: '#f8fafb', borderRadius: 12, border: '1px solid #eef1f3' }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, background: '#e3f1f5', flex: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className={`fa-solid ${r.icon}`} style={{ color: '#16708f', fontSize: 16 }} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1f2d33', marginBottom: 3 }}>{r.title}</div>
                <div style={{ fontSize: 13, color: '#6c7b83', lineHeight: 1.5 }}>{r.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Video Navegación */}
      <Modal open={activeResource === 'Video Navegación Plataforma'} onClose={onClose} title="Navegación de la Plataforma" icon="fa-circle-play" width={700}>
        <div style={{
          background: '#111827', borderRadius: 14, minHeight: 340,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden', cursor: 'pointer',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%', border: '3px solid rgba(255,255,255,.2)',
              background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', margin: '0 auto 14px',
            }}>
              <i className="fa-solid fa-play" style={{ fontSize: 26, color: '#7fe0a0', marginLeft: 4 }} />
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>Cómo navegar la plataforma</div>
            <div style={{ fontSize: 13, color: '#7fb9c7', marginTop: 4 }}>Duración: 4:32 min</div>
          </div>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 44,
            background: 'rgba(0,0,0,.5)', display: 'flex', alignItems: 'center',
            padding: '0 18px', gap: 14,
          }}>
            <i className="fa-solid fa-play" style={{ color: '#fff', fontSize: 12 }} />
            <span style={{ color: '#fff', fontSize: 12 }}>0:00 / 4:32</span>
            <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,.2)', borderRadius: 2 }}>
              <div style={{ width: '0%', height: '100%', background: '#7fe0a0', borderRadius: 2 }} />
            </div>
            <i className="fa-solid fa-volume-high" style={{ color: '#fff', fontSize: 12 }} />
            <i className="fa-solid fa-expand" style={{ color: '#fff', fontSize: 12 }} />
          </div>
        </div>
        <div style={{ marginTop: 16, fontSize: 13.5, color: '#6c7b83', lineHeight: 1.55 }}>
          Este video te guiará por las principales funciones de la plataforma: cómo acceder a módulos, enviar tareas, participar en clases en vivo y descargar recursos.
        </div>
      </Modal>

      {/* Cronograma Académico */}
      <Modal open={activeResource === 'Cronograma Académico'} onClose={() => { onClose(); setOpenCronoModule(null) }} title="Cronograma Académico" icon="fa-calendar-days" width={860}>
        {/* Header info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#1f2d33' }}>Semestre 2026</div>
            <div style={{ fontSize: 12.5, color: '#9aa7ad', marginTop: 2 }}>
              <i className="fa-solid fa-calendar" style={{ marginRight: 5 }} />Inicio: 19/04/2026 · Fin: 30/08/2026
            </div>
          </div>
          {/* Filter */}
          <div style={{ display: 'flex', gap: 4, background: '#f4f7f8', padding: 3, borderRadius: 9 }}>
            {['Todos', 'Clases en Vivo', 'Exámenes'].map(f => (
              <button key={f} onClick={() => setCronoFilter(f)} style={{
                border: 'none', cursor: 'pointer', borderRadius: 7, padding: '6px 12px',
                fontSize: 11.5, fontWeight: 600,
                background: cronoFilter === f ? '#16708f' : 'transparent',
                color: cronoFilter === f ? '#fff' : '#6c7b83',
              }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 16, fontSize: 11.5, color: '#6c7b83' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><i className="fa-solid fa-play-circle" style={{ color: '#16708f' }} /> Clase Grabada</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><i className="fa-solid fa-video" style={{ color: '#e0922f' }} /> Clase en Vivo</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><i className="fa-solid fa-clipboard-check" style={{ color: '#c0392b' }} /> Examen</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><i className="fa-solid fa-pen-ruler" style={{ color: '#2c93a8' }} /> Taller</span>
        </div>

        {/* Modules accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {CRONOGRAMA.map(mod => {
            const [eColor, eBg] = ESTADO_COLORS[mod.estado] ?? ['#9aa7ad', '#f4f7f8']
            const isOpen = openCronoModule === mod.num
            const filteredSessions = mod.sessions.filter(s => {
              if (cronoFilter === 'Todos') return true
              if (cronoFilter === 'Clases en Vivo') return s.tipo === 'vivo'
              if (cronoFilter === 'Exámenes') return s.tipo === 'examen'
              return true
            })

            return (
              <div key={mod.num} style={{
                border: `1px solid ${isOpen ? '#16708f' : '#e3e8eb'}`,
                borderRadius: 12, overflow: 'hidden', transition: 'border-color .2s',
                boxShadow: isOpen ? '0 2px 8px rgba(22,112,143,.08)' : 'none',
              }}>
                {/* Module header */}
                <button onClick={() => setOpenCronoModule(isOpen ? null : mod.num)} style={{
                  width: '100%', background: isOpen ? '#f0f9ff' : '#fff', border: 'none',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 18px', textAlign: 'left',
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 9, flex: 'none',
                    background: mod.estado === 'Completado' ? '#e6f5e9' : '#e3f1f5',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 800, color: mod.estado === 'Completado' ? '#2e9a3d' : '#16708f',
                  }}>
                    {mod.estado === 'Completado' ? <i className="fa-solid fa-check" style={{ fontSize: 14 }} /> : mod.num}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1f2d33' }}>Módulo {mod.num}: {mod.title}</div>
                    <div style={{ fontSize: 11.5, color: '#9aa7ad', marginTop: 2 }}>
                      {mod.inicio} — {mod.fin} · {mod.sessions.length} actividades
                    </div>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: eColor, background: eBg, padding: '3px 9px', borderRadius: 10, flex: 'none' }}>
                    {mod.estado}
                  </span>
                  <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`} style={{ color: '#9aa7ad', fontSize: 11, flex: 'none' }} />
                </button>

                {/* Sessions table */}
                <AccordionBody open={isOpen}>
                  <div style={{ borderTop: '1px solid #eef1f3' }}>
                    {filteredSessions.length > 0 ? (
                      <>
                    {/* Table header */}
                    <div style={{
                      display: 'grid', gridTemplateColumns: '1fr 150px 130px',
                      padding: '8px 18px', background: '#f4f7f8', fontSize: 10.5,
                      fontWeight: 700, color: '#16708f', letterSpacing: '.3px',
                    }}>
                      <span>MALLA CURRICULAR</span>
                      <span>MODALIDAD</span>
                      <span style={{ textAlign: 'right' }}>DOCENTE</span>
                    </div>

                    {filteredSessions.map((s, si) => {
                      const [tIcon, tColor] = TIPO_ICONS[s.tipo] ?? ['fa-circle', '#999']
                      const isLive = s.tipo === 'vivo'
                      const [sColor, sBg] = s.estado ? (ESTADO_COLORS[s.estado] ?? ['#9aa7ad', '#f4f7f8']) : ['', '']

                      return (
                        <div key={si} style={{
                          borderTop: si > 0 ? '1px solid #f4f7f8' : 'none',
                          background: isLive ? '#fffcf5' : '#fff',
                        }}>
                          <div style={{
                            display: 'grid', gridTemplateColumns: '1fr 150px 130px',
                            padding: '12px 18px', alignItems: 'center', fontSize: 13,
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <i className={`fa-solid ${tIcon}`} style={{ color: tColor, fontSize: 14, flex: 'none' }} />
                              <span style={{ color: '#1f2d33', fontWeight: isLive ? 600 : 400 }}>{s.title}</span>
                              {s.estado && (
                                <span style={{ fontSize: 9.5, fontWeight: 700, color: sColor, background: sBg, padding: '2px 8px', borderRadius: 10, flex: 'none' }}>
                                  {s.estado}
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: 12, color: '#6c7b83' }}>
                              {s.modalidad}
                            </div>
                            <div style={{ fontSize: 12, color: '#46555c', textAlign: 'right', fontWeight: isLive ? 600 : 400 }}>
                              {s.docente ?? '—'}
                            </div>
                          </div>
                          {isLive && s.fecha && (
                            <div style={{ padding: '0 18px 10px 42px', fontSize: 11.5, color: '#e0922f', fontWeight: 600 }}>
                              <i className="fa-regular fa-calendar" style={{ marginRight: 5 }} />{s.fecha}
                            </div>
                          )}
                        </div>
                      )
                    })}

                      </>
                    ) : (
                      <div style={{ padding: '16px 18px', fontSize: 13, color: '#9aa7ad', textAlign: 'center' }}>
                        No hay actividades de este tipo en este módulo.
                      </div>
                    )}
                  </div>
                </AccordionBody>
              </div>
            )
          })}
        </div>
      </Modal>
    </>
  )
}
