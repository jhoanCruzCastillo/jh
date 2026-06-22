import { jsPDF } from 'jspdf'

const cache = new Map<string, string>()

export function getBasesPdfUrl(projectName: string, cui: string): string {
  const key = cui
  if (cache.has(key)) return cache.get(key)!

  const doc = new jsPDF()
  const w = doc.internal.pageSize.getWidth()
  let y = 20

  const title = (t: string) => { doc.setFontSize(15); doc.setFont('helvetica', 'bold'); doc.text(t, w / 2, y, { align: 'center' }); y += 10 }
  const sub = (t: string) => { doc.setFontSize(12); doc.setFont('helvetica', 'bold'); doc.text(t, 20, y); y += 7 }
  const body = (t: string) => { doc.setFontSize(10.5); doc.setFont('helvetica', 'normal'); const l = doc.splitTextToSize(t, w - 40); doc.text(l, 20, y); y += l.length * 5.5 + 4 }
  const sp = () => { y += 5 }

  doc.setDrawColor(22, 112, 143); doc.setLineWidth(1.5); doc.line(20, 14, w - 20, 14)

  title('BASES DEL PROCESO DE SELECCIÓN')
  doc.setFontSize(10); doc.setFont('helvetica', 'normal')
  doc.text(`Proyecto: ${projectName}`, w / 2, y, { align: 'center' }); y += 5
  doc.text(`CUI: ${cui}`, w / 2, y, { align: 'center' }); y += 10
  doc.setDrawColor(200, 200, 200); doc.line(20, y, w - 20, y); y += 8

  sub('1. ENTIDAD CONVOCANTE')
  body('Municipalidad Distrital correspondiente, en el marco de la Ley de Contrataciones del Estado y su Reglamento, convoca al presente proceso de selección para la contratación de servicios de consultoría.')
  sp()

  sub('2. OBJETO DE LA CONTRATACIÓN')
  body(`Contratación del servicio de consultoría para la elaboración del estudio de preinversión y/o expediente técnico del proyecto "${projectName}", registrado en el Banco de Inversiones con CUI ${cui}.`)
  sp()

  sub('3. VALOR REFERENCIAL')
  body('El valor referencial asciende a la suma indicada en el cuadro de presupuesto del proyecto, incluyendo todos los impuestos de ley. El valor referencial ha sido calculado al mes de la convocatoria.')
  sp()

  sub('4. REQUISITOS DEL POSTOR')
  body('a) Estar inscrito en el Registro Nacional de Proveedores (RNP) con vigencia al momento de la presentación de ofertas.')
  body('b) Contar con experiencia mínima de 3 años en la elaboración de estudios de preinversión o expedientes técnicos similares.')
  body('c) Presentar equipo técnico conformado por al menos un jefe de proyecto con colegiatura vigente.')
  sp()

  sub('5. PLAZO DE EJECUCIÓN')
  body('El plazo de ejecución del servicio es de sesenta (60) días calendario, computados a partir del día siguiente de la suscripción del contrato.')
  sp()

  sub('6. SISTEMA DE CONTRATACIÓN')
  body('Suma alzada, de conformidad con lo establecido en el artículo correspondiente del Reglamento de la Ley de Contrataciones del Estado.')
  sp()

  sub('7. CRONOGRAMA DEL PROCESO')
  body('Convocatoria: Fecha de publicación en el SEACE.')
  body('Registro de participantes: Desde el día siguiente de la convocatoria.')
  body('Presentación de ofertas: Según calendario del SEACE.')
  body('Otorgamiento de la Buena Pro: Según calendario del SEACE.')

  doc.addPage(); y = 20

  sub('8. CONTENIDO MÍNIMO DEL ESTUDIO')
  body('El consultor deberá elaborar el estudio siguiendo los lineamientos del sistema Invierte.pe, incluyendo:')
  body('a) Identificación del problema central, causas y efectos.')
  body('b) Diagnóstico de la situación actual con datos verificables.')
  body('c) Planteamiento de la alternativa de solución.')
  body('d) Costos de inversión a precios de mercado y sociales.')
  body('e) Evaluación social del proyecto.')
  body('f) Plan de sostenibilidad y arreglos institucionales.')
  sp()

  sub('9. FORMA DE PAGO')
  body('Primer pago (30%): A la aprobación del primer entregable (diagnóstico e identificación).')
  body('Segundo pago (30%): A la aprobación del segundo entregable (formulación y evaluación).')
  body('Pago final (40%): A la aprobación del estudio completo por la OPI o UF correspondiente.')
  sp()

  sub('10. PENALIDADES')
  body('Por cada día de atraso injustificado en la entrega de los productos, se aplicará una penalidad equivalente al 0.5% del monto total del contrato, hasta un máximo del 10%.')
  sp()

  sub('11. DISPOSICIONES FINALES')
  body('Todo lo no previsto en las presentes bases se regirá por la Ley de Contrataciones del Estado, su Reglamento y las disposiciones complementarias vigentes.')
  sp(); sp()

  doc.setDrawColor(200, 200, 200); doc.line(20, y, w - 20, y); y += 8
  doc.setFontSize(9); doc.setFont('helvetica', 'italic')
  doc.text('Documento generado como ejemplo para fines de prototipo.', w / 2, y, { align: 'center' })

  const url = doc.output('datauristring')
  cache.set(key, url)
  return url
}
