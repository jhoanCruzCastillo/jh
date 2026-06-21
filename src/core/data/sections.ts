import type { SectionDef } from '../types'

export const SECTIONS: SectionDef[] = [
  {
    key: 'datos', title: 'Datos Generales', icon: 'fa-id-card',
    desc: 'Identifica la inversión con los datos básicos registrados en el Banco de Inversiones.',
    fields: [
      { label: 'Nombre de la inversión', full: true, value: 'Mejoramiento del servicio de agua potable en el C.P. San Juan, distrito de San Juan', isText: true, ok: true, hint: 'Estructura Invierte.pe: naturaleza de intervención + servicio + localización.' },
      { label: 'Código Único de Inversiones (CUI)', value: '2654891', isText: true, ok: true, hint: '7 dígitos asignados por el Banco de Inversiones.' },
      { label: 'Tipo de documento', isSelect: true, options: ['Ficha Técnica IOARR', 'Ficha Técnica Estándar', 'Perfil de Inversión'], value: 'Ficha Técnica IOARR' },
      { label: 'Entidad / Unidad Ejecutora', value: 'Municipalidad Distrital de San Juan', isText: true, ok: true },
      { label: 'Responsable de la formulación', value: '', isText: true, warn: true, ph: 'Nombre y N° de colegiatura', hint: 'Campo requerido por el formato. Completa nombre y colegiatura.' },
    ],
    tips: ['Verifica que el nombre siga la estructura: naturaleza + objeto + localización.', 'El CUI se valida automáticamente contra el Banco de Inversiones.'],
    checks: [{ t: 'Nombre con estructura válida', ok: true }, { t: 'CUI verificado (7 dígitos)', ok: true }, { t: 'Responsable de formulación', ok: false }],
  },
  {
    key: 'ident', title: 'Identificación', icon: 'fa-location-dot',
    desc: 'Define la unidad productora y la localización geográfica de la intervención.',
    fields: [
      { label: 'Unidad productora del servicio', full: true, value: 'Sistema de agua potable del C.P. San Juan', isText: true, ok: true },
      { label: 'Departamento', isSelect: true, options: ['Cusco', 'Lima', 'Arequipa', 'Puno'], value: 'Cusco' },
      { label: 'Provincia', isSelect: true, options: ['Quispicanchi', 'Calca', 'Urubamba'], value: 'Quispicanchi' },
      { label: 'Distrito', isSelect: true, options: ['San Juan', 'Andahuaylillas', 'Oropesa'], value: 'San Juan' },
      { label: 'Población beneficiaria', value: '1,240 habitantes', isText: true, ok: true, hint: 'Según último censo o padrón de usuarios.' },
    ],
    tips: ['La localización debe coincidir con el código de ubigeo registrado en el CUI.', 'Sustenta la población beneficiaria con una fuente verificable.'],
    checks: [{ t: 'Ubigeo coincide con el CUI', ok: true }, { t: 'Unidad productora definida', ok: true }, { t: 'Fuente de población citada', ok: false }],
  },
  {
    key: 'diag', title: 'Diagnóstico', icon: 'fa-stethoscope',
    desc: 'Describe la situación actual del servicio y mide la brecha existente.',
    fields: [
      { label: 'Descripción de la situación actual', full: true, area: true, value: 'El C.P. San Juan cuenta con un sistema de agua potable con más de 20 años de antigüedad. La captación y las redes de distribución presentan deterioro, generando continuidad limitada y pérdidas de agua.', ok: true },
      { label: 'Indicador de brecha', value: '', isText: true, warn: true, ph: 'Ej. % de población sin acceso continuo', hint: 'Usa el indicador oficial del sector (cobertura/continuidad).' },
      { label: 'Fuente de información', value: 'Diagnóstico de campo 2025', isText: true },
    ],
    tips: ['La brecha = diferencia entre demanda y oferta del servicio, con el indicador oficial del sector.', 'Para agua potable suele expresarse como % de cobertura o de continuidad.'],
    checks: [{ t: 'Situación actual descrita', ok: true }, { t: 'Indicador de brecha definido', ok: false }, { t: 'Fuentes citadas', ok: true }],
  },
  {
    key: 'prob', title: 'Definición del Problema', icon: 'fa-circle-question',
    desc: 'Formula el problema central como una condición negativa, medible y referida al servicio.',
    fields: [
      { label: 'Problema central', full: true, area: true, value: 'Inadecuado e insuficiente acceso al servicio de agua potable de la población del C.P. San Juan.', ok: true, hint: 'No incluyas la solución en el enunciado.' },
      { label: 'Causas directas', area: true, value: 'Infraestructura de captación y redes deterioradas; inadecuada gestión del servicio.', full: true },
      { label: 'Efectos', area: true, value: '', warn: true, full: true, ph: 'Describe los efectos sobre la población', hint: 'Relaciona los efectos con salud y calidad de vida.' },
    ],
    tips: ['El problema central debe ser una condición negativa, evitando incluir la solución.', 'Encadena causas y efectos de forma lógica (árbol de problemas).'],
    checks: [{ t: 'Problema redactado correctamente', ok: true }, { t: 'Causas identificadas', ok: true }, { t: 'Efectos completos', ok: false }],
  },
  {
    key: 'plant', title: 'Planteamiento IOARR', icon: 'fa-screwdriver-wrench',
    desc: 'Selecciona el tipo de intervención IOARR y describe técnicamente la actuación.',
    fields: [
      { label: 'Tipo de intervención IOARR', isSelect: true, options: ['Optimización', 'Ampliación marginal', 'Reposición', 'Rehabilitación'], value: 'Reposición', full: true },
      { label: 'Activo estratégico a intervenir', value: 'Captación y red de distribución de agua potable', isText: true, ok: true, full: true },
      { label: 'Descripción técnica de la intervención', full: true, area: true, value: 'Reposición de la línea de captación, reservorio y redes de distribución que han superado su vida útil, sin ampliar la capacidad de diseño existente.', ok: true },
    ],
    tips: ['Si solo repones componentes deteriorados sin aumentar capacidad, corresponde "Reposición".', 'La descripción técnica debe ser consistente con el activo y el tipo IOARR elegido.'],
    checks: [{ t: 'Tipo IOARR coherente con la intervención', ok: true }, { t: 'Activo estratégico definido', ok: true }, { t: 'Descripción técnica sustentada', ok: true }],
  },
  {
    key: 'costos', title: 'Costos y Metas', icon: 'fa-coins',
    desc: 'Registra el monto de inversión, las metas físicas y el cronograma de ejecución.',
    fields: [
      { label: 'Monto de inversión (S/)', value: '485,200.00', isText: true, ok: true },
      { label: 'Metas físicas', value: '1.2 km de red, 1 reservorio 25 m³', isText: true, ok: true },
      { label: 'Fecha de inicio', value: '01/09/2026', isText: true },
      { label: 'Fecha de fin', value: '28/02/2027', isText: true },
    ],
    tips: ['Sustenta los costos en metas físicas y precios referenciales vigentes.', 'Separa costos de inversión, expediente técnico y supervisión.'],
    checks: [{ t: 'Monto sustentado en metas', ok: true }, { t: 'Cronograma definido', ok: true }, { t: 'Costos por componente', ok: true }],
  },
  {
    key: 'sost', title: 'Sostenibilidad', icon: 'fa-leaf',
    desc: 'Asegura la operación y mantenimiento del servicio una vez ejecutada la inversión.',
    fields: [
      { label: 'Responsable de operación y mantenimiento', full: true, value: 'JASS del C.P. San Juan', isText: true, ok: true },
      { label: 'Arreglos institucionales', full: true, area: true, value: 'La municipalidad transferirá la infraestructura a la JASS, que asumirá la operación y mantenimiento financiada con la cuota familiar.', ok: true },
      { label: 'Comentarios finales de revisión', full: true, area: true, value: '', ph: 'Notas finales antes de enviar a revisión', hint: 'Revisa la consistencia entre todas las secciones antes de finalizar.' },
    ],
    tips: ['Define quién operará y mantendrá el servicio y con qué recursos.', 'Realiza una revisión final de consistencia entre todas las secciones.'],
    checks: [{ t: 'Responsable de O&M definido', ok: true }, { t: 'Financiamiento de O&M sustentado', ok: true }, { t: 'Revisión final de consistencia', ok: false }],
  },
]
