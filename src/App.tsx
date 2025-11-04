import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Lazy load pages for better bundle splitting
const Index = lazy(() => import("./pages/Index"));
const Webmail = lazy(() => import("./pages/Webmail"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminGallery = lazy(() => import("./pages/AdminGallery"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/webmail" element={<Webmail />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/gallery" element={<AdminGallery />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;