import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const Webmail = () => {
  useEffect(() => {
    // Redirect to webmail server
    window.location.href = "https://mail.codelco.com.ar";
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Helmet>
        <title>Webmail Codelco — Acceso al correo corporativo</title>
        <meta name="description" content="Accedé al webmail corporativo de Codelco S.A. para gestionar tu correo electrónico institucional." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="text-center">
        <h1 className="sr-only">Webmail Codelco — Redirigiendo al correo corporativo</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" aria-hidden="true"></div>
        <p className="text-muted-foreground">Redirigiendo a webmail...</p>
      </div>
    </div>
  );
};

export default Webmail;
