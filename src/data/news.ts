import fachada from '@/assets/guerra-codelco-fachada.jpg.asset.json';
import maquina from '@/assets/guerra-maquina-cargo.webp.asset.json';
import soldadura from '@/assets/guerra-soldadura-chispas.webp.asset.json';
import rionegroPreview from '@/assets/rionegro-lee-tambien.png.asset.json';

export type NewsCategory = 'Todas' | 'Flota' | 'Proyecto' | 'Planta' | 'Clientes' | 'Sector';

export type NewsBlock =
  | { type: 'p'; text: string }
  | { type: 'image'; src: string; alt?: string; caption?: string }
  | { type: 'video'; provider: 'youtube'; id: string; title?: string }
  | { type: 'heading'; text: string }
  | {
      type: 'related';
      eyebrow?: string;
      title: string;
      summary?: string;
      image?: string;
      href?: string;
    };

export interface NewsItem {
  id: number;
  slug: string;
  category: Exclude<NewsCategory, 'Todas'>;
  date: string;
  title: string;
  summary: string;
  image: string;
  body: (string | NewsBlock)[];
  sourceUrl?: string;
  sourceLabel?: string;
}

export const categories: NewsCategory[] = ['Todas', 'Flota', 'Proyecto', 'Planta', 'Clientes', 'Sector'];

