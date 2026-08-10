import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
  /** when noindex is set, also block link following (drafts) */
  nofollow?: boolean;
  language?: 'es' | 'en';
  alternatePath?: string;
}

const SITE_URL = 'https://codelco.com.ar';
const DEFAULT_IMAGE =
  'https://storage.googleapis.com/gpt-engineer-file-uploads/DOkNqySaGpfIUNfGILTYBiyXOZx1/social-images/social-1767046817900-Codelco-web.png';

const SEO = ({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = 'website',
  keywords,
  jsonLd,
  noindex = false,
  nofollow = false,
  language = 'es',
  alternatePath,
}: SEOProps) => {
  const url = `${SITE_URL}${path}`;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && (
        <meta name="robots" content={`noindex, ${nofollow ? 'nofollow' : 'follow'}`} />
      )}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      {alternatePath && (
        <link
          rel="alternate"
          hrefLang={language === 'es' ? 'en' : 'es'}
          href={`${SITE_URL}${alternatePath}`}
        />
      )}
      {alternatePath && <link rel="alternate" hrefLang={language} href={url} />}
      {alternatePath && <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/`} />}


      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={language === 'en' ? 'en_US' : 'es_AR'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
