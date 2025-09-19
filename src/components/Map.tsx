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
  const [mapData, setMapData] = useState<any>(null);

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
    if (!isMapVisible) return;

    const fetchMapData = async () => {
      setIsLoading(true);
      try {
        console.log('Fetching map data from secure endpoint...');
        const { data, error } = await supabase.functions.invoke('secure-maps');
        
        if (error) {
          console.error('Error fetching map data:', error);
          throw error;
        }

        console.log('Map data received:', data);
        setMapData(data);
        
        if (data.apiKey) {
          loadGoogleMapsScript(data.apiKey);
        } else {
          throw new Error('No API key received');
        }
      } catch (err) {
        console.error('Error loading map data:', err);
        // Use fallback data
        const fallbackData = {
          apiKey: null,
          locations: [{
            name: 'Codelco S.A',
            latitude: -38.947524,
            longitude: -68.002487,
            address: 'Ruta 22 Km 1214, R8324 Cipolletti, Río Negro\nDías: Lunes a viernes Horario: 8-12hs / 15-19hs'
          }]
        };
        setMapData(fallbackData);
        setIsLoading(false);
      }
    };

    fetchMapData();
  }, [isMapVisible]);

  const loadGoogleMapsScript = (apiKey: string) => {
    if (typeof window.google !== 'undefined' && window.google?.maps) {
      initMap();
      return;
    }

    console.log('Loading Google Maps script with secure API key...');
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('Google Maps script loaded successfully');
      initMap();
    };
    script.onerror = (error) => {
      console.error('Failed to load Google Maps script:', error);
      setIsLoading(false);
    };
    document.head.appendChild(script);
  };

  const initMap = () => {
    if (!mapRef.current || !mapData) {
      console.error('Map container or data not available');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Initializing map...');
      const location = mapData.locations?.[0];
      if (!location) {
        console.error('No location data available');
        setIsLoading(false);
        return;
      }

      const codelcoLocation = { 
        lat: Number(location.latitude), 
        lng: Number(location.longitude) 
      };

      const map = new window.google.maps.Map(mapRef.current, {
        center: codelcoLocation,
        zoom: 12,
        mapId: "30fd671af640a655e95c3547"
      });

      const marker = new window.google.maps.Marker({
        position: codelcoLocation,
        map,
        title: location.name
      });

      const formattedAddress = location.address.replace(/\n/g, '<br>');

      const infoContent = `
        <div>
          <strong>${location.name}</strong><br>
          ${formattedAddress}<br>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${codelcoLocation.lat},${codelcoLocation.lng}" target="_blank" style="color: #FFAB40;">Cómo llegar</a>
        </div>
      `;

      const infoWindow = new window.google.maps.InfoWindow({
        content: infoContent
      });

      infoWindow.open(map, marker);
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      console.log('Map initialized successfully');
      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing map:', error);
      setIsLoading(false);
    }
  };

  return (
    <section className="mt-17.5" ref={containerRef}>
      {isMapVisible && !isLoading && mapData ? (
        <div
          ref={mapRef}
          id="map"
          className="w-full"
          style={{ height: '450px' }}
        />
      ) : (
        <div
          className="w-full flex items-center justify-center bg-muted"
          style={{ height: '450px' }}
        >
          <div className="text-muted-foreground flex items-center space-x-2">
            {isLoading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            )}
            <span>
              {isLoading ? 'Cargando mapa...' : 
               !isMapVisible ? 'Preparando mapa...' : 
               'Mapa no disponible'}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Map;