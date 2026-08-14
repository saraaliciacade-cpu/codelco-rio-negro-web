import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
import { useToast } from '@/hooks/use-toast';
import NewsForm, { emptyNews, type NewsFormValues } from '@/components/panel/NewsForm';
import { ExternalLink, Eye, EyeOff, Pencil, Plus, Trash2 } from 'lucide-react';

interface NewsRow {
  id: number;
  slug: string;
  title: string;
  seo_title: string | null;
  category: string;
  date_label: string;
  date_iso: string | null;
  summary: string;
  meta_description: string | null;
  image: string | null;
  image_position: string | null;
  body: unknown;
  status: string;
}

const toForm = (row: NewsRow): NewsFormValues => ({
  id: row.id,
  title: row.title,
  seo_title: row.seo_title ?? '',
  slug: row.slug,
  category: row.category,
  date_label: row.date_label,
  date_iso: row.date_iso ?? '',
  summary: row.summary,
  meta_description: row.meta_description ?? '',
  image: row.image ?? '',
  image_position: row.image_position ?? '',
  body: JSON.stringify(row.body ?? [], null, 2),
  status: row.status === 'published' ? 'published' : 'draft',
});

const toPayload = (v: NewsFormValues) => ({
  title: v.title.trim(),
  seo_title: v.seo_title.trim() || null,
  slug: v.slug.trim(),
  category: v.category,
  date_label: v.date_label.trim(),
  date_iso: v.date_iso || null,
  summary: v.summary.trim(),
  meta_description: v.meta_description.trim() || null,
  image: v.image.trim() || null,
  image_position: v.image_position.trim() || null,
  body: JSON.parse(v.body || '[]'),
  status: v.status,
});

const NewsPanel = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editing, setEditing] = useState<NewsFormValues | null>(null);
  const [deleting, setDeleting] = useState<NewsRow | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['panel', 'news'],
    queryFn: async (): Promise<NewsRow[]> => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('date_iso', { ascending: false })
        .order('id', { ascending: false });
      if (error) throw error;
      return data as unknown as NewsRow[];
    },
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['panel', 'news'] });
    queryClient.invalidateQueries({ queryKey: ['news'] });
  };

  const save = useMutation({
    mutationFn: async (values: NewsFormValues) => {
      const payload = toPayload(values);
      if (values.id) {
        const { error } = await supabase.from('news').update(payload).eq('id', values.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('news').insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      invalidate();
      setEditing(null);
      toast({ title: 'Noticia guardada' });
    },
    onError: (e: Error) =>
      toast({ title: 'No se pudo guardar', description: e.message, variant: 'destructive' }),
  });

  const toggleStatus = useMutation({
    mutationFn: async (row: NewsRow) => {
      const next = row.status === 'published' ? 'draft' : 'published';
      const { error } = await supabase.from('news').update({ status: next }).eq('id', row.id);
      if (error) throw error;
      return next;
    },
    onSuccess: (next) => {
      invalidate();
      toast({ title: next === 'published' ? 'Noticia publicada' : 'Pasada a borrador' });
    },
    onError: (e: Error) =>
      toast({ title: 'No se pudo cambiar el estado', description: e.message, variant: 'destructive' }),
  });

  const remove = useMutation({
    mutationFn: async (row: NewsRow) => {
      const { error } = await supabase.from('news').delete().eq('id', row.id);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidate();
      setDeleting(null);
      toast({ title: 'Noticia eliminada' });
    },
    onError: (e: Error) =>
      toast({ title: 'No se pudo eliminar', description: e.message, variant: 'destructive' }),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <Badge variant="secondary">
          {isLoading ? '…' : `${data?.length ?? 0} noticias`}
        </Badge>
        <Button onClick={() => setEditing({ ...emptyNews })}>
          <Plus className="w-4 h-4 mr-2" />
          Nueva noticia
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(data ?? []).map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium max-w-[24rem]">
                        {row.title}
                        <span className="block text-xs text-muted-foreground font-normal">
                          /novedades/{row.slug}
                        </span>
                      </TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {row.date_label}
                      </TableCell>
                      <TableCell>
                        <Badge variant={row.status === 'published' ? 'default' : 'outline'}>
                          {row.status === 'published' ? 'Publicada' : 'Borrador'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            title="Ver en la web"
                            asChild
                          >
                            <a
                              href={`/novedades/${row.slug}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            title={row.status === 'published' ? 'Pasar a borrador' : 'Publicar'}
                            onClick={() => toggleStatus.mutate(row)}
                          >
                            {row.status === 'published' ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            title="Editar"
                            onClick={() => setEditing(toForm(row))}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            title="Eliminar"
                            onClick={() => setDeleting(row)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing?.id ? 'Editar noticia' : 'Nueva noticia'}</DialogTitle>
          </DialogHeader>
          {editing && (
            <NewsForm
              initial={editing}
              saving={save.isPending}
              onSubmit={(v) => save.mutate(v)}
              onCancel={() => setEditing(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar esta noticia?</AlertDialogTitle>
            <AlertDialogDescription>
              «{deleting?.title}» se borrará de forma permanente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleting && remove.mutate(deleting)}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default NewsPanel;
