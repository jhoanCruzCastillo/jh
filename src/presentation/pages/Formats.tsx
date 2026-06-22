import { useState, useMemo } from 'react'
import { ALL_FORMATS_DATA, FORMAT_CATEGORIES, type FormatDef } from '@/core/data/formats'
import { useAppDispatch } from '@/app/AppContext'
import { Reveal } from '../components/Reveal'
import { AccordionBody } from '../components/Accordion'
import { Modal } from '../components/Modal'

const EXT_COLORS: Record<string, [string, string]> = {
  XLSX: ['#e6f5e9', '#2e9a3d'],
  PDF: ['#fbe9e7', '#c0392b'],
  DOCX: ['#e3f1f5', '#16708f'],
  ZIP: ['#fff4e6', '#e0922f'],
}

export function Formats() {
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todos')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let r = ALL_FORMATS_DATA
    if (search.length >= 2) {
      const q = search.toLowerCase()
      r = r.filter(f => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q))
    }
    if (category !== 'Todos') r = r.filter(f => f.category === category)
    return r
  }, [search, category])

  const grouped = useMemo(() => {
    const map = new Map<string, FormatDef[]>()
    filtered.forEach(f => {
      const list = map.get(f.category) ?? []
      list.push(f)
      map.set(f.category, list)
    })
    return map
  }, [filtered])

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>
      <Reveal style={{ marginBottom: 18 }}>
        <div className="heading-font" style={{ fontWeight: 800, fontSize: 22, color: '#1f2d33', marginBottom: 4 }}>
          <i className="fa-solid fa-layer-group" style={{ color: '#16708f', marginRight: 10 }} />Formatos y Plantillas
        </div>
        <div style={{ fontSize: 13.5, color: '#6c7b83' }}>
          Cada formato incluye su versión vacía para descargar y una plantilla llenada de ejemplo como referencia.
        </div>
      </Reveal>

      {/* Filters */}
      <Reveal delay={0.05} style={{ background: '#fff', border: '1px solid #e3e8eb', borderRadius: 14, padding: '16px 20px', marginBottom: 20, boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 280px', minWidth: 200 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9aa7ad', marginBottom: 5, letterSpacing: '.3px' }}>BUSCAR</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f4f7f8', border: '1px solid #e3e8eb', borderRadius: 9, padding: '9px 12px' }}>
              <i className="fa-solid fa-magnifying-glass" style={{ color: '#9aa7ad', fontSize: 13 }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Nombre del formato…" style={{ border: 'none', outline: 'none', background: 'none', flex: 1, fontSize: 13, color: '#1f2d33' }} />
            </div>
          </div>
          <div style={{ minWidth: 180 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9aa7ad', marginBottom: 5, letterSpacing: '.3px' }}>CATEGORÍA</div>
            <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1px solid #e3e8eb', borderRadius: 9, fontSize: 13, color: '#1f2d33', background: '#f4f7f8', cursor: 'pointer', outline: 'none' }}>
              {FORMAT_CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9aa7ad', marginBottom: 5, letterSpacing: '.3px' }}>VISTA</div>
            <div style={{ display: 'flex', gap: 2, background: '#f4f7f8', padding: 3, borderRadius: 9, border: '1px solid #e3e8eb' }}>
              <button onClick={() => setViewMode('grid')} style={{ border: 'none', cursor: 'pointer', borderRadius: 7, padding: '7px 10px', background: viewMode === 'grid' ? '#16708f' : 'transparent', color: viewMode === 'grid' ? '#fff' : '#9aa7ad' }}>
                <i className="fa-solid fa-table-cells-large" />
              </button>
              <button onClick={() => setViewMode('list')} style={{ border: 'none', cursor: 'pointer', borderRadius: 7, padding: '7px 10px', background: viewMode === 'list' ? '#16708f' : 'transparent', color: viewMode === 'list' ? '#fff' : '#9aa7ad' }}>
                <i className="fa-solid fa-bars" />
              </button>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: '#9aa7ad', marginTop: 10 }}>
          {filtered.length} formato{filtered.length !== 1 ? 's' : ''}
        </div>
      </Reveal>

      {/* Content */}
      {filtered.length > 0 ? (
        viewMode === 'grid' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {Array.from(grouped.entries()).map(([cat, items], gi) => (
              <Reveal key={cat} delay={gi * 0.06}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: '#e3f1f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className={`fa-solid ${items[0].icon}`} style={{ color: '#16708f', fontSize: 15 }} />
                  </div>
                  <div className="heading-font" style={{ fontWeight: 700, fontSize: 16, color: '#1f2d33' }}>{cat}</div>
                  <span style={{ fontSize: 11, color: '#9aa7ad' }}>({items.length})</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                  {items.map(f => <FormatCard key={f.id} format={f} onToggle={() => setExpandedId(f.id)} />)}
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map((f, i) => <FormatListItem key={f.id} format={f} index={i} expanded={expandedId === f.id} onToggle={() => setExpandedId(expandedId === f.id ? null : f.id)} onGoToProject={() => dispatch({ type: 'SET_VIEW', payload: 'proyectos' })} />)}
          </div>
        )
      ) : (
        <Reveal style={{ textAlign: 'center', padding: '60px 20px' }}>
          <i className="fa-solid fa-file-circle-question" style={{ fontSize: 36, color: '#d7dee2', marginBottom: 12 }} />
          <div style={{ fontSize: 15, color: '#9aa7ad' }}>No se encontraron formatos</div>
        </Reveal>
      )}

      {/* Detail Modal (grid mode) */}
      {(() => {
        const sf = ALL_FORMATS_DATA.find(f => f.id === expandedId)
        if (!sf || viewMode !== 'grid') return null
        return (
          <Modal open={true} onClose={() => setExpandedId(null)} title={sf.name} icon={sf.icon} width={640}>
            <FormatDetail f={sf} onGoToProject={() => { setExpandedId(null); dispatch({ type: 'SET_VIEW', payload: 'proyectos' }) }} />
          </Modal>
        )
      })()}
    </div>
  )
}

const AUTHOR_STYLES: Record<string, [string, string, string]> = {
  oficial: ['#16708f', '#e3f1f5', 'fa-user-tie'],
  usuario: ['#36ad46', '#e6f5e9', 'fa-user'],
  entrenamiento: ['#e0922f', '#fff4e6', 'fa-dumbbell'],
}

/* ─── Expanded Detail (shared) ─── */
function FormatDetail({ f, onGoToProject }: { f: FormatDef; onGoToProject: () => void }) {
  const [detailTab, setDetailTab] = useState<'vacio' | 'llenadas'>('vacio')

  return (
    <div style={{ borderTop: '1px solid #eef1f3', padding: '16px 18px' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, background: '#f4f7f8', padding: 3, borderRadius: 9, marginBottom: 16 }}>
        <button onClick={() => setDetailTab('vacio')} style={{
          flex: 1, border: 'none', cursor: 'pointer', borderRadius: 7, padding: '8px',
          fontSize: 12.5, fontWeight: 600,
          background: detailTab === 'vacio' ? '#16708f' : 'transparent',
          color: detailTab === 'vacio' ? '#fff' : '#6c7b83',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <i className="fa-solid fa-file" style={{ fontSize: 11 }} /> Formato vacío
        </button>
        <button onClick={() => setDetailTab('llenadas')} style={{
          flex: 1, border: 'none', cursor: 'pointer', borderRadius: 7, padding: '8px',
          fontSize: 12.5, fontWeight: 600,
          background: detailTab === 'llenadas' ? '#e0922f' : 'transparent',
          color: detailTab === 'llenadas' ? '#fff' : '#6c7b83',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <i className="fa-solid fa-file-pen" style={{ fontSize: 11 }} /> Plantillas llenadas ({f.filledTemplates.length})
        </button>
      </div>

      {detailTab === 'vacio' && (
        <div>
          <div style={{ fontSize: 13, color: '#6c7b83', lineHeight: 1.5, marginBottom: 14 }}>{f.description}</div>
          <div style={{ display: 'flex', gap: 14, fontSize: 12, color: '#9aa7ad', marginBottom: 14 }}>
            <span><i className="fa-solid fa-tag" style={{ marginRight: 4, color: '#16708f' }} />{f.category}</span>
            <span><i className="fa-solid fa-code-branch" style={{ marginRight: 4 }} />{f.version}</span>
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%',
            background: '#16708f', color: '#fff', border: 'none', borderRadius: 9,
            padding: '10px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>
            <i className="fa-solid fa-download" style={{ fontSize: 12 }} /> Descargar formato vacío ({f.ext})
          </button>
        </div>
      )}

      {detailTab === 'llenadas' && (
        <div>
          {f.filledTemplates.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {f.filledTemplates.map(t => {
                const [aColor, aBg, aIcon] = AUTHOR_STYLES[t.authorType] ?? ['#6c7b83', '#eef1f3', 'fa-user']
                return (
                  <div key={t.id} style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                    background: '#fff', border: '1px solid #eef1f3', borderRadius: 11,
                  }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: aBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                      <i className={`fa-solid ${aIcon}`} style={{ color: aColor, fontSize: 14 }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1f2d33', lineHeight: 1.25 }}>{t.label}</div>
                      <div style={{ display: 'flex', gap: 10, marginTop: 4, fontSize: 11.5, color: '#9aa7ad' }}>
                        <span style={{ fontWeight: 600, color: aColor }}>
                          {t.authorType === 'entrenamiento' ? 'Práctica' : t.authorType === 'oficial' ? 'Docente' : 'Tú'}
                          {' · '}{t.author}
                        </span>
                        <span>{t.date}</span>
                      </div>
                    </div>
                    <button style={{
                      flex: 'none', background: '#e0922f', color: '#fff', border: 'none', borderRadius: 8,
                      padding: '8px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 5,
                    }}>
                      <i className="fa-solid fa-download" style={{ fontSize: 10 }} /> Descargar
                    </button>
                  </div>
                )
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px', color: '#9aa7ad', fontSize: 13 }}>
              <i className="fa-solid fa-inbox" style={{ fontSize: 24, marginBottom: 8, display: 'block', color: '#d7dee2' }} />
              No hay plantillas llenadas aún para este formato.
            </div>
          )}
        </div>
      )}

      {/* Projects */}
      {f.usedByProjects.length > 0 && (
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #eef1f3' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#16708f', letterSpacing: '.3px', marginBottom: 8 }}>
            <i className="fa-solid fa-link" style={{ marginRight: 5 }} />PROYECTOS QUE USAN ESTE FORMATO
          </div>
          {f.usedByProjects.map(p => (
            <button key={p.projectId} onClick={onGoToProject} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', width: '100%',
              background: '#f4f7f8', border: '1px solid #eef1f3', borderRadius: 8,
              cursor: 'pointer', textAlign: 'left', fontSize: 12, color: '#16708f', fontWeight: 600, marginBottom: 6,
            }}>
              <i className="fa-solid fa-folder-open" style={{ fontSize: 11 }} />
              <span style={{ flex: 1 }}>{p.projectName}</span>
              <i className="fa-solid fa-arrow-right" style={{ fontSize: 10, color: '#9aa7ad' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Grid Card ─── */
function FormatCard({ format: f, onToggle }: { format: FormatDef; onToggle: () => void }) {
  const [bg, color] = EXT_COLORS[f.ext] ?? ['#eef1f3', '#6c7b83']

  return (
    <div style={{
      background: '#fff', border: '1.5px solid #e3e8eb', borderRadius: 14,
      overflow: 'hidden', transition: 'all .15s', boxShadow: '0 1px 3px rgba(0,0,0,.04)',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#16708f'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,.06)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#e3e8eb'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,.04)' }}
    >
      <div style={{ padding: '18px 18px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color }}>{f.ext}</div>
          {f.usedByProjects.length > 0 && (
            <span style={{ fontSize: 10, color: '#16708f', fontWeight: 600 }}>
              <i className="fa-solid fa-link" style={{ marginRight: 3 }} />{f.usedByProjects.length}
            </span>
          )}
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1f2d33', lineHeight: 1.3, marginBottom: 6 }}>{f.name}</div>
        <div style={{ fontSize: 12, color: '#9aa7ad', lineHeight: 1.45 }}>
          {f.description.length > 80 ? f.description.slice(0, 80) + '…' : f.description}
        </div>
      </div>
      <div style={{ padding: '0 18px 14px' }}>
        <button onClick={onToggle} style={{
          width: '100%', background: '#f4f7f8', color: '#16708f', border: '1px solid #e3e8eb',
          borderRadius: 9, padding: '9px', fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <i className="fa-solid fa-eye" style={{ fontSize: 11 }} /> Ver detalles
        </button>
      </div>
    </div>
  )
}

/* ─── List Item ─── */
function FormatListItem({ format: f, index, expanded, onToggle, onGoToProject }: { format: FormatDef; index: number; expanded: boolean; onToggle: () => void; onGoToProject: () => void }) {
  const [bg, color] = EXT_COLORS[f.ext] ?? ['#eef1f3', '#6c7b83']

  return (
    <Reveal delay={index * 0.02}>
      <div style={{
        background: '#fff', border: `1.5px solid ${expanded ? '#16708f' : '#e3e8eb'}`, borderRadius: 12,
        overflow: 'hidden', transition: 'all .15s',
        boxShadow: expanded ? '0 4px 12px rgba(22,112,143,.06)' : '0 1px 3px rgba(0,0,0,.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', cursor: 'pointer' }} onClick={onToggle}>
          <div style={{ width: 40, height: 40, borderRadius: 9, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontSize: 10, fontWeight: 800, color }}>{f.ext}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#1f2d33', lineHeight: 1.25 }}>{f.name}</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 3, fontSize: 11.5, color: '#9aa7ad' }}>
              <span>{f.category}</span>
              <span>{f.version}</span>
              {f.usedByProjects.length > 0 && <span><i className="fa-solid fa-link" style={{ marginRight: 3 }} />{f.usedByProjects.length} proyecto{f.usedByProjects.length > 1 ? 's' : ''}</span>}
            </div>
          </div>
          <i className={`fa-solid fa-chevron-${expanded ? 'up' : 'down'}`} style={{ color: '#9aa7ad', fontSize: 11, flex: 'none' }} />
        </div>

        <AccordionBody open={expanded}>
          <FormatDetail f={f} onGoToProject={onGoToProject} />
        </AccordionBody>
      </div>
    </Reveal>
  )
}
