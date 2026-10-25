import { useRef } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion, useScroll } from 'motion/react'
import { Church, Landmark, Palette, Telescope, Users, type LucideIcon } from 'lucide-react'
import { periods } from '../data/periods'
import type { PeriodIcon } from '../data/types'
import { PeriodCard } from './PeriodCard'
import { Reveal } from './Reveal'

const ICONS: Record<PeriodIcon, LucideIcon> = {
  landmark: Landmark,
  church: Church,
  palette: Palette,
  telescope: Telescope,
  users: Users,
}

interface TimelineProps {
  /** Índice del período activo; `periods.length` indica que ya se pasó el último. */
  activeIndex: number
  openIds: ReadonlySet<string>
  onToggle: (id: string) => void
}

export function Timeline({ activeIndex, openIds, onToggle }: TimelineProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 65%', 'end 65%'] })

  return (
    <div ref={listRef} className="timeline">
      <div className="timeline-line" aria-hidden="true" />
      <LazyMotion features={domAnimation} strict>
        <m.div
          className="timeline-line-fill"
          aria-hidden="true"
          style={reduced ? undefined : { scaleY: scrollYProgress }}
        />
      </LazyMotion>
      <ol className="timeline-list">
        {periods.map((period, index) => {
          const Icon = ICONS[period.icon]
          const state = index < activeIndex ? 'passed' : index === activeIndex ? 'active' : 'upcoming'
          return (
            <li key={period.id} id={period.id} className="timeline-item scroll-mt-20">
              <span className="timeline-node" data-state={state} aria-hidden="true">
                <Icon size={20} />
              </span>
              <Reveal className="timeline-card">
                <PeriodCard
                  period={period}
                  open={openIds.has(period.id)}
                  onToggle={() => onToggle(period.id)}
                  eagerImage={false}
                />
              </Reveal>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
