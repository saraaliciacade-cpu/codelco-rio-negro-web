import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Phone, MessageCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { newsData, categories, latestNewsId, type NewsCategory } from '@/data/news';

const BRAND_ORANGE = '#E84E1B';
const BRAND_BLACK = '#1A1A1A';

const NovedadesPage = () => {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('Todas');

  const filteredNews =
    activeCategory === 'Todas'
      ? newsData
      : newsData.filter((n) => n.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Novedades y Proyectos Recientes | Codelco S.A."
        description="Últimas novedades de Codelco S.A.: nuevos proyectos, incorporaciones a la flota de rental, obras entregadas y actualidad del sector energético en Vaca Muerta."
        path="/novedades"
        keywords="novedades Codelco, proyectos Vaca Muerta, flota rental, obras petroleras"
      />
      <Helmet>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Codelco S.A. — Novedades (RSS)"
          href="https://codelco.com.ar/rss.xml"
        />
      </Helmet>
      <Header />


      {/* Hero */}
      <section className="relative w-full" style={{ minHeight: '280px' }}>
        <img
          src="/metalurgica-05.jpg"
          alt="Planta metalúrgica de Codelco S.A."
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.8) 100%)',
          }}
        />
        <div className="relative container mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-12 min-h-[280px] flex flex-col justify-end">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 text-xs sm:text-sm text-white/70">
            <ol className="flex items-center gap-2 flex-wrap">
              <li>
                <Link to="/" className="hover:text-white">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-semibold">Novedades</li>
            </ol>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <span
              className="h-px w-10"
              style={{ backgroundColor: BRAND_ORANGE }}
              aria-hidden="true"
            />
            <span className="eyebrow text-[11px] sm:text-xs" style={{ color: BRAND_ORANGE }}>
              NOVEDADES DE CODELCO
            </span>
          </div>

          <h1 className="heading text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.1] max-w-4xl">
            Lo que estamos construyendo
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/85 max-w-3xl leading-relaxed">
            Equipos nuevos, entregas, flota y proyectos terminados — así avanza la operación.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? BRAND_ORANGE : 'transparent',
                    color: isActive ? '#fff' : '#4b5563',
                    border: isActive ? `1px solid ${BRAND_ORANGE}` : '1px solid #d1d5db',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* News grid */}
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ objectPosition: item.imagePosition ?? 'center' }}
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
                      style={{ backgroundColor: BRAND_ORANGE }}
                    >
                      {item.category}
                    </span>
                  </div>

                  <div className="flex flex-col flex-1 p-5">
                    <span className="text-xs text-gray-500 mb-2">{item.date}</span>
                    <h3 className="heading text-base sm:text-lg leading-snug mb-2" style={{ color: BRAND_BLACK }}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                      {item.summary}
                    </p>
                    <Link
                      to={`/novedades/${item.slug}`}
                      className="inline-flex items-center justify-center self-start h-10 px-4 text-sm font-semibold rounded-sm text-white transition hover:opacity-90"
                      style={{ backgroundColor: BRAND_ORANGE }}
                    >
                      Leer más <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-base">
                No hay novedades en esta categoría todavía.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA banda negra */}
      <section style={{ backgroundColor: BRAND_BLACK }} className="py-16 lg:py-20">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <h2 className="heading text-white text-2xl sm:text-3xl lg:text-4xl leading-tight md:whitespace-nowrap">
            ¿Querés que te avisemos de las próximas novedades?
          </h2>
          <p className="mt-4 text-base lg:text-lg text-white/75 max-w-2xl mx-auto">
            Escribinos y te mantenemos al tanto de nuevos equipos, proyectos y disponibilidad.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/#contacto"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 text-sm sm:text-base font-semibold rounded-sm text-white transition hover:opacity-90"
              style={{ backgroundColor: BRAND_ORANGE }}
            >
              <Phone className="w-4 h-4" />
              Contactar
            </Link>
            <a
              href="https://wa.me/5492994136453"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 text-sm sm:text-base font-semibold rounded-sm text-white transition hover:opacity-90"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle className="w-4 h-4" />
              Escribir por WhatsApp
            </a>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NovedadesPage;
