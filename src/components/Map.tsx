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

    // Configuración del mapa con el estilo personalizado de Google Maps
    const initMap = () => {
      const map = new window.google.maps.Map(mapRef.current!, {
        center: { lat: -38.9473, lng: -68.0365 }, // Cipolletti, Río Negro coordinates
        zoom: 15,
        styles: [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dadada"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#c9c9c9"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          }
        ]
      });

      // Marcador personalizado en rojo
      new window.google.maps.Marker({
        position: { lat: -38.9473, lng: -68.0365 },
        map: map,
        title: 'Codelco S.A.',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0C7.164 0 0 7.164 0 16c0 8.837 16 24 16 24s16-15.163 16-24C32 7.164 24.836 0 16 0z" fill="#ff5722"/>
              <circle cx="16" cy="16" r="8" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 40),
          anchor: new window.google.maps.Point(16, 40)
        }
      });
    };

    // Cargar la API de Google Maps si no está cargada
    if (typeof window.google === 'undefined' || !window.google?.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
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