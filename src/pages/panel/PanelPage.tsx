import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth, useIsAdmin } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, LogOut, ShieldAlert } from 'lucide-react';
import MessagesPanel from './MessagesPanel';
import NewsPanel from './NewsPanel';

const PanelHead = () => (
  <Helmet>
    <title>Panel Codelco</title>
    <meta name="robots" content="noindex, nofollow" />
  </Helmet>
);

const PanelPage = () => {
  const { user, loading } = useAuth();
  const { isAdmin, isLoading: roleLoading } = useIsAdmin(user?.id);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PanelHead />
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/panel/login" replace />;

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PanelHead />
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-muted/40 flex items-center justify-center px-4">
        <PanelHead />
        <Card className="max-w-sm w-full">
          <CardHeader className="space-y-2">
            <ShieldAlert className="w-6 h-6 text-destructive" />
            <CardTitle>No tenés permisos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              La cuenta {user.email} no está autorizada para usar el panel.
            </p>
            <Button variant="outline" onClick={signOut} className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar sesión
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <PanelHead />
      <header className="bg-background border-b">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/codelco-logo-new.png" alt="Codelco" className="h-7 w-auto" />
            <span className="font-semibold">Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-muted-foreground">{user.email}</span>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Administración</h1>
        <Tabs defaultValue="mensajes">
          <TabsList className="mb-6">
            <TabsTrigger value="mensajes">Mensajes</TabsTrigger>
            <TabsTrigger value="noticias">Noticias</TabsTrigger>
          </TabsList>
          <TabsContent value="mensajes">
            <MessagesPanel />
          </TabsContent>
          <TabsContent value="noticias">
            <NewsPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default PanelPage;
