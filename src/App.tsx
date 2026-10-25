import { useCallback, useEffect, useState } from 'react'
import { periods } from './data/periods'
import { site } from './data/site'
import { useActivePeriod } from './hooks/useActivePeriod'
import { EvolutionSummary } from './components/EvolutionSummary'
import { Header } from './components/Header'
import { References } from './components/References'
import { Timeline } from './components/Timeline'
import { TopNav } from './components/TopNav'

const SECTION_IDS = ['inicio', ...periods.map((p) => p.id), 'resumen', 'referencias'] as const

export default function App() {
  const activeId = useActivePeriod(SECTION_IDS)
  // Se permite abrir varios períodos a la vez: cada botón controla solo su propio panel.
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(new Set())

  const toggle = useCallback((id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (!next.delete(id)) next.add(id)
      return next
    })
  }, [])

  // Si la página se abre con un hash (#renacimiento), se coloca en ese período.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  const index = periods.findIndex((p) => p.id === activeId)
  const activeIndex = activeId === 'resumen' || activeId === 'referencias' ? periods.length : index

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar al contenido
      </a>
      <TopNav activeId={activeId} />
      <Header />
      <main id="contenido" tabIndex={-1} className="outline-none">
        <div className="mx-auto max-w-6xl px-4 pb-8">
          <Timeline activeIndex={activeIndex} openIds={openIds} onToggle={toggle} />
        </div>
        <EvolutionSummary />
        <References />
      </main>
      <footer className="border-t border-detail bg-card px-4 py-6 text-ink">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
          <p className="text-sm font-semibold">{site.course}</p>
          <p className="font-serif text-base">{site.author}</p>
        </div>
      </footer>
    </>
  )
}
