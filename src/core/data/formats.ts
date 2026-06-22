export interface FilledTemplate {
  id: string
  label: string
  author: string
  authorType: 'oficial' | 'usuario' | 'entrenamiento'
  date: string
}

export interface FormatDef {
  id: string
  name: string
  category: string
  ext: string
  icon: string
  description: string
  version: string
  filledTemplates: FilledTemplate[]
  usedByProjects: { projectId: string; projectName: string }[]
}

export const ALL_FORMATS_DATA: FormatDef[] = [
  { id: 'f01', name: 'Ficha Técnica IOARR (Anexo N° 09)', category: 'IOARR', ext: 'XLSX', icon: 'fa-screwdriver-wrench', description: 'Formato oficial del MEF para registrar inversiones IOARR (Optimización, Ampliación marginal, Reposición, Rehabilitación).', version: '2026-v3', filledTemplates: [
    { id: 't01a', label: 'Reposición de mobiliario escolar — I.E. N° 5042', author: 'José Herrera Jara', authorType: 'oficial', date: '15/05/2026' },
    { id: 't01b', label: 'Práctica: Reposición de mobiliario escolar', author: 'Camila Torres', authorType: 'entrenamiento', date: '20/06/2026' },
  ], usedByProjects: [{ projectId: '1', projectName: 'Mejoramiento del servicio de agua potable — C.P. San Juan' }, { projectId: '2', projectName: 'Reposición de mobiliario escolar — I.E. N° 1042' }] },
  { id: 'f02', name: 'Formato de registro IOARR', category: 'IOARR', ext: 'PDF', icon: 'fa-clipboard-list', description: 'Formato para el registro de la IOARR en el Banco de Inversiones del MEF.', version: '2026-v2', filledTemplates: [
    { id: 't02a', label: 'Registro IOARR — Equipamiento biomédico', author: 'Eduardo Rivas Warthon', authorType: 'oficial', date: '10/04/2026' },
  ], usedByProjects: [{ projectId: '1', projectName: 'Mejoramiento del servicio de agua potable — C.P. San Juan' }] },
  { id: 'f04', name: 'Ficha Técnica Estándar', category: 'Fichas Técnicas', ext: 'XLSX', icon: 'fa-file-lines', description: 'Formato estándar para proyectos de inversión que no requieren IOARR ni perfil completo.', version: '2026-v3', filledTemplates: [
    { id: 't04a', label: 'Vía vecinal tramo Cusco — Oropesa', author: 'José Herrera Jara', authorType: 'oficial', date: '22/03/2026' },
  ], usedByProjects: [{ projectId: '4', projectName: 'Rehabilitación de vía vecinal — Tramo II' }] },
  { id: 'f05', name: 'Ficha Técnica Simplificada', category: 'Fichas Técnicas', ext: 'DOCX', icon: 'fa-file', description: 'Versión simplificada para proyectos de menor envergadura según la normativa vigente.', version: '2026-v1', filledTemplates: [
    { id: 't05a', label: 'Mantenimiento de aulas — zona rural', author: 'Eduardo Rivas Warthon', authorType: 'oficial', date: '18/02/2026' },
  ], usedByProjects: [] },
  { id: 'f07', name: 'Perfil de Inversión Pública', category: 'Perfiles de Inversión', ext: 'DOCX', icon: 'fa-folder-tree', description: 'Formato completo para la elaboración de perfiles de inversión pública según Invierte.pe.', version: '2026-v2', filledTemplates: [
    { id: 't07a', label: 'Centro de salud primer nivel — Ccatca', author: 'José Herrera Jara', authorType: 'oficial', date: '05/01/2026' },
    { id: 't07b', label: 'Práctica: Centro de salud', author: 'Camila Torres', authorType: 'entrenamiento', date: '18/06/2026' },
  ], usedByProjects: [{ projectId: '3', projectName: 'Ampliación de aulas — C.E. Inicial Los Andes' }] },
  { id: 'f08', name: 'Anexos de sustento técnico', category: 'Perfiles de Inversión', ext: 'ZIP', icon: 'fa-paperclip', description: 'Paquete de formatos para los anexos de sustento técnico del perfil de inversión.', version: '2026-v1', filledTemplates: [
    { id: 't08a', label: 'Anexos — Saneamiento rural', author: 'Eduardo Rivas Warthon', authorType: 'oficial', date: '12/02/2026' },
  ], usedByProjects: [{ projectId: '3', projectName: 'Ampliación de aulas — C.E. Inicial Los Andes' }] },
  { id: 'f10', name: 'Estructura de Expediente Técnico', category: 'Expedientes Técnicos', ext: 'DOCX', icon: 'fa-file-contract', description: 'Estructura base para la elaboración de expedientes técnicos de obras públicas.', version: '2026-v2', filledTemplates: [
    { id: 't10a', label: 'Losa deportiva multiusos — Villa Sol', author: 'José Herrera Jara', authorType: 'oficial', date: '28/04/2026' },
  ], usedByProjects: [] },
  { id: 'f11', name: 'Formato de metas físicas', category: 'Expedientes Técnicos', ext: 'XLSX', icon: 'fa-bullseye', description: 'Formato para el registro de metas físicas y cronograma de ejecución del proyecto.', version: '2026-v3', filledTemplates: [
    { id: 't11a', label: 'Metas físicas — Ampliación de aulas', author: 'Eduardo Rivas Warthon', authorType: 'oficial', date: '01/05/2026' },
  ], usedByProjects: [{ projectId: '3', projectName: 'Ampliación de aulas — C.E. Inicial Los Andes' }] },
  { id: 'f12', name: 'Formato de Costos y Presupuestos', category: 'Costos y Presupuestos', ext: 'XLSX', icon: 'fa-coins', description: 'Plantilla para la elaboración del presupuesto referencial con análisis de precios unitarios.', version: '2026-v1', filledTemplates: [
    { id: 't12a', label: 'Presupuesto — Agua potable rural', author: 'José Herrera Jara', authorType: 'oficial', date: '14/03/2026' },
  ], usedByProjects: [] },
  { id: 'f13', name: 'Formato de Sostenibilidad', category: 'Sostenibilidad', ext: 'DOCX', icon: 'fa-leaf', description: 'Formato para documentar los arreglos institucionales de operación y mantenimiento.', version: '2026-v1', filledTemplates: [
    { id: 't13a', label: 'Sostenibilidad — JASS agua potable', author: 'Eduardo Rivas Warthon', authorType: 'oficial', date: '20/04/2026' },
  ], usedByProjects: [] },
]

export const FORMAT_CATEGORIES = ['Todos', 'IOARR', 'Fichas Técnicas', 'Perfiles de Inversión', 'Expedientes Técnicos', 'Costos y Presupuestos', 'Sostenibilidad']
