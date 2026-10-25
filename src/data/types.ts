export interface ImageCredit {
  /** Título de la obra o del archivo. */
  title: string
  author: string
  /** Fecha de la obra, tal como se muestra al público. */
  date: string
  institution?: string
  license: string
  /** Enlace a la licencia cuando aplica (Creative Commons). */
  licenseUrl?: string
  /** Página de archivo en Wikimedia Commons. */
  pageUrl: string
  /** URL del archivo original en Wikimedia Commons. */
  sourceUrl: string
  /** Aclaración sobre la imagen (recorte, representación posterior, etc.). */
  note?: string
}

export interface TimelineImage {
  src: string
  width: number
  height: number
  alt: string
  caption: string
  credit: ImageCredit
}

export interface Figure {
  name: string
  years: string
  contribution: string
  /** Sin imagen: se muestra un marcador con iniciales. */
  image?: TimelineImage
  initials: string
}

export type ReferenceKind = 'general' | 'complementaria' | 'especifica'

export interface Reference {
  id: string
  kind: ReferenceKind
  authors: string
  year: number
  title: string
  /** Revista o publicación (se muestra en cursiva). */
  source: string
  volume?: string
  issue?: string
  pages: string
  url: string
  /** Qué cubre realmente la fuente, según lo verificado. */
  coverage: string
}

export type PeriodIcon = 'landmark' | 'church' | 'palette' | 'telescope' | 'users'

export interface Period {
  id: string
  number: number
  name: string
  dateLabel: string
  /** Primera oración de la descripción: se usa en la tarjeta. */
  summary: string
  /** Descripción completa: contexto histórico en el detalle. */
  description: string
  characteristics: string[]
  figures: Figure[]
  currentContribution: string
  /** Frase breve para el esquema final. */
  evolutionLabel: string
  image: TimelineImage
  icon: PeriodIcon
  /** Matiz de acento derivado de la paleta. */
  accent: string
}
