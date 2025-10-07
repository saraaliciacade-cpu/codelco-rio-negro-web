import { MapPin, Mail, Phone } from 'lucide-react';
import codelcoLogo from '@/assets/codelco-logo.png';
import { useLanguage } from '@/contexts/LanguageContext';
const Footer = () => {
  const { t } = useLanguage();
  return <footer className="text-white py-8" style={{
    backgroundColor: '#333333'
  }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Company Info */}
          <div className="space-y-3">
            <img src="/lovable-uploads/4e9dfae6-c0eb-4f51-b236-7cf5da74d7a9.png" alt="Codelco S.A." className="h-12 w-auto" />
            <p className="text-white/80 leading-relaxed font-nunito text-sm">
              {t('footer.description')}
            </p>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-3 font-montserrat">{t('footer.services.title')}</h3>
            <ul className="space-y-1 text-white/80 font-nunito text-sm">
              <li>{t('footer.services.list1')}</li>
              <li>{t('footer.services.list2')}</li>
              <li>{t('footer.services.list3')}</li>
              <li>{t('footer.services.list4')}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-3 font-montserrat">{t('footer.contact.title')}</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary-light" />
                <span className="text-white/80 font-nunito text-base">Ruta 22 Km.1114, Cipolletti - Río Negro</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-light" />
                <span className="text-white/80 font-nunito text-base">ventas@codelco.com.ar</span>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="h-4 w-4 text-primary-light mt-0.5" />
                <div className="font-nunito text-base text-white/80">
                  <div>Sebastian</div>
                  <div>299 413 6453</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="font-nunito text-white text-sm">
            © {new Date().getFullYear()} Codelco S.A. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;