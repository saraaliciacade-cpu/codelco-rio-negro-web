import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

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
          <p className="mb-4 text-xl text-muted-foreground">Página no encontrada</p>
          <a href="/" className="text-primary underline hover:opacity-80">
            Volver al inicio
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
