import { useState } from 'react';
import { MapPin, Mail, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
const Contact = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensaje enviado",
      description: "Gracias por contactarnos. Te responderemos pronto."
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };
  const contactInfo = [{
    icon: MapPin,
    label: 'Dirección',
    value: 'Ruta 22 Km.1114, Cipolletti - Río Negro\nDías: Lunes a viernes\nHorario: 8-12hs / 15-19hs'
  }, {
    icon: Mail,
    label: 'Email',
    value: 'ventas@codelco.com.ar'
  }, {
    icon: Phone,
    label: 'Teléfonos',
    value: 'Rental: (299) 571 4217\nCompras: (299) 571 4661'
  }];
  return <section id="contacto" className="py-15 bg-background">
      <div className="container mx-auto px-20 max-w-4xl">
        <div>
          <h2 className="titulo-seccion font-ramabhadra">
            <span style={{
            color: '#d25840'
          }}>CONTACTO</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-full mx-auto px-6 mb-16">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="mb-8 text-foreground font-montserrat font-extrabold text-xl">Información de Contacto</h3>
            
            {contactInfo.map((info, index) => <Card key={index} className="p-6 bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="flex items-start space-x-4 p-0">
                  <div className="bg-primary p-3 rounded-full shadow-sm">
                    <info.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-foreground font-montserrat mb-2">{info.label}</h4>
                    {info.icon === Phone ? <div className="text-base whitespace-pre-line font-nunito leading-relaxed rounded text-gray-600">
                        <div>Rental: <span style={{
                      color: '#d25840'
                    }}>(299) 571 4217</span></div>
                        <div>Compras: <span style={{
                      color: '#d25840'
                    }}>(299) 571 4661</span></div>
                      </div> : info.icon === Mail ? <div className="text-base whitespace-pre-line font-nunito leading-relaxed rounded font-semibold" style={{
                  color: '#d25840'
                }}>{info.value}</div> : <div className="text-base whitespace-pre-line font-nunito leading-relaxed text-gray-600 rounded-sm">{info.value}</div>}
                  </div>
                </CardContent>
              </Card>)}
          </div>

          {/* Contact Form */}
          <Card className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8">
            <CardContent className="p-0">
              <h3 className="font-bold mb-8 text-center text-foreground font-montserrat text-lg">Envíanos un Mensaje</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-normal mb-2 text-foreground rounded">
                  Nombre y apellido *
                </label>
                <Input id="name" name="name" type="text" required value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-muted text-body" />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-normal mb-2 text-foreground">
                  Email *
                </label>
                <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-muted text-body" />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-normal mb-2 text-foreground">
                  Teléfono
                </label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="w-full px-3 py-2 border border-muted text-body" />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-normal mb-2 text-foreground">
                  Mensaje *
                </label>
                <Textarea id="message" name="message" required rows={4} value={formData.message} onChange={handleInputChange} className="w-full px-3 py-2 border border-muted text-body resize-none" placeholder="Describe tu consulta o necesidad..." />
              </div>
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 px-6 py-4 rounded-xl transition-colors duration-300 text-zinc-50 font-semibold text-sm">
                <Send className="w-4 h-4 mr-2" />
                Enviar Mensaje
              </Button>
            </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default Contact;