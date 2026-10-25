// Convierte los originales descargados (scripts/raw, respaldo) a WebP en public/images.
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const MAP = [
  ['main/Raphael_School_of_Athens.jpg', 'antiguedad/principal', 1200],
  ['portraits/Socrates_Louvre.jpg', 'antiguedad/socrates', 480],
  ['portraits/Plato_Silanion_Musei_Capitolini_MC1377.jpg', 'antiguedad/platon', 480],
  ['portraits/Aristotle_Altemps_Inv8575.jpg', 'antiguedad/aristoteles', 480],
  ['main/Laurentius_de_Voltolina_001.jpg', 'edad-media/principal', 1200],
  ['portraits/Saint_Augustine_by_Philippe_de_Champaigne.jpg', 'edad-media/san-agustin', 480],
  ['portraits/Saint_Thomas_Aquinas_Crivelli_15th-century_.jpg', 'edad-media/tomas-de-aquino', 480],
  ['main/Antonello_da_Messina_-_St_Jerome_in_his_study_-_National_Gallery_London.jpg', 'renacimiento/principal', 1200],
  ['portraits/Hans_Holbein_d._J._-_Portrait_of_Erasmus_of_Rotterdam_Writing_-_WGA11498.jpg', 'renacimiento/erasmo', 480],
  ['portraits/Montaigne-Dumonstier.jpg', 'renacimiento/montaigne', 480],
  ['main/Albert_Anker_-_Heinrich_Pestalozzi_-_Waisenkinder_Stans.jpg', 'modernidad/principal', 1200],
  ['portraits/Comenius.jpg', 'modernidad/comenio', 480],
  ['portraits/Maurice_Quentin_de_La_Tour_-_Portrait_of_Jean-Jacques_Rousseau_-_WGA12360.jpg', 'modernidad/rousseau', 480],
  ['portraits/Johann_Heinrich_Pestalozzi_half-length_portrait_LCCN2007686622.jpg', 'modernidad/pestalozzi', 480],
  ['main/Martha_M._Simpson_classroom.jpg', 'contemporanea/principal', 1200],
  ['portraits/Maria_Montessori_LCCN2014694934.jpg', 'contemporanea/montessori', 480, { left: 0.38, width: 0.52 }],
  ['portraits/Jean_Piaget_in_Ann_Arbor.png', 'contemporanea/piaget', 480],
  ['portraits/Paulo_Freire_1977.jpg', 'contemporanea/freire', 480],
]

for (const [src, dest, w, crop] of MAP) {
  const out = `public/images/${dest}.webp`
  mkdirSync(out.slice(0, out.lastIndexOf('/')), { recursive: true })
  let img = sharp(`scripts/raw/${src}`)
  if (crop) {
    // Recorte horizontal (fracciones del ancho) para aislar a la persona retratada.
    const { width, height } = await img.metadata()
    img = sharp(`scripts/raw/${src}`).extract({ left: Math.round(width * crop.left), top: 0, width: Math.round(width * crop.width), height })
  }
  const info = await img.resize({ width: w, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out)
  console.log(dest.padEnd(32), info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB')
}
