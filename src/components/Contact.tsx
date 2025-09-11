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
    <section id="contacto" className="py-32 bg-secondary/30">
      <div className="container mx-auto px-8 max-w-8xl">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Contacto
          </h2>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
            Estamos aquí para ayudarte con tus necesidades industriales. Contáctanos hoy mismo.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-8xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Información de Contacto</h3>
            
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-card border hover:shadow-soft transition-shadow duration-300">
                <div className="bg-gradient-primary p-3 rounded-lg">
                  <info.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{info.label}</h4>
                  <div className="text-muted-foreground mt-1 whitespace-pre-line">{info.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Envíanos un Mensaje</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nombre *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Teléfono
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mensaje *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Describe tu consulta o necesidad..."
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:shadow-strong transition-all duration-300 text-lg py-6"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;