import { useState, useEffect, useRef } from 'react';
import { MapPin, Mail, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { z } from 'zod';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .trim(),
  phone: z.string()
    .max(20, 'Phone must be less than 20 characters')
    .optional()
    .or(z.literal('')),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .trim(),
  website: z.string().optional().or(z.literal('')) // Honeypot field
});

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}
const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    website: '' // Honeypot field
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    
    try {
      // Validate form data
      const validatedData = contactFormSchema.parse(formData);
      
      const { data, error } = await supabase.functions.invoke('contact-submit', {
        body: validatedData
      });

      if (error) {
        throw error;
      }

      toast({
        title: t('contact.form.success.title'),
        description: t('contact.form.success.description')
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        website: ''
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0].toString()] = err.message;
          }
        });
        setFormErrors(errors);
        toast({
          title: 'Validation Error',
          description: 'Please check the form for errors',
          variant: "destructive",
        });
      } else {
        console.error('Error submitting contact form:', error);
        toast({
          title: t('contact.form.error.title'),
          description: t('contact.form.error.description'),
          variant: "destructive",
        });
      }
    }
  };
  const contactInfo = [{
    icon: MapPin,
    label: t('contact.address.label'),
    value: t('contact.address.value')
  }, {
    icon: Mail,
    label: t('contact.email.label'),
    value: 'ventas@codelco.com.ar'
  }, {
    icon: Phone,
    label: t('contact.phone.label'),
    value: `${t('contact.phone.rental')}\n${t('contact.phone.compras')}`
  }];

  // Map initialization logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isMapVisible) {
          setIsMapVisible(true);
        }
      },
      { rootMargin: '100px' }
    );

    const mapElement = document.getElementById('map');
    if (mapElement) {
      observer.observe(mapElement);
    }

    return () => observer.disconnect();
  }, [isMapVisible]);

  useEffect(() => {
    if (!mapRef.current || !isMapVisible) return;

    let scriptLoaded = false;

    const initMap = async () => {
      try {
        // Use secure-maps edge function to fetch API key and location data
        const response = await fetch('https://eymjmdusrvpdhprduwrf.supabase.co/functions/v1/secure-maps', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch maps data');
        }
        
        const mapsData = await response.json();

        if (mapsData && mapsData.apiKey) {
          // Check if Google Maps is already loaded
          if (typeof window.google !== 'undefined' && window.google?.maps) {
            // Google Maps already loaded, just create the map
            const locationData = mapsData.locations?.[0] || { 
              latitude: -38.947524, 
              longitude: -68.002487,
              name: 'Codelco S.A',
              address: t('contact.address.value')
            };
            const codelcoLocation = { lat: Number(locationData.latitude), lng: Number(locationData.longitude) };
            createMap(codelcoLocation, locationData.name || 'Codelco S.A', locationData.address || t('contact.address.value'));
            return;
          }

          // Load Google Maps script with secure API key
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsData.apiKey}&callback=initMap`;
          script.async = true;
          script.defer = true;
          
          window.initMap = () => {
            if (scriptLoaded) return; // Prevent double initialization
            scriptLoaded = true;

            const locationData = mapsData.locations?.[0] || { 
              latitude: -38.947524, 
              longitude: -68.002487,
              name: 'Codelco S.A',
              address: t('contact.address.value')
            };
            
            const codelcoLocation = { lat: Number(locationData.latitude), lng: Number(locationData.longitude) };
            createMap(codelcoLocation, locationData.name || 'Codelco S.A', locationData.address || t('contact.address.value'));
          };
          
          // Add error handler for script loading
          script.onerror = () => {
            console.error('Failed to load Google Maps script');
            toast({
              title: 'Map Error',
              description: 'Could not load Google Maps. Please check your connection.',
              variant: "destructive",
            });
          };

          document.head.appendChild(script);
        }
      } catch (err) {
        console.error('Error in map initialization:', err);
        toast({
          title: 'Map Error',
          description: 'An unexpected error occurred loading the map.',
          variant: "destructive",
        });
      }
    };

    const createMap = (location: { lat: number; lng: number }, name: string, address: string) => {
      if (!mapRef.current) return;

      const map = new window.google.maps.Map(mapRef.current, {
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
        <div style="padding: 8px;">
          <strong style="font-size: 16px; color: #d25840;">${name}</strong><br>
          <div style="margin-top: 8px; color: #333;">${formattedAddress}</div>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}" target="_blank" rel="noopener noreferrer" style="color: #d25840; text-decoration: none; font-weight: 600; margin-top: 8px; display: inline-block;">${t('contact.map.directions')}</a>
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

    initMap();

    // Cleanup function
    return () => {
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, [isMapVisible, t, toast]);
  return <section id="contacto" className="pt-6 pb-15 mt-20" style={{ backgroundColor: '#f4f4f4', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.15)' }}>
      <div className="container mx-auto px-4 sm:px-8 lg:px-20 max-w-4xl">
        <div>
          <h2 className="titulo-seccion font-ramabhadra" style={{ color: '#d25840' }}>
            {t('contact.title')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-full mx-auto px-2 sm:px-6 mb-16">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="mb-8 text-foreground font-montserrat font-extrabold text-xl">{t('contact.info')}</h3>
            
            {contactInfo.map((info, index) => <Card 
                key={index} 
                className={`p-6 bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 ${info.icon === MapPin ? 'cursor-pointer' : ''}`}
                onClick={info.icon === MapPin ? () => {
                  const mapElement = document.getElementById('map');
                  if (mapElement) {
                    mapElement.scrollIntoView({ behavior: 'smooth' });
                  }
                } : undefined}
              >
                <CardContent className="flex items-start space-x-4 p-0">
                  <div className="bg-primary p-3 rounded-full shadow-sm">
                    <info.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-foreground font-montserrat mb-2">{info.label}</h4>
                    {info.icon === Phone ? 
                      <div className="text-base whitespace-pre-line font-nunito leading-relaxed rounded text-gray-600">
                        <div>{t('contact.phone.rental').replace('(299) 571 4217', '')}<a href="tel:+5492995714217" className="hover:underline" style={{color: '#d25840'}}>(299) 571 4217</a></div>
                        <div>{t('contact.phone.compras').replace('(299) 571 4661', '')}<a href="tel:+5492995714661" className="hover:underline" style={{color: '#d25840'}}>(299) 571 4661</a></div>
                      </div>
                    : info.icon === Mail ? 
                      <div className="text-base whitespace-pre-line font-nunito leading-relaxed rounded font-semibold">
                        <a href="mailto:ventas@codelco.com.ar" className="hover:underline" style={{color: '#d25840'}}>{info.value}</a>
                      </div> 
                    : info.icon === MapPin ? 
                      <div className="text-base whitespace-pre-line font-nunito leading-relaxed text-gray-600 rounded-sm">
                        <span style={{color: '#d25840'}} className="font-semibold">{t('contact.address.value').split('\n')[0]}</span>
                        <br />
                        {t('contact.address.value').split('\n')[1]}
                        <br />
                        {t('contact.address.value').split('\n')[2]}
                      </div> 
                    : 
                      <div className="text-base whitespace-pre-line font-nunito leading-relaxed text-gray-600 rounded-sm">{info.value}</div>
                    }
                  </div>
                </CardContent>
              </Card>)}
          </div>

          {/* Contact Form */}
          <Card className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8">
            <CardContent className="p-0">
              <h3 className="font-bold mb-8 text-center text-foreground font-montserrat text-lg">{t('contact.form.title')}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-normal mb-2 text-foreground rounded">
                  {t('contact.form.name')}
                </label>
                <Input 
                  id="name" 
                  name="name" 
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  className={`w-full px-3 py-2 border text-body ${formErrors.name ? 'border-destructive' : 'border-muted'}`}
                />
                {formErrors.name && (
                  <p className="text-destructive text-sm mt-1">{formErrors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-normal mb-2 text-foreground">
                  {t('contact.form.email')}
                </label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  className={`w-full px-3 py-2 border text-body ${formErrors.email ? 'border-destructive' : 'border-muted'}`}
                />
                {formErrors.email && (
                  <p className="text-destructive text-sm mt-1">{formErrors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-normal mb-2 text-foreground">
                  {t('contact.form.phone')}
                </label>
                <Input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  className={`w-full px-3 py-2 border text-body ${formErrors.phone ? 'border-destructive' : 'border-muted'}`}
                />
                {formErrors.phone && (
                  <p className="text-destructive text-sm mt-1">{formErrors.phone}</p>
                )}
              </div>
              
              {/* Honeypot field - hidden from users but visible to bots */}
              <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <label htmlFor="website">Website</label>
                <Input 
                  id="website" 
                  name="website" 
                  type="text" 
                  value={formData.website} 
                  onChange={handleInputChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-normal mb-2 text-foreground">
                  {t('contact.form.message')}
                </label>
                <Textarea 
                  id="message" 
                  name="message" 
                  required 
                  rows={4} 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  className={`w-full px-3 py-2 border text-body resize-none ${formErrors.message ? 'border-destructive' : 'border-muted'}`}
                  placeholder={t('contact.form.placeholder')} 
                />
                {formErrors.message && (
                  <p className="text-destructive text-sm mt-1">{formErrors.message}</p>
                )}
              </div>
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 px-6 py-4 rounded-xl transition-colors duration-300 text-zinc-50 font-semibold text-sm">
                <Send className="w-4 h-4 mr-2" />
                {t('contact.form.submit')}
              </Button>
            </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map Section - Full width outside container */}
      <div className="w-full">
        <div className="w-full" style={{ height: '450px' }}>
          {isMapVisible ? (
            <div
              ref={mapRef}
              id="map"
              className="w-full h-full"
              style={{ backgroundColor: '#f4f4f4' }}
            />
          ) : (
            <div
              id="map"
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: '#f4f4f4' }}
            >
              <div className="text-muted-foreground">{t('contact.map.loading')}</div>
            </div>
          )}
        </div>
      </div>
    </section>;
};
export default Contact;