import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { newsData, latestNewsId, type NewsBlock } from '@/data/news';

const BRAND_ORANGE = '#E84E1B';
const BRAND_BLACK = '#1A1A1A';

const renderBlock = (block: string | NewsBlock, i: number) => {
  if (typeof block === 'string') {
    return (
      <p key={i} className="text-base sm:text-lg text-gray-700 leading-relaxed mb-5">
        {block}
      </p>
    );
  }
  switch (block.type) {
    case 'p':
      return (
        <p key={i} className="text-base sm:text-lg text-gray-700 leading-relaxed mb-5">
          {block.text}
        </p>
      );
    case 'heading':
      return (
        <h2
          key={i}
          className="heading text-2xl sm:text-3xl mt-10 mb-5"
          style={{ color: BRAND_BLACK }}
        >
          {block.text}
        </h2>
      );
    case 'image':
      return (
        <figure key={i} className="my-8">
          <img
            src={block.src}
            alt={block.alt ?? ''}
            className="w-full h-auto rounded-lg"
            loading="lazy"
          />
          {block.caption && (
            <figcaption className="mt-3 text-sm text-gray-500 italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case 'video':
      return (
        <div key={i} className="my-8 flex justify-center">
          <div
            className="relative overflow-hidden rounded-lg bg-black w-full"
            style={{ maxWidth: '360px', aspectRatio: '9 / 16' }}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${block.id}`}
              title={block.title ?? 'Video'}
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      );
    case 'related': {
      // If href points to another news item, use that item's image/summary automatically
      const relatedSlug = block.href?.startsWith('/novedades/')
        ? block.href.replace('/novedades/', '')
        : undefined;
      const relatedItem = relatedSlug ? newsData.find((n) => n.slug === relatedSlug) : undefined;
      const image = relatedItem?.image ?? block.image;
      const summary = block.summary ?? relatedItem?.summary;
      const title = block.title || relatedItem?.title || '';
      const inner = (
        <div className="flex gap-4 items-center">
          {image && (
            <div className="flex-shrink-0 w-28 h-20 sm:w-36 sm:h-24 overflow-hidden rounded-sm">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                style={{ objectPosition: relatedItem?.imagePosition ?? 'center' }}
                loading="lazy"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            {block.eyebrow && (
              <span
                className="eyebrow text-[10px] sm:text-xs font-bold block mb-1"
                style={{ color: BRAND_ORANGE }}
              >
                {block.eyebrow}
              </span>
            )}
            <p className="heading text-sm sm:text-base leading-snug" style={{ color: BRAND_BLACK }}>
              {title}
            </p>
            {summary && (
              <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{summary}</p>
            )}
          </div>
        </div>
      );
      return (
        <aside key={i} className="my-8 p-4 sm:p-5 border-l-4 bg-gray-50" style={{ borderColor: BRAND_ORANGE }}>
          {block.href ? (
            <Link to={block.href} className="block hover:opacity-90">
              {inner}
            </Link>
          ) : (
            inner
          )}
        </aside>
      );
    }

    default:
      return null;
  }
};

const NewsDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const item = newsData.find((n) => n.slug === slug);

  if (!item) return <Navigate to="/novedades" replace />;

  const isLatest = item.id === latestNewsId;
  const related = newsData.filter((n) => n.id !== item.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`${item.title} | Novedades Codelco S.A.`}
        description={item.summary}
        path={`/novedades/${item.slug}`}
        image={item.image?.startsWith('http') ? item.image : undefined}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: item.title,
          description: item.summary,
          datePublished: item.date,
          articleSection: item.category,
          image: item.image,
          publisher: {
            '@type': 'Organization',
            name: 'Codelco S.A.',
          },
        }}
      />
      <Header />


      {/* Hero */}
      <section className="relative w-full" style={{ minHeight: '360px' }}>
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: item.imagePosition ?? 'center' }}
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

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {isLatest && (
              <span
                className="eyebrow text-[10px] sm:text-xs font-bold text-white px-2.5 py-1 rounded-sm animate-pulse"
                style={{ backgroundColor: '#DC2626' }}
              >
                ÚLTIMA NOTICIA
              </span>
            )}
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
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-3xl relative">
          <div className="hidden lg:block lg:absolute lg:left-[-72px] lg:top-0 lg:h-full">
            <div className="lg:sticky lg:top-28 flex lg:flex-col flex-row items-center gap-3">



                <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase writing-mode-vertical hidden sm:block mb-1">
                  Compartir
                </span>
                {(() => {
                  const shareUrl = `https://codelco.com.ar/novedades/${item.slug}`;
                  const shareText = `${item.title} — Codelco S.A.`;
                  const enc = encodeURIComponent;
                  const links = [
                    {
                      label: 'WhatsApp',
                      href: `https://wa.me/?text=${enc(shareText + ' ' + shareUrl)}`,
                      svg: (
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .18 5.32.18 11.88c0 2.09.55 4.13 1.6 5.93L0 24l6.35-1.66a11.86 11.86 0 0 0 5.7 1.45h.01c6.56 0 11.88-5.32 11.88-11.88 0-3.17-1.24-6.15-3.42-8.43ZM12.06 21.6h-.01a9.7 9.7 0 0 1-4.94-1.35l-.36-.21-3.77.99 1.01-3.68-.23-.38a9.72 9.72 0 0 1-1.49-5.09c0-5.38 4.37-9.75 9.79-9.75 2.61 0 5.07 1.02 6.91 2.87a9.7 9.7 0 0 1 2.86 6.9c0 5.38-4.37 9.7-9.77 9.7Zm5.36-7.28c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.19.29-.76.96-.93 1.15-.17.19-.34.22-.63.07-.29-.15-1.24-.46-2.36-1.47-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.66-1.6-.9-2.19-.24-.57-.48-.49-.66-.5l-.56-.01c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.44 0 1.44 1.05 2.83 1.2 3.02.15.19 2.06 3.14 4.99 4.4.7.3 1.24.48 1.66.62.7.22 1.33.19 1.84.11.56-.08 1.74-.71 1.98-1.4.24-.68.24-1.27.17-1.4-.07-.13-.27-.2-.56-.35Z" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Facebook',
                      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}`,
                      svg: (
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                          <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.4V14h2.7v8h3.4Z" />
                        </svg>
                      ),
                    },
                    {
                      label: 'X',
                      href: `https://twitter.com/intent/tweet?text=${enc(shareText)}&url=${enc(shareUrl)}`,
                      svg: (
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                          <path d="M18.244 2H21l-6.52 7.45L22 22h-6.28l-4.92-6.44L5.1 22H2.34l6.97-7.97L2 2h6.44l4.45 5.88L18.24 2Zm-1.1 18h1.53L7.02 4H5.4l11.74 16Z" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Email',
                      href: `mailto:?subject=${enc(item.title)}&body=${enc(item.summary + '\n\n' + shareUrl)}`,
                      svg: (
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                          <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm8 8.5L4 7.2V18h16V7.2l-8 5.3ZM12 11 20 6H4l8 5Z" />
                        </svg>
                      ),
                    },
                  ];
                  return links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Compartir en ${l.label}`}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:text-white hover:border-transparent transition-colors"
                      style={{ transition: 'all 0.2s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND_ORANGE)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {l.svg}
                    </a>
                  ));
                })()}
              </div>
            </div>

            {/* Article content */}
            <div>

              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-medium mb-8">
                {item.summary}
              </p>
              {item.body.map((block, i) => renderBlock(block, i))}

              {item.sourceUrl && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">
                    Ver noticia en
                  </p>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold break-all hover:underline"
                    style={{ color: BRAND_ORANGE }}
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    {item.sourceLabel ?? item.sourceUrl}
                  </a>
                </div>
              )}


              {/* Mobile share */}
              <div className="lg:hidden mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3">
                  Comparte esta noticia
                </p>
                <div className="flex items-center gap-3">
                  {(() => {
                    const shareUrl = `https://codelco.com.ar/novedades/${item.slug}`;
                    const shareText = `${item.title} — Codelco S.A.`;
                    const enc = encodeURIComponent;
                    const links = [
                      { label: 'WhatsApp', href: `https://wa.me/?text=${enc(shareText + ' ' + shareUrl)}`, path: 'M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .18 5.32.18 11.88c0 2.09.55 4.13 1.6 5.93L0 24l6.35-1.66a11.86 11.86 0 0 0 5.7 1.45h.01c6.56 0 11.88-5.32 11.88-11.88 0-3.17-1.24-6.15-3.42-8.43ZM12.06 21.6h-.01a9.7 9.7 0 0 1-4.94-1.35l-.36-.21-3.77.99 1.01-3.68-.23-.38a9.72 9.72 0 0 1-1.49-5.09c0-5.38 4.37-9.75 9.79-9.75 2.61 0 5.07 1.02 6.91 2.87a9.7 9.7 0 0 1 2.86 6.9c0 5.38-4.37 9.7-9.77 9.7Zm5.36-7.28c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.19.29-.76.96-.93 1.15-.17.19-.34.22-.63.07-.29-.15-1.24-.46-2.36-1.47-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.66-1.6-.9-2.19-.24-.57-.48-.49-.66-.5l-.56-.01c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.44 0 1.44 1.05 2.83 1.2 3.02.15.19 2.06 3.14 4.99 4.4.7.3 1.24.48 1.66.62.7.22 1.33.19 1.84.11.56-.08 1.74-.71 1.98-1.4.24-.68.24-1.27.17-1.4-.07-.13-.27-.2-.56-.35Z' },
                      { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}`, path: 'M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.4V14h2.7v8h3.4Z' },
                      { label: 'X', href: `https://twitter.com/intent/tweet?text=${enc(shareText)}&url=${enc(shareUrl)}`, path: 'M18.244 2H21l-6.52 7.45L22 22h-6.28l-4.92-6.44L5.1 22H2.34l6.97-7.97L2 2h6.44l4.45 5.88L18.24 2Zm-1.1 18h1.53L7.02 4H5.4l11.74 16Z' },
                      { label: 'Email', href: `mailto:?subject=${enc(item.title)}&body=${enc(item.summary + '\n\n' + shareUrl)}`, path: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm8 8.5L4 7.2V18h16V7.2l-8 5.3ZM12 11 20 6H4l8 5Z' },
                    ];
                    return links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Compartir en ${l.label}`}
                        className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 transition-colors"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                          <path d={l.path} />
                        </svg>
                      </a>
                    ));
                  })()}
                </div>
              </div>

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
