import { lazy, Suspense } from 'react';

// Lazy load all components for better bundle splitting
const Header = lazy(() => import('@/components/Header'));
const Hero = lazy(() => import('@/components/Hero'));
const Clients = lazy(() => import('@/components/Clients'));
const Company = lazy(() => import('@/components/Company'));
const Services = lazy(() => import('@/components/Services'));
const Gallery = lazy(() => import('@/components/Gallery'));
const Contact = lazy(() => import('@/components/Contact'));
const Map = lazy(() => import('@/components/Map'));
const Footer = lazy(() => import('@/components/Footer'));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="h-16 bg-background animate-pulse"></div>}>
        <Header />
      </Suspense>
      <main>
        <Suspense fallback={<div className="h-screen bg-background animate-pulse"></div>}>
          <Hero />
        </Suspense>
        <Suspense fallback={<div className="py-8"><div className="animate-pulse rounded-lg bg-gray-200 h-32 mx-auto max-w-4xl"></div></div>}>
          <Clients />
        </Suspense>
        <Suspense fallback={<div className="py-8"><div className="animate-pulse rounded-lg bg-gray-200 h-64 mx-auto max-w-4xl"></div></div>}>
          <div id="company">
            <Company />
          </div>
        </Suspense>
        <Suspense fallback={<div className="py-8"><div className="animate-pulse rounded-lg bg-gray-200 h-96 mx-auto max-w-4xl"></div></div>}>
          <Services />
        </Suspense>
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
