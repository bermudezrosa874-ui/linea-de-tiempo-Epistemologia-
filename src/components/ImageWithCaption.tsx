import { ExternalLink } from 'lucide-react'
import type { ImageCredit, TimelineImage } from '../data/types'
import { asset } from '../lib/asset'

/** Autor, licencia y enlace al archivo original para saber a quién pertenece la imagen. */
export function CreditLine({ credit }: { credit: ImageCredit }) {
  return (
    <span>
      Imagen: {credit.author}; {credit.license}.{' '}
      <a href={credit.pageUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">
        Ver archivo
        <ExternalLink aria-hidden="true" size={13} />
        <span className="sr-only"> (se abre en una pestaña nueva)</span>
      </a>
    </span>
  )
}

interface ImageWithCaptionProps {
  image: TimelineImage
  /** Primera pantalla: se carga sin diferir. */
  eager?: boolean
}

export function ImageWithCaption({ image, eager = false }: ImageWithCaptionProps) {
  return (
    <figure className="img-figure m-0">
      <div className="img-frame">
        <img
          className="card-img"
          src={asset(image.src)}
          width={image.width}
          height={image.height}
          alt={image.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'auto' : 'async'}
        />
      </div>
      <figcaption className="mt-2 text-sm leading-snug text-muted">
        <span className="text-body">{image.caption}</span> <CreditLine credit={image.credit} />
      </figcaption>
    </figure>
  )
}
