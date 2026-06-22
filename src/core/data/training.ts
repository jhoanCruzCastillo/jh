export interface TrainingExercise {
  id: string
  title: string
  format: string
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado'
  description: string
  scenario: string
  sections: number
  estimatedTime: string
  score: number | null
  status: 'disponible' | 'en_progreso' | 'completado'
  icon: string
}

export const TRAINING_EXERCISES: TrainingExercise[] = [
  {
    id: 'ex-01',
    title: 'Ficha IOARR — Reposición de mobiliario escolar',
    format: 'Ficha Técnica IOARR',
    difficulty: 'Básico',
    description: 'Aprende a llenar una Ficha Técnica IOARR paso a paso con un caso práctico de reposición de mobiliario en una institución educativa.',
    scenario: 'La I.E. N° 5042 en Villa María del Triunfo necesita reponer 120 carpetas deterioradas con más de 15 años de uso. El director ha solicitado apoyo para elaborar la documentación.',
    sections: 5,
    estimatedTime: '45 min',
    score: 85,
    status: 'completado',
    icon: 'fa-chair',
  },
  {
    id: 'ex-02',
    title: 'Ficha IOARR — Mejoramiento de sistema de agua potable',
    format: 'Ficha Técnica IOARR',
    difficulty: 'Intermedio',
    description: 'Practica el llenado completo de una IOARR para un proyecto de mejoramiento de agua potable en zona rural.',
    scenario: 'El C.P. Huayllabamba cuenta con un sistema de agua potable de 18 años con redes deterioradas. La captación es insuficiente y hay pérdidas del 40%. La municipalidad requiere elaborar la ficha técnica.',
    sections: 7,
    estimatedTime: '1h 15 min',
    score: null,
    status: 'en_progreso',
    icon: 'fa-droplet',
  },
  {
    id: 'ex-03',
    title: 'Perfil de Inversión — Construcción de centro de salud',
    format: 'Perfil de Inversión',
    difficulty: 'Avanzado',
    description: 'Elabora un perfil de inversión pública completo para la construcción de un establecimiento de salud de primer nivel.',
    scenario: 'El distrito de Ccatca no cuenta con un establecimiento de salud adecuado. La población de 8,500 habitantes se atiende en un local provisional. Se requiere un perfil completo con estudio de demanda, alternativas y evaluación social.',
    sections: 9,
    estimatedTime: '2h',
    score: null,
    status: 'disponible',
    icon: 'fa-hospital',
  },
  {
    id: 'ex-04',
    title: 'Ficha Técnica Estándar — Rehabilitación de vía vecinal',
    format: 'Ficha Técnica Estándar',
    difficulty: 'Intermedio',
    description: 'Completa una ficha técnica estándar para un proyecto de rehabilitación de camino vecinal con sustento técnico.',
    scenario: 'El tramo San Juan — Oropesa (4.2 km) presenta deterioro severo por lluvias. La vía es la única conexión para 3 comunidades. La municipalidad provincial necesita la ficha técnica para gestionar la inversión.',
    sections: 7,
    estimatedTime: '1h',
    score: null,
    status: 'disponible',
    icon: 'fa-road',
  },
  {
    id: 'ex-05',
    title: 'Formato de registro IOARR — Equipamiento biomédico',
    format: 'Formato de registro',
    difficulty: 'Básico',
    description: 'Aprende a completar el formato de registro de una IOARR en el Banco de Inversiones con un caso de equipamiento médico.',
    scenario: 'La Posta de Salud San Pedro requiere reponer su equipo de ecografía y autoclave que superaron su vida útil. Se debe registrar la IOARR en el Banco de Inversiones.',
    sections: 4,
    estimatedTime: '30 min',
    score: null,
    status: 'disponible',
    icon: 'fa-briefcase-medical',
  },
  {
    id: 'ex-06',
    title: 'Expediente Técnico — Losa deportiva multiusos',
    format: 'Expediente Técnico',
    difficulty: 'Avanzado',
    description: 'Estructura un expediente técnico completo incluyendo memoria descriptiva, presupuesto, cronograma y planos.',
    scenario: 'El C.P. Villa Sol ha obtenido viabilidad para la construcción de una losa deportiva de 800 m². Se requiere elaborar el expediente técnico de acuerdo a la normativa vigente.',
    sections: 8,
    estimatedTime: '2h 30 min',
    score: null,
    status: 'disponible',
    icon: 'fa-basketball',
  },
]

export const DIFFICULTY_STYLES: Record<string, [string, string]> = {
  'Básico': ['#2e9a3d', '#e6f5e9'],
  'Intermedio': ['#e0922f', '#fff4e6'],
  'Avanzado': ['#c0392b', '#fbe9e7'],
}
