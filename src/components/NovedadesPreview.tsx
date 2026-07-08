import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { newsData, latestNewsId } from '@/data/news';

const BRAND_ORANGE = '#E84E1B';
const BRAND_BLACK = '#1A1A1A';

const NovedadesPreview = () => {
  const items = newsData.slice(0, 3);

  return (
    <section id="novedades" className="py-16 lg:py-24 bg-[#f3f1ec]">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10" style={{ backgroundColor: BRAND_ORANGE }} aria-hidden="true" />
            <span className="eyebrow text-[11px] sm:text-xs font-bold" style={{ color: BRAND_ORANGE }}>
              NOVEDADES DE CODELCO
            </span>
          </div>
          <h2 className="heading text-3xl sm:text-4xl lg:text-5xl leading-[1.1]" style={{ color: BRAND_BLACK }}>
            Lo que estamos construyendo
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            Equipos nuevos, entregas, flota y proyectos terminados. Así avanza la operación.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <Link
              to={`/novedades/${item.slug}`}
              key={item.id}
              className="group flex flex-col bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {item.id === latestNewsId && (
                  <span
                    className="eyebrow absolute top-3 right-3 text-[10px] sm:text-xs font-bold text-white px-2.5 py-1 rounded-sm animate-pulse"
                    style={{ backgroundColor: '#DC2626' }}
                  >
                    ÚLTIMA NOTICIA
                  </span>
                )}
                <span
                  className="eyebrow absolute top-3 left-3 text-[10px] sm:text-xs text-white px-2.5 py-1 rounded-sm"
                  style={{ backgroundColor: BRAND_BLACK }}
                >
                  {item.category.toUpperCase()}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-5">
                <span className="text-xs text-gray-500 mb-2 uppercase tracking-wide">{item.date}</span>
                <h3 className="heading text-base sm:text-lg leading-snug mb-2" style={{ color: BRAND_BLACK }}>
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{item.summary}</p>
                <span
                  className="inline-flex items-center text-sm font-semibold"
                  style={{ color: BRAND_ORANGE }}
                >
                  Leer más <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/novedades"
            className="inline-flex items-center justify-center h-12 px-7 text-sm sm:text-base font-semibold rounded-sm text-white transition hover:opacity-90"
            style={{ backgroundColor: BRAND_BLACK }}
          >
            Ver todas las novedades
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NovedadesPreview;
