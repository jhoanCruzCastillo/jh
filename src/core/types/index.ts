export type ViewKey = 'inicio' | 'proyectos' | 'workspace' | 'asistente' | 'formatos' | 'planes'

export type PerfilKey = 'estudiante' | 'consultor' | 'organizacion'

export type ProjectStatus = 'En progreso' | 'Con observaciones' | 'Completado' | 'Borrador'

export type ProyTabKey = 'todos' | 'progreso' | 'observaciones' | 'completado'

export interface NavItem {
  key: ViewKey
  label: string
  icon: string
}

export interface PerfilItem {
  key: PerfilKey
  label: string
  icon: string
  long: string
}

export interface KPI {
  icon: string
  label: string
  value: string
  color: string
  bg: string
}

export interface Taller {
  day: string
  mon: string
  title: string
  time: string
  docente: string
  status: string
  stColor: string
  stBg: string
}

export interface Project {
  id: string
  name: string
  type: string
  status: ProjectStatus
  progress: number
  date: string
  icon: string
}

export interface FieldDef {
  label: string
  full?: boolean
  value: string
  isText?: boolean
  isSelect?: boolean
  area?: boolean
  ok?: boolean
  warn?: boolean
  ph?: string
  hint?: string
  options?: string[]
}

export interface CheckDef {
  t: string
  ok: boolean
}

export interface SectionDef {
  key: string
  title: string
  icon: string
  desc: string
  fields: FieldDef[]
  tips: string[]
  checks: CheckDef[]
}

export interface PlanDef {
  key: string
  name: string
  tagline: string
  price: string
  period: string
  cta: string
  features: string[]
}

export interface AddonDef {
  icon: string
  t: string
  d: string
}

export interface FormatItem {
  n: string
  ext: string
}

export interface FormatGroup {
  cat: string
  icon: string
  items: FormatItem[]
}

export interface ChatMessage {
  id: string
  from: 'user' | 'bot'
  text: string
  timestamp: number
}
