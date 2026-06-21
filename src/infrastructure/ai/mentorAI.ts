export function generateResponse(question: string): string {
  const s = question.toLowerCase()

  if (s.includes('ioarr') || s.includes('tipo de interv'))
    return 'IOARR agrupa 4 tipos de intervención: Optimización, Ampliación marginal, Reposición y Rehabilitación. En tu proyecto de agua potable, si solo repones componentes deteriorados sin aumentar la capacidad de diseño, corresponde "Reposición". ¿Revisamos juntos el activo a intervenir?'

  if (s.includes('problema'))
    return 'El problema central debe redactarse como una condición negativa, medible y referida al servicio. Por ejemplo: "Inadecuado acceso al servicio de agua potable en el C.P. San Juan". Evita incluir la solución en el enunciado. ¿Te ayudo a ordenar las causas y efectos?'

  if (s.includes('cui') || s.includes('código') || s.includes('codigo'))
    return 'El CUI es el Código Único de Inversiones, de 7 dígitos, que asigna el Banco de Inversiones al registrar la idea. Lo validamos automáticamente en la sección Datos Generales. Si aún no lo tienes, puedo guiarte en el registro.'

  if (s.includes('brecha'))
    return 'La brecha es la diferencia entre la demanda y la oferta del servicio, usando el indicador oficial del sector. Para agua potable suele expresarse como % de población sin acceso continuo. ¿Tienes el dato de cobertura actual para calcularla contigo?'

  if (s.includes('costo') || s.includes('presupuesto') || s.includes('monto'))
    return 'Los costos deben sustentarse en metas físicas y precios referenciales vigentes. Recuerda separar costos de inversión, expediente técnico y supervisión. ¿Quieres que te comparta una plantilla de presupuesto referencial?'

  if (s.includes('hola') || s.includes('gracias') || s.includes('buenas'))
    return '¡Con gusto! Estoy disponible 24/7 para acompañarte en cada sección de tu documento. ¿En qué parte de la ficha estás trabajando ahora mismo?'

  return 'Buena pregunta. Según los lineamientos de Invierte.pe, te recomiendo apoyarte en el formato guiado y revisar la sección correspondiente del asistente paso a paso. Puedo darte un ejemplo concreto o validar lo que ya escribiste, ¿qué prefieres?'
}
