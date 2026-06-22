export interface FormatDef {
  id: string
  name: string
  category: string
  ext: string
  icon: string
  description: string
  version: string
  exampleDesc: string
  usedByProjects: { projectId: string; projectName: string }[]
}

export const ALL_FORMATS_DATA: FormatDef[] = [
  { id: 'f01', name: 'Ficha Técnica IOARR (Anexo N° 09)', category: 'IOARR', ext: 'XLSX', icon: 'fa-screwdriver-wrench', description: 'Formato oficial del MEF para registrar inversiones IOARR (Optimización, Ampliación marginal, Reposición, Rehabilitación).', version: '2026-v3', exampleDesc: 'Ejemplo llenado para un proyecto de reposición de mobiliario escolar en la I.E. N° 5042 de Villa María del Triunfo.', usedByProjects: [{ projectId: '1', projectName: 'Mejoramiento del servicio de agua potable — C.P. San Juan' }, { projectId: '2', projectName: 'Reposición de mobiliario escolar — I.E. N° 1042' }] },
  { id: 'f02', name: 'Formato de registro IOARR', category: 'IOARR', ext: 'PDF', icon: 'fa-clipboard-list', description: 'Formato para el registro de la IOARR en el Banco de Inversiones del MEF.', version: '2026-v2', exampleDesc: 'Ejemplo de registro completado para una IOARR de reposición de equipamiento biomédico.', usedByProjects: [{ projectId: '1', projectName: 'Mejoramiento del servicio de agua potable — C.P. San Juan' }] },
  { id: 'f04', name: 'Ficha Técnica Estándar', category: 'Fichas Técnicas', ext: 'XLSX', icon: 'fa-file-lines', description: 'Formato estándar para proyectos de inversión que no requieren IOARR ni perfil completo.', version: '2026-v3', exampleDesc: 'Ejemplo llenado para un proyecto de rehabilitación de vía vecinal tramo Cusco — Oropesa.', usedByProjects: [{ projectId: '4', projectName: 'Rehabilitación de vía vecinal — Tramo II' }] },
  { id: 'f05', name: 'Ficha Técnica Simplificada', category: 'Fichas Técnicas', ext: 'DOCX', icon: 'fa-file', description: 'Versión simplificada para proyectos de menor envergadura según la normativa vigente.', version: '2026-v1', exampleDesc: 'Ejemplo llenado para un proyecto de mantenimiento de aulas en zona rural.', usedByProjects: [] },
  { id: 'f07', name: 'Perfil de Inversión Pública', category: 'Perfiles de Inversión', ext: 'DOCX', icon: 'fa-folder-tree', description: 'Formato completo para la elaboración de perfiles de inversión pública según Invierte.pe.', version: '2026-v2', exampleDesc: 'Ejemplo de perfil completo para la construcción de un centro de salud de primer nivel en Ccatca.', usedByProjects: [{ projectId: '3', projectName: 'Ampliación de aulas — C.E. Inicial Los Andes' }] },
  { id: 'f08', name: 'Anexos de sustento técnico', category: 'Perfiles de Inversión', ext: 'ZIP', icon: 'fa-paperclip', description: 'Paquete de formatos para los anexos de sustento técnico del perfil de inversión.', version: '2026-v1', exampleDesc: 'Paquete de anexos completados para un perfil de inversión de saneamiento rural.', usedByProjects: [{ projectId: '3', projectName: 'Ampliación de aulas — C.E. Inicial Los Andes' }] },
  { id: 'f10', name: 'Estructura de Expediente Técnico', category: 'Expedientes Técnicos', ext: 'DOCX', icon: 'fa-file-contract', description: 'Estructura base para la elaboración de expedientes técnicos de obras públicas.', version: '2026-v2', exampleDesc: 'Ejemplo de expediente técnico estructurado para una losa deportiva multiusos.', usedByProjects: [] },
  { id: 'f11', name: 'Formato de metas físicas', category: 'Expedientes Técnicos', ext: 'XLSX', icon: 'fa-bullseye', description: 'Formato para el registro de metas físicas y cronograma de ejecución del proyecto.', version: '2026-v3', exampleDesc: 'Ejemplo de metas físicas y cronograma para un proyecto de ampliación de aulas.', usedByProjects: [{ projectId: '3', projectName: 'Ampliación de aulas — C.E. Inicial Los Andes' }] },
  { id: 'f12', name: 'Formato de Costos y Presupuestos', category: 'Costos y Presupuestos', ext: 'XLSX', icon: 'fa-coins', description: 'Plantilla para la elaboración del presupuesto referencial con análisis de precios unitarios.', version: '2026-v1', exampleDesc: 'Ejemplo de presupuesto referencial completo para un proyecto de agua potable rural.', usedByProjects: [] },
  { id: 'f13', name: 'Formato de Sostenibilidad', category: 'Sostenibilidad', ext: 'DOCX', icon: 'fa-leaf', description: 'Formato para documentar los arreglos institucionales de operación y mantenimiento.', version: '2026-v1', exampleDesc: 'Ejemplo de plan de sostenibilidad para una JASS de agua potable rural.', usedByProjects: [] },
]

export const FORMAT_CATEGORIES = ['Todos', 'IOARR', 'Fichas Técnicas', 'Perfiles de Inversión', 'Expedientes Técnicos', 'Costos y Presupuestos', 'Sostenibilidad']
