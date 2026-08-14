import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Mail, Phone, Search } from 'lucide-react';

interface Submission {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  created_at: string | null;
}

const formatDate = (value: string | null) => {
  if (!value) return '—';
  return new Date(value).toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const MessagesPanel = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Submission | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['panel', 'contact_submissions'],
    queryFn: async (): Promise<Submission[]> => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('id, name, company, email, phone, subject, message, created_at')
        .order('created_at', { ascending: false })
        .limit(1000);
      if (error) throw error;
      return data as Submission[];
    },
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data ?? [];
    return (data ?? []).filter((s) =>
      [s.name, s.company, s.email, s.subject, s.message]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q))
    );
  }, [data, search]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Buscar por nombre, email o empresa"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Badge variant="secondary">
          {isLoading ? '…' : `${filtered.length} mensaje${filtered.length === 1 ? '' : 's'}`}
        </Badge>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="p-8 text-center text-muted-foreground">Todavía no hay mensajes.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Fecha</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Qué necesita</TableHead>
                    <TableHead>Mensaje</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((s) => (
                    <TableRow
                      key={s.id}
                      className="cursor-pointer"
                      onClick={() => setSelected(s)}
                    >
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {formatDate(s.created_at)}
                      </TableCell>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell>{s.company || '—'}</TableCell>
                      <TableCell>{s.email}</TableCell>
                      <TableCell>{s.phone || '—'}</TableCell>
                      <TableCell>{s.subject || '—'}</TableCell>
                      <TableCell className="max-w-[22rem] truncate text-muted-foreground">
                        {s.message}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
                <DialogDescription>
                  {formatDate(selected.created_at)}
                  {selected.company ? ` · ${selected.company}` : ''}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`mailto:${selected.email}`}
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    <Mail className="w-4 h-4" />
                    {selected.email}
                  </a>
                  {selected.phone && (
                    <a
                      href={`tel:${selected.phone}`}
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      <Phone className="w-4 h-4" />
                      {selected.phone}
                    </a>
                  )}
                </div>
                {selected.subject && (
                  <p>
                    <span className="text-muted-foreground">Qué necesita: </span>
                    {selected.subject}
                  </p>
                )}
                <div className="rounded-md bg-muted p-4 whitespace-pre-wrap leading-relaxed">
                  {selected.message}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessagesPanel;
