import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { newsData, isPublished } from '@/data/news';
import { Loader2, LogOut, Mail, Newspaper, RefreshCw, ExternalLink } from 'lucide-react';

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  created_at: string | null;
}

const formatDate = (value: string | null) => {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });
};

const LoginCard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (mode === 'signin') {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) setError(signInError.message);
    } else {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/user` },
      });
      if (signUpError) setError(signUpError.message);
      else setMessage('Cuenta creada. Si te pide confirmar el mail, revisá tu casilla y volvé a entrar.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-16">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-card border border-border p-8 space-y-5 shadow-sm"
      >
        <div className="space-y-1">
          <h1 className="font-montserrat text-2xl font-bold text-foreground">Panel Codelco</h1>
          <p className="font-nunito text-sm text-muted-foreground">
            Acceso privado para el equipo. Consultas del formulario y estado de novedades.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="panel-email">Email</Label>
          <Input
            id="panel-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="codelcoweb@gmail.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="panel-password">Contraseña</Label>
          <Input
            id="panel-password"
            type="password"
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="font-nunito text-sm text-destructive">{error}</p>}
        {message && <p className="font-nunito text-sm text-primary">{message}</p>}

        <Button type="submit" className="w-full rounded-none" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {mode === 'signin' ? 'Ingresar' : 'Crear cuenta'}
        </Button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === 'signin' ? 'signup' : 'signin');
            setError(null);
            setMessage(null);
          }}
          className="w-full font-nunito text-sm text-muted-foreground hover:text-foreground underline"
        >
          {mode === 'signin' ? 'Primera vez: crear mi cuenta' : 'Ya tengo cuenta: ingresar'}
        </button>
      </form>
    </div>
  );
};

const UserPanel = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);
  const [tab, setTab] = useState<'consultas' | 'novedades'>('consultas');

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setCheckingSession(false);
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingSession(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setIsAdmin(null);
      return;
    }
    let active = true;
    (async () => {
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .maybeSingle();
      if (active) setIsAdmin(Boolean(data));
    })();
    return () => {
      active = false;
    };
  }, [session]);

  const loadSubmissions = async () => {
    setLoadingData(true);
    setDataError(null);
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('id, name, email, phone, company, subject, message, created_at')
      .order('created_at', { ascending: false })
      .limit(200);
    if (error) setDataError(error.message);
    else setSubmissions((data ?? []) as Submission[]);
    setLoadingData(false);
  };

  useEffect(() => {
    if (isAdmin) loadSubmissions();
  }, [isAdmin]);

  const { published, drafts } = useMemo(
    () => ({
      published: newsData.filter(isPublished),
      drafts: newsData.filter((n) => !isPublished(n)),
    }),
    [],
  );

  const seo = (
    <SEO
      title="Panel interno | Codelco"
      description="Acceso privado del equipo Codelco."
      path="/user"
      noindex
      nofollow
    />
  );

  if (checkingSession) {
    return (
      <>
        {seo}
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </>
    );
  }

  if (!session) {
    return (
      <>
        {seo}
        <LoginCard />
      </>
    );
  }

  if (isAdmin === false) {
    return (
      <>
        {seo}
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md text-center space-y-4">
            <h1 className="font-montserrat text-2xl font-bold">Sin permisos</h1>
            <p className="font-nunito text-muted-foreground">
              La cuenta <strong>{session.user.email}</strong> no tiene permisos de administración.
              Pedí acceso o ingresá con una cuenta autorizada.
            </p>
            <Button variant="outline" className="rounded-none" onClick={() => supabase.auth.signOut()}>
              <LogOut className="mr-2 h-4 w-4" /> Salir
            </Button>
          </div>
        </div>
      </>
    );
  }

  if (isAdmin === null) {
    return (
      <>
        {seo}
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </>
    );
  }

  return (
    <>
      {seo}
      <div className="min-h-screen bg-muted/20">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-montserrat text-xl font-bold text-foreground">Panel Codelco</h1>
              <p className="font-nunito text-sm text-muted-foreground">{session.user.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm" className="rounded-none">
                <Link to="/">Ver sitio</Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-none"
                onClick={() => supabase.auth.signOut()}
              >
                <LogOut className="mr-2 h-4 w-4" /> Salir
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 space-y-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={tab === 'consultas' ? 'default' : 'outline'}
              className="rounded-none"
              onClick={() => setTab('consultas')}
            >
              <Mail className="mr-2 h-4 w-4" /> Consultas ({submissions.length})
            </Button>
            <Button
              variant={tab === 'novedades' ? 'default' : 'outline'}
              className="rounded-none"
              onClick={() => setTab('novedades')}
            >
              <Newspaper className="mr-2 h-4 w-4" /> Novedades ({newsData.length})
            </Button>
          </div>

          {tab === 'consultas' && (
            <section className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <p className="font-nunito text-sm text-muted-foreground">
                  Cada consulta también se envía por mail a <strong>codelcoweb@gmail.com</strong>.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-none"
                  onClick={loadSubmissions}
                  disabled={loadingData}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${loadingData ? 'animate-spin' : ''}`} />
                  Actualizar
                </Button>
              </div>

              {dataError && <p className="font-nunito text-sm text-destructive">{dataError}</p>}

              {loadingData && submissions.length === 0 ? (
                <div className="py-12 flex justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : submissions.length === 0 ? (
                <p className="font-nunito text-muted-foreground py-12 text-center">
                  Todavía no hay consultas cargadas.
                </p>
              ) : (
                <div className="grid gap-4">
                  {submissions.map((s) => (
                    <article key={s.id} className="bg-card border border-border p-5 space-y-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h2 className="font-montserrat font-semibold text-foreground">{s.name}</h2>
                        <span className="font-nunito text-xs text-muted-foreground">
                          {formatDate(s.created_at)}
                        </span>
                      </div>
                      <p className="font-nunito text-sm text-muted-foreground">
                        <a className="text-primary hover:underline" href={`mailto:${s.email}`}>
                          {s.email}
                        </a>
                        {s.phone && (
                          <>
                            {' · '}
                            <a className="hover:underline" href={`tel:${s.phone}`}>
                              {s.phone}
                            </a>
                          </>
                        )}
                        {s.company && ` · ${s.company}`}
                      </p>
                      {s.subject && (
                        <p className="font-nunito text-sm font-semibold text-foreground">{s.subject}</p>
                      )}
                      <p className="font-nunito text-sm text-foreground whitespace-pre-line">
                        {s.message}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}

          {tab === 'novedades' && (
            <section className="space-y-8">
              {[
                { label: 'Publicadas', items: published, badge: 'PUBLICADA' },
                { label: 'Borradores (sin indexar)', items: drafts, badge: 'BORRADOR' },
              ].map(({ label, items, badge }) => (
                <div key={label} className="space-y-3">
                  <h2 className="font-montserrat text-lg font-bold text-foreground">
                    {label} ({items.length})
                  </h2>
                  {items.length === 0 ? (
                    <p className="font-nunito text-sm text-muted-foreground">Sin noticias en este estado.</p>
                  ) : (
                    <div className="grid gap-3">
                      {items.map((n) => (
                        <article
                          key={n.id}
                          className="bg-card border border-border p-4 flex flex-wrap items-center gap-4"
                        >
                          <img
                            src={n.image}
                            alt={n.title}
                            loading="lazy"
                            className="h-16 w-24 object-cover"
                          />
                          <div className="flex-1 min-w-[200px] space-y-1">
                            <p className="font-nunito text-xs uppercase tracking-wide text-muted-foreground">
                              {badge} · {n.category} · {n.date}
                            </p>
                            <h3 className="font-montserrat font-semibold text-foreground">{n.title}</h3>
                            <p className="font-nunito text-xs text-muted-foreground">/novedades/{n.slug}</p>
                          </div>
                          <Button asChild variant="outline" size="sm" className="rounded-none">
                            <Link to={`/novedades/${n.slug}`}>
                              Ver <ExternalLink className="ml-2 h-3.5 w-3.5" />
                            </Link>
                          </Button>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default UserPanel;
