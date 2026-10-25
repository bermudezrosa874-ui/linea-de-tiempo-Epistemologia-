// Verificación real contra `npm run preview` (http://localhost:4173). Guarda capturas y PDF en ./verificacion
import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'

const BASE = 'http://localhost:4173/'
const OUT = 'verificacion'
const IDS = ['antiguedad', 'edad-media', 'renacimiento', 'modernidad', 'edad-contemporanea']
mkdirSync(OUT, { recursive: true })

const results = []
const check = (name, ok, detail = '') => {
  results.push({ name, ok })
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`)
}

const browser = await chromium.launch()

async function newPage(width, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, ...opts })
  const page = await ctx.newPage()
  const problems = []
  const external = []
  page.on('console', (m) => ['error', 'warning'].includes(m.type()) && problems.push(`console.${m.type()}: ${m.text()}`))
  page.on('pageerror', (e) => problems.push('pageerror: ' + e.message))
  page.on('requestfailed', (r) => problems.push('requestfailed: ' + r.url()))
  page.on('request', (r) => {
    const u = new URL(r.url())
    if (u.protocol.startsWith('http') && u.hostname !== 'localhost') external.push(r.url())
  })
  return { page, ctx, problems, external }
}

async function scrollThrough(page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < h; y += 500) {
    await page.evaluate((v) => window.scrollTo(0, v), y)
    await page.waitForTimeout(120)
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(300)
}

// 1. Anchuras: sin scroll horizontal, consola limpia, imágenes, capturas
for (const w of [1440, 1024, 768, 430, 390, 360]) {
  const { page, ctx, problems, external } = await newPage(w)
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await scrollThrough(page)
  const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }))
  check(`[${w}px] sin scroll horizontal`, m.sw <= m.iw, `scrollWidth=${m.sw} innerWidth=${m.iw}`)
  const broken = await page.evaluate(() =>
    [...document.images].filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.src),
  )
  check(`[${w}px] imágenes sin romper`, broken.length === 0, broken.join(', '))
  check(`[${w}px] consola/red sin errores`, problems.length === 0, problems.join(' | '))
  check(`[${w}px] sin peticiones externas`, external.length === 0, external.join(', '))
  await page.screenshot({ path: `${OUT}/full-${w}.png`, fullPage: true })
  await ctx.close()
}

// 2. Menú, resaltado, hash y desplegables (escritorio)
{
  const { page, ctx, problems } = await newPage(1440)
  await page.goto(BASE, { waitUntil: 'networkidle' })
  for (const id of IDS) {
    await page.locator(`nav a[href="#${id}"]`).click()
    await page.waitForTimeout(1500)
    const cur = await page.locator('nav a[aria-current="location"]').getAttribute('href')
    const top = await page.evaluate((i) => Math.round(document.getElementById(i).getBoundingClientRect().top), id)
    check(`menú lleva a ${id} y lo resalta`, cur === `#${id}` && top >= 0 && top < 400, `activo=${cur} top=${top}`)
  }
  const states = await page.evaluate(() => [...document.querySelectorAll('.timeline-node')].map((n) => n.dataset.state))
  check('nodos: pasados/activo según scroll', states[4] === 'active' && states.slice(0, 4).every((s) => s === 'passed'), states.join(','))

  await page.goto(BASE, { waitUntil: 'networkidle' })
  for (const id of IDS) {
    const btn = page.locator(`#${id} button[aria-expanded]`)
    await btn.scrollIntoViewIfNeeded()
    await btn.click()
    await page.waitForTimeout(700)
    const open = await btn.getAttribute('aria-expanded')
    const txt = await page.locator(`#${id} .detail`).innerText()
    const full = ['Contexto histórico', 'Características principales', 'Representantes', 'Aporte a la pedagogía actual'].every((t) => txt.includes(t))
    check(`explorar ${id}: abre con contenido completo`, open === 'true' && full && (await btn.innerText()).includes('Cerrar'))
  }
  const openCount = await page.locator('button[aria-expanded="true"]').count()
  check('se permiten varios períodos abiertos a la vez', openCount === 5, `abiertos=${openCount}`)
  await scrollThrough(page)
  const brokenOpen = await page.evaluate(() =>
    [...document.images].filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.src),
  )
  check('con todos los períodos abiertos: 18 imágenes cargan', brokenOpen.length === 0 && (await page.locator('img').count()) === 18, brokenOpen.join(', '))
  await page.screenshot({ path: `${OUT}/expandido-1440.png`, fullPage: true })
  for (const id of IDS) {
    const btn = page.locator(`#${id} button[aria-expanded]`)
    await btn.click()
    await page.waitForTimeout(500)
    check(`explorar ${id}: cierra`, (await btn.getAttribute('aria-expanded')) === 'false')
  }
  check('sin errores tras interactuar', problems.length === 0, problems.join(' | '))
  await ctx.close()
}

