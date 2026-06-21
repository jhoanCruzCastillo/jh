import type { PlanDef, AddonDef, FormatGroup, Taller } from '../types'

export const PLANS: PlanDef[] = [
  {
    key: 'estudiante', name: 'Entrenamiento', tagline: 'Aprende practicando',
    price: 'S/ 49', period: '/mes', cta: 'Empezar',
    features: [
      'Cursos y ejercicios prácticos',
      'Plantillas y formatos guiados',
      'Mentor IA: 30 consultas al mes',
      '1 proyecto de documentación activo',
      'Comunidad de estudiantes',
    ],
  },
  {
    key: 'consultor', name: 'Profesional', tagline: 'Elabora con respaldo experto',
    price: 'S/ 129', period: '/mes', cta: 'Mejorar plan',
    features: [
      'Todo lo de Entrenamiento',
      'Mentor IA ilimitado 24/7',
      'Validaciones automáticas Invierte.pe',
      'Hasta 10 proyectos activos',
      'Exporta a Word / PDF oficial',
      '2 asesorías humanas al mes',
    ],
  },
  {
    key: 'organizacion', name: 'Corporativo', tagline: 'Para equipos e instituciones',
    price: 'Personalizado', period: '', cta: 'Contactar ventas',
    features: [
      'Todo lo de Profesional',
      'Usuarios y proyectos ilimitados',
      'Trabajo colaborativo por equipos',
      'Panel de supervisión y reportes',
      'Consultoría especializada dedicada',
      'Capacitación in-house',
    ],
  },
]

export const ADDONS: AddonDef[] = [
  { icon: 'fa-user-tie', t: 'Consultoría individual', d: 'Sesión 1 a 1 con un especialista en formulación Invierte.pe.' },
  { icon: 'fa-users-gear', t: 'Ampliación de usuarios', d: 'Suma integrantes a tu plan corporativo según tu equipo.' },
  { icon: 'fa-gauge-high', t: 'Ampliación de capacidad', d: 'Más proyectos activos y almacenamiento para tu cuenta.' },
]

export const FORMATOS: FormatGroup[] = [
  { cat: 'IOARR', icon: 'fa-screwdriver-wrench', items: [{ n: 'Ficha Técnica IOARR (Anexo N° 09)', ext: 'XLSX' }, { n: 'Formato de registro IOARR', ext: 'PDF' }] },
  { cat: 'Fichas Técnicas', icon: 'fa-file-lines', items: [{ n: 'Ficha Técnica Estándar', ext: 'XLSX' }, { n: 'Ficha Técnica Simplificada', ext: 'DOCX' }] },
  { cat: 'Perfiles de Inversión', icon: 'fa-folder-tree', items: [{ n: 'Perfil de Inversión Pública', ext: 'DOCX' }, { n: 'Anexos de sustento técnico', ext: 'ZIP' }] },
  { cat: 'Expedientes Técnicos', icon: 'fa-file-contract', items: [{ n: 'Estructura de Expediente Técnico', ext: 'DOCX' }, { n: 'Formato de metas físicas', ext: 'XLSX' }] },
]

export const TALLERES: Taller[] = [
  { day: '24', mon: 'jun', title: 'Clase en vivo: IOARR — Taller práctico', time: '8:00 PM - 10:00 PM', docente: 'José Herrera Jara', status: 'POR REALIZAR', stColor: '#0f5d78', stBg: '#e3f1f5' },
  { day: '28', mon: 'jun', title: 'Fichas Técnicas según Invierte.pe', time: '7:00 PM - 9:00 PM', docente: 'Eduardo Rivas Warthon', status: 'INSCRITO', stColor: '#2e9a3d', stBg: '#e6f5e9' },
  { day: '02', mon: 'jul', title: 'Costos y metas físicas en proyectos', time: '8:00 PM - 10:00 PM', docente: 'José Herrera Jara', status: 'POR REALIZAR', stColor: '#0f5d78', stBg: '#e3f1f5' },
]

export const QUICK_PROMPTS = [
  '¿Qué tipo de IOARR corresponde a mi proyecto?',
  '¿Cómo redacto el problema central?',
  '¿Cómo calculo la brecha del servicio?',
  '¿Qué debo incluir en los costos?',
]
