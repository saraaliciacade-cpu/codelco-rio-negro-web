import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ExternalLink,
  Eye,
  EyeOff,
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminNews } from '@/hooks/useNews';
import type { NewsItem } from '@/data/news';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const CATEGORIES = ['Flota', 'Proyecto', 'Planta', 'Clientes', 'Sector'] as const;

interface FormState {
  id: number | null;
  title: string;
  seoTitle: string;
  slug: string;
  category: string;
  dateLabel: string;
  dateIso: string;
  summary: string;
  metaDescription: string;
  image: string;
  bodyText: string;
  bodyJson: string;
  jsonMode: boolean;
  status: 'draft' | 'published';
}

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);

/** Body blocks that can be edited as plain text (paragraphs separated by blank lines). */
const bodyToText = (body: NewsItem['body']): string | null => {
  const parts: string[] = [];
  for (const block of body) {
    if (typeof block === 'string') parts.push(block);
    else if (block.type === 'p') parts.push(block.text);
    else return null;
  }
  return parts.join('\n\n');
};

const textToBody = (text: string) =>
  text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((text) => ({ type: 'p' as const, text }));

const emptyForm = (): FormState => ({
  id: null,
  title: '',
  seoTitle: '',
  slug: '',
  category: 'Proyecto',
  dateLabel: '',
  dateIso: '',
  summary: '',
  metaDescription: '',
  image: '',
  bodyText: '',
  bodyJson: '[]',
  jsonMode: false,
  status: 'draft',
});

const formFromItem = (item: NewsItem): FormState => {
  const text = bodyToText(item.body);
  return {
    id: item.id,
    title: item.title,
    seoTitle: item.seoTitle ?? '',
    slug: item.slug,
    category: item.category,
    dateLabel: item.date,
    dateIso: item.dateIso ?? '',
    summary: item.summary,
    metaDescription: item.metaDescription ?? '',
    image: item.image ?? '',
    bodyText: text ?? '',
    bodyJson: JSON.stringify(item.body, null, 2),
    jsonMode: text === null,
    status: item.status === 'draft' ? 'draft' : 'published',
  };
};

