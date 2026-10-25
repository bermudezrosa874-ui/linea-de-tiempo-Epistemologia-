import type { Reference, ReferenceKind } from '../data/types'
import { references } from '../data/references'
import { site } from '../data/site'

const GROUPS: { kind: ReferenceKind; title: string; hint: string }[] = [
  { kind: 'general', title: 'Fuentes generales', hint: 'Respaldan el recorrido completo.' },
  { kind: 'especifica', title: 'Fuentes específicas', hint: 'Respaldan un período concreto.' },
  { kind: 'complementaria', title: 'Lectura complementaria', hint: 'Contexto adicional; no respalda los períodos europeos.' },
]

/** Formato APA 7: Autor, A. (año). Título. *Revista, volumen*(número), páginas. URL */
function ApaCitation({ reference: r }: { reference: Reference }) {
  return (
    <>
      {r.authors} ({r.year}). {r.title}.{' '}
      <i>
        {r.source}
        {r.volume ? `, ${r.volume}` : ''}
      </i>
      {r.issue ? (r.volume ? `(${r.issue})` : `, (${r.issue})`) : ''}, {r.pages}.{' '}
      <a href={r.url} target="_blank" rel="noreferrer" className="break-all">
        {r.url}
      </a>
    </>
  )
}

export function References() {
  return (
    <section id="referencias" aria-labelledby="referencias-titulo" className="scroll-mt-20 px-4 pb-20 pt-8">
      <div className="mx-auto max-w-3xl">
        <h2 id="referencias-titulo" className="mb-4 text-3xl font-bold sm:text-4xl">
          Referencias bibliográficas
        </h2>
        <p className="mb-8 rounded-lg border border-detail bg-card px-4 py-3">
          <strong className="text-ink">Nota de rigor.</strong> {site.rigorNote}
        </p>

        {GROUPS.map((group) => {
          const items = references.filter((r) => r.kind === group.kind)
          if (items.length === 0) return null
          return (
            <div key={group.kind} className="mb-8">
              <h3 className="text-xl font-semibold">{group.title}</h3>
              <p className="mb-3 text-sm text-muted">{group.hint}</p>
              <ul className="m-0 list-none space-y-4 p-0">
                {items.map((r) => (
                  <li key={r.id} className="pl-8 -indent-8">
                    <ApaCitation reference={r} />
                    <span className="mt-1 block pl-8 text-sm text-muted">{r.coverage}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
