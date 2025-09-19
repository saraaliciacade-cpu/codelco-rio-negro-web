import { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Clients from '@/components/Clients';
import Company from '@/components/Company';
import Services from '@/components/Services';

// Lazy load components that are below the fold for better initial loading
const Gallery = lazy(() => import('@/components/Gallery'));
const Contact = lazy(() => import('@/components/Contact'));
const Map = lazy(() => import('@/components/Map'));
const Footer = lazy(() => import('@/components/Footer'));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Clients />
        <div id="company">
          <Company />
        </div>
        <Services />
        <Suspense fallback={<div className="py-12 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </div>}>
          <div id="galeria">
            <Gallery />
          </div>
          <Contact />
          <div id="ubicacion">
            <Map />
          </div>
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-16 bg-background"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
