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
        console.log('Error loading map data:', err);
      }
      
      const codelcoLocation = { lat: -38.947524, lng: -68.002487 };
      const name = 'Codelco S.A';
      const address = 'Ruta 22 Km 1214, R8324 Cipolletti, Río Negro\nDías: Lunes a viernes Horario: 8-12hs / 15-19hs';
      const fallbackApiKey = 'AIzaSyAfO6pwad6QXR7W8DJmMaL39wQLvqZbS0I';
      createMap(codelcoLocation, name, address, fallbackApiKey);
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
        let apiKey = 'AIzaSyAfO6pwad6QXR7W8DJmMaL39wQLvqZbS0I';
        
        const response = await fetch('https://eymjmdusrvpdhprduwrf.supabase.co/functions/v1/secure-maps');
        if (response.ok) {
          const mapData = await response.json();
          apiKey = mapData.apiKey || apiKey;
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
        console.log('Error loading Google Maps:', err);
        if (typeof window.google === 'undefined' || !window.google?.maps) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAfO6pwad6QXR7W8DJmMaL39wQLvqZbS0I&callback=initMap`;
          script.async = true;
          script.defer = true;
          window.initMap = initMap;
          document.head.appendChild(script);
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