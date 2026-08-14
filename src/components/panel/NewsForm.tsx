import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

export const CATEGORIES = ['Flota', 'Proyecto', 'Planta', 'Clientes', 'Sector'] as const;

export interface NewsFormValues {
  id?: number;
  title: string;
  seo_title: string;
  slug: string;
  category: string;
  date_label: string;
  date_iso: string;
  summary: string;
  meta_description: string;
  image: string;
  image_position: string;
  body: string;
  status: 'draft' | 'published';
}

export const emptyNews: NewsFormValues = {
  title: '',
  seo_title: '',
  slug: '',
  category: 'Proyecto',
  date_label: '',
  date_iso: '',
  summary: '',
  meta_description: '',
  image: '',
  image_position: '',
  body: '[]',
  status: 'draft',
};

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);

interface Props {
  initial: NewsFormValues;
  saving: boolean;
  onSubmit: (values: NewsFormValues) => void;
  onCancel: () => void;
}

const NewsForm = ({ initial, saving, onSubmit, onCancel }: Props) => {
  const [values, setValues] = useState<NewsFormValues>(initial);
  const [bodyError, setBodyError] = useState<string | null>(null);

  useEffect(() => setValues(initial), [initial]);

  const set = <K extends keyof NewsFormValues>(key: K, value: NewsFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(values.body || '[]');
      if (!Array.isArray(parsed)) throw new Error('debe ser una lista');
      setBodyError(null);
    } catch {
      setBodyError('El contenido debe ser una lista de bloques válida (JSON).');
      return;
    }
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            required
            value={values.title}
            onChange={(e) => {
              const title = e.target.value;
              setValues((v) => ({
                ...v,
                title,
                slug: v.id ? v.slug : slugify(title),
              }));
            }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input
            id="slug"
            required
            value={values.slug}
            onChange={(e) => set('slug', slugify(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Categoría</Label>
          <Select value={values.category} onValueChange={(v) => set('category', v)}>
            <SelectTrigger>
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
          <Label htmlFor="date_label">Fecha visible</Label>
          <Input
            id="date_label"
            required
            placeholder="10 de agosto de 2026"
            value={values.date_label}
            onChange={(e) => set('date_label', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date_iso">Fecha real (orden)</Label>
          <Input
            id="date_iso"
            type="date"
            value={values.date_iso}
            onChange={(e) => set('date_iso', e.target.value)}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="summary">Resumen</Label>
          <Textarea
            id="summary"
            required
            rows={3}
            value={values.summary}
            onChange={(e) => set('summary', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Imagen principal (ruta o URL)</Label>
          <Input
            id="image"
            placeholder="/images/noticias/ejemplo.jpg"
            value={values.image}
            onChange={(e) => set('image', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image_position">Posición de la imagen</Label>
          <Input
            id="image_position"
            placeholder="center 40%"
            value={values.image_position}
            onChange={(e) => set('image_position', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="seo_title">Título SEO (opcional)</Label>
          <Input
            id="seo_title"
            value={values.seo_title}
            onChange={(e) => set('seo_title', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Estado</Label>
          <Select
            value={values.status}
            onValueChange={(v) => set('status', v as NewsFormValues['status'])}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Borrador</SelectItem>
              <SelectItem value="published">Publicada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="meta_description">Meta descripción (opcional)</Label>
          <Textarea
            id="meta_description"
            rows={2}
            value={values.meta_description}
            onChange={(e) => set('meta_description', e.target.value)}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="body">Cuerpo / contenido (bloques)</Label>
          <Textarea
            id="body"
            rows={16}
            spellCheck={false}
            className="font-mono text-xs"
            value={values.body}
            onChange={(e) => set('body', e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Lista de bloques. Ejemplos: <code>{'{"type":"p","text":"..."}'}</code>,{' '}
            <code>{'{"type":"heading","text":"..."}'}</code>,{' '}
            <code>{'{"type":"image","src":"/images/...","alt":"..."}'}</code>,{' '}
            <code>{'{"type":"video","provider":"youtube","id":"..."}'}</code>.
          </p>
          {bodyError && <p className="text-xs text-destructive">{bodyError}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Guardar
        </Button>
      </div>
    </form>
  );
};

export default NewsForm;
