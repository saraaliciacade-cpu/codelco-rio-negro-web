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
        const response = await fetch('https://eymjmdusrvpdhprduwrf.supabase.co/functions/v1/secure-maps', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch map configuration');
        }

        const mapData = await response.json();
        const apiKey = mapData.apiKey;
        const locations = mapData.locations || [];

        const locationData = locations.find((loc: any) => loc.name === 'Codelco S.A') || locations[0];
        
        if (locationData) {
          const codelcoLocation = { 
            lat: Number(locationData.latitude), 
            lng: Number(locationData.longitude) 
          };
          createMap(codelcoLocation, locationData.name, locationData.address, apiKey);
          return;
        }
      } catch (err) {
        console.error('Failed to load map configuration:', err);
        // Display error message to user instead of falling back to exposed API key
        if (mapRef.current) {
          const errorDiv = document.createElement('div');
          errorDiv.className = 'flex items-center justify-center h-full';
          const innerDiv = document.createElement('div');
          innerDiv.className = 'text-center text-muted-foreground';
          const p1 = document.createElement('p');
          p1.textContent = 'No se pudo cargar el mapa.';
          const p2 = document.createElement('p');
          p2.className = 'text-sm mt-2';
          p2.textContent = 'Por favor, intente nuevamente más tarde.';
          innerDiv.appendChild(p1);
          innerDiv.appendChild(p2);
          errorDiv.appendChild(innerDiv);
          mapRef.current.innerHTML = '';
          mapRef.current.appendChild(errorDiv);
        }
        return;
      }
    };

    const createMap = (location: { lat: number; lng: number }, name: string, address: string, apiKey: string) => {
      const map = new window.google.maps.Map(mapRef.current!, {
        center: location,
        zoom: 12,
        mapId: "30fd671af640a655e95c3547"
      });

      const marker = new window.google.maps.Marker({
        position: location,
        map,
        title: name
      });

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
      try {
        const response = await fetch('https://eymjmdusrvpdhprduwrf.supabase.co/functions/v1/secure-maps');
        
        if (!response.ok) {
          throw new Error('Failed to fetch API key from secure endpoint');
        }
        
        const mapData = await response.json();
        const apiKey = mapData.apiKey;
        
        if (!apiKey) {
          throw new Error('No API key returned from secure endpoint');
        }

        if (typeof window.google === 'undefined' || !window.google?.maps) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
          script.async = true;
          script.defer = true;
          window.initMap = initMap;
          document.head.appendChild(script);
        } else {
          initMap();
        }
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        // Display error message instead of exposing hardcoded API key
        if (mapRef.current) {
          const errorDiv = document.createElement('div');
          errorDiv.className = 'flex items-center justify-center h-full';
          const innerDiv = document.createElement('div');
          innerDiv.className = 'text-center text-muted-foreground';
          const p1 = document.createElement('p');
          p1.textContent = 'No se pudo cargar el mapa.';
          const p2 = document.createElement('p');
          p2.className = 'text-sm mt-2';
          p2.textContent = 'Por favor, intente nuevamente más tarde.';
          innerDiv.appendChild(p1);
          innerDiv.appendChild(p2);
          errorDiv.appendChild(innerDiv);
          mapRef.current.innerHTML = '';
          mapRef.current.appendChild(errorDiv);
        }
      }
    };

    loadGoogleMaps();
  }, [isMapVisible]);

  return (
    <section id="ubicacion" className="pb-15" style={{ backgroundColor: '#f4f4f4' }} ref={containerRef}>
      {isMapVisible ? (
        <div
          ref={mapRef}
          id="map"
          className="w-full"
          style={{ height: '450px', backgroundColor: '#f4f4f4' }}
        />
      ) : (
        <div
          className="w-full flex items-center justify-center"
          style={{ height: '450px', backgroundColor: '#f4f4f4' }}
        >
          <div className="text-muted-foreground">Cargando mapa...</div>
        </div>
      )}
    </section>
  );
};

export default Map;