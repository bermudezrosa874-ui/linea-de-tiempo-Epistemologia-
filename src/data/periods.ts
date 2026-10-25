import type { ImageCredit, Period } from './types'

const COMMONS = 'https://commons.wikimedia.org/wiki/'

/** Construye las URL de página y de archivo original en Commons a partir del nombre del archivo. */
function commons(file: string): Pick<ImageCredit, 'pageUrl' | 'sourceUrl'> {
  const name = encodeURIComponent(file)
  return {
    pageUrl: `${COMMONS}File:${name}`,
    sourceUrl: `${COMMONS}Special:FilePath/${name}`,
  }
}

const PUBLIC_DOMAIN = 'Dominio público'
const CC_BY_SA_25 = { license: 'CC BY-SA 2.5', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.5/' }
const CC_BY_25 = { license: 'CC BY 2.5', licenseUrl: 'https://creativecommons.org/licenses/by/2.5/' }
const CC_BY_SA_30 = { license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/' }

export const periods: Period[] = [
  {
    id: 'antiguedad',
    number: 1,
    name: 'Antigüedad',
    dateLabel: 'Aproximadamente 3000 a. C. – 476 d. C.',
    summary:
      'Durante la Antigüedad, la educación buscaba formar personas con conocimientos, valores morales y capacidades para participar en la sociedad.',
    description:
      'Durante la Antigüedad, la educación buscaba formar personas con conocimientos, valores morales y capacidades para participar en la sociedad. En Grecia y Roma se promovió la formación intelectual, ética y física, aunque el acceso educativo dependía de la posición social y otras condiciones.',
    characteristics: [
      'Formación moral, intelectual y física.',
      'Importancia de la filosofía, la lógica y la argumentación.',
      'Desarrollo del diálogo y el razonamiento.',
      'Relación entre educación, cultura y organización política.',
    ],
    figures: [
      {
        name: 'Sócrates',
        years: '469–399 a. C.',
        initials: 'S',
        contribution: 'Promovió el diálogo y las preguntas como medios para estimular el pensamiento crítico.',
        image: {
          src: 'images/antiguedad/socrates.webp',
          width: 480,
          height: 640,
          alt: 'Busto de mármol de Sócrates: rostro de frente despejada, nariz ancha y barba espesa.',
          caption: 'Busto romano, copia de un original griego.',
          credit: {
            title: 'Busto de Sócrates (Louvre, Ma 59)',
            author: 'Copia romana de un original griego; fotografía de Eric Gaba (Sting)',
            date: 'Escultura: siglo I d. C.; fotografía: 2005',
            institution: 'Museo del Louvre, París',
            ...CC_BY_SA_25,
            ...commons('Socrates_Louvre.jpg'),
          },
        },
      },
      {
        name: 'Platón',
        years: '427–347 a. C.',
        initials: 'P',
        contribution:
          'Defendió una educación orientada a formar personas virtuosas y contribuir a una sociedad justa.',
        image: {
          src: 'images/antiguedad/platon.webp',
          width: 480,
          height: 720,
          alt: 'Busto de mármol de Platón: cabeza con barba rizada y cabello ceñido por una cinta.',
          caption: 'Busto romano, copia de una obra atribuida a Silanión.',
          credit: {
            title: 'Busto de Platón (MC 1377)',
            author: 'Copia romana de Silanión; fotografía de Marie-Lan Nguyen',
            date: 'Escultura: copia romana; fotografía: 2009',
            institution: 'Musei Capitolini, Roma',
            ...CC_BY_25,
            ...commons('Plato_Silanion_Musei_Capitolini_MC1377.jpg'),
          },
        },
      },
      {
        name: 'Aristóteles',
        years: '384–322 a. C.',
        initials: 'A',
        contribution: 'Destacó la razón, la ética y el desarrollo integral del ser humano.',
        image: {
          src: 'images/antiguedad/aristoteles.webp',
          width: 480,
          height: 643,
          alt: 'Busto de mármol de Aristóteles: rostro sereno con barba corta y cabello peinado hacia atrás.',
          caption: 'Busto romano, copia de un original griego atribuido a Lisipo.',
          credit: {
            title: 'Busto de Aristóteles (Inv. 8575)',
            author: 'Copia romana de un original de Lisipo; fotografía de Jastrow',
            date: 'Original hacia 330 a. C.; fotografía: 2006',
            institution: 'Palazzo Altemps, Roma',
            license: PUBLIC_DOMAIN,
            ...commons('Aristotle_Altemps_Inv8575.jpg'),
          },
        },
      },
    ],
    currentContribution:
      'Las prácticas educativas actuales conservan la importancia del diálogo, la reflexión, la argumentación y la formación ética.',
    evolutionLabel: 'Formación ética y racional.',
    icon: 'landmark',
    accent: '#1D4ED8',
    image: {
      src: 'images/antiguedad/principal.webp',
      width: 1200,
      height: 784,
      alt: 'Fresco con decenas de filósofos reunidos bajo arcos monumentales; en el centro dos figuras dialogan mientras otros discuten, leen y escriben en grupos.',
      caption: 'La escuela de Atenas, Rafael, 1509–1511. Representación renacentista de filósofos de la Antigüedad.',
      credit: {
        title: 'La escuela de Atenas',
        author: 'Rafael (Raffaello Sanzio)',
        date: '1509–1511',
        institution: 'Museos Vaticanos, Ciudad del Vaticano',
        license: PUBLIC_DOMAIN,
        note: 'Obra del Renacimiento que representa la filosofía antigua; no es un registro de la época.',
        ...commons('Raphael_School_of_Athens.jpg'),
      },
    },
  },
  {
    id: 'edad-media',
    number: 2,
    name: 'Edad Media',
    dateLabel: '476 – 1453/1492',
    summary: 'Durante la Edad Media europea, la Iglesia tuvo una fuerte influencia sobre la educación.',
    description:
      'Durante la Edad Media europea, la Iglesia tuvo una fuerte influencia sobre la educación. La enseñanza se desarrolló en monasterios, escuelas catedralicias y universidades. La escolástica buscó relacionar la fe con la razón.',
    characteristics: [
      'Influencia de las instituciones religiosas.',
      'Formación espiritual, moral y teológica.',
      'Estudio y análisis de textos de autoridad.',
      'Consolidación de universidades medievales.',
      'Desarrollo de la argumentación escolástica.',
    ],
    figures: [
      {
        name: 'San Agustín',
        years: '354–430',
        initials: 'SA',
        contribution:
          'Aunque vivió durante la Antigüedad tardía, su pensamiento influyó profundamente en la educación medieval y la búsqueda de la verdad.',
        image: {
          src: 'images/edad-media/san-agustin.webp',
          width: 480,
          height: 613,
          alt: 'Pintura de san Agustín con mitra y báculo de obispo, vestido con ropajes ricos y un libro en la mano.',
          caption: 'Retrato barroco de san Agustín, hacia 1645–1650 (obra posterior a su época).',
          credit: {
            title: 'San Agustín',
            author: 'Philippe de Champaigne',
            date: 'Hacia 1645–1650',
            institution: 'Los Angeles County Museum of Art (LACMA), M.88.177',
            license: PUBLIC_DOMAIN,
            note: 'Pintura del siglo XVII: representación artística, no un retrato del natural.',
            ...commons('Saint_Augustine_by_Philippe_de_Champaigne.jpg'),
          },
        },
      },
      {
        name: 'Santo Tomás de Aquino',
        years: '1225–1274',
        initials: 'TA',
        contribution:
          'Destacó la relación entre fe y razón como caminos compatibles hacia el conocimiento.',
        image: {
          src: 'images/edad-media/tomas-de-aquino.webp',
          width: 480,
          height: 721,
          alt: 'Pintura de santo Tomás de Aquino con hábito dominico y aureola dorada, sosteniendo un libro abierto y una maqueta de iglesia.',
          caption: 'Santo Tomás de Aquino, Carlo Crivelli, 1476 (obra posterior a su época).',
          credit: {
            title: 'Santo Tomás de Aquino',
            author: 'Carlo Crivelli',
            date: '1476',
            institution: 'National Gallery, Londres',
            license: PUBLIC_DOMAIN,
            note: 'Pintura del siglo XV: representación artística, no un retrato del natural.',
            ...commons('Saint_Thomas_Aquinas_(Crivelli,_15th-century).jpg'),
          },
        },
      },
    ],
    currentContribution:
      'Contribuyó a la consolidación de instituciones educativas, universidades y métodos de estudio y argumentación.',
    evolutionLabel: 'Enseñanza religiosa e institucional.',
    icon: 'church',
    accent: '#6D28D9',
    image: {
      src: 'images/edad-media/principal.webp',
      width: 1200,
      height: 968,
      alt: 'Miniatura medieval de una clase universitaria: un maestro en su cátedra lee ante estudiantes sentados en bancos, algunos atentos y otros conversando o dormitando.',
      caption:
        'Enrique de Alemania da clase a estudiantes en Bolonia, Laurentius de Voltolina, segunda mitad del siglo XIV. Miniatura de la época.',
      credit: {
        title: 'Enrique de Alemania da clase a estudiantes en Bolonia',
        author: 'Laurentius de Voltolina',
        date: 'Segunda mitad del siglo XIV',
        institution: 'Kupferstichkabinett, Staatliche Museen zu Berlin (Min. 1233)',
        license: PUBLIC_DOMAIN,
        ...commons('Laurentius_de_Voltolina_001.jpg'),
      },
    },
  },
  {
    id: 'renacimiento',
    number: 3,
    name: 'Renacimiento',
    dateLabel: 'Siglos XIV–XVI',
    summary:
      'El Renacimiento fortaleció el humanismo, una corriente que valoraba la dignidad, las capacidades intelectuales y el potencial de las personas.',
    description:
      'El Renacimiento fortaleció el humanismo, una corriente que valoraba la dignidad, las capacidades intelectuales y el potencial de las personas. La educación amplió su interés hacia las humanidades, las artes, la naturaleza y el pensamiento reflexivo.',
    characteristics: [
      'Desarrollo del humanismo.',
      'Interés por las ciencias, las artes y la literatura.',
      'Valoración de la observación y la experiencia.',
      'Formación intelectual, moral y cultural.',
      'Cuestionamiento de la memorización mecánica.',
    ],
    figures: [
      {
        name: 'Erasmo de Rotterdam',
        years: '1466–1536',
        initials: 'ER',
        contribution:
          'Promovió una educación humanista centrada en la formación moral y el pensamiento.',
        image: {
          src: 'images/renacimiento/erasmo.webp',
          width: 480,
          height: 580,
          alt: 'Pintura de Erasmo de perfil, con gorro oscuro y túnica, escribiendo sobre una hoja con la mirada baja.',
          caption: 'Erasmo de Rotterdam escribiendo, Hans Holbein el Joven, 1523.',
          credit: {
            title: 'Retrato de Erasmo de Rotterdam escribiendo',
            author: 'Hans Holbein el Joven',
            date: '1523',
            institution: 'Kunstmuseum Basel (Amerbach-Kabinett)',
            license: PUBLIC_DOMAIN,
            ...commons('Hans_Holbein_d._J._-_Portrait_of_Erasmus_of_Rotterdam_Writing_-_WGA11498.jpg'),
          },
        },
      },
      {
        name: 'Michel de Montaigne',
        years: '1533–1592',
        initials: 'MM',
        contribution:
          'Defendió el desarrollo del juicio propio y criticó la memorización sin comprensión.',
        image: {
          src: 'images/renacimiento/montaigne.webp',
          width: 480,
          height: 619,
          alt: 'Retrato pintado de Montaigne: hombre calvo con bigote y perilla, golilla blanca, collar de cadena dorada y capa roja.',
          caption: 'Retrato anónimo de Montaigne, hacia 1578.',
          credit: {
            title: 'Retrato de Michel de Montaigne',
            author: 'Anónimo',
            date: 'Hacia 1578',
            license: PUBLIC_DOMAIN,
            ...commons('Montaigne-Dumonstier.jpg'),
          },
        },
      },
    ],
    currentContribution:
      'Fortaleció la autonomía intelectual, la creatividad, la reflexión y el aprendizaje basado en la comprensión.',
    evolutionLabel: 'Humanismo y pensamiento reflexivo.',
    icon: 'palette',
    accent: '#047857',
    image: {
      src: 'images/renacimiento/principal.webp',
      width: 1200,
      height: 1522,
      alt: 'Pintura de un erudito sentado ante un atril en un amplio estudio con estantes de libros, ventanas y objetos cotidianos, iluminado por luz natural.',
      caption: 'San Jerónimo en su estudio, Antonello da Messina, hacia 1474. Escena renacentista de estudio y lectura.',
      credit: {
        title: 'San Jerónimo en su estudio',
        author: 'Antonello da Messina',
        date: 'Hacia 1474',
        institution: 'National Gallery, Londres (NG1418)',
        license: PUBLIC_DOMAIN,
        note: 'Pintura renacentista que ilustra el ambiente de estudio de la época.',
        ...commons('Antonello_da_Messina_-_St_Jerome_in_his_study_-_National_Gallery_London.jpg'),
      },
    },
  },
  {
    id: 'modernidad',
    number: 4,
    name: 'Modernidad',
    dateLabel: 'Siglos XVII–XVIII, con desarrollos posteriores',
    summary:
      'Durante la Modernidad, el desarrollo científico y las nuevas concepciones sobre la infancia transformaron la educación.',
    description:
      'Durante la Modernidad, el desarrollo científico y las nuevas concepciones sobre la infancia transformaron la educación. Se propusieron métodos más organizados y adecuados al desarrollo de los estudiantes.',
    characteristics: [
      'Sistematización de los métodos educativos.',
      'Organización gradual de los contenidos.',
      'Reconocimiento de las etapas del desarrollo infantil.',
      'Aprendizaje mediante observación y experiencia.',
      'Interés por ampliar el acceso a la enseñanza.',
    ],
    figures: [
      {
        name: 'Juan Amós Comenio',
        years: '1592–1670',
        initials: 'JC',
        contribution:
          'Propuso métodos didácticos organizados y progresivos adaptados a las capacidades del estudiante.',
        image: {
          src: 'images/modernidad/comenio.webp',
          width: 480,
          height: 654,
          alt: 'Grabado en óvalo de Comenio: hombre con gorro y cuello blanco, barba corta, con una inscripción alrededor y versos debajo.',
          caption: 'Grabado de Comenio, Václav Hollar, 1652.',
          credit: {
            title: 'Retrato de Comenio',
            author: 'Václav Hollar',
            date: '1652',
            license: PUBLIC_DOMAIN,
            ...commons('Comenius.jpg'),
          },
        },
      },
      {
        name: 'Jean-Jacques Rousseau',
        years: '1712–1778',
        initials: 'JR',
        contribution:
          'Defendió una educación que respetara la naturaleza, la libertad y el desarrollo infantil.',
        image: {
          src: 'images/modernidad/rousseau.webp',
          width: 480,
          height: 602,
          alt: 'Retrato al pastel de Rousseau: hombre de mirada atenta con peluca clara y casaca azul grisácea.',
          caption: 'Rousseau, Maurice Quentin de La Tour, pastel, 1753.',
          credit: {
            title: 'Retrato de Jean-Jacques Rousseau',
            author: 'Maurice Quentin de La Tour',
            date: '1753',
            institution: "Musée d'Art et d'Histoire, Ginebra",
            license: PUBLIC_DOMAIN,
            ...commons('Maurice_Quentin_de_La_Tour_-_Portrait_of_Jean-Jacques_Rousseau_-_WGA12360.jpg'),
          },
        },
      },
      {
        name: 'Johann Heinrich Pestalozzi',
        years: '1746–1827',
        initials: 'JP',
        contribution:
          'Promovió el desarrollo intelectual, afectivo y práctico. Su obra se extendió hasta el siglo XIX.',
        image: {
          src: 'images/modernidad/pestalozzi.webp',
          width: 480,
          height: 645,
          alt: 'Retrato en blanco y negro de Pestalozzi: hombre de rostro delgado y cabello largo, con chaqueta oscura y pañuelo claro.',
          caption: 'Retrato gráfico de Pestalozzi (fecha no determinada).',
          credit: {
            title: 'Johann Heinrich Pestalozzi, retrato de medio cuerpo',
            author: 'Autor no identificado',
            date: 'Fecha no determinada',
            institution: 'Library of Congress, Prints and Photographs Division',
            license: PUBLIC_DOMAIN,
            ...commons('Johann_Heinrich_Pestalozzi,_half-length_portrait_LCCN2007686622.jpg'),
          },
        },
      },
    ],
    currentContribution:
      'Sentó bases fundamentales para la didáctica, la planificación educativa y los métodos centrados en el desarrollo del estudiante.',
    evolutionLabel: 'Organización científica y didáctica de la enseñanza.',
    icon: 'telescope',
    accent: '#C2410C',
    image: {
      src: 'images/modernidad/principal.webp',
      width: 924,
      height: 1200,
      alt: 'Pintura de un hombre sentado en una sala humilde rodeado de niños que lo miran y lo escuchan con atención.',
      caption:
        'Heinrich Pestalozzi y los huérfanos de Stans, Albert Anker, 1870. Representación artística del siglo XIX.',
      credit: {
        title: 'Heinrich Pestalozzi y los huérfanos de Stans',
        author: 'Albert Anker',
        date: '1870',
        institution: 'Kunsthaus Zürich',
        license: PUBLIC_DOMAIN,
        note: 'Pintura posterior a la época de Pestalozzi: representación artística, no un registro del momento.',
        ...commons('Albert_Anker_-_Heinrich_Pestalozzi_und_die_Waisenkinder_in_Stans_-_336_-_Kunsthaus_Zürich.jpg'),
      },
    },
  },
  {
    id: 'edad-contemporanea',
    number: 5,
    name: 'Edad Contemporánea',
    dateLabel: '1789 – actualidad',
    summary:
      'La Edad Contemporánea se caracteriza por el desarrollo de corrientes pedagógicas que consideran al estudiante un participante activo en la construcción de conocimientos.',
    description:
      'La Edad Contemporánea se caracteriza por el desarrollo de corrientes pedagógicas que consideran al estudiante un participante activo en la construcción de conocimientos. Se destacan la interacción social, el desarrollo cognitivo, el pensamiento crítico y la inclusión educativa.',
    characteristics: [
      'Aprendizaje activo y participativo.',
      'Construcción del conocimiento mediante la experiencia.',
      'Importancia del entorno sociocultural.',
      'Educación inclusiva y reconocimiento de la diversidad.',
      'Desarrollo cognitivo, social, emocional y ético.',
      'Incorporación de recursos y tecnologías educativas.',
    ],
    figures: [
      {
        name: 'María Montessori',
        years: '1870–1952',
        initials: 'MM',
        contribution: 'Promovió la autonomía infantil y el aprendizaje en ambientes preparados.',
        image: {
          src: 'images/contemporanea/montessori.webp',
          width: 480,
          height: 672,
          alt: 'Fotografía antigua de María Montessori: mujer con sombrero y abrigo oscuro, de rostro sereno.',
          caption: 'María Montessori, fotografía de prensa, hacia 1910 (recorte).',
          credit: {
            title: 'Maria Montessori',
            author: 'Bain News Service',
            date: 'Hacia 1910',
            institution: 'Library of Congress, George Grantham Bain Collection',
            license: PUBLIC_DOMAIN,
            note: 'Recorte de la fotografía original, en la que aparece junto a otra persona.',
            ...commons('Maria_Montessori_LCCN2014694934.jpg'),
          },
        },
      },
      {
        name: 'Lev Vygotsky',
        years: '1896–1934',
        initials: 'LV',
        contribution:
          'Destacó la interacción social y el lenguaje como elementos esenciales del aprendizaje.',
      },
      {
        name: 'Jean Piaget',
        years: '1896–1980',
        initials: 'JP',
        contribution:
          'Investigó el desarrollo cognitivo y la construcción activa del conocimiento.',
        image: {
          src: 'images/contemporanea/piaget.webp',
          width: 408,
          height: 683,
          alt: 'Fotografía en blanco y negro de Jean Piaget de pie al aire libre: hombre mayor con boina, gafas y traje.',
          caption: 'Jean Piaget en la Universidad de Míchigan, 1967–1968.',
          credit: {
            title: 'Jean Piaget en Ann Arbor',
            author: 'Autor no identificado (anuario Michiganensian, Universidad de Míchigan)',
            date: '1967–1968',
            license: 'Dominio público (publicada antes de 1978 sin aviso de derechos de autor)',
            ...commons('Jean_Piaget_in_Ann_Arbor.png'),
          },
        },
      },
      {
        name: 'Paulo Freire',
        years: '1921–1997',
        initials: 'PF',
        contribution:
          'Defendió una educación crítica y dialogante orientada a comprender y transformar la realidad.',
        image: {
          src: 'images/contemporanea/freire.webp',
          width: 480,
          height: 606,
          alt: 'Fotografía en blanco y negro de Paulo Freire: hombre mayor con gafas grandes y barba blanca.',
          caption: 'Paulo Freire, fotografía de 1977.',
          credit: {
            title: 'Paulo Freire, 1977',
            author: 'Slobodan Dimitro',
            date: '1977',
            ...CC_BY_SA_30,
            note: 'Compartir bajo la misma licencia.',
            ...commons('Paulo_Freire_1977.jpg'),
          },
        },
      },
    ],
    currentContribution:
      'Impulsó el aprendizaje colaborativo, el constructivismo, las metodologías participativas y la inclusión educativa.',
    evolutionLabel: 'Aprendizaje activo, crítico e inclusivo.',
    icon: 'users',
    accent: '#BE185D',
    image: {
      src: 'images/contemporanea/principal.webp',
      width: 582,
      height: 372,
      alt: 'Fotografía antigua de un aula Montessori: niños y niñas sentados en el suelo y en bancas leen libros y trabajan con materiales, cada uno en su propia actividad.',
      caption:
        'Aula Montessori con «libre elección de trabajo», fotografía publicada en 1914 en el informe de Martha M. Simpson.',
      credit: {
        title: 'Free Choice of Work — Higher Division (aula Montessori)',
        author: 'Martha M. Simpson',
        date: '1914',
        institution: 'Report on the Montessori Methods of Education (1914)',
        license: PUBLIC_DOMAIN,
        ...commons('Martha_M._Simpson_classroom.jpg'),
      },
    },
  },
]
