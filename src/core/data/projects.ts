import type { Project } from '../types'

export const SEED_PROJECTS: Project[] = [
  { id: '1', name: 'Mejoramiento del servicio de agua potable — C.P. San Juan', type: 'Ficha Técnica IOARR', status: 'En progreso', progress: 60, date: 'Editado hoy', icon: 'fa-droplet' },
  { id: '2', name: 'Reposición de mobiliario — I.E. N° 1042', type: 'IOARR', status: 'En progreso', progress: 35, date: 'Editado ayer', icon: 'fa-chair' },
  { id: '3', name: 'Ampliación de aulas — C.E. Inicial Los Andes', type: 'Perfil de Inversión', status: 'Con observaciones', progress: 80, date: 'Hace 3 días', icon: 'fa-school' },
  { id: '4', name: 'Rehabilitación de vía vecinal — Tramo II', type: 'Ficha Técnica Estándar', status: 'Completado', progress: 100, date: '15 jun 2026', icon: 'fa-road' },
  { id: '5', name: 'Expediente técnico — Losa deportiva multiusos', type: 'Expediente Técnico', status: 'Borrador', progress: 15, date: '10 jun 2026', icon: 'fa-basketball' },
  { id: '6', name: 'Reposición de equipos — Posta médica San Pedro', type: 'IOARR', status: 'Completado', progress: 100, date: '02 jun 2026', icon: 'fa-briefcase-medical' },
]
