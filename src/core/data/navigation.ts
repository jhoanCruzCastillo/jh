import type { NavItem, PerfilItem } from '../types'

export const NAV_ITEMS: NavItem[] = [
  { key: 'inicio', label: 'Inicio', icon: 'fa-house' },
  { key: 'proyectos', label: 'Mis Proyectos', icon: 'fa-folder-open' },
  { key: 'workspace', label: 'Documentación', icon: 'fa-file-pen' },
  { key: 'asistente', label: 'Asistente IA', icon: 'fa-robot' },
  { key: 'formatos', label: 'Formatos', icon: 'fa-layer-group' },
  { key: 'planes', label: 'Planes', icon: 'fa-gem' },
]

export const PERFILES: PerfilItem[] = [
  { key: 'estudiante', label: 'Estudiante', icon: 'fa-user-graduate', long: 'Estudiante en formación' },
  { key: 'consultor', label: 'Consultor', icon: 'fa-user-tie', long: 'Consultor independiente' },
  { key: 'organizacion', label: 'Organización', icon: 'fa-building', long: 'Equipo / Organización' },
]

export const VIEW_TITLES: Record<string, [string, string, string]> = {
  inicio: ['Inicio', 'fa-house', 'Inicio'],
  proyectos: ['Mis Proyectos', 'fa-folder-open', 'Inicio / Proyectos'],
  workspace: ['Documentación', 'fa-file-pen', 'Inicio / Documentación'],
  asistente: ['Asistente IA', 'fa-robot', 'Inicio / Mentor IA'],
  formatos: ['Formatos y Plantillas', 'fa-layer-group', 'Inicio / Formatos'],
  planes: ['Planes y Suscripción', 'fa-gem', 'Inicio / Planes'],
}
