import { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(255).trim(),
  company: z.string().max(120).optional().or(z.literal('')),
  phone: z.string().max(20).optional().or(z.literal('')),
  subject: z.string().min(1),
  message: z.string().min(10).max(2000).trim(),
  website: z.string().optional().or(z.literal(''))
});

const Contact = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    website: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    try {
      const validated = contactFormSchema.parse(formData);
      if (validated.website) return;
      const { error } = await supabase.functions.invoke('contact-submit', { body: validated });
      if (error) throw error;
      toast({ title: '¡Mensaje enviado!', description: 'Un asesor te contactará a la brevedad.' });
      setFormData({ name: '', email: '', company: '', phone: '', subject: '', message: '', website: '' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => { if (err.path[0]) errors[err.path[0].toString()] = err.message; });
        setFormErrors(errors);
      } else {
        toast({ title: 'Error al enviar', description: 'Intenta nuevamente en unos minutos.', variant: 'destructive' });
      }
    }
  };

  return (
    <section id="contacto" className="py-20" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="container mx-auto px-4 sm:px-8 lg:px-20 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-8" style={{ backgroundColor: '#e04d1c' }} />
              <span className="text-sm font-bold tracking-widest font-montserrat" style={{ color: '#e04d1c' }}>CONTACTO</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white font-montserrat leading-tight mb-6">
              Contanos tu proyecto y te respondemos en menos de 24 horas
            </h2>
            <p className="text-white/60 font-nunito text-base mb-10 max-w-lg">
              Fabricación, alquiler o soporte técnico: decinos qué necesitás y armamos la propuesta.
            </p>

            <div className="divide-y divide-white/10">
              {/* Planta */}
              <div className="flex items-start gap-4 py-5">
                <div className="rounded-lg p-2.5 shrink-0" style={{ backgroundColor: '#e04d1c' }}>
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold font-montserrat text-base mb-1">Planta y oficinas</h3>
                  <p className="text-white/60 font-nunito text-sm leading-relaxed">
                    Ruta 22 Km 1214, Cipolletti, Río Negro<br />
                    Lunes a viernes, 8 a 12hs / 15 a 19hs
                  </p>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-start gap-4 py-5">
                <div className="rounded-lg p-2.5 shrink-0" style={{ backgroundColor: '#e04d1c' }}>
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-white font-bold font-montserrat text-base mb-1">Teléfono / WhatsApp</h3>
                    <p className="text-white/60 font-nunito text-sm">299 413 6453 — 299 571 4703</p>
                  </div>
                  <a
                    href="https://wa.me/5492994136453"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#25D366' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Escribir por WhatsApp
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 py-5">
                <div className="rounded-lg p-2.5 shrink-0" style={{ backgroundColor: '#e04d1c' }}>
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold font-montserrat text-base mb-1">Email</h3>
                  <a href="mailto:ventas@codelco.com.ar" className="font-nunito text-sm hover:underline" style={{ color: '#e04d1c' }}>
                    ventas@codelco.com.ar
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="w-full overflow-hidden rounded-2xl mt-8" style={{ height: '220px' }}>
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

          {/* Right column - Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl h-fit">
            <h3 className="text-2xl font-extrabold font-montserrat text-[#1a1a1a] mb-2">Solicitar presupuesto</h3>
            <p className="text-sm text-gray-500 font-nunito mb-6">Completá el formulario y un asesor te contacta a la brevedad.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold mb-1.5 text-[#1a1a1a] font-montserrat">Nombre y apellido *</label>
                  <Input id="name" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Tu nombre" className={formErrors.name ? 'border-destructive' : ''} />
                </div>
                <div>
                  <label htmlFor="company" className="block text-xs font-bold mb-1.5 text-[#1a1a1a] font-montserrat">Empresa</label>
                  <Input id="company" name="company" value={formData.company} onChange={handleInputChange} placeholder="Nombre de tu empresa" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold mb-1.5 text-[#1a1a1a] font-montserrat">Email *</label>
                  <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} placeholder="tu@empresa.com" className={formErrors.email ? 'border-destructive' : ''} />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold mb-1.5 text-[#1a1a1a] font-montserrat">Teléfono</label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="299..." />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-bold mb-1.5 text-[#1a1a1a] font-montserrat">¿Qué necesitás? *</label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full h-10 px-3 rounded-md border bg-white text-sm font-nunito text-[#1a1a1a] ${formErrors.subject ? 'border-destructive' : 'border-input'}`}
                >
                  <option value="">Seleccionar división</option>
                  <option value="fabrica">Fábrica - Módulos habitacionales</option>
                  <option value="metalurgica">Metalúrgica - Equipos y tanques</option>
                  <option value="rental">Rental - Alquiler de equipos</option>
                  <option value="generators">Grupos Electrógenos</option>
                  <option value="question">Consulta general</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold mb-1.5 text-[#1a1a1a] font-montserrat">Mensaje *</label>
                <Textarea id="message" name="message" required rows={4} value={formData.message} onChange={handleInputChange} placeholder="Describí tu proyecto o necesidad..." className={`resize-none ${formErrors.message ? 'border-destructive' : ''}`} />
              </div>

              {/* Honeypot */}
              <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <Input id="website" name="website" type="text" value={formData.website} onChange={handleInputChange} tabIndex={-1} autoComplete="off" />
              </div>

              <Button type="submit" className="w-full py-6 rounded-lg text-white font-bold text-base font-montserrat hover:opacity-90 transition-opacity" style={{ backgroundColor: '#e04d1c' }}>
                Enviar consulta →
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
