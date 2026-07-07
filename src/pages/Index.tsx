import { lazy, Suspense } from 'react';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyUs from '@/components/WhyUs';
import NovedadesPreview from '@/components/NovedadesPreview';
import Contact from '@/components/Contact';


// Lazy load below-the-fold components for better bundle splitting
const Clients = lazy(() => import('@/components/Clients'));

const Services = lazy(() => import('@/components/Services'));

const Footer = lazy(() => import('@/components/Footer'));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Codelco S.A. — Módulos Habitacionales, Metalúrgica y Rental en Vaca Muerta"
        description="Fábrica de módulos habitacionales e industriales, metalúrgica, rental de vehículos, trailers, torres de iluminación LED y grupos electrógenos. Cipolletti, Río Negro, Argentina."
        path="/"
        keywords="Codelco S.A., módulos habitacionales, metalúrgica, rental Vaca Muerta, torres de iluminación LED, grupos electrógenos, Cipolletti, Río Negro"
      />
      <Header />

      <main>
        <Hero />
        <WhyUs />
        <Services />
        <NovedadesPreview />
        <Suspense fallback={<div className="py-8"><div className="animate-pulse rounded-lg bg-muted h-32 mx-auto max-w-4xl"></div></div>}>
          <Clients />
        </Suspense>
        <Suspense fallback={<div className="py-8 text-center">
          <div className="animate-pulse rounded-lg bg-muted h-96 mx-auto max-w-4xl"></div>
        </div>}>
          <div id="ubicacion">
            <Contact />
          </div>
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-16 bg-muted animate-pulse"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
