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
import { archivedNews } from '@/data/archivedNews';
import { mergeNewsBySlug, sortNewsItems } from '@/data/newsSources';

export { NEWS_COLUMNS, rowToNewsItem };
export type { NewsRow };
export { sortNewsItems };

/** Build-time snapshot merged with the bundled data — used while react-query loads and during SSR. */
const fallbackPublishedNews = (): NewsItem[] =>
  mergeNewsBySlug(remoteNews, archivedNews, staticPublishedNews);

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
  const items = sortNewsItems(mergeNewsBySlug(base, archivedNews, codeOnly));


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
    ? remoteNews.find((n) => n.slug === slug) ?? archivedNews.find((n) => n.slug === slug) ?? newsData.find((n) => n.slug === slug)
    : undefined;


export { isPublished };
