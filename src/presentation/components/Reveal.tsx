import { useRef, type ReactNode, type CSSProperties } from 'react'
import { motion, useInView } from 'motion/react'

interface Props {
  children: ReactNode
  style?: CSSProperties
  className?: string
  delay?: number
}

export function Reveal({ children, style, className, delay = 0 }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.12 })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
