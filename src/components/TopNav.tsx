import type { ReactNode } from 'react'
import { LazyMotion, domAnimation, m, useScroll } from 'motion/react'
import { BookOpen, ListOrdered } from 'lucide-react'
import { periods } from '../data/periods'

interface NavItem {
  id: string
  label: string
  /** Contenido compacto (celular): número del período o icono. */
  short: ReactNode
}

const ITEMS: NavItem[] = [
  ...periods.map((p) => ({ id: p.id, label: p.name, short: String(p.number) })),
  { id: 'resumen', label: 'Resumen', short: <ListOrdered aria-hidden="true" size={20} /> },
  { id: 'referencias', label: 'Referencias', short: <BookOpen aria-hidden="true" size={20} /> },
]

export function TopNav({ activeId }: { activeId: string | null }) {
  const { scrollYProgress } = useScroll()

  return (
    <nav
      aria-label="Navegación por períodos"
      className="sticky top-0 z-40 border-b border-detail bg-paper/95 backdrop-blur"
    >
      <ul className="m-0 mx-auto flex max-w-6xl list-none items-center justify-between gap-0.5 px-3 py-1.5 lg:justify-center lg:gap-1">
        {ITEMS.map((item) => {
          const active = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? 'location' : undefined}
                className={`flex h-11 w-11 items-center justify-center rounded-full text-base font-semibold no-underline transition-colors lg:h-11 lg:w-auto lg:rounded-md lg:border-b-[3px] lg:px-3 ${
                  active
                    ? 'bg-brand text-white lg:border-brand lg:bg-transparent lg:text-ink'
                    : 'text-ink hover:bg-detail lg:border-transparent'
                }`}
              >
                <span aria-hidden="true" className="lg:hidden">
                  {item.short}
                </span>
                <span className="sr-only lg:not-sr-only">{item.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
      <LazyMotion features={domAnimation} strict>
        <m.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-brand"
          style={{ scaleX: scrollYProgress }}
        />
      </LazyMotion>
    </nav>
  )
}
