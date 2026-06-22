import { jsPDF } from 'jspdf'
import { SECTIONS } from '@/core/data/sections'

export function generateFichaPreviewUrl(currentStep: number): string {
  const doc = new jsPDF()
  const w = doc.internal.pageSize.getWidth()
  let y = 18

  const title = (t: string) => { doc.setFontSize(14); doc.setFont('helvetica', 'bold'); doc.text(t, w / 2, y, { align: 'center' }); y += 8 }
  const sub = (t: string) => { doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.setTextColor(22, 112, 143); doc.text(t, 20, y); doc.setTextColor(0); y += 6 }
  const label = (t: string) => { doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.setTextColor(100); doc.text(t, 20, y); doc.setTextColor(0); y += 5 }
  const value = (t: string, indent = 20) => { doc.setFontSize(10); doc.setFont('helvetica', 'normal'); const lines = doc.splitTextToSize(t || '—', w - indent - 20); doc.text(lines, indent, y); y += lines.length * 5 + 2 }
  const line = () => { doc.setDrawColor(220); doc.line(20, y, w - 20, y); y += 5 }
  const sp = () => { y += 3 }

  // Header
  doc.setDrawColor(22, 112, 143); doc.setLineWidth(1.5); doc.line(20, 12, w - 20, 12)
  title('FICHA TÉCNICA IOARR')
  doc.setFontSize(10); doc.setFont('helvetica', 'normal')
  doc.text('Mejoramiento del servicio de agua potable — C.P. San Juan', w / 2, y, { align: 'center' }); y += 5
  doc.text('CUI: 2654891 · Municipalidad Distrital de San Juan', w / 2, y, { align: 'center' }); y += 8
  line()

  // Sections
  SECTIONS.forEach((sec, idx) => {
    if (y > 260) { doc.addPage(); y = 20 }

    const isFilled = idx <= currentStep
    const sectionNum = `SECCIÓN ${idx + 1}: ${sec.title.toUpperCase()}`

    sub(sectionNum)

    if (isFilled) {
      sec.fields.forEach(f => {
        if (y > 265) { doc.addPage(); y = 20 }
        label(f.label)
        value(f.value || (f.ph ?? ''))
      })
    } else {
      doc.setFontSize(9); doc.setFont('helvetica', 'italic'); doc.setTextColor(180)
      doc.text('(Sección pendiente de completar)', 20, y)
      doc.setTextColor(0); y += 6
    }

    sp(); line()
  })

  // Footer
  if (y > 250) { doc.addPage(); y = 20 }
  y += 5
  doc.setDrawColor(22, 112, 143); doc.setLineWidth(0.5); doc.line(20, y, w - 20, y); y += 8
  doc.setFontSize(8); doc.setFont('helvetica', 'italic'); doc.setTextColor(150)
  doc.text('Documento generado automáticamente por INVIERTE Mentor — Previsualización en tiempo real', w / 2, y, { align: 'center' }); y += 4
  doc.text(`Generado el ${new Date().toLocaleDateString('es-PE')} · Estado: ${currentStep + 1} de ${SECTIONS.length} secciones completadas`, w / 2, y, { align: 'center' })

  return doc.output('datauristring')
}
