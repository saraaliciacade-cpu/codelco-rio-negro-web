export type NewsCategory = 'Todas' | 'Flota' | 'Proyecto' | 'Planta' | 'Clientes' | 'Sector';

export interface NewsItem {
  id: number;
  slug: string;
  category: NewsCategory;
  date: string;
  title: string;
  summary: string;
  image: string;
  body: string[];
}

export const categories: NewsCategory[] = ['Todas', 'Flota', 'Proyecto', 'Planta', 'Clientes', 'Sector'];

export const newsData: NewsItem[] = [
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
    image: '/images/fabrica/fabrica-37.jpg',
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
