# Evolución histórica de la pedagogía — línea de tiempo interactiva

Página educativa con una línea de tiempo
sobre los cinco períodos de la pedagogía: Antigüedad, Edad Media, Renacimiento, Modernidad y Edad Contemporánea.

## Requisitos

- Node.js 20 o superior (probado con Node 24) y npm.

## Instalación y uso

```powershell
npm install
npm run dev       # servidor de desarrollo (http://localhost:5173)
npm run build     # comprueba tipos (tsc --noEmit) y genera dist/
npm run preview   # sirve dist/ en http://localhost:4173
```

## Estructura

```
src/
  components/  Header, TopNav, Timeline, PeriodCard, PeriodDetail, FigureCard,
               ImageWithCaption, EvolutionSummary, References, Reveal
  data/        periods.ts (todo el contenido académico), references.ts, site.ts (textos fijos), types.ts
  hooks/       useActivePeriod.ts (IntersectionObserver)
  lib/         asset.ts
  styles/      index.css (tema y base), timeline.css
public/images/ imágenes WebP por período
scripts/       commons.py, fetch_images.py, process-images.mjs (obtención de imágenes), verify.mjs (pruebas)
ATRIBUCIONES.md
```

## Decisiones de diseño

- **Tableta (640–1023 px):** usa la maqueta móvil (línea a la izquierda, tarjeta a la derecha) con tarjetas más anchas. Desde 1024 px la línea pasa al centro y las tarjetas se alternan.
- **«Explorar período»:** se pueden abrir varios períodos a la vez; cada botón controla solo su panel (`aria-expanded` / `aria-controls`). El panel colapsado es `inert`.
- **Animación del desplegable:** la altura se anima con `grid-template-rows` (única excepción a «solo transform y opacidad»); el resto usa `transform`, `opacity` o cambios de color.
- **Movimiento reducido:** sin entrada animada, sin desplazamiento suave, sin transiciones.
- **Fuentes:** Playfair Display y Source Sans 3 autoalojadas con `@fontsource` (`font-display: swap`).

## Verificación

Con `npm run preview` en marcha: `node scripts/verify.mjs` (requiere `npx playwright install chromium`). Guarda capturas y un PDF en `verificacion/`.
