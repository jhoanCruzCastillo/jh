import { jsPDF } from 'jspdf'

let cached: string | null = null

export function getReglamentoPdfUrl(): string {
  if (cached) return cached

  const doc = new jsPDF()
  const w = doc.internal.pageSize.getWidth()
  let y = 20

  const title = (text: string) => { doc.setFontSize(16); doc.setFont('helvetica', 'bold'); doc.text(text, w / 2, y, { align: 'center' }); y += 10 }
  const subtitle = (text: string) => { doc.setFontSize(13); doc.setFont('helvetica', 'bold'); doc.text(text, 20, y); y += 8 }
  const body = (text: string) => { doc.setFontSize(11); doc.setFont('helvetica', 'normal'); const lines = doc.splitTextToSize(text, w - 40); doc.text(lines, 20, y); y += lines.length * 6 + 4 }
  const spacer = () => { y += 6 }

  doc.setDrawColor(22, 112, 143)
  doc.setLineWidth(1.5)
  doc.line(20, 14, w - 20, 14)

  title('REGLAMENTO ACADÉMICO')
  doc.setFontSize(11); doc.setFont('helvetica', 'normal'); doc.text('Diploma de Especialización Profesional — Semestre 2026', w / 2, y, { align: 'center' }); y += 6
  doc.text('Growth Corporation · Instituto ILPIIE', w / 2, y, { align: 'center' }); y += 12

  doc.setDrawColor(200, 200, 200); doc.line(20, y, w - 20, y); y += 8

  subtitle('Artículo 1: Objetivo')
  body('El presente reglamento tiene por objetivo establecer las normas y procedimientos que regulan las actividades académicas del Diploma de Especialización Profesional en Elaboración y Supervisión de Fichas Técnicas, Perfiles, Expedientes Técnicos y Formatos de Registros según el sistema Invierte.pe.')
  spacer()

  subtitle('Artículo 2: Duración y Modalidad')
  body('El programa tiene una duración de 19 semanas (19/04/2026 al 30/08/2026). Se desarrolla en modalidad virtual a través de la plataforma académica, combinando clases grabadas, clases en vivo y talleres prácticos.')
  spacer()

  subtitle('Artículo 3: Asistencia')
  body('Se requiere un mínimo de 80% de asistencia a las sesiones en vivo programadas. La asistencia se registra automáticamente al ingresar a la sala virtual. Las inasistencias justificadas deben comunicarse con 24 horas de anticipación al correo académico.')
  spacer()

  subtitle('Artículo 4: Evaluaciones')
  body('Las evaluaciones parciales y finales son de carácter obligatorio. La nota mínima aprobatoria es de 14 sobre 20. Las evaluaciones incluyen: exámenes de conocimientos, ejercicios prácticos de llenado de formatos y participación en talleres.')
  spacer()

  subtitle('Artículo 5: Horarios de Clases en Vivo')
  body('Las clases en vivo se realizan los días domingo de 8:00 PM a 10:00 PM (hora Perú - GMT-5). Las sesiones son grabadas y estarán disponibles en la plataforma dentro de las 48 horas posteriores.')

  doc.addPage()
  y = 20

  subtitle('Artículo 6: Materiales y Recursos')
  body('Los materiales del programa (presentaciones, formatos, lecturas obligatorias) se publican en la plataforma antes de cada sesión. Los alumnos son responsables de revisar el material previo a cada clase en vivo.')
  spacer()

  subtitle('Artículo 7: Certificación')
  body('Al aprobar satisfactoriamente todos los módulos del programa, se otorga un Certificado Digital de Especialización avalado por Growth Corporation y el Instituto Latinoamericano de Proyectos de Inversión, Ingeniería y Economía (ILPIIE). El certificado tiene validez profesional.')
  spacer()

  subtitle('Artículo 8: Conducta Académica')
  body('Se espera respeto y profesionalismo en todas las interacciones dentro de la plataforma y las sesiones en vivo. El plagio, la copia en evaluaciones y cualquier conducta que atente contra la integridad académica será motivo de expulsión del programa sin derecho a reembolso.')
  spacer()

  subtitle('Artículo 9: Soporte Técnico')
  body('Los alumnos cuentan con soporte técnico a través del grupo de WhatsApp del programa y del correo soporte@corporaciongrowth.com. El horario de atención es de lunes a viernes de 9:00 AM a 6:00 PM.')
  spacer()

  subtitle('Artículo 10: Disposiciones Finales')
  body('Cualquier situación no contemplada en el presente reglamento será resuelta por la Dirección Académica del programa. Growth Corporation se reserva el derecho de modificar el cronograma o contenido del programa, notificando oportunamente a los participantes.')
  spacer()
  spacer()

  doc.setDrawColor(200, 200, 200); doc.line(20, y, w - 20, y); y += 10
  doc.setFontSize(10); doc.setFont('helvetica', 'italic')
  doc.text('© 2026 Growth Corporation — Todos los derechos reservados.', w / 2, y, { align: 'center' }); y += 5
  doc.text('Instituto Latinoamericano de Proyectos de Inversión, Ingeniería y Economía — ILPIIE', w / 2, y, { align: 'center' })

  cached = doc.output('datauristring')
  return cached
}
