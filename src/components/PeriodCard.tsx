import type { CSSProperties } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Period } from '../data/types'
import { ImageWithCaption } from './ImageWithCaption'
import { PeriodDetail } from './PeriodDetail'

interface PeriodCardProps {
  period: Period
  open: boolean
  onToggle: () => void
  eagerImage: boolean
}

export function PeriodCard({ period, open, onToggle, eagerImage }: PeriodCardProps) {
  const titleId = `${period.id}-titulo`
  const panelId = `${period.id}-detalle`

  return (
    <article
      className="card card-period"
      style={{ '--accent': period.accent } as CSSProperties}
      aria-labelledby={titleId}
    >
      <p className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-muted">
        <span className="period-tag">Período {period.number}</span>
        <span>{period.dateLabel}</span>
      </p>
      <h2 id={titleId} className="mb-4 text-3xl font-bold">
        {period.name}
      </h2>
      <ImageWithCaption image={period.image} eager={eagerImage} />
      <p className="mt-4">{period.summary}</p>

      <button
        type="button"
        className="btn-accent mt-4 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-5 py-2 font-semibold"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        {open ? 'Cerrar período' : 'Explorar período'}
        <ChevronDown className="chevron" aria-hidden="true" size={18} />
      </button>

      <div className="detail" data-open={open}>
        <div className="detail-inner">
          <div id={panelId} role="region" aria-labelledby={titleId} inert={!open}>
            <PeriodDetail period={period} />
          </div>
        </div>
      </div>
    </article>
  )
}
