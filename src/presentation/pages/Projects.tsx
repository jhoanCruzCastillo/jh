import { useState, useMemo } from 'react'
import { useAppState, useAppDispatch } from '@/app/AppContext'
import { loadProjects, saveProjects } from '@/infrastructure/storage/projectRepository'
import { BANCO_INVERSIONES, FORMATOS_POR_TIPO, type InversionPublica } from '@/core/data/bancoInversiones'
import { ProgressBar } from '../components/ProgressBar'
import { Reveal } from '../components/Reveal'
import { SliderTabs } from '../components/SliderTabs'
import { AccordionBody } from '../components/Accordion'
import { Modal } from '../components/Modal'
import type { ProjectStatus, ProjectDocument } from '@/core/types'

const STATUS_COLORS: Record<ProjectStatus, [string, string]> = {
  'En progreso': ['#0f5d78', '#e3f1f5'],
  'Con observaciones': ['#c0392b', '#fbe9e7'],
  'Completado': ['#2e9a3d', '#e6f5e9'],
  'Borrador': ['#6c7b83', '#eef1f3'],
}

const TABS = [
  { key: 'todos', label: 'Todos' },
  { key: 'progreso', label: 'En progreso' },
  { key: 'observaciones', label: 'Con observaciones' },
  { key: 'completado', label: 'Completados' },
]

const DOC_ICONS: Record<string, string> = {
  IOARR: 'fa-screwdriver-wrench', Registro: 'fa-clipboard-list', Perfil: 'fa-folder-tree',
  'Ficha Estándar': 'fa-file-lines', Expediente: 'fa-file-contract', Anexos: 'fa-paperclip', Metas: 'fa-bullseye',
}

