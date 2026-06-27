import { useState } from 'react';
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

  // Note: Google Maps JS API removed (no API key / billing required).

  return <section id="contacto" className="pt-6 pb-15 mt-20 relative" style={{ backgroundColor: '#f4f4f4', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.15)' }}>
      {/* Imagen de fondo decorativa - tamaño original */}
      <div className="absolute right-0 bottom-[450px] pointer-events-none hidden lg:block">
        <img 
          src="/images/contact-bg.png" 
          alt="" 
          className="block"
          style={{ opacity: 0.9 }}
        />
      </div>
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
            
            {/* Planta y oficinas */}
            <Card className="p-6 bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="flex items-start space-x-4 p-0">
                <div className="bg-primary p-3 rounded-full shadow-sm shrink-0">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-bold text-foreground font-montserrat mb-2">Planta y oficinas</h4>
                  <div className="text-base whitespace-pre-line font-nunito leading-relaxed text-foreground font-medium">
                    <span style={{color: '#d25840'}} className="font-semibold">Ruta 22 Km 1214, Cipolletti, Río Negro</span>
                    <br />
                    Lunes a viernes, 8 a 12hs / 15 a 19hs
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Teléfono / WhatsApp */}
            <Card className="p-6 bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="flex items-start space-x-4 p-0">
                <div className="bg-primary p-3 rounded-full shadow-sm shrink-0">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-bold text-foreground font-montserrat mb-2">Teléfono / WhatsApp</h4>
                  <div className="text-base whitespace-pre-line font-nunito leading-relaxed text-foreground font-medium mb-3">
                    299 413 6453 — 299 571 4703
                  </div>
                  <a
                    href="https://wa.me/5492994136453"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold text-sm transition-colors hover:opacity-90"
                    style={{ backgroundColor: '#25D366' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Escribir por WhatsApp
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="p-6 bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="flex items-start space-x-4 p-0">
                <div className="bg-primary p-3 rounded-full shadow-sm shrink-0">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-bold text-foreground font-montserrat mb-2">Email</h4>
                  <div className="text-base whitespace-pre-line font-nunito leading-relaxed rounded font-semibold">
                    <a href="mailto:ventas@codelco.com.ar" className="hover:underline" style={{color: '#d25840'}}>ventas@codelco.com.ar</a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mapa embebido */}
            <div className="w-full overflow-hidden rounded-2xl shadow-sm" style={{ height: '220px' }}>
              <iframe
                className="w-full h-full border-0"
                title="Codelco ubicación"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=-38.9475245,-68.0024868&hl=es&z=15&output=embed"
                allowFullScreen
              />
            </div>
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

    </section>;
};
export default Contact;