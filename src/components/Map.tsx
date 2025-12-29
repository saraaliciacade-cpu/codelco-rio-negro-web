const Map = () => {
  const googleMapsUrl = "https://www.google.com/maps/dir/?api=1&destination=-38.94752447171344,-68.0050617242484";

  return (
    <section id="ubicacion" className="relative" style={{ backgroundColor: '#f4f4f4' }}>
      {/* Info Card Overlay */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-white rounded-lg shadow-lg p-4 max-w-sm w-[90%] sm:w-auto">
        <button 
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl leading-none"
          onClick={(e) => {
            const card = e.currentTarget.parentElement;
            if (card) card.style.display = 'none';
          }}
        >
          ×
        </button>
        <h3 className="text-primary font-semibold text-lg mb-2">Codelco S.A</h3>
        <p className="text-gray-700 text-sm mb-1">
          Ruta 22 Km 1214, R8324 Cipolletti, Río Negro
        </p>
        <p className="text-gray-700 text-sm mb-3">
          Días: Lunes a viernes Horario: 8-12hs / 15-19hs
        </p>
        <a 
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline text-sm font-medium"
        >
          Cómo llegar
        </a>
      </div>

      {/* Google Maps Embed */}
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3102.9695298942265!2d-68.0050617242484!3d-38.94752447171344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a3100788a8f25%3A0xba6a9741f286941f!2sCodelco%20S.A!5e0!3m2!1ses!2sar!4v1767046379563!5m2!1ses!2sar"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación de Codelco S.A"
      />
    </section>
  );
};

export default Map;
