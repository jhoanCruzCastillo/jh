export interface InversionPublica {
  cui: string
  nombre: string
  sector: string
  funcion: string
  ubicacion: string
  departamento: string
  provincia: string
  distrito: string
  unidadEjecutora: string
  costoActualizado: string
  estado: string
  situacion: string
  tipoFormato: string
  icon: string
}

export const BANCO_INVERSIONES: InversionPublica[] = [
  {
    cui: '2654891', nombre: 'Mejoramiento del servicio de agua potable en el C.P. San Juan, distrito de San Juan',
    sector: 'Saneamiento', funcion: 'Vivienda y Desarrollo Urbano', ubicacion: 'San Juan, Quispicanchi, Cusco',
    departamento: 'Cusco', provincia: 'Quispicanchi', distrito: 'San Juan',
    unidadEjecutora: 'Municipalidad Distrital de San Juan', costoActualizado: 'S/ 485,200.00',
    estado: 'Activo', situacion: 'En formulación', tipoFormato: 'IOARR', icon: 'fa-droplet',
  },
  {
    cui: '2698410', nombre: 'Reposición de mobiliario escolar en la I.E. N° 1042 María Inmaculada',
    sector: 'Educación', funcion: 'Educación', ubicacion: 'Andahuaylillas, Quispicanchi, Cusco',
    departamento: 'Cusco', provincia: 'Quispicanchi', distrito: 'Andahuaylillas',
    unidadEjecutora: 'UGEL Quispicanchi', costoActualizado: 'S/ 128,500.00',
    estado: 'Activo', situacion: 'En formulación', tipoFormato: 'IOARR', icon: 'fa-chair',
  },
  {
    cui: '2712055', nombre: 'Ampliación del servicio educativo en el nivel inicial de la I.E. Los Andes',
    sector: 'Educación', funcion: 'Educación', ubicacion: 'Oropesa, Quispicanchi, Cusco',
    departamento: 'Cusco', provincia: 'Quispicanchi', distrito: 'Oropesa',
    unidadEjecutora: 'Municipalidad Distrital de Oropesa', costoActualizado: 'S/ 1,245,000.00',
    estado: 'Activo', situacion: 'En evaluación', tipoFormato: 'Perfil', icon: 'fa-school',
  },
  {
    cui: '2645320', nombre: 'Rehabilitación de la vía vecinal tramo II Cusco — Oropesa',
    sector: 'Transporte', funcion: 'Transporte', ubicacion: 'San Juan, Quispicanchi, Cusco',
    departamento: 'Cusco', provincia: 'Quispicanchi', distrito: 'San Juan',
    unidadEjecutora: 'Gobierno Regional de Cusco', costoActualizado: 'S/ 3,890,000.00',
    estado: 'Viable', situacion: 'Con expediente técnico', tipoFormato: 'Ficha Estándar', icon: 'fa-road',
  },
  {
    cui: '2601887', nombre: 'Reposición de equipamiento biomédico en la Posta Médica San Pedro',
    sector: 'Salud', funcion: 'Salud', ubicacion: 'San Pedro, Quispicanchi, Cusco',
    departamento: 'Cusco', provincia: 'Quispicanchi', distrito: 'San Pedro',
    unidadEjecutora: 'DIRESA Cusco', costoActualizado: 'S/ 215,800.00',
    estado: 'Viable', situacion: 'Aprobado', tipoFormato: 'IOARR', icon: 'fa-briefcase-medical',
  },
  {
    cui: '2730012', nombre: 'Mejoramiento del servicio de salud en el centro de salud Urcos',
    sector: 'Salud', funcion: 'Salud', ubicacion: 'Urcos, Quispicanchi, Cusco',
    departamento: 'Cusco', provincia: 'Quispicanchi', distrito: 'Urcos',
    unidadEjecutora: 'DIRESA Cusco', costoActualizado: 'S/ 4,520,000.00',
    estado: 'Activo', situacion: 'En formulación', tipoFormato: 'Perfil', icon: 'fa-hospital',
  },
  {
    cui: '2756001', nombre: 'Creación del servicio de protección contra inundaciones en el río Vilcanota, sector Huambutío',
    sector: 'Saneamiento', funcion: 'Ambiente', ubicacion: 'Huambutío, Quispicanchi, Cusco',
    departamento: 'Cusco', provincia: 'Quispicanchi', distrito: 'Lucre',
    unidadEjecutora: 'Autoridad Nacional del Agua', costoActualizado: 'S/ 8,200,000.00',
    estado: 'Activo', situacion: 'En formulación', tipoFormato: 'Perfil', icon: 'fa-water',
  },
  {
    cui: '2681234', nombre: 'Mejoramiento de la gestión integral de residuos sólidos municipales en el distrito de Ccatca',
    sector: 'Saneamiento', funcion: 'Ambiente', ubicacion: 'Ccatca, Quispicanchi, Cusco',
    departamento: 'Cusco', provincia: 'Quispicanchi', distrito: 'Ccatca',
    unidadEjecutora: 'Municipalidad Distrital de Ccatca', costoActualizado: 'S/ 2,150,000.00',
    estado: 'Activo', situacion: 'En evaluación', tipoFormato: 'Ficha Estándar', icon: 'fa-recycle',
  },
  {
    cui: '2799003', nombre: 'Instalación del servicio de energía eléctrica rural en comunidades altoandinas de Marcapata',
    sector: 'Energía', funcion: 'Energía', ubicacion: 'Marcapata, Quispicanchi, Cusco',
    departamento: 'Cusco', provincia: 'Quispicanchi', distrito: 'Marcapata',
    unidadEjecutora: 'Gobierno Regional de Cusco', costoActualizado: 'S/ 5,680,000.00',
    estado: 'Activo', situacion: 'En formulación', tipoFormato: 'Perfil', icon: 'fa-bolt',
  },
  {
    cui: '2745500', nombre: 'Mejoramiento del servicio educativo en la I.E. Secundaria Túpac Amaru de Quiquijana',
    sector: 'Educación', funcion: 'Educación', ubicacion: 'Quiquijana, Quispicanchi, Cusco',
    departamento: 'Cusco', provincia: 'Quispicanchi', distrito: 'Quiquijana',
    unidadEjecutora: 'UGEL Quispicanchi', costoActualizado: 'S/ 6,320,000.00',
    estado: 'Activo', situacion: 'En formulación', tipoFormato: 'Perfil', icon: 'fa-school',
  },
  {
    cui: '2688100', nombre: 'Construcción de losa deportiva multiusos en el C.P. Villa Sol',
    sector: 'Recreación', funcion: 'Cultura y Deporte', ubicacion: 'San Juan, Quispicanchi, Cusco',
    departamento: 'Cusco', provincia: 'Quispicanchi', distrito: 'San Juan',
    unidadEjecutora: 'Municipalidad Distrital de San Juan', costoActualizado: 'S/ 380,000.00',
    estado: 'Activo', situacion: 'En formulación', tipoFormato: 'Ficha Estándar', icon: 'fa-basketball',
  },
  {
    cui: '2510300', nombre: 'Mejoramiento y ampliación del sistema de riego tecnificado en las comunidades de Cusipata',
    sector: 'Agricultura', funcion: 'Agropecuaria', ubicacion: 'Cusipata, Quispicanchi, Cusco',
    departamento: 'Cusco', provincia: 'Quispicanchi', distrito: 'Cusipata',
    unidadEjecutora: 'MINAGRI — Sierra y Selva Exportadora', costoActualizado: 'S/ 2,870,000.00',
    estado: 'Viable', situacion: 'Con expediente técnico', tipoFormato: 'Perfil', icon: 'fa-tractor',
  },
]

export const FORMATOS_POR_TIPO: Record<string, string[]> = {
  IOARR: ['Ficha Técnica IOARR (Anexo 09)', 'Formato de registro IOARR'],
  'Ficha Estándar': ['Ficha Técnica Estándar', 'Formato de metas físicas'],
  Perfil: ['Perfil de Inversión Pública', 'Anexos de sustento técnico', 'Formato de metas físicas'],
}
