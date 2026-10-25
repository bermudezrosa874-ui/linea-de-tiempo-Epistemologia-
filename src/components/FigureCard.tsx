import type { Figure } from '../data/types'
import { asset } from '../lib/asset'
import { CreditLine } from './ImageWithCaption'

export function FigureCard({ figure }: { figure: Figure }) {
  const { image } = figure
  return (
    <li className="figure-card img-figure flex gap-4 rounded-xl border border-detail bg-paper p-3">
      <div className="img-frame shrink-0 self-start">
        {image ? (
          <img
            className="portrait"
            src={asset(image.src)}
            width={image.width}
            height={image.height}
            alt={image.alt}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            role="img"
            aria-label={`Sin retrato disponible de ${figure.name}: marcador con sus iniciales`}
            className="portrait portrait-placeholder font-serif text-2xl font-semibold text-ink"
          >
            {figure.initials}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <h4 className="text-lg font-semibold">{figure.name}</h4>
        <p className="text-sm font-semibold text-muted">({figure.years})</p>
        <p className="mt-1">{figure.contribution}</p>
        <p className="mt-1 text-sm text-muted">
          {image ? (
            <>
              {image.caption} <CreditLine credit={image.credit} />
            </>
          ) : (
            'Sin retrato con licencia verificable: se muestran sus iniciales.'
          )}
        </p>
      </div>
    </li>
  )
}
