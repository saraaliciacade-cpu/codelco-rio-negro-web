import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { newsData } from '@/data/news';

const BRAND_ORANGE = '#E84E1B';
const BRAND_BLACK = '#1A1A1A';

const NewsDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const item = newsData.find((n) => n.slug === slug);

  if (!item) return <Navigate to="/novedades" replace />;

  const related = newsData.filter((n) => n.id !== item.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative w-full" style={{ minHeight: '360px' }}>
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.85) 100%)',
          }}
        />
        <div className="relative container mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-12 min-h-[360px] flex flex-col justify-end">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs sm:text-sm text-white/70">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link to="/" className="hover:text-white">Inicio</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/novedades" className="hover:text-white">Novedades</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-semibold line-clamp-1">{item.title}</li>
            </ol>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <span
              className="eyebrow text-[11px] sm:text-xs text-white px-2.5 py-1 rounded-sm"
              style={{ backgroundColor: BRAND_ORANGE }}
            >
              {item.category}
            </span>
            <span className="text-xs sm:text-sm text-white/80">{item.date}</span>
          </div>

          <h1 className="heading text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.1] max-w-4xl">
            {item.title}
          </h1>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-3xl">
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-medium mb-8">
            {item.summary}
          </p>
          {item.body.map((paragraph, i) => (
            <p key={i} className="text-base sm:text-lg text-gray-700 leading-relaxed mb-5">
              {paragraph}
            </p>
          ))}

          <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/novedades"
              className="inline-flex items-center justify-center h-12 px-6 text-sm font-semibold rounded-sm border transition hover:bg-gray-50"
              style={{ borderColor: BRAND_BLACK, color: BRAND_BLACK }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Novedades
            </Link>
            <a
              href="https://wa.me/5492994136453"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-6 text-sm font-semibold rounded-sm text-white transition hover:opacity-90"
              style={{ backgroundColor: BRAND_ORANGE }}
            >
              Consultar por esta novedad
            </a>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="pb-20 bg-white">
          <div className="container mx-auto px-6 sm:px-10 lg:px-16">
            <h2 className="heading text-2xl sm:text-3xl mb-8" style={{ color: BRAND_BLACK }}>
              Otras novedades
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((n) => (
                <Link
                  key={n.id}
                  to={`/novedades/${n.slug}`}
                  className="group flex flex-col bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={n.image}
                      alt={n.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-gray-500">{n.date}</span>
                    <h3 className="heading text-base leading-snug mt-1" style={{ color: BRAND_BLACK }}>
                      {n.title}
                    </h3>
                    <span
                      className="inline-flex items-center text-sm font-semibold mt-3"
                      style={{ color: BRAND_ORANGE }}
                    >
                      Leer más <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default NewsDetailPage;
