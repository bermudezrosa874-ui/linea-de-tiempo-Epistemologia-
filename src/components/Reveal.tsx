import type { ReactNode } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react'

interface RevealProps {
  children: ReactNode
  className?: string
}

/** Aparición gradual (opacidad + desplazamiento). Con movimiento reducido el contenido se muestra directamente. */
export function Reveal({ children, className }: RevealProps) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className={`reveal ${className ?? ''}`}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}