// 3. Hash inicial
{
  const { page, ctx } = await newPage(1440)
  await page.goto(BASE + '#renacimiento', { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)
  const top = await page.evaluate(() => Math.round(document.getElementById('renacimiento').getBoundingClientRect().top))
  check('#renacimiento abre la página en ese período', top >= 0 && top < 300, `top=${top}`)
  await ctx.close()
}

// 4. Teclado: Tab/Enter/Space visibles y operables
{
  const { page, ctx } = await newPage(1440)
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.keyboard.press('Tab')
  const skip = await page.evaluate(() => document.activeElement?.textContent)
  check('primer Tab: enlace «Saltar al contenido»', skip?.includes('Saltar al contenido'), skip)
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle)
  check('foco visible (outline)', outline !== 'none', outline)
  await page.keyboard.press('Enter')
  const hash = await page.evaluate(() => location.hash)
  check('Enter en el enlace salta al contenido', hash === '#contenido', hash)
  let reached = false
  for (let i = 0; i < 60 && !reached; i++) {
    await page.keyboard.press('Tab')
    reached = await page.evaluate(() => document.activeElement?.getAttribute('aria-expanded') !== null)
  }
  check('Tab alcanza «Explorar período»', reached)
  await page.keyboard.press('Enter')
  await page.waitForTimeout(600)
  check('Enter abre el período', (await page.evaluate(() => document.activeElement?.getAttribute('aria-expanded'))) === 'true')
  await page.keyboard.press('Space')
  await page.waitForTimeout(600)
  check('Espacio cierra el período', (await page.evaluate(() => document.activeElement?.getAttribute('aria-expanded'))) === 'false')
  const reachable = await page.evaluate(
    () => [...document.querySelectorAll('.detail a, .detail button')].filter((e) => !e.closest('[inert]')).length,
  )
  check('contenido colapsado es inerte (no tabulable)', reachable === 0, `enlaces alcanzables=${reachable}`)
  await ctx.close()
}

// 5. Movimiento reducido
{
  const { page, ctx } = await newPage(1440, { reducedMotion: 'reduce' })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  const hidden = await page.evaluate(
    () => [...document.querySelectorAll('.timeline-card, #resumen .card')].filter((e) => getComputedStyle(e).opacity !== '1').length,
  )
  check('movimiento reducido: contenido visible sin scroll', hidden === 0, `ocultos=${hidden}`)
  check('movimiento reducido: sin animaciones de entrada', (await page.evaluate(() => document.querySelectorAll('.reveal').length)) === 0)
  const smooth = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)
  check('movimiento reducido: sin desplazamiento suave', smooth === 'auto', smooth)
  const trans = await page.evaluate(() => getComputedStyle(document.querySelector('.detail')).transitionDuration)
  check('movimiento reducido: sin transición del desplegable', trans === '0s', trans)
  await ctx.close()
}

// 6. Contenido solicitado: colores por período, pie de página y elementos retirados
{
  const { page, ctx } = await newPage(1440)
  await page.goto(BASE, { waitUntil: 'networkidle' })
  const colors = await page.evaluate(() =>
    [...document.querySelectorAll('.card-period')].map((c) => [getComputedStyle(c).borderTopColor, getComputedStyle(c.querySelector('button')).borderTopColor, getComputedStyle(c).backgroundColor]),
  )
  check('cada tarjeta tiene un color de borde distinto', new Set(colors.map((c) => c[0])).size === 5, colors.map((c) => c[0]).join(' | '))
  check('el borde del botón «Explorar» usa el color de su período', colors.every((c) => c[0] === c[1]))
  check('el fondo de la tarjeta sigue siendo blanco', colors.every((c) => c[2] === 'rgb(255, 255, 255)'))
  const text = await page.evaluate(() => document.body.innerText)
  const footer = await page.evaluate(() => {
    const f = document.querySelector('footer')
    const [course, author] = [...f.querySelectorAll('p')]
    const box = (e) => e.getBoundingClientRect()
    return { text: f.innerText, left: box(course).left, authorRight: box(author).right, w: window.innerWidth, authorLeft: box(author).left }
  })
  check('pie: «Elaborado por Rosalinda Bermudez Urbay»', footer.text.includes('Elaborado por Rosalinda Bermudez Urbay'))
  check('pie: carrera, asignatura y UNAD', footer.text.includes('Licenciatura en Matemáticas · UNAD · Epistemología e Historia de la Pedagogía'))
  check('pie: textos en esquinas (no centrados)', footer.left < 300 && footer.authorRight > footer.w - 300 && footer.authorLeft > footer.w / 2, JSON.stringify(footer))
  check('sin botón/mención de imprimir', !/imprimir|guardar como pdf/i.test(text))
  const body = text.replace(footer.text, '')
  check('la carrera aparece solo en el pie', !/Licenciatura|UNAD/.test(body))
  check('las tarjetas no llevan fuentes (van solo al final)', !(await page.evaluate(() => document.body.textContent)).includes('Fuente bibliográfica correspondiente'))
  check('sin sección «Créditos de imágenes»', !/Créditos de imágenes/.test(text))
  const links = await page.evaluate(() => document.querySelectorAll('a[href^="https://commons.wikimedia.org/wiki/File:"]').length)
  check('cada imagen tiene «Ver archivo» (18 enlaces, incluidos los retratos)', links === 18, `enlaces=${links}`)
  await ctx.close()
}

await browser.close()
const failed = results.filter((r) => !r.ok)
console.log(`\n${results.length - failed.length}/${results.length} comprobaciones superadas`)
if (failed.length) process.exitCode = 1
