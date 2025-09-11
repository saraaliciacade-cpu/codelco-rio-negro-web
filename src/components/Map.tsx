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

    // Función de inicialización del mapa
    const initMap = () => {
      // Coordenadas exactas de Codelco S.A.
      const codelcoLocation = { lat: -38.947524, lng: -68.002487 };

      // Crear mapa con Map ID personalizado
      const map = new window.google.maps.Map(mapRef.current!, {
        center: codelcoLocation,
        zoom: 15,
        mapId: "30fd671af640a655e95c3547"
      });

      // Crear marcador
      new window.google.maps.Marker({
        position: codelcoLocation,
        map,
        title: "Codelco S.A"
      });
    };

    // Cargar API de Google Maps si no está cargada
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
            id="map"
            className="w-full"
            style={{ height: '450px' }}
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