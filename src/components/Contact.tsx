import { useState, useEffect, useRef } from 'react';
import { MapPin, Mail, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  subject: z.string()
    .min(1, 'Subject is required')
    .trim(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .trim(),
  website: z.string().optional().or(z.literal('')) // Honeypot field
});

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
      
      // Check honeypot field
      if (validatedData.website) {
        console.log('Bot detected');
        return;
      }

      // Send to edge function
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
        subject: '',
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

  // Note: Google Maps JS API removed (no API key / billing required).

  return <section id="contacto" className="pt-6 pb-15 mt-20 relative" style={{ backgroundColor: '#f4f4f4', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.15)' }}>
      {/* Imagen de fondo decorativa - solo en el área del formulario */}
      <div 
        className="absolute right-0 bottom-[450px] pointer-events-none hidden lg:block"
        style={{
          backgroundImage: 'url(/images/contact-bg.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right bottom',
          backgroundSize: 'contain',
          width: '600px',
          height: '400px',
          opacity: 0.9
        }}
      />
      <div className="container mx-auto px-4 sm:px-8 lg:px-20 max-w-7xl relative z-10">
        <div>
          <h2 className="titulo-seccion font-ramabhadra" style={{ color: '#d25840' }}>
            {t('contact.title')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-[340px,1fr] gap-8 lg:gap-12 max-w-full mx-auto px-2 sm:px-6 mb-16">
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
                      <div className="text-base whitespace-pre-line font-nunito leading-relaxed rounded text-foreground font-medium">
                        <div>Sebastian</div>
                        <div><a href="tel:+5492994136453" className="hover:underline" style={{color: '#d25840'}}>299 413 6453</a></div>
                      </div>
                    : info.icon === Mail ? 
                      <div className="text-base whitespace-pre-line font-nunito leading-relaxed rounded font-semibold">
                        <a href="mailto:ventas@codelco.com.ar" className="hover:underline" style={{color: '#d25840'}}>{info.value}</a>
                      </div> 
                    : info.icon === MapPin ? 
                      <div className="text-base whitespace-pre-line font-nunito leading-relaxed text-foreground font-medium rounded-sm">
                        <span style={{color: '#d25840'}} className="font-semibold">{t('contact.address.value').split('\n')[0]}</span>
                        <br />
                        {t('contact.address.value').split('\n')[1]}
                        <br />
                        {t('contact.address.value').split('\n')[2]}
                      </div> 
                    : 
                      <div className="text-base whitespace-pre-line font-nunito leading-relaxed text-foreground font-medium rounded-sm">{info.value}</div>
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
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="subject" className="block text-sm font-normal mb-2 text-foreground">
                    {t('contact.form.subject')}
                  </label>
                  <Select 
                    value={formData.subject} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                  >
                    <SelectTrigger 
                      id="subject"
                      className={`w-full px-3 py-2 border text-body ${formData.subject ? 'bg-white' : ''} ${formErrors.subject ? 'border-destructive' : 'border-muted'}`}
                    >
                      <SelectValue placeholder="Seleccione un asunto" />
                    </SelectTrigger>
                    <SelectContent className="bg-primary z-50">
                      <SelectItem value="fabrica" className="text-white hover:bg-primary/90 focus:bg-primary/90 focus:text-white cursor-pointer">{t('contact.form.subject.fabrica')}</SelectItem>
                      <SelectItem value="metalurgica" className="text-white hover:bg-primary/90 focus:bg-primary/90 focus:text-white cursor-pointer">{t('contact.form.subject.metalurgica')}</SelectItem>
                      <SelectItem value="rental" className="text-white hover:bg-primary/90 focus:bg-primary/90 focus:text-white cursor-pointer">{t('contact.form.subject.rental')}</SelectItem>
                      <SelectItem value="generators" className="text-white hover:bg-primary/90 focus:bg-primary/90 focus:text-white cursor-pointer">{t('contact.form.subject.generators')}</SelectItem>
                      <SelectItem value="question" className="text-white hover:bg-primary/90 focus:bg-primary/90 focus:text-white cursor-pointer">{t('contact.form.subject.question')}</SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.subject && (
                    <p className="text-destructive text-sm mt-1">{formErrors.subject}</p>
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
      <div className="w-full relative">
        <div className="w-full h-[450px]" id="map">
          {isMapVisible ? (
            <iframe
              className="w-full h-full border-0"
              title="Codelco ubicación"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=-38.947524,-68.002487&z=14&output=embed"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <div className="text-muted-foreground">{t('contact.map.loading')}</div>
            </div>
          )}
        </div>

        {/* Info Card Overlay */}
        <div className="absolute top-2 sm:top-4 left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-10 bg-white rounded-lg shadow-lg p-3 sm:p-4 sm:max-w-sm">
          <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2" style={{ color: '#d25840' }}>Codelco S.A</h3>
          <p className="text-xs sm:text-sm text-foreground mb-0.5 sm:mb-1">Ruta 22 Km 1214, R8324 Cipolletti, Río Negro</p>
          <p className="text-xs sm:text-sm text-foreground mb-2 sm:mb-3">Lun a Vie: 8-12hs / 15-19hs</p>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=-38.947524,-68.002487"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold hover:underline"
            style={{ color: '#d25840' }}
          >
            {t('contact.map.directions')}
          </a>
        </div>
      </div>
    </section>;
};
export default Contact;