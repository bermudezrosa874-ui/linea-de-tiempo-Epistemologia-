// Genera ATRIBUCIONES.md a partir de src/data/periods.ts (Node 22.18+ ejecuta TypeScript sin configuración).
import { writeFileSync } from 'node:fs'
import { periods } from '../src/data/periods.ts'

const lines = [
  '# Atribuciones de imágenes',
  '',
  'Todas las imágenes proceden de Wikimedia Commons y se alojan en `public/images/` (convertidas a WebP; los originales descargados se conservaron aparte como respaldo).',
  'La licencia indicada es la que figura en la página de archivo de Commons, revisada una por una.',
  '',
]

for (const period of periods) {
  lines.push(`## ${period.name}`, '')
  const entries = [
    ['Imagen principal', period.image],
    ...period.figures.flatMap((f) => (f.image ? [[f.name, f.image]] : [])),
  ]
  for (const [who, image] of entries) {
    const c = image.credit
    lines.push(
      `### ${who}`,
      `- **Archivo local:** \`public/${image.src}\``,
      `- **Título:** ${c.title}`,
      `- **Autor:** ${c.author}`,
      `- **Fecha:** ${c.date}`,
      ...(c.institution ? [`- **Institución:** ${c.institution}`] : []),
      `- **Licencia:** ${c.licenseUrl ? `[${c.license}](${c.licenseUrl})` : c.license}`,
      `- **Página de archivo:** <${c.pageUrl}>`,
      `- **URL de origen:** <${c.sourceUrl}>`,
      ...(c.note ? [`- **Nota:** ${c.note}`] : []),
      `- **Pie de imagen:** ${image.caption}`,
      '',
    )
  }
  for (const f of period.figures.filter((fig) => !fig.image)) {
    lines.push(
      `### ${f.name}`,
      '- **Sin imagen:** se usa un marcador con iniciales. La única foto candidata en Commons declara dominio público (`pd-old`) con autor desconocido y fuente en un sitio de divulgación, sin base verificable.',
      '',
    )
  }
}

lines.push(
  '## Cumplimiento de licencias',
  '',
  '- **CC BY 2.5 / CC BY-SA 2.5 / CC BY-SA 3.0:** se muestran autor y licencia con enlace en la sección «Créditos de imágenes» y en el pie de imagen. Las obras con CC BY-SA se comparten bajo la misma licencia.',
  '- **Dominio público:** se indica igualmente autor, institución y página de archivo.',
  '',
)

writeFileSync('ATRIBUCIONES.md', lines.join('\n'))
console.log('ATRIBUCIONES.md generado:', lines.length, 'líneas')
