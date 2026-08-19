import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  newsData,
  publishedNews as staticPublishedNews,
  isPublished,
  type NewsBlock,
  type NewsItem,
} from '@/data/news';

export interface NewsRow {
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
  cta_question: string | null;
  source_url: string | null;
  source_label: string | null;
  status: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export const NEWS_COLUMNS =
  'id, slug, title, seo_title, category, date_label, date_iso, summary, meta_description, image, image_position, body, cta_question, source_url, source_label, status, created_at, updated_at';

/** Maps a Supabase `news` row to the NewsItem shape the public pages already render. */
export const rowToNewsItem = (row: NewsRow): NewsItem => ({
  id: row.id,
  slug: row.slug,
  category: row.category as NewsItem['category'],
  date: row.date_label,
  title: row.title,
  seoTitle: row.seo_title ?? undefined,
  metaDescription: row.meta_description ?? undefined,
  dateIso: row.date_iso ?? undefined,
  ctaQuestion: row.cta_question ?? undefined,
  summary: row.summary,
  image: row.image ?? '',
  imagePosition: row.image_position ?? undefined,
  body: Array.isArray(row.body) ? (row.body as (string | NewsBlock)[]) : [],
  status: row.status === 'draft' ? 'draft' : 'published',
  sourceUrl: row.source_url ?? undefined,
  sourceLabel: row.source_label ?? undefined,
});

/**
 * Keeps the exact order the site had while news lived in src/data/news.ts,
 * and puts any newly created article at the top of the list.
 */
const LEGACY_ORDER = newsData.map((n) => n.slug);

export const sortNewsItems = (items: NewsItem[]): NewsItem[] =>
  [...items].sort((a, b) => {
    const ia = LEGACY_ORDER.indexOf(a.slug);
    const ib = LEGACY_ORDER.indexOf(b.slug);
    if (ia === -1 && ib === -1) return b.id - a.id;
    if (ia === -1) return -1;
    if (ib === -1) return 1;
    return ia - ib;
  });

const fetchPublishedNews = async (): Promise<NewsItem[]> => {
  const { data, error } = await supabase
    .from('news')
    .select(NEWS_COLUMNS)
    .eq('status', 'published');
  if (error) throw error;
  return sortNewsItems(((data ?? []) as unknown as NewsRow[]).map(rowToNewsItem));
};

/** Published articles for the public site. Falls back to the bundled data while loading/offline. */
export const usePublishedNews = () => {
  const query = useQuery({
    queryKey: ['news', 'published'],
    queryFn: fetchPublishedNews,
    staleTime: 60_000,
  });

  const items =
    query.data && query.data.length > 0 ? query.data : sortNewsItems(staticPublishedNews);

  return { ...query, news: items, latestId: items[0]?.id };
};

/** Every article (drafts included) — only readable by admins per RLS. */
export const fetchAllNews = async (): Promise<NewsItem[]> => {
  const { data, error } = await supabase.from('news').select(NEWS_COLUMNS);
  if (error) throw error;
  return sortNewsItems(((data ?? []) as unknown as NewsRow[]).map(rowToNewsItem));
};

export const useAdminNews = (enabled: boolean) =>
  useQuery({
    queryKey: ['news', 'admin'],
    queryFn: fetchAllNews,
    enabled,
  });

/** Static fallback lookup so directly-opened draft URLs keep working during prerender. */
export const findStaticNews = (slug?: string) =>
  slug ? newsData.find((n) => n.slug === slug) : undefined;

export { isPublished };
