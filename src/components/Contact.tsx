import { useState } from 'react';
import { MapPin, Mail, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensaje enviado",
      description: "Gracias por contactarnos. Te responderemos pronto.",
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Dirección',
      value: 'Ruta 22 Km.1114, Cipolletti - Río Negro\nDías: Lunes a viernes\nHorario: 8-12hs / 15-19hs',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'ventas@codelco.com.ar',
    },
    {
      icon: Phone,
      label: 'Teléfonos',
      value: 'Rental: (299) 571 4217\nCompras: (299) 571 4661',
    },
  ];

  return (
    <section id="contacto" className="py-15 bg-background">
      <div className="container mx-auto px-20 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-5 font-ramabhadra">
            <span style={{color: '#d25840'}}>CONTACTO</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12.5 max-w-full mx-auto px-6">
          {/* Contact Information */}
          <div className="space-y-5">
            <h3 className="text-h2 font-bold mb-5 text-foreground font-montserrat">Información de Contacto</h3>
            
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-card">
                <div className="bg-primary p-2 rounded">
                  <info.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="text-h2 font-bold text-foreground font-montserrat">{info.label}</h4>
                  <div className="text-body text-foreground mt-1 whitespace-pre-line font-nunito">{info.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-card p-6">
            <h3 className="text-h2 font-bold mb-5 text-center text-foreground font-montserrat">Envíanos un Mensaje</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-body font-normal mb-2 text-foreground">
                    Nombre *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-muted text-body"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-body font-normal mb-2 text-foreground">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-muted text-body"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-body font-normal mb-2 text-foreground">
                  Teléfono
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-muted text-body"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-body font-normal mb-2 text-foreground">
                  Mensaje *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-muted text-body resize-none"
                  placeholder="Describe tu consulta o necesidad..."
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary text-white px-4 py-3 text-body font-normal"
              >
                <Send className="w-3 h-3 mr-2" />
                Enviar Mensaje
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;