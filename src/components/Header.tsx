import { site } from '../data/site'

export function Header() {
  return (
    <header id="inicio" className="px-4 pb-12 pt-14 text-center sm:pt-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-balance text-3xl font-bold sm:text-5xl">{site.title}</h1>
        <span aria-hidden="true" className="mx-auto my-6 block h-1 w-32 rounded bg-brand" />
        <p className="font-serif text-xl italic text-ink sm:text-2xl">{site.subtitle}</p>
        <p className="mt-6">{site.intro}</p>
        <p className="mt-4 rounded-lg border border-detail bg-card px-4 py-3 text-base text-muted">
          {site.dateNote}
        </p>
      </div>
    </header>
  )
}
