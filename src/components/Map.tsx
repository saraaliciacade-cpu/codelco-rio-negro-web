import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Configuración del mapa con el nuevo estilo
    const initMap = () => {
      // Ubicación de Codelco S.A. (Cipolletti, Río Negro)
      const codelco = { lat: -38.9417, lng: -67.9856 };

      // Crear mapa con el nuevo estilo
      const map = new window.google.maps.Map(mapRef.current!, {
        center: codelco,
        zoom: 13,
        mapId: "fe3f5785d26e07babd1f5325" // ID del nuevo estilo
      });

      // Marcador en la ubicación
      new window.google.maps.Marker({
        position: codelco,
        map,
        title: "Codelco S.A."
      });
    };

    // Cargar la API de Google Maps si no está cargada
    if (typeof window.google === 'undefined' || !window.google?.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAfO6pwad6QXR7W8DJmMaL39wQLvqZbS0I&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

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
          <div 
            ref={mapRef} 
            className="w-full h-96"
            style={{ minHeight: '400px' }}
          />
        </div>
        
        <div className="mt-6 text-center bg-card p-6 rounded-lg border">
          <h4 className="font-semibold text-lg mb-2">Dirección Completa</h4>
          <p className="text-muted-foreground">
            Ruta 22 Km.1114, Cipolletti - Río Negro, Argentina
          </p>
        </div>
      </div>
    </section>
  );
};

export default Map;