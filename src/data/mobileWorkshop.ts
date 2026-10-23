import exterior from '@/assets/taller-movil-exterior.jpg.asset.json';
import malacate from '@/assets/taller-movil-malacate.jpg.asset.json';
import revestimiento from '@/assets/taller-movil-revestimiento.jpg.asset.json';
import torno from '@/assets/taller-movil-torno.jpg.asset.json';
import detalle from '@/assets/taller-movil-torno-detalle.jpg.asset.json';
import tablero from '@/assets/taller-movil-tablero.jpg.asset.json';

export const mobileWorkshopSlug = 'taller-movil-mantenimiento-industrial';
export const mobileWorkshopShare = {
  title: 'Taller móvil industrial: soluciones de mantenimiento en campo',
  description: 'Un taller sobre ruedas, equipado con torno mecánico, malacate eléctrico y espacios de trabajo preparados para operaciones industriales. Conocé el proyecto de Codelco.',
};
export const mobileWorkshopImages = [
  { src: exterior.url, name: 'Vista exterior de la unidad móvil en planta', width: 1448, height: 1086 },
  { src: torno.url, name: 'Torno mecánico de banco DUCA en el taller móvil', width: 1086, height: 1448 },
  { src: malacate.url, name: 'Malacate eléctrico Wortec sobre estructura metálica', width: 1122, height: 1402 },
  { src: revestimiento.url, name: 'Revestimiento interior, mesadas y gabinetes del taller móvil', width: 1122, height: 1402 },
  { src: detalle.url, name: 'Detalle del torno y sus mandos de operación', width: 1092, height: 1440 },
  { src: tablero.url, name: 'Tablero eléctrico, iluminación y almacenamiento interior', width: 1448, height: 1086 },
].map((image) => ({ ...image, isNew: true, newLabel: 'NUEVAS', newsHref: `/novedades/${mobileWorkshopSlug}` }));