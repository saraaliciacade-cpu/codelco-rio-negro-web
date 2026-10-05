import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  newsData,
  publishedNews as staticPublishedNews,
  isPublished,
  type NewsItem,
} from '@/data/news';
import { remoteNews } from '@/data/newsRemote';
import { NEWS_COLUMNS, rowToNewsItem, type NewsRow } from '@/data/newsRow';

export { NEWS_COLUMNS, rowToNewsItem };
export type { NewsRow };

/** Build-time snapshot merged with the bundled data — used while react-query loads and during SSR. */
const dedupeBySlug = (items: NewsItem[]): NewsItem[] => {
  const bySlug = new Map<string, NewsItem>();
  for (const item of items) {
    if (!bySlug.has(item.slug)) bySlug.set(item.slug, item);
  }
  return [...bySlug.values()];
};

const fallbackPublishedNews = (): NewsItem[] =>
  dedupeBySlug([...remoteNews, ...staticPublishedNews]);


/** Publication dates determine order, regardless of the source or numeric ID. */
const publicationTime = (item: NewsItem): number => {
  if (item.dateIso) {
    const timestamp = Date.parse(item.dateIso);
    if (Number.isFinite(timestamp)) return timestamp;
  }
  const numeric = item.date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (numeric) return Date.UTC(Number(numeric[3]), Number(numeric[2]) - 1, Number(numeric[1]));
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const label = item.date.toLowerCase();
  const month = months.findIndex((name) => label.includes(name));
  const year = label.match(/\b(\d{4})\b/);
  const day = label.match(/^(\d{1,2})\s/);
  return month >= 0 && year ? Date.UTC(Number(year[1]), month, day ? Number(day[1]) : 1) : 0;
};

export const sortNewsItems = (items: NewsItem[]): NewsItem[] =>
  [...items].sort((a, b) => publicationTime(b) - publicationTime(a) || b.id - a.id || a.slug.localeCompare(b.slug));

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

  const base =
    query.data && query.data.length > 0 ? query.data : fallbackPublishedNews();
  // Novedades definidas solo en código (codeOnly) se suman aunque no estén en Supabase.
  const codeOnly = staticPublishedNews.filter((n) => n.codeOnly);
  const items = sortNewsItems(dedupeBySlug([...base, ...codeOnly]));


  return { ...query, news: items, latestId: items[0]?.id, latestSlug: items[0]?.slug };
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

/** Static/build-time fallback lookup so directly-opened URLs keep working during prerender. */
export const findStaticNews = (slug?: string) =>
  slug
    ? remoteNews.find((n) => n.slug === slug) ?? newsData.find((n) => n.slug === slug)
    : undefined;


export { isPublished };
