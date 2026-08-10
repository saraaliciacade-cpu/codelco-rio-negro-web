import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

const copy = {
  es: {
    notFound: 'Página no encontrada',
    backHome: 'Volver al inicio',
  },
  en: {
    notFound: 'Page not found',
    backHome: 'Back to home',
  },
} as const;

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const c = copy[language];

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Página no encontrada (404) — Codelco S.A.</title>
        <meta name="description" content="La página que buscás no existe en codelco.com.ar. Volvé al inicio para conocer nuestros servicios industriales y módulos habitacionales." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={`https://codelco.com.ar${location.pathname}`} />
        <meta property="og:title" content="Página no encontrada (404) — Codelco S.A." />
        <meta property="og:description" content="La página que buscás no existe. Volvé al inicio de Codelco S.A." />
        <meta property="og:url" content={`https://codelco.com.ar${location.pathname}`} />
      </Helmet>
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">{c.notFound}</p>
          <a href="/" className="text-primary underline hover:opacity-80">
            {c.backHome}
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
