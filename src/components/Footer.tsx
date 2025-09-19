import { MapPin, Mail, Phone } from 'lucide-react';
import codelcoLogo from '@/assets/codelco-logo.png';
const Footer = () => {
  return <footer className="text-white py-8" style={{
    backgroundColor: '#333333'
  }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Company Info */}
          <div className="space-y-3">
            <img src="/lovable-uploads/4e9dfae6-c0eb-4f51-b236-7cf5da74d7a9.png" alt="Codelco S.A." className="h-12 w-auto" />
            <p className="text-white/80 leading-relaxed font-nunito text-sm">
              Empresa argentina especializada en servicios industriales, productos y rental de equipos para el sector industrial.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-3 font-montserrat">Nuestros Servicios</h3>
            <ul className="space-y-1 text-white/80 font-nunito text-sm">
              <li>• Servicios Industriales</li>
              <li>• Productos Especializados</li>
              <li>• Rental de Equipos</li>
              <li>• Consultoría Técnica</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-3 font-montserrat">Información de Contacto</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary-light" />
                <span className="text-white/80 font-nunito text-base">Ruta 22 Km.1114, Cipolletti - Río Negro</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-light" />
                <span style={{
                color: '#d25840'
              }} className="font-nunito text-base text-slate-50">ventas@codelco.com.ar</span>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="h-4 w-4 text-primary-light mt-0.5" />
                <div className="font-nunito text-base" style={{
                color: '#d25840'
              }}>
                  <div className="whitespace-normal ">Rental: (299) 571 4217</div>
                  <div className="bg-black/0">Compras: (299) 571 4661</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="font-nunito text-white text-sm">
            © {new Date().getFullYear()} Codelco S.A. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;