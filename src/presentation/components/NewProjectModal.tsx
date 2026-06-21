import { useState } from 'react'
import { Modal } from './Modal'
import { BANCO_INVERSIONES, FORMATOS_POR_TIPO, type InversionPublica } from '@/core/data/bancoInversiones'
import type { Project, ProjectDocument } from '@/core/types'
import { loadProjects, saveProjects } from '@/infrastructure/storage/projectRepository'

interface Props {
  open: boolean
  onClose: () => void
  onCreated: () => void
}

const SECTOR_COLORS: Record<string, string> = {
  Saneamiento: '#16708f', Educación: '#2c93a8', Salud: '#c0392b',
  Transporte: '#e0922f', Recreación: '#36ad46', Energía: '#f5a623',
  Agricultura: '#6b8e23',
}

export function NewProjectModal({ open, onClose, onCreated }: Props) {
  const [step, setStep] = useState<'search' | 'confirm'>('search')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<InversionPublica | null>(null)
  const [selectedFormats, setSelectedFormats] = useState<string[]>([])

  const results = query.length >= 2
    ? BANCO_INVERSIONES.filter(inv => {
        const q = query.toLowerCase()
        const existing = loadProjects()
        const alreadyExists = existing.some(p => p.cui === inv.cui)
        return !alreadyExists && (
          inv.cui.includes(q) ||
          inv.nombre.toLowerCase().includes(q) ||
          inv.sector.toLowerCase().includes(q) ||
          inv.distrito.toLowerCase().includes(q)
        )
      })
    : []

  const handleSelect = (inv: InversionPublica) => {
    setSelected(inv)
    const formats = FORMATOS_POR_TIPO[inv.tipoFormato] ?? ['Ficha Técnica Estándar']
    setSelectedFormats(formats)
    setStep('confirm')
  }

  const toggleFormat = (f: string) => {
    setSelectedFormats(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])
  }

  const handleCreate = () => {
    if (!selected || selectedFormats.length === 0) return

    const docs: ProjectDocument[] = selectedFormats.map((name, i) => ({
      id: `new-${Date.now()}-${i}`,
      name,
      type: name.includes('IOARR') ? 'IOARR' : name.includes('Perfil') ? 'Perfil' : name.includes('Expediente') ? 'Expediente' : name.includes('Anexo') ? 'Anexos' : name.includes('metas') ? 'Metas' : 'Ficha Estándar',
      status: 'Borrador',
      progress: 0,
      date: 'Sin iniciar',
    }))

    const newProject: Project = {
      id: `p-${Date.now()}`,
      name: selected.nombre,
      location: selected.ubicacion,
      sector: selected.sector,
      cui: selected.cui,
      icon: selected.icon,
      status: 'Borrador',
      date: 'Recién creado',
      documents: docs,
    }

    const projects = loadProjects()
    projects.unshift(newProject)
    saveProjects(projects)

    setStep('search')
    setQuery('')
    setSelected(null)
    setSelectedFormats([])
    onCreated()
    onClose()
  }

  const handleClose = () => {
    setStep('search')
    setQuery('')
    setSelected(null)
    setSelectedFormats([])
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title={step === 'search' ? 'Nuevo Proyecto' : 'Confirmar Proyecto'} icon="fa-folder-plus" width={720}>
      {step === 'search' && (
        <>
          {/* Search header */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13.5, color: '#6c7b83', lineHeight: 1.5, marginBottom: 14 }}>
              Busca el proyecto en el <strong>Banco de Inversiones</strong> por CUI, nombre, sector o distrito.
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, background: '#f4f7f8',
              border: '1.5px solid #d7dee2', borderRadius: 11, padding: '12px 16px',
            }}>
              <i className="fa-solid fa-magnifying-glass" style={{ color: '#16708f', fontSize: 15 }} />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Ej: 2654891, agua potable, educación, San Juan…"
                autoFocus
                style={{ border: 'none', outline: 'none', background: 'none', flex: 1, fontSize: 14, color: '#1f2d33' }}
              />
              {query && (
                <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <i className="fa-solid fa-xmark" style={{ color: '#9aa7ad' }} />
                </button>
              )}
            </div>
          </div>

          {/* Source badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#36ad46' }} />
            <span style={{ fontSize: 11.5, color: '#9aa7ad' }}>
              Fuente: Banco de Inversiones — MEF (datos simulados para prototipo)
            </span>
          </div>

          {/* Results */}
          {query.length >= 2 && (
            <div style={{ maxHeight: 380, overflowY: 'auto' }}>
              {results.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {results.map(inv => (
                    <div
                      key={inv.cui}
                      onClick={() => handleSelect(inv)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                        background: '#fff', border: '1px solid #e3e8eb', borderRadius: 12,
                        cursor: 'pointer', transition: 'all .15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#16708f'; e.currentTarget.style.boxShadow = '0 3px 10px rgba(22,112,143,.08)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#e3e8eb'; e.currentTarget.style.boxShadow = 'none' }}
                    >
                      <div style={{
                        width: 42, height: 42, borderRadius: 11, flex: 'none',
                        background: 'linear-gradient(135deg, #0f5d78, #16708f)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <i className={`fa-solid ${inv.icon}`} style={{ color: '#fff', fontSize: 16 }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1f2d33', lineHeight: 1.25 }}>{inv.nombre}</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 5, fontSize: 11.5, color: '#9aa7ad' }}>
                          <span style={{ fontWeight: 700, color: '#16708f' }}>CUI {inv.cui}</span>
                          <span><i className="fa-solid fa-location-dot" style={{ marginRight: 3 }} />{inv.ubicacion}</span>
                          <span style={{ color: SECTOR_COLORS[inv.sector] ?? '#6c7b83', fontWeight: 600 }}>{inv.sector}</span>
                        </div>
                      </div>
                      <div style={{ flex: 'none', textAlign: 'right' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#1f2d33' }}>{inv.costoActualizado}</div>
                        <div style={{ fontSize: 10.5, color: '#9aa7ad', marginTop: 2 }}>{inv.situacion}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <i className="fa-solid fa-search" style={{ fontSize: 28, color: '#d7dee2', marginBottom: 10 }} />
                  <div style={{ fontSize: 14, color: '#9aa7ad', marginBottom: 4 }}>No se encontraron inversiones</div>
                  <div style={{ fontSize: 12.5, color: '#c2cace' }}>Intenta con otro CUI, nombre o sector</div>
                </div>
              )}
            </div>
          )}

          {query.length < 2 && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <i className="fa-solid fa-database" style={{ fontSize: 32, color: '#d7dee2', marginBottom: 12 }} />
              <div style={{ fontSize: 14, color: '#9aa7ad' }}>Ingresa al menos 2 caracteres para buscar</div>
              <div style={{ fontSize: 12.5, color: '#c2cace', marginTop: 4 }}>{BANCO_INVERSIONES.length} inversiones disponibles en la base</div>
            </div>
          )}
        </>
      )}

      {step === 'confirm' && selected && (
        <>
          {/* Project summary */}
          <div style={{ background: '#f8fafb', border: '1px solid #e3e8eb', borderRadius: 14, padding: '18px 20px', marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{
                width: 46, height: 46, borderRadius: 12, flex: 'none',
                background: 'linear-gradient(135deg, #0f5d78, #16708f)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className={`fa-solid ${selected.icon}`} style={{ color: '#fff', fontSize: 18 }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1f2d33', lineHeight: 1.25, marginBottom: 6 }}>{selected.nombre}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', fontSize: 12.5, color: '#6c7b83' }}>
                  <span><i className="fa-solid fa-hashtag" style={{ color: '#16708f', marginRight: 4, width: 14 }} />CUI: <strong>{selected.cui}</strong></span>
                  <span><i className="fa-solid fa-location-dot" style={{ color: '#16708f', marginRight: 4, width: 14 }} />{selected.ubicacion}</span>
                  <span><i className="fa-solid fa-tag" style={{ color: '#16708f', marginRight: 4, width: 14 }} />{selected.sector}</span>
                  <span><i className="fa-solid fa-building" style={{ color: '#16708f', marginRight: 4, width: 14 }} />{selected.unidadEjecutora}</span>
                  <span><i className="fa-solid fa-coins" style={{ color: '#16708f', marginRight: 4, width: 14 }} />{selected.costoActualizado}</span>
                  <span><i className="fa-solid fa-file-lines" style={{ color: '#16708f', marginRight: 4, width: 14 }} />Tipo: {selected.tipoFormato}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Select documents */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1f2d33', marginBottom: 4 }}>
              ¿Qué documentos necesitas elaborar?
            </div>
            <div style={{ fontSize: 12.5, color: '#9aa7ad', marginBottom: 12 }}>
              Según el tipo <strong>{selected.tipoFormato}</strong>, te sugerimos estos formatos. Puedes agregar o quitar.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(FORMATOS_POR_TIPO[selected.tipoFormato] ?? ['Ficha Técnica Estándar']).map(f => {
                const checked = selectedFormats.includes(f)
                return (
                  <label
                    key={f}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                      background: checked ? '#f0f9ff' : '#fff',
                      border: `1.5px solid ${checked ? '#16708f' : '#e3e8eb'}`,
                      borderRadius: 10, cursor: 'pointer', transition: 'all .15s',
                    }}
                  >
                    <div style={{
                      width: 22, height: 22, borderRadius: 6, flex: 'none',
                      border: `2px solid ${checked ? '#16708f' : '#d7dee2'}`,
                      background: checked ? '#16708f' : '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all .15s',
                    }}>
                      {checked && <i className="fa-solid fa-check" style={{ color: '#fff', fontSize: 11 }} />}
                    </div>
                    <input type="checkbox" checked={checked} onChange={() => toggleFormat(f)} style={{ display: 'none' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1f2d33' }}>{f}</div>
                    </div>
                    <i className="fa-solid fa-file-lines" style={{ color: checked ? '#16708f' : '#d7dee2', fontSize: 14 }} />
                  </label>
                )
              })}
            </div>

            {/* All possible formats */}
            <details style={{ marginTop: 10 }}>
              <summary style={{ fontSize: 12, color: '#16708f', fontWeight: 600, cursor: 'pointer' }}>
                Ver más formatos disponibles
              </summary>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
                {['Expediente Técnico', 'Ficha Técnica Simplificada', 'Formato de metas físicas', 'Anexos de sustento técnico']
                  .filter(f => !(FORMATOS_POR_TIPO[selected.tipoFormato] ?? []).includes(f))
                  .map(f => {
                    const checked = selectedFormats.includes(f)
                    return (
                      <label key={f} style={{
                        display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                        background: checked ? '#f0f9ff' : '#f8fafb', border: `1px solid ${checked ? '#16708f' : '#eef1f3'}`,
                        borderRadius: 9, cursor: 'pointer', fontSize: 13, color: '#46555c',
                      }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: 5, flex: 'none',
                          border: `2px solid ${checked ? '#16708f' : '#d7dee2'}`,
                          background: checked ? '#16708f' : '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {checked && <i className="fa-solid fa-check" style={{ color: '#fff', fontSize: 10 }} />}
                        </div>
                        <input type="checkbox" checked={checked} onChange={() => toggleFormat(f)} style={{ display: 'none' }} />
                        {f}
                      </label>
                    )
                  })}
              </div>
            </details>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button onClick={() => { setStep('search'); setSelected(null) }} style={{
              background: '#fff', color: '#46555c', border: '1px solid #d7dee2', borderRadius: 10,
              padding: '11px 20px', fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
            }}>
              <i className="fa-solid fa-arrow-left" style={{ marginRight: 6 }} />Volver a buscar
            </button>
            <button
              onClick={handleCreate}
              disabled={selectedFormats.length === 0}
              style={{
                background: selectedFormats.length === 0 ? '#c2cace' : '#36ad46',
                color: '#fff', border: 'none', borderRadius: 10,
                padding: '11px 24px', fontSize: 13.5, fontWeight: 700, cursor: selectedFormats.length === 0 ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <i className="fa-solid fa-plus" />
              Crear proyecto ({selectedFormats.length} {selectedFormats.length === 1 ? 'documento' : 'documentos'})
            </button>
          </div>
        </>
      )}
    </Modal>
  )
}
