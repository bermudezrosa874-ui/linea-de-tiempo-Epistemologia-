import type { Reference } from './types'

/**
 * Datos bibliográficos verificados el 24-oct-2026:
 * - Guichot Reina: página del artículo en la revista (título, autora, volumen, número, páginas).
 * - Patiño Millán: DOI resuelto a la página de la revista y confirmado con Crossref.
 * - Fru-Ngongban: metadatos confirmados con Crossref (DOI propio de la editorial).
 */
export const references: Reference[] = [
  {
    id: 'guichot-2006',
    kind: 'general',
    authors: 'Guichot Reina, V.',
    year: 2006,
    title:
      'Historia de la educación: reflexiones sobre su objeto, ubicación epistemológica, devenir histórico y tendencias actuales',
    source: 'Latinoamericana de Estudios Educativos',
    volume: '2',
    issue: '1',
    pages: '11–51',
    url: 'https://revistasojs.ucaldas.edu.co/index.php/latinoamericana/article/view/5788',
    coverage:
      'Analiza el objeto de la historia de la educación y sintetiza su historiografía y sus tendencias actuales. Se usa como lectura general del recorrido completo.',
  },
  {
    id: 'patino-2014',
    kind: 'complementaria',
    authors: 'Patiño Millán, C.',
    year: 2014,
    title: 'Apuntes para una historia de la educación en Colombia',
    source: 'Actualidades Pedagógicas',
    issue: '64',
    pages: '261–264',
    url: 'https://doi.org/10.19052/ap.3209',
    coverage:
      'Trata la historia de la educación en Colombia. Es lectura complementaria de contexto; no respalda los períodos europeos de esta línea de tiempo.',
  },
  {
    id: 'fru-ngongban-2023',
    kind: 'especifica',
    authors: 'Fru-Ngongban, A. C.',
    year: 2023,
    title:
      'Eclectic teaching method: A paradigm shift in contemporary pedagogy for an inclusive classroom',
    source: 'Asian Journal of Education and Social Studies',
    volume: '48',
    issue: '1',
    pages: '1–6',
    url: 'https://doi.org/10.9734/ajess/2023/v48i11033',
    coverage:
      'Según su título, trata el método de enseñanza ecléctico en la pedagogía contemporánea y el aula inclusiva. Solo se asocia con la Edad Contemporánea (inclusión).',
  },
]
