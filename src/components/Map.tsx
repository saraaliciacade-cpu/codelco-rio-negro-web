const Map = () => {
  return (
    <section className="py-0">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Nuestra Ubicación
          </h3>
          <p className="text-muted-foreground">
            Visítanos en nuestra sede en Cipolletti, Río Negro
          </p>
        </div>
        
        <div className="rounded-lg overflow-hidden shadow-soft border">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d397180.10246947134!2d-68.002487!3d-38.947524!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a3100788a8f25%3A0xba6a9741f286941f!2sCodelco%20S.A!5e0!3m2!1ses!2sar!4v1757562014836!5m2!1ses!2sar" 
            width="100%" 
            height="400" 
            style={{ border: 0, minHeight: '400px' }}
            allowFullScreen
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de Codelco S.A."
          />
        </div>
        
        <div className="mt-6 text-center bg-card p-6 rounded-lg border">
          <h4 className="font-semibold text-lg mb-2">Dirección Completa</h4>
          <p className="text-muted-foreground">
            Codelco Cipolletti, Río Negro, Argentina
          </p>
        </div>
      </div>
    </section>
  );
};

export default Map;