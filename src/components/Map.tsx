import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [locationData, setLocationData] = useState<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Función de inicialización del mapa
    const initMap = async () => {
      try {
        // Intentar obtener datos de Supabase
        const response = await fetch('https://eymjmdusrvpdhprduwrf.supabase.co/rest/v1/Codelco%20Mapa%20SA?name=eq.Codelco%20S.A&select=latitude,longitude,name,adress', {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5bWptZHVzcnZwZGhwcmR1d3JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NjAyMzAsImV4cCI6MjA3MzEzNjIzMH0.mdV5Bydnh93iYUMHhODUIydKsfn4ykocloPxQHhs0Mg',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5bWptZHVzcnZwZGhwcmR1d3JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1NjAyMzAsImV4cCI6MjA3MzEzNjIzMH0.mdV5Bydnh93iYUMHhODUIydKsfn4ykocloPxQHhs0Mg'
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            const locationData = data[0];
            const codelcoLocation = { lat: Number(locationData.latitude), lng: Number(locationData.longitude) };
            createMap(codelcoLocation, locationData.name, locationData.adress || 'Codelco Cipolletti, Río Negro, Argentina');
            return;
          }
        }
      } catch (err) {
        console.log('Error conectando con Supabase:', err);
      }

      // Usar coordenadas por defecto si no hay datos en la BD o hay error
      const codelcoLocation = { lat: -38.947524, lng: -68.002487 };
      const name = 'Codelco S.A';
      const address = 'Codelco Cipolletti, Río Negro, Argentina';
      
      createMap(codelcoLocation, name, address);
    };

    const createMap = (location: { lat: number; lng: number }, name: string, address: string) => {
      // Crear mapa con Map ID personalizado
      const map = new window.google.maps.Map(mapRef.current!, {
        center: location,
        zoom: 10,
        mapId: "30fd671af640a655e95c3547"
      });

      // Crear marcador
      const marker = new window.google.maps.Marker({
        position: location,
        map,
        title: name
      });

      // Crear ventana de información
      const infoContent = `
        <div>
          <strong>${name}</strong><br>
          ${address}<br>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}" target="_blank" style="color: #FFAB40;">Cómo llegar</a>
        </div>
      `;

      const infoWindow = new window.google.maps.InfoWindow({
        content: infoContent
      });

      // Mostrar info window por defecto
      infoWindow.open(map, marker);
      
      // Agregar evento click al marcador
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
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
    <section className="mt-17.5">
      <div 
        ref={mapRef}
        id="map"
        className="w-full"
        style={{ height: '100vh' }}
      />
    </section>
  );
};

export default Map;