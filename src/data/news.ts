export type NewsCategory = 'Todas' | 'Flota' | 'Proyecto' | 'Planta' | 'Clientes' | 'Sector';

export interface NewsItem {
  id: number;
  category: NewsCategory;
  date: string;
  title: string;
  summary: string;
  image: string;
}

export const categories: NewsCategory[] = ['Todas', 'Flota', 'Proyecto', 'Planta', 'Clientes', 'Sector'];

export const newsData: NewsItem[] = [
  {
    id: 1,
    category: 'Flota',
    date: 'Junio 2026',
    title: 'Ampliamos la flota de torres de iluminación LED',
    summary:
      'Suman stock inmediato para operaciones nocturnas y espacios abiertos en yacimientos de Vaca Muerta.',
    image: '/rental-04.jpg',
  },
  {
    id: 2,
    category: 'Proyecto',
    date: 'Mayo 2026',
    title: 'Entregamos un campamento habitacional llave en mano',
    summary:
      'Módulos Company Man, comedor y laboratorio instalados y operativos en tiempo récord para una operadora del sector.',
    image: '/images/fabrica/fabrica-30.jpg',
  },
  {
    id: 3,
    category: 'Planta',
    date: 'Abril 2026',
    title: 'Nueva plegadora CNC en nuestra planta de Cipolletti',
    summary:
      'Sumamos tecnología para reducir tiempos de fabricación en tanques API y estructuras metalúrgicas.',
    image: '/metalurgica-05.jpg',
  },
  {
    id: 4,
    category: 'Flota',
    date: 'Marzo 2026',
    title: 'Sumamos unidades a la flota de Toyota Hilux',
    summary:
      'Más vehículos livianos disponibles para alquiler en operaciones de Neuquén y Río Negro durante la temporada alta.',
    image: '/rental-01.jpg',
  },
  {
    id: 5,
    category: 'Proyecto',
    date: 'Febrero 2026',
    title: 'Instalamos módulos Company Man para nueva operadora',
    summary:
      'Unidades de supervisión trasladadas e instaladas en yacimiento, listas para operar en menos de una semana.',
    image: '/images/fabrica/fabrica-32.jpg',
  },
  {
    id: 6,
    category: 'Planta',
    date: 'Enero 2026',
    title: 'Ampliamos el servicio de corte y plegado de chapas',
    summary:
      'Mayor capacidad productiva para pedidos de piletas, tanques y estructuras a medida.',
    image: '/images/metalurgica/metalurgica-01.jpg',
  },
  {
    id: 7,
    category: 'Clientes',
    date: 'Diciembre 2025',
    title: 'Nueva entrega de grupo electrógeno para cliente del sector',
    summary:
      'Equipo de 120 kVA instalado y monitoreado para garantizar energía continua en operación crítica.',
    image: '/images/fabrica/fabrica-37.jpg',
  },
  {
    id: 8,
    category: 'Sector',
    date: 'Noviembre 2025',
    title: 'Vaca Muerta y la creciente demanda de infraestructura habitacional',
    summary:
      'El crecimiento de la actividad petrolera multiplica la necesidad de módulos y campamentos para personal en la región.',
    image: '/images/fabrica/fabrica-31.jpg',
  },
];
