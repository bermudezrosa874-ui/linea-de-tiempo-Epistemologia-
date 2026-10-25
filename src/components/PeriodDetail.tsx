import type { Period } from '../data/types'
import { FigureCard } from './FigureCard'

export function PeriodDetail({ period }: { period: Period }) {
  return (
    <div className="mt-5 space-y-6 border-t border-detail pt-5">
      <section>
        <h3 className="mb-2 text-xl font-semibold">Contexto histórico</h3>
        <p>{period.description}</p>
      </section>

      <section>
        <h3 className="mb-2 text-xl font-semibold">Características principales</h3>
        <ul className="accent-list list-disc space-y-1 pl-5">
          {period.characteristics.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-3 text-xl font-semibold">Representantes</h3>
        <ul className="m-0 grid list-none gap-3 p-0">
          {period.figures.map((figure) => (
            <FigureCard key={figure.name} figure={figure} />
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-2 text-xl font-semibold">Aporte a la pedagogía actual</h3>
        <p>{period.currentContribution}</p>
      </section>
    </div>
  )
}
