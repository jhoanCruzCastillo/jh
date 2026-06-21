import type { CourseDef, CertificateDef, DigitalBookDef } from '../types'

export const INSTRUCTOR_AVATARS: Record<string, string> = {
  'Eduardo Rivas Warthon': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&q=80',
  'José Herrera Jara': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&q=80',
}

export const INSTRUCTOR_BIOS: Record<string, { photo: string; bio: string }> = {
  'José Herrera Jara': {
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&q=80',
    bio: 'Past Decano del Colegio de Economistas de Lima. Economista por la PUCP. Especialista en Proyectos de Inversión (ILPIIE), con más de 25 años de experiencia en el sector público y privado. Presidente del ILPIIE y CEO Growth Corporation.',
  },
  'Eduardo Rivas Warthon': {
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=400&fit=crop&q=80',
    bio: 'Especialista en formulación y supervisión de proyectos de inversión pública bajo el sistema Invierte.pe. Consultor con amplia experiencia en elaboración de fichas técnicas, perfiles y expedientes técnicos.',
  },
}

export const DIPLOMA_LINKS = [
  { label: 'Grupos Privados: NET', icon: 'fa-users' },
  { label: 'Reglamento Académico', icon: 'fa-file-shield' },
  { label: 'Video Navegación Plataforma', icon: 'fa-circle-play' },
  { label: 'Cronograma Académico', icon: 'fa-calendar-days' },
]

