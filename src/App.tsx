import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";

import WhatsAppWidget from "@/components/WhatsAppWidget";

// Lazy load pages for better bundle splitting
const Index = lazy(() => import("./pages/Index"));
const Webmail = lazy(() => import("./pages/Webmail"));
const ClientsPage = lazy(() => import("./pages/ClientsPage"));
const FabricaPage = lazy(() => import("./pages/FabricaPage"));
const MetalurgicaPage = lazy(() => import("./pages/MetalurgicaPage"));
const RentalPage = lazy(() => import("./pages/RentalPage"));
const GruposElectrogenosPage = lazy(() => import("./pages/GruposElectrogenosPage"));
const NovedadesPage = lazy(() => import("./pages/NovedadesPage"));
const NewsDetailPage = lazy(() => import("./pages/NewsDetailPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const id = hash.slice(1);
    let attempts = 0;
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      attempts += 1;
      if (attempts < 12) window.setTimeout(scroll, 80);
    };

    window.setTimeout(scroll, 0);
  }, [pathname, hash]);

  return null;
};

export const AppRoutes = () => (
  <>
    <ScrollToHash />
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/webmail" element={<Webmail />} />
        <Route path="/clientes" element={<ClientsPage />} />
        <Route path="/fabrica" element={<FabricaPage />} />
        <Route path="/metalurgica" element={<MetalurgicaPage />} />
        <Route path="/rental" element={<RentalPage />} />
        <Route path="/grupos-electrogenos" element={<GruposElectrogenosPage />} />
        <Route path="/novedades" element={<NovedadesPage />} />
        <Route path="/novedades/:slug" element={<NewsDetailPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    <WhatsAppWidget />
  </>
);

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        {children}
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;
