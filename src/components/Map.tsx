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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMapVisible, setIsMapVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isMapVisible) {
          setIsMapVisible(true);
        }
      },
      {
        rootMargin: '100px',
      }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isMapVisible]);

  useEffect(() => {
    if (!mapRef.current || !isMapVisible) return;

    const initMap = async () => {
      try {
        const response = await fetch('https://eymjmdusrvpdhprduwrf.supabase.co/rest/v1/Codelco%20Mapa%20SA?name=eq.Codelco%20S.A&select=latitude,longitude,name,address', {
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
            createMap(codelcoLocation, locationData.name, locationData.address || 'Ruta 22 Km 1214, R8324 Cipolletti, Río Negro');
            return;
          }
        }
      } catch (err) {
        console.log('Error conectando con Supabase:', err);
      }
      // Fallback ajustado a tus datos
      const codelcoLocation = { lat: -38.947524, lng: -68.002487 };
      const name = 'Codelco S.A';
      const address = 'Ruta 22 Km 1214, R8324 Cipolletti, Río Negro\nDías: Lunes a viernes Horario: 8-12hs / 15-19hs';
      createMap(codelcoLocation, name, address);
    };

    const createMap = (location: { lat: number; lng: number }, name: string, address: string) => {
      const map = new window.google.maps.Map(mapRef.current!, {
        center: location,
        zoom: 15, // Cambiado a 15 para más cerca
        mapId: "30fd671af640a655e95c3547"
      });

      const marker = new window.google.maps.Marker({
        position: location,
        map,
        title: name
      });

      // Reemplazar saltos por <br>
      const formattedAddress = address.replace(/\n/g, '<br>');

      const infoContent = `
        <div>
          <strong>${name}</strong><br>
          ${formattedAddress}<br>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}" target="_blank" style="color: #FFAB40;">Cómo llegar</a>
        </div>
      `;

      const infoWindow = new window.google.maps.InfoWindow({
        content: infoContent
      });

      infoWindow.open(map, marker);
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    };

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
  }, [isMapVisible]);

  return (
    <section className="mt-17.5" ref={containerRef}>
      {isMapVisible ? (
        <div
          ref={mapRef}
          id="map"
          className="w-full"
          style={{ height: '450px' }} // Fijo a 450px
        />
      ) : (
        <div
          className="w-full flex items-center justify-center bg-muted"
          style={{ height: '450px' }} // También el placeholder a 450px
        >
          <div className="text-muted-foreground">Cargando mapa...</div>
        </div>
      )}
    </section>
  );
};

export default Map;