import { useEffect } from "react";

const Webmail = () => {
  useEffect(() => {
    // Redirect to webmail server
    window.location.href = "https://mail.codelco.com.ar";
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirigiendo a webmail...</p>
      </div>
    </div>
  );
};

export default Webmail;
