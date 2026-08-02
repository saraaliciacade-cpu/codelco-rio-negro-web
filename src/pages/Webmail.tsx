import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const WEBMAIL_URL = "https://webmail.codelco.com.ar";

const Webmail = () => {
  useEffect(() => {
    // Temporary-style redirect: replace() leaves no history entry and is never
    // cached like a 301, so the destination can change at any time.
    window.location.replace(WEBMAIL_URL);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Helmet>
        <title>Webmail Codelco — Acceso al correo corporativo</title>
        <meta
          name="description"
          content="Accedé al webmail corporativo de Codelco S.A. para gestionar tu correo electrónico institucional."
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        {/* Fallback if JavaScript is disabled or fails */}
        <meta httpEquiv="refresh" content={`0;url=${WEBMAIL_URL}`} />
      </Helmet>
      <div className="text-center">
        <h1 className="sr-only">Webmail Codelco — Redirigiendo al correo corporativo</h1>
        <div
          className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"
          aria-hidden="true"
        ></div>
        <p className="text-muted-foreground">
          Redirigiendo a webmail...{" "}
          <a href={WEBMAIL_URL} rel="nofollow noopener noreferrer" className="underline">
            Ingresar manualmente
          </a>
        </p>
      </div>
    </div>
  );
};

export default Webmail;
