import type { CourseDef, CertificateDef, DigitalBookDef } from '../types'

export const INSTRUCTOR_AVATARS: Record<string, string> = {
  'Eduardo Rivas Warthon': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&q=80',
  'José Herrera Jara': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&q=80',
}

export const COURSES: CourseDef[] = [
  {
    id: 'diploma-01',
    title: 'Elaboración y Supervisión de Fichas Técnicas, Perfiles, Expedientes Técnicos y Formatos de Registros, según el Invierte.pe',
    instructor: 'Eduardo Rivas Warthon',
    instructorEmail: 'erivas@corporaciongrowth.com',
    duration: '19/04/2026 al 30/08/2026',
    status: 'en_curso',
    statusLabel: 'EN CURSO',
    students: 99,
    progress: 45,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop&q=80',
    modules: [
      { title: 'Introducción al sistema Invierte.pe', type: 'video', duration: '45 min', completed: true },
      { title: 'Marco normativo vigente', type: 'video', duration: '1h 20 min', completed: true },
      { title: 'Clase en vivo 1: Fundamentos IOARR', type: 'live', duration: '2h', completed: true },
      { title: 'Clase en vivo 2: Fichas Técnicas Estándar', type: 'live', duration: '2h', completed: true },
      { title: 'Ejercicio práctico: Llenado de Ficha IOARR', type: 'exercise', duration: '1h 30 min', completed: true },
      { title: 'Clase en vivo 3: Perfiles de Inversión', type: 'live', duration: '2h', completed: false },
      { title: 'Clase en vivo 4: IOARR — Taller práctico', type: 'live', duration: '2h', completed: false },
      { title: 'Clase en vivo 5: Fichas Técnicas avanzadas', type: 'live', duration: '2h', completed: false },
      { title: 'Expedientes Técnicos: estructura y contenido', type: 'video', duration: '1h 10 min', completed: false },
      { title: 'Ejercicio práctico: Expediente completo', type: 'exercise', duration: '2h', completed: false },
      { title: 'Costos y metas físicas en proyectos', type: 'video', duration: '55 min', completed: false },
      { title: 'Evaluación final', type: 'exam', duration: '1h', completed: false },
    ],
  },
  {
    id: 'curso-02',
    title: 'Formulación de Proyectos de Inversión Pública — Nivel Básico',
    instructor: 'José Herrera Jara',
    instructorEmail: 'jherrera@corporaciongrowth.com',
    duration: '01/03/2026 al 15/04/2026',
    status: 'completado',
    statusLabel: 'COMPLETADO',
    students: 75,
    progress: 100,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop&q=80',
    modules: [
      { title: 'Conceptos básicos de inversión pública', type: 'video', duration: '40 min', completed: true },
      { title: 'Ciclo de inversión Invierte.pe', type: 'video', duration: '50 min', completed: true },
      { title: 'Identificación del problema', type: 'live', duration: '2h', completed: true },
      { title: 'Evaluación final', type: 'exam', duration: '45 min', completed: true },
    ],
  },
  {
    id: 'curso-03',
    title: 'Gestión de Operación y Mantenimiento post inversión',
    instructor: 'Eduardo Rivas Warthon',
    instructorEmail: 'erivas@corporaciongrowth.com',
    duration: '01/09/2026 al 30/10/2026',
    status: 'por_iniciar',
    statusLabel: 'POR INICIAR',
    students: 42,
    progress: 0,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=250&fit=crop&q=80',
    modules: [
      { title: 'Introducción a O&M', type: 'video', duration: '35 min', completed: false },
      { title: 'Planes de sostenibilidad', type: 'video', duration: '50 min', completed: false },
      { title: 'Taller práctico: Plan de O&M', type: 'live', duration: '2h', completed: false },
      { title: 'Evaluación final', type: 'exam', duration: '40 min', completed: false },
    ],
  },
]

export const CERTIFICATES: CertificateDef[] = [
  {
    id: 'cert-01',
    name: 'Formulación de Proyectos de Inversión Pública — Nivel Básico',
    date: '18/04/2026',
    courseId: 'curso-02',
  },
]

export const DIGITAL_BOOKS: DigitalBookDef[] = [
  { id: 'book-01', title: 'Guía de Formulación Invierte.pe 2026', author: 'MEF Perú', format: 'PDF', activated: true },
  { id: 'book-02', title: 'Manual de IOARR — Conceptos y aplicación', author: 'Eduardo Rivas Warthon', format: 'PDF', activated: true },
  { id: 'book-03', title: 'Costos y Presupuestos en Proyectos Públicos', author: 'José Herrera Jara', format: 'PDF', activated: false },
]

export const COURSE_TABS = [
  { key: 'cursos', label: 'Mis Cursos', icon: 'fa-book-open' },
  { key: 'calendario', label: 'Calendario', icon: 'fa-calendar-days' },
  { key: 'certificados', label: 'Certificados', icon: 'fa-certificate' },
  { key: 'libros', label: 'Libros Digitales', icon: 'fa-book' },
]
