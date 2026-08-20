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
    query.data && query.data.length > 0 ? query.data : sortNewsItems(fallbackPublishedNews());


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

/** Static/build-time fallback lookup so directly-opened URLs keep working during prerender. */
export const findStaticNews = (slug?: string) =>
  slug
    ? remoteNews.find((n) => n.slug === slug) ?? newsData.find((n) => n.slug === slug)
    : undefined;


export { isPublished };