export const COURSES: CourseDef[] = [
  {
    id: 'diploma-01',
    title: 'Elaboración y Supervisión de Fichas Técnicas, Perfiles, Expedientes Técnicos y Formatos de Registros, según el Invierte.pe',
    instructor: 'José Herrera Jara',
    instructorEmail: 'jherrera@corporaciongrowth.com',
    duration: '19/04/2026 al 30/08/2026',
    status: 'en_curso',
    statusLabel: 'EN CURSO',
    students: 99,
    progress: 45,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop&q=80',
    modules: [
      {
        id: 'm1', title: 'Normativa del Invierte.pe',
        sessions: [
          { id: 's1', title: 'Marco Normativo General', docente: 'José Herrera Jara', classes: [
            { title: 'Video 1: Introducción al Invierte.pe', type: 'video', completed: true },
            { title: 'Video 2: Ciclo de inversión', type: 'video', completed: true },
            { title: 'Video 3: Roles y actores del sistema', type: 'video', completed: true },
          ], readings: [
            { title: 'Decreto Legislativo N° 1252', file: 'PDF' },
            { title: 'Directiva General del Invierte.pe', file: 'PDF' },
          ]},
          { id: 's2', title: 'Programación Multianual', docente: 'José Herrera Jara', classes: [
            { title: 'Video 1: Conceptos de programación', type: 'video', completed: true },
            { title: 'Video 2: PMI y cartera de inversiones', type: 'video', completed: true },
          ], readings: [
            { title: 'Guía de PMI - MEF', file: 'PDF' },
          ]},
        ],
      },
      {
        id: 'm2', title: 'Términos de Referencia para Servicios de Consultoría en General y Consultoría de Obras',
        sessions: [
          { id: 's3', title: 'Estructura de TDR', docente: 'Eduardo Rivas Warthon', classes: [
            { title: 'Video 1: Componentes del TDR', type: 'video', completed: true },
            { title: 'Video 2: Alcances y entregables', type: 'video', completed: true },
            { title: 'Clase en vivo: Taller de TDR', type: 'live', completed: true },
          ], readings: [
            { title: 'Modelo de TDR - OSCE', file: 'DOCX' },
          ]},
        ],
      },
      {
        id: 'm3', title: 'Preparación de la Cartera de Inversiones para el PMI',
        sessions: [
          { id: 's4', title: 'Identificación de Activos', docente: 'José Herrera Jara', classes: [
            { title: 'Video 1: Activos estratégicos', type: 'video', completed: true },
          ], readings: [] },
          { id: 's5', title: 'Priorización de inversiones', docente: 'José Herrera Jara', classes: [
            { title: 'Video 1: Criterios de priorización', type: 'video', completed: false },
            { title: 'Taller práctico de priorización', type: 'taller', completed: false },
          ], readings: [
            { title: 'Formato de priorización PMI', file: 'XLSX' },
          ]},
          { id: 's6', title: 'Fase de Programación Multianual de Inversiones', docente: 'José Herrera Jara', classes: [
            { title: 'Video 1: Marco normativo de la PMI', type: 'video', completed: false },
            { title: 'Video 2: Etapas de la programación', type: 'video', completed: false },
            { title: 'Video 3: Criterios para la PMI', type: 'video', completed: false },
          ], readings: [
            { title: 'PMI - S1 Marco Normativo', file: 'PDF' },
            { title: 'PMI - S2 Etapas del PMI', file: 'PDF' },
            { title: 'PMI - S3 Criterios para el PMI', file: 'PDF' },
          ]},
        ],
      },
      {
        id: 'm4', title: 'Identificación de Activos Estratégicos y Otros Gastos de Capital',
        sessions: [
          { id: 's7', title: 'Clasificación de activos', docente: 'Eduardo Rivas Warthon', classes: [
            { title: 'Video 1: Tipos de activos', type: 'video', completed: false },
            { title: 'Clase en vivo: Casos prácticos', type: 'live', completed: false },
          ], readings: [] },
        ],
      },
      {
        id: 'm5', title: 'Inversiones IOARR (Optimización, Ampliación, Reposición, Rehabilitación)',
        sessions: [
          { id: 's8', title: 'Conceptos IOARR', docente: 'José Herrera Jara', classes: [
            { title: 'Video 1: ¿Qué es una IOARR?', type: 'video', completed: false },
            { title: 'Video 2: Tipos de intervención', type: 'video', completed: false },
            { title: 'Clase en vivo: Taller IOARR', type: 'live', completed: false },
          ], readings: [
            { title: 'Ficha Técnica IOARR - Anexo 09', file: 'XLSX' },
          ]},
        ],
      },
      {
        id: 'm6', title: 'Elaboración de Fichas Técnicas según el Invierte.pe',
        sessions: [
          { id: 's9', title: 'Ficha Técnica Estándar', docente: 'Eduardo Rivas Warthon', classes: [
            { title: 'Video 1: Estructura de la ficha', type: 'video', completed: false },
            { title: 'Video 2: Llenado paso a paso', type: 'video', completed: false },
            { title: 'Clase en vivo: Fichas Técnicas', type: 'live', completed: false },
          ], readings: [
            { title: 'Formato Ficha Técnica Estándar', file: 'XLSX' },
          ]},
        ],
      },
      {
        id: 'm7', title: 'Elaboración y Supervisión de Perfiles de Inversión',
        sessions: [
          { id: 's10', title: 'Estructura del perfil', docente: 'José Herrera Jara', classes: [
            { title: 'Video 1: Componentes del perfil', type: 'video', completed: false },
            { title: 'Clase en vivo: Perfiles de inversión', type: 'live', completed: false },
          ], readings: [] },
        ],
      },
      {
        id: 'm8', title: 'Formatos y Registros en la fase de Formulación y Evaluación',
        sessions: [
          { id: 's11', title: 'Registros en el Banco de Inversiones', docente: 'Eduardo Rivas Warthon', classes: [
            { title: 'Video 1: Banco de Inversiones', type: 'video', completed: false },
            { title: 'Video 2: Formatos de registro', type: 'video', completed: false },
          ], readings: [
            { title: 'Guía de registro - MEF', file: 'PDF' },
          ]},
        ],
      },
      {
        id: 'm9', title: 'Elaboración y Supervisión de Expedientes Técnicos',
        sessions: [
          { id: 's12', title: 'Estructura del expediente', docente: 'José Herrera Jara', classes: [
            { title: 'Video 1: Componentes del ET', type: 'video', completed: false },
            { title: 'Taller: Expediente completo', type: 'taller', completed: false },
            { title: 'Examen final', type: 'examen', completed: false },
          ], readings: [
            { title: 'Formato de Expediente Técnico', file: 'DOCX' },
          ]},
        ],
      },
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
      {
        id: 'b1', title: 'Conceptos básicos de inversión pública',
        sessions: [
          { id: 'bs1', title: 'Fundamentos', docente: 'José Herrera Jara', classes: [
            { title: 'Video: Introducción', type: 'video', completed: true },
            { title: 'Video: Marco legal', type: 'video', completed: true },
          ], readings: [{ title: 'Lectura introductoria', file: 'PDF' }] },
        ],
      },
      {
        id: 'b2', title: 'Ciclo de inversión Invierte.pe',
        sessions: [
          { id: 'bs2', title: 'Fases del ciclo', docente: 'José Herrera Jara', classes: [
            { title: 'Video: Fases del ciclo', type: 'video', completed: true },
            { title: 'Clase en vivo: Casos', type: 'live', completed: true },
          ], readings: [] },
        ],
      },
      {
        id: 'b3', title: 'Identificación del problema',
        sessions: [
          { id: 'bs3', title: 'Diagnóstico', docente: 'José Herrera Jara', classes: [
            { title: 'Video: Árbol de problemas', type: 'video', completed: true },
            { title: 'Taller práctico', type: 'taller', completed: true },
          ], readings: [] },
        ],
      },
      {
        id: 'b4', title: 'Evaluación final',
        sessions: [
          { id: 'bs4', title: 'Examen', docente: 'José Herrera Jara', classes: [
            { title: 'Examen final', type: 'examen', completed: true },
          ], readings: [] },
        ],
      },
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
      {
        id: 'o1', title: 'Introducción a O&M',
        sessions: [
          { id: 'os1', title: 'Fundamentos de O&M', docente: 'Eduardo Rivas Warthon', classes: [
            { title: 'Video: Conceptos de O&M', type: 'video', completed: false },
          ], readings: [{ title: 'Guía de O&M - MEF', file: 'PDF' }] },
        ],
      },
      {
        id: 'o2', title: 'Planes de sostenibilidad',
        sessions: [
          { id: 'os2', title: 'Sostenibilidad del servicio', docente: 'Eduardo Rivas Warthon', classes: [
            { title: 'Video: Plan de sostenibilidad', type: 'video', completed: false },
            { title: 'Taller: Plan de O&M', type: 'taller', completed: false },
            { title: 'Examen final', type: 'examen', completed: false },
          ], readings: [] },
        ],
      },
    ],
  },
]

export const CERTIFICATES: CertificateDef[] = [
  { id: 'cert-01', name: 'Formulación de Proyectos de Inversión Pública — Nivel Básico', date: '18/04/2026', courseId: 'curso-02' },
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
