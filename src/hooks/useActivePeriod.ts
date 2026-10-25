import { useEffect, useState } from 'react'

/**
 * Devuelve el id de la sección que cruza la «zona de lectura» (franja entre el 35 % y el 45 %
 * de la altura de la ventana). Entre dos secciones conserva la última detectada.
 */
export function useActivePeriod(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const visible = new Map<string, boolean>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting)
        const current = ids.find((id) => visible.get(id))
        if (current) setActive(current)
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])

  return active
}
