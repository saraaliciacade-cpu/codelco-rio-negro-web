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
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      try {
        // Use secure endpoint instead of direct API calls
        const { data, error } = await supabase.functions.invoke('secure-maps');
        
        if (error) {
          console.error('Error fetching map data:', error);
          throw error;
        }

        const response = data;
        if (response.locations && response.locations.length > 0) {
          const locationData = response.locations[0];
          const codelcoLocation = { lat: Number(locationData.latitude), lng: Number(locationData.longitude) };
          createMap(codelcoLocation, locationData.name, locationData.address || 'Ruta 22 Km 1214, R8324 Cipolletti, Río Negro');
        } else {
          // Fallback data
          const codelcoLocation = { lat: -38.947524, lng: -68.002487 };
          const name = 'Codelco S.A';
          const address = 'Ruta 22 Km 1214, R8324 Cipolletti, Río Negro\nDías: Lunes a viernes Horario: 8-12hs / 15-19hs';
          createMap(codelcoLocation, name, address);
        }
      } catch (err) {
        console.error('Error conectando con Supabase:', err);
        // Fallback ajustado a tus datos
        const codelcoLocation = { lat: -38.947524, lng: -68.002487 };
        const name = 'Codelco S.A';
        const address = 'Ruta 22 Km 1214, R8324 Cipolletti, Río Negro\nDías: Lunes a viernes Horario: 8-12hs / 15-19hs';
        createMap(codelcoLocation, name, address);
      } finally {
        setIsLoading(false);
      }
    };

    const createMap = (location: { lat: number; lng: number }, name: string, address: string) => {
      const map = new window.google.maps.Map(mapRef.current!, {
        center: location,
        zoom: 12, // 11 + 1
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

    const loadGoogleMaps = async () => {
      if (typeof window.google === 'undefined' || !window.google?.maps) {
        try {
          // Get secure API key from our endpoint
          const { data, error } = await supabase.functions.invoke('secure-maps');
          if (error || !data.apiKey) {
            throw new Error('Failed to get API key');
          }
          
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${data.apiKey}&callback=initMap`;
          script.async = true;
          script.defer = true;
          script.onerror = () => {
            console.error('Failed to load Google Maps script');
            setIsLoading(false);
          };
          window.initMap = initMap;
          document.head.appendChild(script);
        } catch (error) {
          console.error('Error loading Google Maps:', error);
          setIsLoading(false);
        }
      } else {
        initMap();
      }
    };

    loadGoogleMaps();
  }, [isMapVisible]);

  return (
    <section className="mt-17.5" ref={containerRef}>
      {isMapVisible && !isLoading ? (
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
          <div className="text-muted-foreground flex items-center space-x-2">
            {isLoading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>}
            <span>{isLoading ? 'Cargando mapa...' : 'Preparando mapa...'}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Map;