export function Projects() {
  const { proyTab } = useAppState()
  const dispatch = useAppDispatch()
  const [refreshKey, setRefreshKey] = useState(0)
  const projects = loadProjects()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [mode, setMode] = useState<'list' | 'catalog' | 'formats'>('list')
  const [selectedInv, setSelectedInv] = useState<InversionPublica | null>(null)
  void refreshKey

  const filtered = projects.filter(p => {
    if (proyTab === 'todos') return true
    if (proyTab === 'progreso') return p.status === 'En progreso'
    if (proyTab === 'observaciones') return p.status === 'Con observaciones'
    if (proyTab === 'completado') return p.status === 'Completado'
    return true
  })

  const getProjectProgress = (docs: { progress: number }[]) => {
    if (docs.length === 0) return 0
    return Math.round(docs.reduce((s, d) => s + d.progress, 0) / docs.length)
  }

  if (mode === 'catalog') {
    return <ProjectCatalog
      onSelect={inv => { setSelectedInv(inv); setMode('formats') }}
      onBack={() => setMode('list')}
      existingCuis={projects.map(p => p.cui)}
    />
  }

  if (mode === 'formats' && selectedInv) {
    return <FormatSelector
      inversion={selectedInv}
      onBack={() => setMode('catalog')}
      onCreated={() => { setRefreshKey(k => k + 1); setMode('list'); setSelectedInv(null) }}
    />
  }

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      <Reveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
        <SliderTabs tabs={TABS} active={proyTab} onSelect={key => dispatch({ type: 'SET_PROY_TAB', payload: key })} layoutId="project-tabs" padding="8px 15px" />
        <button onClick={() => setMode('catalog')} style={{ background: '#36ad46', color: '#fff', border: 'none', borderRadius: 9, padding: '11px 18px', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className="fa-solid fa-plus" /> Nuevo proyecto
        </button>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map((p, pi) => {
          const [stColor, stBg] = STATUS_COLORS[p.status] ?? ['#6c7b83', '#eef1f3']
          const isOpen = expandedId === p.id
          const totalPct = getProjectProgress(p.documents)
          const doneCount = p.documents.filter(d => d.status === 'Completado').length

          return (
            <Reveal key={p.id} delay={pi * 0.04}>
              <div style={{ background: '#fff', border: `1.5px solid ${isOpen ? '#16708f' : '#e3e8eb'}`, borderRadius: 14, overflow: 'hidden', transition: 'border-color .2s', boxShadow: isOpen ? '0 4px 16px rgba(22,112,143,.1)' : '0 1px 3px rgba(0,0,0,.04)' }}>
                <button onClick={() => setExpandedId(isOpen ? null : p.id)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, padding: '18px 22px', textAlign: 'left' }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, flex: 'none', background: 'linear-gradient(135deg, #0f5d78, #16708f)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className={`fa-solid ${p.icon}`} style={{ color: '#fff', fontSize: 18 }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#1f2d33', lineHeight: 1.25, marginBottom: 4 }}>{p.name}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, fontSize: 12, color: '#9aa7ad' }}>
                      <span><i className="fa-solid fa-location-dot" style={{ marginRight: 4, color: '#16708f' }} />{p.location}</span>
                      <span><i className="fa-solid fa-tag" style={{ marginRight: 4 }} />{p.sector}</span>
                      {p.cui !== '—' && <span><i className="fa-solid fa-hashtag" style={{ marginRight: 4 }} />CUI {p.cui}</span>}
                      <span><i className="fa-solid fa-file-lines" style={{ marginRight: 4 }} />{p.documents.length} docs</span>
                    </div>
                  </div>
                  <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ textAlign: 'right', minWidth: 70 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end', marginBottom: 4 }}>
                        <div style={{ width: 50 }}><ProgressBar percent={totalPct} height={5} gradient={totalPct === 100 ? '#36ad46' : 'linear-gradient(90deg,#16708f,#36ad46)'} /></div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#16708f' }}>{totalPct}%</span>
                      </div>
                      <span style={{ fontSize: 10.5, fontWeight: 700, color: stColor, background: stBg, padding: '3px 9px', borderRadius: 12 }}>{p.status}</span>
                    </div>
                    <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`} style={{ color: '#9aa7ad', fontSize: 12 }} />
                  </div>
                </button>
                <AccordionBody open={isOpen}>
                  <div style={{ borderTop: '1px solid #eef1f3', padding: '16px 22px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#9aa7ad', letterSpacing: '.4px' }}>DOCUMENTOS ({doneCount}/{p.documents.length} completados)</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {p.documents.map(doc => {
                        const [dColor, dBg] = STATUS_COLORS[doc.status] ?? ['#6c7b83', '#eef1f3']
                        const docIcon = DOC_ICONS[doc.type] ?? 'fa-file'
                        const barGradient = doc.status === 'Con observaciones' ? '#e0922f' : doc.progress === 100 ? '#36ad46' : 'linear-gradient(90deg,#16708f,#36ad46)'
                        return (
                          <div key={doc.id} onClick={() => dispatch({ type: 'SET_VIEW', payload: 'workspace' })} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: doc.status === 'Completado' ? '#f8fcf9' : '#f8fafb', border: `1px solid ${doc.status === 'Completado' ? '#d4edda' : '#eef1f3'}`, borderRadius: 11, cursor: 'pointer', transition: 'all .15s' }}
                            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 3px 10px rgba(0,0,0,.05)'; e.currentTarget.style.transform = 'translateX(3px)' }}
                            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateX(0)' }}
                          >
                            <div style={{ width: 36, height: 36, borderRadius: 9, flex: 'none', background: doc.progress === 100 ? '#e6f5e9' : '#e3f1f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {doc.progress === 100 ? <i className="fa-solid fa-circle-check" style={{ color: '#36ad46', fontSize: 16 }} /> : <i className={`fa-solid ${docIcon}`} style={{ color: '#16708f', fontSize: 15 }} />}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1f2d33', lineHeight: 1.25 }}>{doc.name}</div>
                              <div style={{ fontSize: 11.5, color: '#9aa7ad', marginTop: 3 }}>{doc.type} · {doc.date}</div>
                            </div>
                            <div style={{ flex: 'none', width: 100, marginRight: 6 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end', marginBottom: 4 }}>
                                <div style={{ width: 50 }}><ProgressBar percent={doc.progress} height={4} gradient={barGradient} /></div>
                                <span style={{ fontSize: 11, fontWeight: 700, color: '#16708f' }}>{doc.progress}%</span>
                              </div>
                              <div style={{ textAlign: 'right' }}><span style={{ fontSize: 10, fontWeight: 700, color: dColor, background: dBg, padding: '2px 7px', borderRadius: 10 }}>{doc.status}</span></div>
                            </div>
                            <i className="fa-solid fa-arrow-right" style={{ color: '#d7dee2', fontSize: 12, flex: 'none' }} />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </AccordionBody>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Catálogo del Banco de Inversiones ─── */
const SECTORES = ['Todos', 'Saneamiento', 'Educación', 'Salud', 'Transporte', 'Recreación', 'Energía', 'Agricultura']
const DEPARTAMENTOS = ['Todos', 'Cusco']
const PROVINCIAS = ['Todas', 'Quispicanchi']

const SECTOR_COLORS: Record<string, string> = {
  Saneamiento: '#16708f', Educación: '#2c93a8', Salud: '#c0392b',
  Transporte: '#e0922f', Recreación: '#36ad46', Energía: '#f5a623', Agricultura: '#6b8e23',
}

function ProjectCatalog({ onSelect, onBack, existingCuis }: { onSelect: (i: InversionPublica) => void; onBack: () => void; existingCuis: string[] }) {
  const [search, setSearch] = useState('')
  const [sector, setSector] = useState('Todos')
  const [distrito, setDistrito] = useState('Todos')
  const [sort, setSort] = useState<'recent' | 'oldest'>('recent')
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards')

  const distritos = useMemo(() => {
    const set = new Set(BANCO_INVERSIONES.map(i => i.distrito))
    return ['Todos', ...Array.from(set).sort()]
  }, [])

  const results = useMemo(() => {
    let r = BANCO_INVERSIONES.filter(inv => !existingCuis.includes(inv.cui))
    if (search.length >= 2) {
      const q = search.toLowerCase()
      r = r.filter(inv => inv.cui.includes(q) || inv.nombre.toLowerCase().includes(q))
    }
    if (sector !== 'Todos') r = r.filter(inv => inv.sector === sector)
    if (distrito !== 'Todos') r = r.filter(inv => inv.distrito === distrito)
    const cuiList = r.map(x => x.cui)
    if (sort === 'oldest') cuiList.reverse()
    r = cuiList.map(c => r.find(x => x.cui === c)!)
    return r
  }, [search, sector, distrito, sort, existingCuis])

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      <Reveal>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#16708f', marginBottom: 14, padding: 0 }}>
          <i className="fa-solid fa-arrow-left" style={{ fontSize: 11 }} /> Volver a Mis Proyectos
        </button>
      </Reveal>

      <Reveal style={{ marginBottom: 20 }}>
        <div className="heading-font" style={{ fontWeight: 800, fontSize: 22, color: '#1f2d33', marginBottom: 4 }}>
          <i className="fa-solid fa-database" style={{ color: '#16708f', marginRight: 10 }} />Banco de Inversiones
        </div>
        <div style={{ fontSize: 13.5, color: '#6c7b83' }}>
          Selecciona una inversión pública registrada para crear tu proyecto y elaborar su documentación.
        </div>
      </Reveal>

      {/* Filters */}
      <Reveal delay={0.05} style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14, padding: '16px 20px', marginBottom: 18, boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          {/* Search */}
          <div style={{ flex: '1 1 260px', minWidth: 200 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9aa7ad', marginBottom: 5, letterSpacing: '.3px' }}>BUSCAR</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f4f7f8', border: '1px solid #e3e8eb', borderRadius: 9, padding: '9px 12px' }}>
              <i className="fa-solid fa-magnifying-glass" style={{ color: '#9aa7ad', fontSize: 13 }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="CUI o nombre…" style={{ border: 'none', outline: 'none', background: 'none', flex: 1, fontSize: 13, color: '#1f2d33' }} />
            </div>
          </div>
          {/* Sector */}
          <div style={{ minWidth: 140 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9aa7ad', marginBottom: 5, letterSpacing: '.3px' }}>SECTOR</div>
            <select value={sector} onChange={e => setSector(e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1px solid #e3e8eb', borderRadius: 9, fontSize: 13, color: '#1f2d33', background: '#f4f7f8', cursor: 'pointer', outline: 'none' }}>
              {SECTORES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          {/* Distrito */}
          <div style={{ minWidth: 140 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9aa7ad', marginBottom: 5, letterSpacing: '.3px' }}>DISTRITO</div>
            <select value={distrito} onChange={e => setDistrito(e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1px solid #e3e8eb', borderRadius: 9, fontSize: 13, color: '#1f2d33', background: '#f4f7f8', cursor: 'pointer', outline: 'none' }}>
              {distritos.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          {/* Sort */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9aa7ad', marginBottom: 5, letterSpacing: '.3px' }}>ORDEN</div>
            <button onClick={() => setSort(s => s === 'recent' ? 'oldest' : 'recent')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 14px', border: '1px solid #e3e8eb', borderRadius: 9, background: '#f4f7f8', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: '#46555c', whiteSpace: 'nowrap' }}>
              <i className={`fa-solid fa-arrow-${sort === 'recent' ? 'down' : 'up'}-wide-short`} style={{ fontSize: 13 }} />
              {sort === 'recent' ? 'Más recientes' : 'Más antiguos'}
            </button>
          </div>
          {/* View mode */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9aa7ad', marginBottom: 5, letterSpacing: '.3px' }}>VISTA</div>
            <div style={{ display: 'flex', gap: 2, background: '#f4f7f8', padding: 3, borderRadius: 9 }}>
              <button onClick={() => setViewMode('cards')} style={{ border: 'none', cursor: 'pointer', borderRadius: 7, padding: '7px 10px', background: viewMode === 'cards' ? '#16708f' : 'transparent', color: viewMode === 'cards' ? '#fff' : '#9aa7ad' }}>
                <i className="fa-solid fa-table-cells-large" />
              </button>
              <button onClick={() => setViewMode('list')} style={{ border: 'none', cursor: 'pointer', borderRadius: 7, padding: '7px 10px', background: viewMode === 'list' ? '#16708f' : 'transparent', color: viewMode === 'list' ? '#fff' : '#9aa7ad' }}>
                <i className="fa-solid fa-bars" />
              </button>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: '#9aa7ad', marginTop: 10 }}>
          <i className="fa-solid fa-circle" style={{ fontSize: 6, color: '#36ad46', marginRight: 6, verticalAlign: 'middle' }} />
          Fuente: Banco de Inversiones — MEF (datos simulados) · {results.length} resultados
        </div>
      </Reveal>

      {/* Results */}
      {results.length > 0 ? (
        viewMode === 'cards' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {results.map((inv, i) => (
              <Reveal key={inv.cui} delay={i * 0.03}>
                <div style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,.04)', transition: 'all .15s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,.04)' }}
                >
                  {/* Card header */}
                  <div style={{ background: 'linear-gradient(135deg, #0f5d78, #16708f)', padding: '16px 18px', color: '#fff', minHeight: 90, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,.15)', padding: '3px 8px', borderRadius: 8 }}>CUI {inv.cui}</span>
                      <i className={`fa-solid ${inv.icon}`} style={{ fontSize: 18, color: 'rgba(255,255,255,.5)' }} />
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.25, marginTop: 8 }}>
                      {inv.nombre.length > 80 ? inv.nombre.slice(0, 80) + '…' : inv.nombre}
                    </div>
                  </div>
                  {/* Card body */}
                  <div style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, color: '#6c7b83', marginBottom: 12 }}>
                      <span><i className="fa-solid fa-location-dot" style={{ color: '#16708f', marginRight: 5, width: 14 }} />{inv.ubicacion}</span>
                      <span><i className="fa-solid fa-building" style={{ color: '#16708f', marginRight: 5, width: 14 }} />{inv.unidadEjecutora}</span>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: SECTOR_COLORS[inv.sector] ?? '#6c7b83', background: '#f4f7f8', padding: '2px 8px', borderRadius: 8 }}>{inv.sector}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#1f2d33' }}>{inv.costoActualizado}</span>
                      </div>
                    </div>
                    <button onClick={() => onSelect(inv)} style={{ width: '100%', background: '#16708f', color: '#fff', border: 'none', borderRadius: 9, padding: '10px', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                      <i className="fa-solid fa-file-pen" style={{ fontSize: 12 }} /> Elaborar documentación
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {results.map((inv, i) => (
              <Reveal key={inv.cui} delay={i * 0.02}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: '#fff', border: '1px solid #e3e8eb', borderRadius: 12, transition: 'all .15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#16708f'; e.currentTarget.style.boxShadow = '0 3px 10px rgba(22,112,143,.06)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#e3e8eb'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, flex: 'none', background: 'linear-gradient(135deg, #0f5d78, #16708f)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className={`fa-solid ${inv.icon}`} style={{ color: '#fff', fontSize: 15 }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1f2d33', lineHeight: 1.25 }}>{inv.nombre}</div>
                    <div style={{ display: 'flex', gap: 10, marginTop: 4, fontSize: 11.5, color: '#9aa7ad' }}>
                      <span style={{ fontWeight: 700, color: '#16708f' }}>CUI {inv.cui}</span>
                      <span>{inv.ubicacion}</span>
                      <span style={{ color: SECTOR_COLORS[inv.sector], fontWeight: 600 }}>{inv.sector}</span>
                    </div>
                  </div>
                  <div style={{ flex: 'none', textAlign: 'right', marginRight: 10 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#1f2d33' }}>{inv.costoActualizado}</div>
                    <div style={{ fontSize: 10.5, color: '#9aa7ad' }}>{inv.situacion}</div>
                  </div>
                  <button onClick={() => onSelect(inv)} style={{ flex: 'none', background: '#16708f', color: '#fff', border: 'none', borderRadius: 9, padding: '9px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <i className="fa-solid fa-file-pen" style={{ fontSize: 11 }} /> Elaborar
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        )
      ) : (
        <Reveal style={{ textAlign: 'center', padding: '60px 20px' }}>
          <i className="fa-solid fa-folder-open" style={{ fontSize: 36, color: '#d7dee2', marginBottom: 12 }} />
          <div style={{ fontSize: 15, color: '#9aa7ad', marginBottom: 4 }}>No se encontraron inversiones</div>
          <div style={{ fontSize: 13, color: '#c2cace' }}>Ajusta los filtros o busca por otro término</div>
        </Reveal>
      )}
    </div>
  )
}

/* ─── Selector de Formatos ─── */
const ALL_FORMATS = [
  { name: 'Ficha Técnica IOARR (Anexo 09)', type: 'IOARR', icon: 'fa-screwdriver-wrench' },
  { name: 'Formato de registro IOARR', type: 'Registro', icon: 'fa-clipboard-list' },
  { name: 'Ficha Técnica Estándar', type: 'Ficha Estándar', icon: 'fa-file-lines' },
  { name: 'Ficha Técnica Simplificada', type: 'Ficha Estándar', icon: 'fa-file' },
  { name: 'Perfil de Inversión Pública', type: 'Perfil', icon: 'fa-folder-tree' },
  { name: 'Anexos de sustento técnico', type: 'Anexos', icon: 'fa-paperclip' },
  { name: 'Formato de metas físicas', type: 'Metas', icon: 'fa-bullseye' },
  { name: 'Expediente Técnico', type: 'Expediente', icon: 'fa-file-contract' },
  { name: 'Estructura de Expediente Técnico', type: 'Expediente', icon: 'fa-sitemap' },
]

const FORMAT_CATEGORIES = ['Todos', 'IOARR', 'Fichas Técnicas', 'Perfiles', 'Expedientes', 'Otros']

function getFormatCategory(type: string) {
  if (type === 'IOARR' || type === 'Registro') return 'IOARR'
  if (type === 'Ficha Estándar') return 'Fichas Técnicas'
  if (type === 'Perfil') return 'Perfiles'
  if (type === 'Expediente') return 'Expedientes'
  return 'Otros'
}

function FormatSelector({ inversion, onBack, onCreated }: { inversion: InversionPublica; onBack: () => void; onCreated: () => void }) {
  const suggested = FORMATOS_POR_TIPO[inversion.tipoFormato] ?? ['Ficha Técnica Estándar']
  const [selected, setSelected] = useState<string[]>(suggested)
  const [showCatalog, setShowCatalog] = useState(false)
  const [catalogSearch, setCatalogSearch] = useState('')
  const [catalogCategory, setCatalogCategory] = useState('Todos')

  const toggle = (name: string) => {
    setSelected(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name])
  }

  const catalogFormats = ALL_FORMATS.filter(f => {
    if (catalogSearch.length >= 2 && !f.name.toLowerCase().includes(catalogSearch.toLowerCase())) return false
    if (catalogCategory !== 'Todos' && getFormatCategory(f.type) !== catalogCategory) return false
    return true
  })

  const handleCreate = () => {
    const docs: ProjectDocument[] = selected.map((name, i) => {
      const fmt = ALL_FORMATS.find(f => f.name === name)
      return {
        id: `new-${Date.now()}-${i}`,
        name,
        type: fmt?.type ?? 'Ficha Estándar',
        status: 'Borrador' as const,
        progress: 0,
        date: 'Sin iniciar',
      }
    })
    const newProject = {
      id: `p-${Date.now()}`,
      name: inversion.nombre,
      location: inversion.ubicacion,
      sector: inversion.sector,
      cui: inversion.cui,
      icon: inversion.icon,
      status: 'Borrador' as const,
      date: 'Recién creado',
      documents: docs,
    }
    const projects = loadProjects()
    projects.unshift(newProject)
    saveProjects(projects)
    onCreated()
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <Reveal>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#16708f', marginBottom: 14, padding: 0 }}>
          <i className="fa-solid fa-arrow-left" style={{ fontSize: 11 }} /> Volver al catálogo
        </button>
      </Reveal>

      {/* Project summary */}
      <Reveal style={{
        borderRadius: 16, overflow: 'hidden', marginBottom: 24,
        background: 'linear-gradient(120deg, #0f5d78, #16708f)', padding: '22px 26px', color: '#fff',
      }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ width: 50, height: 50, borderRadius: 13, background: 'rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
            <i className={`fa-solid ${inversion.icon}`} style={{ color: '#fff', fontSize: 20 }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: '#bfe6d4', fontWeight: 600, marginBottom: 3 }}>CUI {inversion.cui} · {inversion.sector}</div>
            <div className="heading-font" style={{ fontWeight: 700, fontSize: 17, lineHeight: 1.25 }}>{inversion.nombre}</div>
            <div style={{ fontSize: 12, color: '#a7d8e3', marginTop: 4 }}>
              <i className="fa-solid fa-location-dot" style={{ marginRight: 5 }} />{inversion.ubicacion} · {inversion.costoActualizado}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Heading */}
      <Reveal delay={0.05}>
        <div className="heading-font" style={{ fontWeight: 700, fontSize: 18, color: '#1f2d33', marginBottom: 4 }}>
          <i className="fa-solid fa-layer-group" style={{ color: '#16708f', marginRight: 10 }} />Documentos a elaborar
        </div>
        <div style={{ fontSize: 13, color: '#6c7b83', marginBottom: 18, lineHeight: 1.5 }}>
          Según el tipo <strong>{inversion.tipoFormato}</strong>, se sugieren los formatos marcados.
        </div>
      </Reveal>

      {/* Suggested */}
      <Reveal delay={0.08}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#36ad46', letterSpacing: '.4px', marginBottom: 10 }}>
          <i className="fa-solid fa-star" style={{ marginRight: 5 }} />SUGERIDOS PARA ESTE PROYECTO
        </div>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        {ALL_FORMATS.filter(f => suggested.includes(f.name)).map((f, i) => {
          const checked = selected.includes(f.name)
          return (
            <Reveal key={f.name} delay={0.08 + i * 0.03}>
              <label style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px',
                background: checked ? '#f0f9ff' : '#fff',
                border: `1.5px solid ${checked ? '#16708f' : '#e3e8eb'}`,
                borderRadius: 12, cursor: 'pointer', transition: 'all .15s',
              }}>
                <div style={{ width: 24, height: 24, borderRadius: 7, flex: 'none', border: `2px solid ${checked ? '#16708f' : '#d7dee2'}`, background: checked ? '#16708f' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s' }}>
                  {checked && <i className="fa-solid fa-check" style={{ color: '#fff', fontSize: 12 }} />}
                </div>
                <input type="checkbox" checked={checked} onChange={() => toggle(f.name)} style={{ display: 'none' }} />
                <div style={{ width: 36, height: 36, borderRadius: 9, background: checked ? '#e3f1f5' : '#f4f7f8', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  <i className={`fa-solid ${f.icon}`} style={{ color: checked ? '#16708f' : '#9aa7ad', fontSize: 15 }} />
                </div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1f2d33' }}>{f.name}</div>
                  <div style={{ fontSize: 11, color: '#9aa7ad', marginTop: 1 }}>{f.type}</div>
                </div>
              </label>
            </Reveal>
          )
        })}
      </div>

      {/* Additional formats already added */}
      {selected.filter(s => !suggested.includes(s)).length > 0 && (
        <Reveal>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#16708f', letterSpacing: '.4px', marginBottom: 10 }}>
            <i className="fa-solid fa-plus-circle" style={{ marginRight: 5 }} />FORMATOS ADICIONALES AGREGADOS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
            {selected.filter(s => !suggested.includes(s)).map(name => {
              const f = ALL_FORMATS.find(x => x.name === name)
              return (
                <div key={name} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                  background: '#f0f9ff', border: '1.5px solid #16708f', borderRadius: 10,
                }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#e3f1f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                    <i className={`fa-solid ${f?.icon ?? 'fa-file'}`} style={{ color: '#16708f', fontSize: 14 }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1f2d33' }}>{name}</div>
                    <div style={{ fontSize: 11, color: '#9aa7ad' }}>{f?.type}</div>
                  </div>
                  <button onClick={() => toggle(name)} style={{ flex: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                    <i className="fa-solid fa-xmark" style={{ color: '#c0392b', fontSize: 14 }} />
                  </button>
                </div>
              )
            })}
          </div>
        </Reveal>
      )}

      {/* Add more button */}
      <Reveal delay={0.12}>
        <button onClick={() => setShowCatalog(true)} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%',
          padding: '14px', background: '#fff', border: '2px dashed #d7dee2', borderRadius: 12,
          cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#16708f', marginBottom: 24,
          transition: 'all .15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#16708f'; e.currentTarget.style.background = '#f0f9ff' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#d7dee2'; e.currentTarget.style.background = '#fff' }}
        >
          <i className="fa-solid fa-plus" /> Agregar más formatos
        </button>
      </Reveal>

      {/* Action bar */}
      <Reveal delay={0.15} style={{
        position: 'sticky', bottom: 0, background: '#fff', borderTop: '1px solid #eef1f3',
        padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ fontSize: 13, color: '#6c7b83' }}>
          <strong style={{ color: '#16708f' }}>{selected.length}</strong> documento{selected.length !== 1 ? 's' : ''} seleccionado{selected.length !== 1 ? 's' : ''}
        </div>
        <button onClick={handleCreate} disabled={selected.length === 0} style={{
          background: selected.length === 0 ? '#c2cace' : '#36ad46', color: '#fff', border: 'none',
          borderRadius: 10, padding: '12px 28px', fontSize: 14, fontWeight: 700,
          cursor: selected.length === 0 ? 'default' : 'pointer',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <i className="fa-solid fa-rocket" /> Crear proyecto y comenzar
        </button>
      </Reveal>

      {/* Format Catalog Modal */}
      <Modal open={showCatalog} onClose={() => { setShowCatalog(false); setCatalogSearch(''); setCatalogCategory('Todos') }} title="Catálogo de Formatos" icon="fa-layer-group" width={860}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20, minHeight: 400 }}>
          {/* Left: catalog */}
          <div>
            {/* Filters */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: '#f4f7f8', border: '1px solid #e3e8eb', borderRadius: 9, padding: '9px 12px' }}>
                <i className="fa-solid fa-magnifying-glass" style={{ color: '#9aa7ad', fontSize: 13 }} />
                <input value={catalogSearch} onChange={e => setCatalogSearch(e.target.value)} placeholder="Buscar formato…" style={{ border: 'none', outline: 'none', background: 'none', flex: 1, fontSize: 13, color: '#1f2d33' }} />
              </div>
              <select value={catalogCategory} onChange={e => setCatalogCategory(e.target.value)} style={{ padding: '9px 12px', border: '1px solid #e3e8eb', borderRadius: 9, fontSize: 13, color: '#1f2d33', background: '#f4f7f8', cursor: 'pointer', outline: 'none' }}>
                {FORMAT_CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* Format list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {catalogFormats.map(f => {
                const isSelected = selected.includes(f.name)
                return (
                  <div key={f.name} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                    background: isSelected ? '#f0f9ff' : '#fff',
                    border: `1px solid ${isSelected ? '#16708f' : '#e3e8eb'}`,
                    borderRadius: 11, transition: 'all .15s',
                  }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: isSelected ? '#e3f1f5' : '#f4f7f8', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                      <i className={`fa-solid ${f.icon}`} style={{ color: isSelected ? '#16708f' : '#9aa7ad', fontSize: 16 }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1f2d33' }}>{f.name}</div>
                      <div style={{ fontSize: 11, color: '#9aa7ad', marginTop: 1 }}>{f.type} · {getFormatCategory(f.type)}</div>
                    </div>
                    <button onClick={() => toggle(f.name)} style={{
                      flex: 'none', background: isSelected ? '#c0392b' : '#16708f', color: '#fff',
                      border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 5,
                    }}>
                      <i className={`fa-solid ${isSelected ? 'fa-minus' : 'fa-plus'}`} style={{ fontSize: 10 }} />
                      {isSelected ? 'Quitar' : 'Agregar'}
                    </button>
                  </div>
                )
              })}
              {catalogFormats.length === 0 && (
                <div style={{ textAlign: 'center', padding: '30px', color: '#9aa7ad', fontSize: 13 }}>
                  No se encontraron formatos con ese filtro.
                </div>
              )}
            </div>
          </div>

          {/* Right: selected */}
          <div style={{ borderLeft: '1px solid #eef1f3', paddingLeft: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#16708f', letterSpacing: '.3px', marginBottom: 12 }}>
              <i className="fa-solid fa-check-double" style={{ marginRight: 6 }} />SELECCIONADOS ({selected.length})
            </div>
            {selected.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {selected.map(name => {
                  const f = ALL_FORMATS.find(x => x.name === name)
                  const isSuggested = suggested.includes(name)
                  return (
                    <div key={name} style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                      background: isSuggested ? '#e6f5e9' : '#f0f9ff',
                      border: `1px solid ${isSuggested ? '#d4edda' : '#bfe0ea'}`,
                      borderRadius: 9,
                    }}>
                      <i className={`fa-solid ${f?.icon ?? 'fa-file'}`} style={{ color: isSuggested ? '#36ad46' : '#16708f', fontSize: 13, flex: 'none' }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#1f2d33', lineHeight: 1.2 }}>{name}</div>
                        {isSuggested && <div style={{ fontSize: 10, color: '#36ad46', marginTop: 1 }}>Sugerido</div>}
                      </div>
                      <button onClick={() => toggle(name)} style={{ flex: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
                        <i className="fa-solid fa-xmark" style={{ color: '#c0392b', fontSize: 12 }} />
                      </button>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 10px', color: '#c2cace', fontSize: 12 }}>
                <i className="fa-solid fa-inbox" style={{ fontSize: 24, marginBottom: 8, display: 'block' }} />
                Ningún formato seleccionado
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}
