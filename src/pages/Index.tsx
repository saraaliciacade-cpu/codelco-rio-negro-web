import { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Clients from '@/components/Clients';
import Company from '@/components/Company';
import Services from '@/components/Services';

// Lazy load components that are below the fold for better initial loading
// These will only be loaded when they become visible or are about to become visible
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
        <Suspense fallback={<div className="py-8 text-center">
          <div className="animate-pulse rounded-lg bg-gray-200 h-64 mx-auto max-w-4xl"></div>
        </div>}>
          <div id="galeria">
            <Gallery />
          </div>
        </Suspense>
        <Suspense fallback={<div className="py-8 text-center">
          <div className="animate-pulse rounded-lg bg-gray-200 h-96 mx-auto max-w-4xl"></div>
        </div>}>
          <Contact />
        </Suspense>
        <Suspense fallback={<div className="py-8 text-center">
          <div className="animate-pulse rounded-lg bg-gray-200 h-96 mx-auto max-w-4xl"></div>
        </div>}>
          <div id="ubicacion">
            <Map />
          </div>
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-16 bg-gray-100 animate-pulse"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