const NewsAdmin = ({ enabled }: { enabled: boolean }) => {
  const { data: news, isLoading, isFetching, error, refetch } = useAdminNews(enabled);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<NewsItem | null>(null);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['news'] });
  };

  const { published, drafts } = useMemo(() => {
    const items = news ?? [];
    return {
      published: items.filter((n) => n.status !== 'draft'),
      drafts: items.filter((n) => n.status === 'draft'),
    };
  }, [news]);

  const toggleStatus = useMutation({
    mutationFn: async (item: NewsItem) => {
      const next = item.status === 'draft' ? 'published' : 'draft';
      const { error: updateError } = await supabase
        .from('news')
        .update({ status: next })
        .eq('id', item.id);
      if (updateError) throw updateError;
      return next;
    },
    onSuccess: (next) => {
      invalidate();
      toast({
        title: next === 'published' ? 'Noticia publicada' : 'Noticia pasada a borrador',
      });
    },
    onError: (e: Error) => toast({ title: 'No se pudo cambiar el estado', description: e.message, variant: 'destructive' }),
  });

  const remove = useMutation({
    mutationFn: async (item: NewsItem) => {
      const { error: delError } = await supabase.from('news').delete().eq('id', item.id);
      if (delError) throw delError;
    },
    onSuccess: () => {
      invalidate();
      setToDelete(null);
      toast({ title: 'Noticia eliminada' });
    },
    onError: (e: Error) => toast({ title: 'No se pudo eliminar', description: e.message, variant: 'destructive' }),
  });

  const save = async () => {
    if (!form) return;
    setSaveError(null);

    if (!form.title.trim()) return setSaveError('El título es obligatorio.');
    if (!form.summary.trim()) return setSaveError('El resumen es obligatorio.');

    let body: unknown;
    if (form.jsonMode) {
      try {
        body = JSON.parse(form.bodyJson);
        if (!Array.isArray(body)) throw new Error('El contenido JSON debe ser un array de bloques.');
      } catch (e) {
        return setSaveError(`Contenido JSON inválido: ${(e as Error).message}`);
      }
    } else {
      body = textToBody(form.bodyText);
    }

    const slug = (form.slug.trim() || slugify(form.title)).trim();
    const payload = {
      slug,
      title: form.title.trim(),
      seo_title: form.seoTitle.trim() || null,
      category: form.category,
      date_label: form.dateLabel.trim() || new Date().toLocaleDateString('es-AR'),
      date_iso: form.dateIso.trim() || null,
      summary: form.summary.trim(),
      meta_description: form.metaDescription.trim() || null,
      image: form.image.trim() || null,
      body: body as never,
      status: form.status,
    };

    setSaving(true);
    const result = form.id
      ? await supabase.from('news').update(payload).eq('id', form.id)
      : await supabase.from('news').insert(payload);
    setSaving(false);

    if (result.error) {
      setSaveError(result.error.message);
      return;
    }
    invalidate();
    setForm(null);
    toast({ title: form.id ? 'Noticia actualizada' : 'Noticia creada' });
  };

  const groups = [
    { label: 'Publicadas', items: published, badge: 'PUBLICADA' },
    { label: 'Borradores (sin indexar)', items: drafts, badge: 'BORRADOR' },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-nunito text-sm text-muted-foreground">
          Las noticias se guardan en la base de datos y se publican en{' '}
          <Link to="/novedades" className="text-primary hover:underline">
            /novedades
          </Link>
          .
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-none"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} /> Actualizar
          </Button>
          <Button size="sm" className="rounded-none" onClick={() => setForm(emptyForm())}>
            <Plus className="mr-2 h-4 w-4" /> Nueva noticia
          </Button>
        </div>
      </div>

      {error && (
        <p className="font-nunito text-sm text-destructive">
          No se pudieron cargar las noticias: {(error as Error).message}
        </p>
      )}

      {isLoading ? (
        <div className="py-12 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : (
        groups.map(({ label, items, badge }) => (
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
                    {n.image && (
                      <img src={n.image} alt={n.title} loading="lazy" className="h-16 w-24 object-cover" />
                    )}
                    <div className="flex-1 min-w-[200px] space-y-1">
                      <p className="font-nunito text-xs uppercase tracking-wide text-muted-foreground">
                        {badge} · {n.category} · {n.date}
                      </p>
                      <h3 className="font-montserrat font-semibold text-foreground">{n.title}</h3>
                      <p className="font-nunito text-xs text-muted-foreground">/novedades/{n.slug}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-none"
                        onClick={() => setForm(formFromItem(n))}
                      >
                        <Pencil className="mr-2 h-3.5 w-3.5" /> Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-none"
                        disabled={toggleStatus.isPending}
                        onClick={() => toggleStatus.mutate(n)}
                      >
                        {n.status === 'draft' ? (
                          <>
                            <Eye className="mr-2 h-3.5 w-3.5" /> Publicar
                          </>
                        ) : (
                          <>
                            <EyeOff className="mr-2 h-3.5 w-3.5" /> Pasar a borrador
                          </>
                        )}
                      </Button>
                      <Button asChild variant="outline" size="sm" className="rounded-none">
                        <Link to={`/novedades/${n.slug}`}>
                          Ver <ExternalLink className="ml-2 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-none text-destructive hover:text-destructive"
                        onClick={() => setToDelete(n)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        ))
      )}

      {/* Create / edit form */}
      <Dialog open={form !== null} onOpenChange={(open) => !open && setForm(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-none">
          <DialogHeader>
            <DialogTitle className="font-montserrat">
              {form?.id ? 'Editar noticia' : 'Nueva noticia'}
            </DialogTitle>
            <DialogDescription className="font-nunito">
              Completá los datos. Guardá como borrador para revisarla antes de publicarla.
            </DialogDescription>
          </DialogHeader>

          {form && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="news-title">Título *</Label>
                <Input
                  id="news-title"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                      slug: form.id || form.slug ? form.slug : slugify(e.target.value),
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="news-seo-title">Título SEO</Label>
                <Input
                  id="news-seo-title"
                  value={form.seoTitle}
                  onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                  placeholder="Título para Google (opcional)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="news-slug">Slug (URL)</Label>
                <div className="flex gap-2">
                  <Input
                    id="news-slug"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="mi-noticia"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-none whitespace-nowrap"
                    onClick={() => setForm({ ...form, slug: slugify(form.title) })}
                  >
                    Sugerir
                  </Button>
                </div>
                <p className="font-nunito text-xs text-muted-foreground">
                  /novedades/{form.slug || slugify(form.title) || '...'}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>Categoría</Label>
                  <Select
                    value={form.category}
                    onValueChange={(value) => setForm({ ...form, category: value })}
                  >
                    <SelectTrigger className="rounded-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="news-date-label">Fecha visible</Label>
                  <Input
                    id="news-date-label"
                    value={form.dateLabel}
                    onChange={(e) => setForm({ ...form, dateLabel: e.target.value })}
                    placeholder="Agosto 2026"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="news-date-iso">Fecha (AAAA-MM-DD)</Label>
                  <Input
                    id="news-date-iso"
                    type="date"
                    value={form.dateIso}
                    onChange={(e) => setForm({ ...form, dateIso: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="news-summary">Resumen *</Label>
                <Textarea
                  id="news-summary"
                  rows={3}
                  className="rounded-none"
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="news-meta">Meta descripción</Label>
                <Textarea
                  id="news-meta"
                  rows={2}
                  className="rounded-none"
                  value={form.metaDescription}
                  onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                  placeholder="Si la dejás vacía se usa el resumen."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="news-image">Imagen principal (ruta o URL)</Label>
                <Input
                  id="news-image"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="/images/noticias/mi-imagen.jpg"
                />
                {form.image && (
                  <img src={form.image} alt="" className="h-24 w-40 object-cover border border-border" />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="news-body">Contenido</Label>
                  <button
                    type="button"
                    className="font-nunito text-xs text-muted-foreground underline hover:text-foreground"
                    onClick={() => setForm({ ...form, jsonMode: !form.jsonMode })}
                  >
                    {form.jsonMode ? 'Editar como texto simple' : 'Editar bloques en JSON (avanzado)'}
                  </button>
                </div>
                {form.jsonMode ? (
                  <Textarea
                    id="news-body"
                    rows={12}
                    className="rounded-none font-mono text-xs"
                    value={form.bodyJson}
                    onChange={(e) => setForm({ ...form, bodyJson: e.target.value })}
                  />
                ) : (
                  <Textarea
                    id="news-body"
                    rows={10}
                    className="rounded-none"
                    value={form.bodyText}
                    onChange={(e) => setForm({ ...form, bodyText: e.target.value })}
                    placeholder={'Un párrafo por bloque.\n\nSepará los párrafos con una línea vacía.'}
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label>Estado</Label>
                <Select
                  value={form.status}
                  onValueChange={(value) =>
                    setForm({ ...form, status: value as 'draft' | 'published' })
                  }
                >
                  <SelectTrigger className="rounded-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Borrador</SelectItem>
                    <SelectItem value="published">Publicada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {saveError && <p className="font-nunito text-sm text-destructive">{saveError}</p>}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" className="rounded-none" onClick={() => setForm(null)}>
              Cancelar
            </Button>
            <Button className="rounded-none" onClick={save} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {form?.id ? 'Guardar cambios' : 'Crear noticia'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={toDelete !== null} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent className="rounded-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-montserrat">¿Eliminar la noticia?</AlertDialogTitle>
            <AlertDialogDescription className="font-nunito">
              Se va a borrar «{toDelete?.title}» de forma permanente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-none">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-none"
              onClick={(e) => {
                e.preventDefault();
                if (toDelete) remove.mutate(toDelete);
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default NewsAdmin;