export const newsData: NewsItem[] = [
  {
    id: 9,
    slug: 'historia-familia-guerra-codelco',
    category: 'Proyecto',
    date: 'Julio 2026',
    title: 'La historia de construcción y trabajo detrás de la familia Guerra.',
    summary:
      'Cuatro generaciones de gomeros, una reconversión al ritmo de Vaca Muerta y el nacimiento de Codelco como proveedor esencial de la industria energética.',
    image: fachada.url,
    sourceUrl:
      'https://www.rionegro.com.ar/economia/su-abuelo-llego-desde-espana-tras-la-primera-guerra-y-cuatro-generaciones-despues-sostienen-el-oficio-y-proveen-a-vaca-muerta/',
    sourceLabel: 'Río Negro Económico',
    body: [
      {
        type: 'p',
        text: 'Una historia que florece en el presente, es resultado de la siembra silenciosa que se realizó en el pasado, y el fruto de los años de trabajo esforzado que quedaron en el camino.',
      },
      {
        type: 'p',
        text: '"Mi abuelo fue de los primeros que trajo una máquina para reconstruir un neumático al país. Somos la única empresa en la Argentina con cuarta generación de gomeros", relata Adrián Guerra, titular de Neumáticos del Sur y Codelco.',
      },
      { type: 'video', provider: 'youtube', id: 'B6m7aNsU93k', title: 'La historia de la familia Guerra' },
      {
        type: 'p',
        text: 'Su abuelo, Antonio Guerra llegó desde España tras la Primera Guerra Mundial, y se estableció en General Roca con una gomería tradicional. "Entre la Primera y la Segunda Guerra Mundial no había caucho, las gomas se las arreglaban de cualquier manera teniendo en cuenta lo que eran los vehículos en esa época", rememora Adrián.',
      },
      {
        type: 'p',
        text: 'Años después, ya en la década del \'50, se trasladaron a Mendoza donde fundaron la primer empresa de la familia, Antonio Guerra SA, que creció hasta San Luis y San Juan.',
      },
      { type: 'heading', text: 'Los inicios en la Patagonia' },
      {
        type: 'p',
        text: 'Llegado 1985, su padre Herminio Guerra, decide volver al sur, y es en ese momento cuando nace Neumáticos del Sur SA en Cipolletti, una empresa dedicada a la reconstrucción de neumáticos, que luego se expandiría con una planta en Buenos Aires y otra en General Pico, La Pampa.',
      },
      {
        type: 'p',
        text: 'Los tres hermanos Oscar, Javier y Adrian, continuaron el legado de Herminio hasta la actualidad, incluyendo a dos de los integrantes de la cuarta generación familiar, Benicio, Ignacio, Camila y Facundo.',
      },
      {
        type: 'image',
        src: maquina.url,
        alt: 'Adrián Guerra junto a la máquina VR 50-130 Cargo en la planta de Neumáticos del Sur',
        caption: 'Cuarta generación de gomeros: la planta de reconstrucción de neumáticos en Cipolletti.',
      },
      {
        type: 'p',
        text: 'Hoy, desde las tres plantas proveen neumáticos para vehículos desde camionetas hasta equipos de gran porte en la actividad rural, vial e industrial.',
      },
      {
        type: 'p',
        text: 'No obstante, el enclave en uno de los lugares con mayor potencial productivo del país, puso por delante una oportunidad de diversificación que terminaría siendo determinante para el futuro de la empresa y de la familia.',
      },
      { type: 'heading', text: 'La reconversión al ritmo de Vaca Muerta' },
      {
        type: 'p',
        text: 'Fue hace 17 años, cuando el no convencional comenzaba a dar sus primeras señales, que detectaron lo que podía ser un nicho de mercado: el shale comenzaría a necesitar locaciones móviles para ubicar en las perforaciones.',
      },
      {
        type: 'p',
        text: '"Empezamos comprando algunos trailers como negocio y nos ocurrió que nos encontramos pagando un producto malo y muy caro", recuerda Adrian y agrega: "Lo que veíamos en el mercado no nos convencía y nos pusimos a fabricar nosotros". Así nació Codelco, una empresa local dedicada a las construcción y comercialización de soluciones habitacionales móviles, con especial foco en Vaca Muerta.',
      },
      {
        type: 'p',
        text: 'Un nicho de mercado al inicio de la explotación no convencional, los movió a transformar su empresa para ser proveedores esenciales de Vaca Muerta.',
      },
      {
        type: 'p',
        text: 'Junto a la irrupción del shale, la demanda no tardó en crecer y rápidamente comprendieron las características del producto. "Compramos plegadoras, guillotinas, y sin darnos cuenta teníamos montada casi una metalúrgica", recuerda Guerra. "Luego en un momento fuimos tomando noción de la escala, y tercerizamos parte del trabajo para ganar eficiencia", agrega.',
      },
      {
        type: 'p',
        text: 'El producto de aquellos inicios fue evolucionando hasta llegar a los módulos que Codelco fabrica en la actualidad, de 6 o 12 metros de largo por 2,6 metros de ancho, compuestos por paneles de fibra de vidrio EPS de alta densidad íntegramente equipados llave en mano, autosustentables y listos para ser colocados en campo.',
      },
      {
        type: 'image',
        src: soldadura.url,
        alt: 'Operario cortando y soldando estructura metálica en la planta metalúrgica de Codelco',
        caption: 'Corte y soldadura en la planta metalúrgica: la base de los módulos habitacionales.',
      },
      {
        type: 'p',
        text: 'A ello agregaron más tarde el servicio de alquiler de equipos electrógenos y torres de iluminación para las operadoras de Vaca Muerta. "El plan de perforación de YPF habla de multiplicar la producción 2,5 veces en los próximos años, ese es el horizonte" se entusiasma Guerra.',
      },
      {
        type: 'p',
        text: 'Hacia adelante, trabajan en un módulo habitacional para primera vivienda destinado a quienes buscan dejar de alquilar. "Una de las cosas que permite la apertura es que entran materiales de muy buena calidad que son una solución para estructurar una vivienda en un tiempo relativamente rápido y con un costo relativamente ajustado", afirma Guerra.',
      },
      {
        type: 'related',
        eyebrow: 'TE PODRÍA INTERESAR TAMBIÉN',
        title: 'Entregamos un campamento habitacional llave en mano',
        summary:
          'Módulos Company Man, comedor y laboratorio instalados y operativos en tiempo récord para una operadora del sector.',
        image: rionegroPreview.url,
        href: '/novedades/entregamos-campamento-habitacional-llave-en-mano',
      },
      {
        type: 'p',
        text: 'Aquel viaje iniciado hace 90 años hoy continúa. "Estamos en un camino largo, pero hay que transitarlo. No va a ser abrupto, pero el crecimiento que viene para la región será sostenido, y nuestro objetivo es ser parte", se entusiasma Guerra, el nieto de aquel inmigrante español que hace 90 años dejó su tierra buscando ese horizonte que hoy es real.',
      },
    ],
  },
  {
    id: 1,
    slug: 'ampliamos-flota-torres-iluminacion-led',
    category: 'Flota',
    date: 'Junio 2026',
    title: 'Ampliamos la flota de torres de iluminación LED',
    summary:
      'Suman stock inmediato para operaciones nocturnas y espacios abiertos en yacimientos de Vaca Muerta.',
    image: '/images/novedad/torres-led.jpg',
    body: [
      'En Codelco S.A. incorporamos nuevas torres de iluminación LED a nuestra flota de rental, con el objetivo de acompañar el crecimiento de las operaciones nocturnas en Vaca Muerta y en obras de infraestructura de toda la Patagonia.',
      'Las nuevas unidades cuentan con generador propio, mástil telescópico y proyectores LED de alta eficiencia, que garantizan iluminación uniforme sobre grandes superficies con un consumo significativamente menor al de los equipos halógenos tradicionales.',
      'Están disponibles para alquiler de corto y largo plazo, con entrega, puesta en marcha y mantenimiento preventivo incluidos. De esta manera reforzamos la disponibilidad inmediata para nuestros clientes del sector energético, de la construcción y de servicios especiales.',
    ],
  },
  {
    id: 2,
    slug: 'entregamos-campamento-habitacional-llave-en-mano',
    category: 'Proyecto',
    date: 'Mayo 2026',
    title: 'Entregamos un campamento habitacional llave en mano',
    summary:
      'Módulos Company Man, comedor y laboratorio instalados y operativos en tiempo récord para una operadora del sector.',
    image: '/images/fabrica/fabrica-30.jpg',
    body: [
      'Completamos la entrega llave en mano de un campamento habitacional para una operadora del sector petrolero, incluyendo módulos Company Man, comedor, sanitarios y laboratorio.',
      'Todo el proceso —fabricación, traslado, instalación y puesta en servicio— se ejecutó en tiempo récord, minimizando el impacto sobre la operación del cliente.',
      'Cada módulo fue construido en nuestra planta de Cipolletti bajo estrictos estándares de calidad, aislación térmica y seguridad, listos para operar en condiciones exigentes.',
    ],
  },
  {
    id: 3,
    slug: 'nueva-plegadora-cnc-planta-cipolletti',
    category: 'Planta',
    date: 'Abril 2026',
    title: 'Nueva plegadora CNC en nuestra planta de Cipolletti',
    summary:
      'Sumamos tecnología para reducir tiempos de fabricación en tanques API y estructuras metalúrgicas.',
    image: '/metalurgica-05.jpg',
    body: [
      'Incorporamos una nueva plegadora CNC de última generación a nuestra planta metalúrgica de Cipolletti, ampliando la capacidad productiva del área de corte y plegado.',
      'La nueva máquina permite reducir los tiempos de fabricación de tanques API, estructuras y piezas a medida, manteniendo la precisión milimétrica que caracteriza a nuestros trabajos.',
      'Con esta inversión reforzamos nuestro compromiso de responder con mayor rapidez a los pedidos de nuestros clientes de la industria energética y de la construcción.',
    ],
  },
  {
    id: 4,
    slug: 'sumamos-unidades-flota-toyota-hilux',
    category: 'Flota',
    date: 'Marzo 2026',
    title: 'Sumamos unidades a la flota de Toyota Hilux',
    summary:
      'Más vehículos livianos disponibles para alquiler en operaciones de Neuquén y Río Negro durante la temporada alta.',
    image: '/rental-01.jpg',
    body: [
      'Ampliamos nuestra flota de vehículos livianos con nuevas unidades Toyota Hilux 0km, disponibles para alquiler en Neuquén, Río Negro y toda la región.',
      'Las unidades se incorporan para dar respuesta al aumento de demanda durante la temporada alta, especialmente en yacimientos, obras y servicios de logística.',
      'Todas las camionetas cuentan con mantenimiento incluido, seguros y respaldo operativo 24/7 por parte del equipo de Codelco S.A.',
    ],
  },
  {
    id: 5,
    slug: 'instalamos-modulos-company-man-nueva-operadora',
    category: 'Proyecto',
    date: 'Febrero 2026',
    title: 'Instalamos módulos Company Man para nueva operadora',
    summary:
      'Unidades de supervisión trasladadas e instaladas en yacimiento, listas para operar en menos de una semana.',
    image: '/images/fabrica/fabrica-32.jpg',
    body: [
      'Realizamos el traslado e instalación de módulos Company Man para una nueva operadora que comenzó a trabajar en la región.',
      'Las unidades de supervisión quedaron operativas en menos de una semana, con conexión de servicios, mobiliario y climatización lista para uso inmediato.',
      'Nuestro equipo acompaña el proyecto con soporte técnico y mantenimiento durante toda la campaña.',
    ],
  },
  {
    id: 6,
    slug: 'ampliamos-servicio-corte-plegado-chapas',
    category: 'Planta',
    date: 'Enero 2026',
    title: 'Ampliamos el servicio de corte y plegado de chapas',
    summary:
      'Mayor capacidad productiva para pedidos de piletas, tanques y estructuras a medida.',
    image: '/images/metalurgica/metalurgica-01.jpg',
    body: [
      'Ampliamos la capacidad del servicio de corte y plegado de chapas en la planta metalúrgica, para responder a pedidos de mayor volumen.',
      'La ampliación permite fabricar piletas, tanques y estructuras a medida en plazos más cortos, sin resignar calidad de terminación.',
      'Trabajamos con clientes de la industria energética, agropecuaria e industrial en toda la Patagonia.',
    ],
  },
  {
    id: 7,
    slug: 'nueva-entrega-grupo-electrogeno-cliente',
    category: 'Clientes',
    date: 'Diciembre 2025',
    title: 'Nueva entrega de grupo electrógeno para cliente del sector',
    summary:
      'Equipo de 120 kVA instalado y monitoreado para garantizar energía continua en operación crítica.',
    image: '/images/novedad/grupo-electrogeno.jpg',
    body: [
      'Realizamos la entrega, instalación y puesta en marcha de un grupo electrógeno de 120 kVA para un cliente que requería energía continua en una operación crítica.',
      'El equipo fue configurado con sistema de monitoreo remoto, tablero de transferencia automática y plan de mantenimiento preventivo.',
      'Con esta entrega reforzamos nuestro servicio de alquiler y venta de grupos electrógenos industriales, con respaldo técnico permanente.',
    ],
  },
  {
    id: 8,
    slug: 'vaca-muerta-demanda-infraestructura-habitacional',
    category: 'Sector',
    date: 'Noviembre 2025',
    title: 'Vaca Muerta y la creciente demanda de infraestructura habitacional',
    summary:
      'El crecimiento de la actividad petrolera multiplica la necesidad de módulos y campamentos para personal en la región.',
    image: '/images/fabrica/fabrica-31.jpg',
    body: [
      'La expansión de la actividad no convencional en Vaca Muerta continúa impulsando la demanda de infraestructura habitacional para personal en yacimiento.',
      'Desde Codelco S.A. acompañamos este crecimiento con módulos habitacionales, comedores, sanitarios y campamentos completos, fabricados en nuestra planta de Cipolletti.',
      'La cercanía a los yacimientos, la capacidad productiva propia y la flexibilidad para adaptar los diseños permiten responder rápidamente a los tiempos que exige el sector.',
    ],
  },
];

export const latestNewsId = newsData[0].id;
