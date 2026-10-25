import { periods } from '../data/periods'
import { site } from '../data/site'
import { Reveal } from './Reveal'

export function EvolutionSummary() {
  return (
    <section id="resumen" aria-labelledby="resumen-titulo" className="scroll-mt-20 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 id="resumen-titulo" className="mb-10 text-center text-3xl font-bold sm:text-4xl">
          {site.evolutionTitle}
        </h2>
        <ol className="evolution">
          {periods.map((period, index) => (
            <li key={period.id} className="evolution-step">
              <span className="evolution-dot" aria-hidden="true">
                {index + 1}
              </span>
              <h3 className="text-xl font-semibold">{period.name}</h3>
              <p>{period.evolutionLabel}</p>
            </li>
          ))}
        </ol>
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="card">
            <h3 className="mb-3 text-2xl font-semibold">Conclusión</h3>
            <p>{site.conclusion}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
